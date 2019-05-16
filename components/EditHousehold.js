import React, { Component } from 'react';
import { Container, H3, Button, Icon, Content, Text, CardItem, Card, Form, Item, Input, Label, Body, Picker } from 'native-base';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

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
  sub: {
    fontSize: 12,
  },
  subHead: {
    fontSize: 7,
  },
  perm: {
    fontSize: 10,
    paddingTop: 8,
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
      Household: this.props.navigation.getParam('Household'),
      address_number: '',
      address_street: '',
      address_barangay: '',
      address_bec: '',
      equip: '',
      shelter: '',
      evac: '',
    };
  }

  static navigationOptions = {
    title: 'Edit Household Info',
  };

  getAll(){
    const Household = this.props.navigation.getParam('Household');
    this.setState({
     address_number: Household.household_number,
     address_street: Household.household_street,
     address_barangay:Household.household_barangay,
     address_bec:Household.bec_number,
     shelter: Household.allow_victims,
     equip: Household.has_medical_equipment,
     evac: Household.allow_evacuation,
    });
    this.componentWillUnmount();
  }

  componentWillMount() {
    
  }

  componentDidMount(){
    this.getAll();
  }

  setEquip(value: string) {
    this.setState({
      equip: value
    });
  }

  setShelter(value: string) {
    this.setState({
      shelter: value
    });
  }

  setEvac(value: string) {
    this.setState({
      evac: value
    });
  }

  editHousehold(){
    const Household = this.props.navigation.getParam('Household');
    const address_number = this.state.address_number;
    const address_street = this.state.address_street;
    const address_barangay = this.state.address_barangay;
    const address_bec = this.state.address_bec;
    const equip = this.state.equip;
    const shelter = this.state.shelter;
    const evac = this.state.evac;
    console.log(Household.household_id);

    var that = this;

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE household_t set household_number=?, household_street=?, household_barangay=?, bec_number=?, has_medical_equipment=?, allow_victims=?, allow_evacuation=? where household_id=?',
        [address_number, address_street, address_barangay, address_bec, equip, shelter, evac, Household.household_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            
          } else {
            alert('House Failed');
          }
        }
      );
    });

    Alert.alert( 'Success', 'Household updated successfully',
      [
        {text: 'Ok', onPress: () => that.props.navigation.navigate('Home')},
      ],
      { cancelable: false }
    );

  }

  render() {
    const h_id = this.props.navigation.getParam('h_id');
    return (
      <Container style={styles.container}>
        <Content>
          <Card style={styles.card}>
            <CardItem header>
              <H3 style={styles.header}>New Info</H3>
            </CardItem>
              <Form>
                <Item stackedLabel>
                  <Label>House Number</Label>
                  <Input value={this.state.address_number.toString()} keyboardType = 'numeric' onChangeText = { ( text ) => { this.setState({ address_number: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Street</Label>
                  <Input value={this.state.address_street} onChangeText = { ( text ) => { this.setState({ address_street: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Barangay</Label>
                  <Input value={this.state.address_barangay} onChangeText = { ( text ) => { this.setState({ address_barangay: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>BEC#</Label>
                  <Input value={this.state.address_bec.toString()} keyboardType = 'numeric' onChangeText = { ( text ) => { this.setState({ address_bec: text })} } />
                </Item>
              </Form>
          </Card>

          <Card style={styles.card}>
            <CardItem header>
              <Text>In case of an emergency:</Text>
            </CardItem>
              <Form>
                <Item>
                  <Text>Do you have any medical equipment with you?{"\n"}</Text>
                </Item>
                <Item>
                <Picker
                  mode="dropdown"
                  headerStyle={{ backgroundColor: "#16006a" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  selectedValue={this.state.equip}
                  onValueChange={this.setEquip.bind(this)}
                  >
                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                </Picker>
                </Item>
                <Item>
                  <Text>{"\n"}Are you willing to take in anyone hurt?{"\n"}</Text>
                </Item>
                <Item>
                <Picker
                  mode="dropdown"
                  headerStyle={{ backgroundColor: "#16006a" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  selectedValue={this.state.shelter}
                  onValueChange={this.setShelter.bind(this)}
                  >
                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                </Picker>
                </Item>
                <Item>
                  <Text>{"\n"}Would you allow your family to evacuate to your neighbor or team leader?{"\n"}</Text>
                </Item>
                <Item>
                <Picker
                  mode="dropdown"
                  headerStyle={{ backgroundColor: "#16006a" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  selectedValue={this.state.evac}
                  onValueChange={this.setEvac.bind(this)}
                  >
                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                </Picker>
                </Item>
              </Form>
          </Card>

          <Button block style={styles.button} onPress={()=>this.editHousehold()}>
            <Text>Edit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


export default AddHouseholdScreen;
