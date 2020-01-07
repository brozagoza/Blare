import React, { Component } from 'react';
import { ListView, AsyncStorage, RefreshControl, View } from 'react-native';
import ListItem from './ListItem';
import NavBar from './NavBar';

class ContactList extends Component {

    constructor(props) {
        super(props);
    
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
          refreshing: false,
          dataSource: ds.cloneWithRows([]),
          selectedContact: ''
        };

        AsyncStorage.getItem('CONTACTS_NAMES').then(val => {
          val = JSON.parse(val);

          if (val != null)
            this.setState({ dataSource: ds.cloneWithRows(val) });
        });
      }

      onRefresh() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        AsyncStorage.getItem('CONTACTS_NAMES')
        .then(value => JSON.parse(value))
        .then(json => {
          if (json != null)
            this.setState({
              refreshing: false,
              dataSource: ds.cloneWithRows(json)
            }); 
          else this.setState({ refreshing: false });
        })
        .done();
      }

      render() {
        return (
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <ListView
            enableEmptySections
            refreshControl={
              <RefreshControl 
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            dataSource={this.state.dataSource}
            renderRow={(data) => <ListItem input={data} />}
          />

          {/* <NavBar tab={0} /> */}
          </View>
        );
      }
}

export default ContactList;
