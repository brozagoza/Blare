import React, { Component } from 'react';
import { ListView, AsyncStorage, View, Input, Text } from 'react-native';
//import Prompt from 'react-native-prompt';
import ListItem from './ListItem';
import { Card, CardSection, Button, Spinner } from './common';

class SettingsMenu extends Component {

    constructor() {
        super();

        this.state = {
            showPrompt: false,
            message: ''
        };
    }

    // componentWillMount() {
    //     AsyncStorage.getItem('MSSG').then(val => {
    //         val = JSON.parse(val);
  
    //         if (val != null)
    //           this.setState({ message: val });
    //       });
    // }

    render() {
        return (
            <Card>
                <CardSection>
                    <Button onPress={this.setState({ showPrompt: true })}>
                        Edit Message
                    </Button>
                </CardSection>

                {/* <Prompt
                title="Message"
                //defaultValue={this.state.message}
                visible={this.state.showPrompt}
                onCancel={() => this.setState({ showPrompt: false })}
                onSubmit={(message) => {
                    AsyncStorage.setItem('MSSG', JSON.stringify(message));
                    this.setState({ message });
                }}
                /> */}
                
            </Card>
        );
    }
}

export default SettingsMenu;
