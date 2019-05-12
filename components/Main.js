import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Icon, Title, Content, Text, List, ListItem, View, Fab, Button } from 'native-base';
import { FlatList } from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

class Main extends Component {
  static navigationOptions = {
    headerTitle: 'Households'
  };

  constructor(props) {
    super(props)
    this.state = {
      active: 'true',
      FlatListItems: [],
    };

    
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='household'",
        [],
        function(tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS household', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS household(household_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), address VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }

  clearData(){
    db.transaction(tx => {
      tx.executeSql('DELETE FROM household')
    });
  }

  sendData(){
    const link = "http://192.168.1.2/hello.php";
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM household', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          var username = results.rows.item(i).name;
          var address = results.rows.item(i).address;
          fetch(link, {
            method: 'post',
            header: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: username,
              address: address
            })
          })
          .then((response) => response.json)
            .then((responseJson) =>{
              console.log("SENT");
            })
            .catch((error) =>{
              console.error(error);
            })
        }
      });
    });
  }

  getAll(){
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM household', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }

  render() {
    this.getAll();
    return (
      <Container>
        <Content>
          <List>
          <FlatList
            data={this.state.FlatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <ListItem onPress={()=>this.props.navigation.navigate('Household')}>
                  <Body>
                    <Text>{item.name}</Text>
                    <Text note numberOfLines={1}>{item.address}</Text>
                  </Body>
                </ListItem>
            )}
          />
          </List>
          <Button onPress={()=>this.sendData()}>
            <Text>Sync</Text>
          </Button>

          <Button onPress={()=>this.clearData()}>
            <Text>Clear</Text>
          </Button>
        </Content>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#16006a' }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('AddHousehold')}>
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}

export default Main;
