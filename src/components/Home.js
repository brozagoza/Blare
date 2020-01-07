import React, { Component } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { View, AsyncStorage, Text } from 'react-native';
// import { debounce } from 'throttle-debounce';
import debounce from 'lodash/debounce';
import { Card, CardSection, Button, Spinner } from './common';

const SmsAndroid = require('react-native-sms-android');

class Home extends Component {

    constructor() {
        super();
        this.manager = new BleManager();
        this.state = {
            bluetoothOn: false,
            lat: null,
            long: null,
            error: null,
            loading: false,
            deviceID: ''
        };
    }


    componentDidMount() {
        this.getLocation();
    }

    async getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    error: null
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    async setupNotifications(device) {
        const service = '0000ffe0-0000-1000-8000-00805f9b34fb';
        const char = '0000ffe1-0000-1000-8000-00805f9b34fb';

        device.monitorCharacteristicForService(service, char, (err, ch) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.blePress();
        });
    }

    initBLE() {
        console.log(this.manager.state());
        this.setState({ loading: true });
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.scanAndConnect();
                subscription.remove();
            }
        }, true);
    }

    closeBLE() {
        this.manager.cancelDeviceConnection(this.state.deviceID);
        this.setState({
            bluetoothOn: false,
            deviceID: ''
        });
    }

    blePress() {
        const mapsUrl = 'http://maps.google.com?q=' + JSON.stringify(this.state.lat) + ',' + JSON.stringify(this.state.long);
        console.log(mapsUrl);
        const mssg = 'BLARE Alert! Alejandro may be in trouble. Location: ' + mapsUrl;

        AsyncStorage.getItem('CONTACTS_PHONE').then(phones => {
            phones = JSON.parse(phones);
            for (var i = 0; i < phones.length; i++) {
                SmsAndroid.sms(
                    phones[i],
                    mssg,
                    'sendDirect',
                    (err, mssg) => {
                        if (err) console.log('error');
                        else console.log(mssg);
                    }
                );
            }
        });
    }

    scanAndConnect() {
        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log('bluetooth error');
                return;
            }
    
            if (device.name === 'DSD TECH') {
                console.log(device);
                this.manager.stopDeviceScan();
                device.connect().then((device) => {
                    console.log("Discovering services and characteristics");
                    return device.discoverAllServicesAndCharacteristics();
                })
                .then((device) => {
                    console.log('Setting notifications');
                    return this.setupNotifications(device);
                })
                .then(() => {
                    console.log('Bluetooth is connected');
                    this.setState({ 
                        bluetoothOn: true,
                        deviceID: device.id,
                        loading: false 
                    });
                }, (error) => {
                    console.log(error.message);
                });
            }     
        });
    }

    renderBluetoothText() {
        if (this.state.bluetoothOn)
            return(<Text style={styles.connected}>Bracelet is connected.</Text>);
        else
            return (<Text style={styles.disconnected}>Bracelet is NOT connected.</Text>);
    }

    renderBluetoothButton() {
        if (this.state.loading)
            return <Spinner size="large" />;
        else {
            if (this.state.bluetoothOn)
                return (<Button onPress={this.closeBLE.bind(this)}>Disconnect</Button>);
            else
                return (<Button onPress={this.initBLE.bind(this)}>Connect</Button>);
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <Card>
                    <CardSection>
                        {this.renderBluetoothText()}
                    </CardSection>
                    <CardSection>
                        {this.renderBluetoothButton()}
                    </CardSection>


                    <CardSection>
                        
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    disconnected: {
        fontSize: 24,
        alignSelf: 'center',
        color: 'red',
        fontWeight: 'normal',
        fontFamily: 'Montserrat-Regular',
    },
    connected: {
        fontSize: 24,
        alignSelf: 'center',
        color: 'green',
        fontWeight: 'normal',
        fontFamily: 'Montserrat-Regular',
    }
};

export default Home;
