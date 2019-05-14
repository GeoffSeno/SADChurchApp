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
      address_number: '',
      address_street: '',
      address_barangay: '',
      address_bec: '',
    };
  }

  static navigationOptions = {
    title: 'Add Household',
  };

  nextPage(){
    var addData = new Object();
    addData.num = this.state.address_number;
    addData.street = this.state.address_street;
    addData.bar = this.state.address_barangay;
    addData.bec = this.state.address_bec;
    this.props.navigation.navigate('AddHouseholdII', {addData: addData});
  }

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
                  <Label>House Number</Label>
                  <Input keyboardType = 'numeric' onChangeText = { ( text ) => { this.setState({ address_number: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Street</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ address_street: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Barangay</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ address_barangay: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>BEC#</Label>
                  <Input keyboardType = 'numeric' onChangeText = { ( text ) => { this.setState({ address_bec: text })} } />
                </Item>
              </Form>
          </Card>
          <Button block style={styles.button} onPress={()=>this.nextPage()}>
            <Text>Next</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


export default AddHouseholdScreen;
