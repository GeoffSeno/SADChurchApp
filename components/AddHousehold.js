import React, { Component } from 'react';
import { Container, H3, Button, Icon, Content, Text, CardItem, Card, Form, Item, Input, Label } from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

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
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_address: '',
    };
  }

  addHousehold(){
    var that = this;
    const { user_name } = this.state;
    const { user_address } = this.state;

    if (user_name) {
      if (user_address) {
        db.transaction(function(tx) {
          tx.executeSql(
            'INSERT INTO household (name, address) VALUES (?,?)',
            [user_name, user_address],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'Household added',
                  [
                    {
                      text: 'Ok',
                      onPress: () => that.props.navigation.navigate('AddHouseholdII'),
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                alert('Registration Failed');
              }
            }
          );
        });
      }

      else {
        alert('Input an address');
      }
    }

    else {
      alert('Input name');
    }
  }

  static navigationOptions = {
    title: 'Add Household',
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Card style={styles.card}>
            <CardItem header>
              <H3 style={styles.header}>Basic Info</H3>
            </CardItem>
              <Form>
                <Item stackedLabel>
                  <Label>Household's Last Name</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ user_name: text })} }  />
                </Item>
                <Item stackedLabel>
                  <Label>Address</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ user_address: text })} } />
                </Item>
              </Form>
          </Card>
          <Button block style={styles.button} onPress={()=>this.props.navigation.navigate('AddHouseholdII', {name: this.state.user_name, address: this.state.user_address})}>
            <Text>Next</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


export default AddHouseholdScreen;
