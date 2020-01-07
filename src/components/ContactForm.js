import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSection, Input } from './common';

class ContactForm extends Component {
    state = { name: this.props.name || '', phone: this.props.phone || '' };

    componentWillReceiveProps(newProps) {
        this.setState({ name: newProps.name, phone: newProps.phone });
    }

    render() {
        return (
        <View>
            <CardSection>
                <Input 
                    label="Name"
                    placeholder="Jane"
                    value={this.state.name}
                    onChangeText={name => {
                        this.setState({ name });
                        this.props.callbackName(name);
                    }}
                />
            </CardSection>

            <CardSection>
                <Input 
                    label="Phone"
                    placeholder="555-555-5555"
                    value={this.state.phone}
                    onChangeText={phone => {
                        this.setState({ phone });
                        this.props.callbackPhone(phone);
                    }}
                />
            </CardSection>
        </View>
       );
    }
}

export default ContactForm;
