import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ContactForm from './ContactForm';
import { Card, CardSection, Button, Confirm } from './common';

class ContactEdit extends Component {
    state = {
        name: '',
        phone: '',
        index: 0,
        showModal: false
    };

    componentWillMount() {
        AsyncStorage.getItem('CONTACTS_SELECTED')
        .then(val => {
            AsyncStorage.getItem('CONTACTS_NAMES').then(names => {
                names = JSON.parse(names);
                for (var i = 0; i < names.length; i++)
                    if (names[i] === val)
                        this.setState({ index: i });
            });
            AsyncStorage.getItem('CONTACTS_PHONE').then(phones => {
                phones = JSON.parse(phones);
                this.setState({
                    name: val,
                    phone: phones[this.state.index]
                });
            });
        })
        .done();
    }


    onButtonPress() {
        AsyncStorage.getItem('CONTACTS_NAMES').then(names => {
            names = JSON.parse(names);
            names[this.state.index] = this.state.name;
            AsyncStorage.setItem('CONTACTS_NAMES', JSON.stringify(names));
        });

        AsyncStorage.getItem('CONTACTS_PHONE').then(phones => {
            phones = JSON.parse(phones);
            phones[this.state.index] = this.state.phone;
            AsyncStorage.setItem('CONTACTS_PHONE', JSON.stringify(phones));
        });

        Actions.pop();
    }

    onAccept() {
        AsyncStorage.getItem('CONTACTS_NAMES').then(names => {
            names = JSON.parse(names);
            names.splice(this.state.index, 1);
            AsyncStorage.setItem('CONTACTS_NAMES', JSON.stringify(names));
        });

        AsyncStorage.getItem('CONTACTS_PHONE').then(phones => {
            phones = JSON.parse(phones);
            phones.splice(this.state.index, 1);
            AsyncStorage.setItem('CONTACTS_PHONE', JSON.stringify(phones));
        });
        
        this.setState({ showModal: false });
        Actions.pop();
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    updateName = (name) => {
        this.setState({ name });
    }
    updatePhone = (phone) => {
        this.setState({ phone });
    }

    render() {
        return (
            <Card>
                <ContactForm 
                name={this.state.name} 
                phone={this.state.phone}
                callbackName={this.updateName}
                callbackPhone={this.updatePhone} 
                />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save
                    </Button>
                </CardSection>

                <CardSection>
                    <Button 
                    onPress={() => this.setState({ showModal: !this.state.showModal })}
                    > Delete
                    </Button>
                </CardSection>

                <Confirm
                visible={this.state.showModal}
                onAccept={this.onAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
                > Are you sure you want to delete this?
                </Confirm>
            </Card>
        );
    }
}

export default ContactEdit;
