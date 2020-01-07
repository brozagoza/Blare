import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';
import ContactForm from './ContactForm';


class ContactCreate extends Component {
    state = { name: '', phone: '' };

    onButtonPress() {
        AsyncStorage.getItem('CONTACTS_NAMES').then(names => {
            if (names == null)
                names = [];
            else
                names = JSON.parse(names);

            names.push(this.state.name);
            AsyncStorage.setItem('CONTACTS_NAMES', JSON.stringify(names));
        }).done();
        
        AsyncStorage.getItem('CONTACTS_PHONE').then(phones => {
            if (phones == null)
                phones = [];
            else
                phones = JSON.parse(phones);

            phones.push(this.state.phone);
            AsyncStorage.setItem('CONTACTS_PHONE', JSON.stringify(phones));
        }).done();

        Actions.pop();
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
                callbackName={this.updateName}
                callbackPhone={this.updatePhone}
                />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default ContactCreate;

