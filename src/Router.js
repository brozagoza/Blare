import React from 'react';
import { Scene, Router, Actions, View } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContactCreate from './components/ContactCreate';
import ContactList from './components/ContactList';
import ContactEdit from './components/ContactEdit';
import Home from './components/Home';
import SettingsMenu from './components/SettingsMenu';

const RouterComponent = () => {

        return (
                <Router>
                    <Scene key="root" style={styles.routerStyle} hideNavBar>
                        <Scene 
                        key="main" 
                        titleStyle={styles.titleStyle}
                        navigationBarStyle={styles.navBarStyle}>
                            <Scene 
                            renderBackButton={()=>(null)}
                            key='home' 
                            component={Home} 
                            headerMode="float" 
                            title="Blare" initial />
                        </Scene>

                        <Scene key="contact" navigationBarStyle={styles.navStyle}>
                            <Scene
                                rightTitle={<Icon size={32} color="white" name="person-add" />}
                                rightButtonTextStyle={styles.contactListRightStyle}
                                renderBackButton={()=>(null)}
                                onRight={() => Actions.contactCreate()}
                                key="contactList"
                                component={ContactList} titleStyle={styles.contactListStyle}
                                title="Trusted Contacts" navigationBarStyle={styles.navBarStyle} initial
                            />
                            <Scene 
                                key='contactCreate' backButtonTextStyle={styles.backStyle}
                                component={ContactCreate} titleStyle={styles.contactListStyle}
                                title="New Contact" navigationBarStyle={styles.navBarStyle}
                            />
                            <Scene 
                                key='contactEdit' 
                                component={ContactEdit} titleStyle={styles.contactListStyle}
                                title="Edit Contact" navigationBarStyle={styles.navBarStyle}
                            />
                        </Scene>

                        <Scene key="settings" navigationBarStyle={styles.navStyle}>
                            <Scene 
                                renderBackButton={()=>(null)}
                                key="settingsMenu"
                                component={SettingsMenu} titleStyle={styles.contactListStyle}
                                title="Settings" navigationBarStyle={styles.navBarStyle}
                            />
                        </Scene>

                    </Scene>
                </Router>
        );
};

const styles = {
    routerStyle: {
        backgroundColor: 'black'
    },
    titleStyle: {
        color: 'white',
        justifyContent: 'center',
        fontSize: 38,
        fontWeight: 'normal',
        fontFamily: 'Montserrat-Regular',
    },
    navBarStyle: {
        backgroundColor: '#e91585ff',
    },
    backStyle: {
        color: 'white'
    },
    contactListStyle: {
        color: 'white',
        justifyContent: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Regular'
    },
    contactListRightStyle: {
        justifyContent: 'center'
    }
};

export default RouterComponent;
