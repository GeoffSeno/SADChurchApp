import React, { Component } from 'react';
import { Container, H3, Button, Icon, Content, Text, CardItem, Card, Form, Item, Input, Label, Picker } from 'native-base';
import { StyleSheet, Alert } from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'dbMk1.db' });

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    padding: 20,
    paddingLeft: 5,
    paddingBottom: 30,
    borderRadius: 8
  },
  header: {
    fontWeight: 'bold'
  },
  button: {
    margin: 1,
    marginTop: 10
  }
});

class AddHouseholdScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      pet_name: '',
      pet_type: '',
      is_dangerous: 'No',
    };
  }

  static navigationOptions = {
    title: 'Add Pet',
  };

  setDan(value: string) {
    this.setState({
      is_dangerous: value
    });
  }

  addPet() {
    var h_id = this.props.navigation.getParam('h_id');
    var name = this.state.pet_name;
    var type = this.state.pet_type;
    var is_dangerous = this.state.is_dangerous;
    var that = this;

    db.transaction(function(tx) {
      tx.executeSql(
        'INSERT INTO pet_t (household_id, pet_name, pet_type, is_dangerous) VALUES (?,?,?,?)',
        [h_id, name, type, is_dangerous],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            
          } else {
            alert('Registration Failed');
          }
        }
      );
    });

    Alert.alert( 'Success', 'Pet added!',
      [
        {text: 'Ok', onPress: () => that.props.navigation.navigate('Home')},
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Card style={styles.card}>
            <CardItem header>
              <H3 style={styles.header}>Pet Info</H3>
            </CardItem>
              <Form>
                <Item stackedLabel>
                  <Label>Name</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ pet_name: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Type</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ pet_type: text })} } />
                </Item>
                <Item>
                  <Text>{"\n"}Is it dangerous?{"\n"}</Text>
                </Item>
                <Item>
                  <Picker
                    mode="dropdown"
                    headerStyle={{ backgroundColor: "#16006a" }}
                    headerBackButtonTextStyle={{ color: "#fff" }}
                    headerTitleStyle={{ color: "#fff" }}
                    selectedValue={this.state.is_dangerous}
                    onValueChange={this.setDan.bind(this)}
                    >
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                  </Picker>
                </Item>
              </Form>
          </Card>
          <Button block style={styles.button} onPress={()=>this.addPet()}>
            <Text>Add Pet</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


export default AddHouseholdScreen;
