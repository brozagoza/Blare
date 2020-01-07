import React, { Component } from 'react';
import { View } from 'react-native';
import NavBar from './components/NavBar';
import Router from './Router';


class App extends Component {

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <Router />
                <NavBar tab={1} />
            </View>
        );
    }
}

export default App;
