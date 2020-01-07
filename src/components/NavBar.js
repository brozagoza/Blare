import React, { Component } from 'react';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

class NavBar extends Component {

    componentWillMount() {
        this.setState({ tab: this.props.tab });
    }

    settingsPress() {
        this.setState({ tab: 2 });
        Actions.settingsMenu();
    }

    trustedContactsPress() {
        this.setState({ tab: 0 });
        Actions.contactList();
    }

    homePress() {
        this.setState({ tab: 1 });
        Actions.home();
    }

    render() {
        return (
            <BottomNavigation
            backgroundColor="#e91585ff"
            labelColor="white"
            rippleColor="white"
            style={styles.navStyles}
            activeTab={this.state.tab}
            //onTabChange={tab => this.setState({ tab })}
            >
                <Tab
                    label="Trusted Contacts"
                    onPress={this.trustedContactsPress.bind(this)}
                    icon={<Icon size={24} color="white" name="contacts" />}
                />
                <Tab
                    label="Home"
                    onPress={this.homePress.bind(this)}
                    icon={<Icon size={24} color="white" name="home" />}
                />
                <Tab
                    label="Settings"
                    onPress={this.settingsPress.bind(this)}
                    icon={<Icon size={24} color="white" name="settings" />}
                />
            </BottomNavigation>
        );
    }
}

const styles = {
    navStyles: {
        height: 56,
        elevation: 8,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0
    }
};

export default NavBar;
