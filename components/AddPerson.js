import React, { Component } from 'react';
import { Container, H3, Button, Icon, Content, Text, CardItem, Card, Form, Item, Input, Label, Picker, ListItem, Radio, Right, DatePicker } from 'native-base';
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
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      person_fname: '',
      person_mname: '',
      person_lname: '',
      person_bday: new Date(),
      person_sex: "1",
      person_status: "1",
      person_number: '',
      person_email: '',
      person_religion: '',
      person_occupation:'',
      person_role: '',
    };
    this.setDate = this.setDate.bind(this);
  }

  static navigationOptions = {
    title: 'Add Person',
  };

  componentWillUnmount() {
      this._isMounted = false;
  }

  setDate(newDate) {
    this.setState({person_bday: newDate})
  }

  setSex(value: string) {
    this.setState({
      person_sex: value
    });
  }

  setStatus(value: string) {
    this.setState({
      person_status: value
    });
  }

  nextPage(){
    var addPData =  new Object();
    addPData.fname = this.state.person_fname;
    addPData.mname = this.state.person_mname;
    addPData.lname = this.state.person_lname;   
    addPData.bday = this.state.person_bday;
    addPData.sex = this.state.person_sex;
    addPData.status = this.state.person_status;
    addPData.number = this.state.person_number;
    addPData.email = this.state.person_email;
    addPData.religion = this.state.person_religion;
    addPData.occupation = this.state.person_occupation;
    addPData.role = this.state.person_role;
    this.props.navigation.navigate('AddPersonII', {addPData: addPData});
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
                  <Label>First Name</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ person_fname: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Middle Name</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ person_mname: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Last Name</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ person_lname: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Birthday</Label>
                   <DatePicker
                    defaultDate={new Date(2019, 1, 1)}
                    minimumDate={new Date(1910, 1, 1)}
                    maximumDate={new Date(2019, 5, 15)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this.setDate}
                    disabled={false}
                   />
                </Item>
               <Item>
                  <Text>{"\n"}Sex{"\n"}</Text>
                </Item>
                <Item>
                <Picker
                  mode="dropdown"
                  headerStyle={{ backgroundColor: "#16006a" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  selectedValue={this.state.person_sex}
                  onValueChange={this.setSex.bind(this)}
                  >
                  <Picker.Item label="Male" value="1" />
                  <Picker.Item label="Female" value="0" />
                </Picker>
                </Item>
                <Item>
                  <Text>{"\n"}Civil Status{"\n"}</Text>
                </Item>
                <Item>
                <Picker
                  mode="dropdown"
                  headerStyle={{ backgroundColor: "#16006a" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  selectedValue={this.state.person_status}
                  onValueChange={this.setStatus.bind(this)}
                  >
                  <Picker.Item label="Single" value="1" />
                  <Picker.Item label="Married" value="0" />
                </Picker>
                </Item>
                <Item>
                  <Label>Contact Number</Label>
                  <Input keyboardType = 'numeric' onChangeText = { ( text ) => { this.setState({ person_number: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Email</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ person_email: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Religion</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ person_religion: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Occupation</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ person_occupation: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Family Role</Label>
                  <Input onChangeText = { ( text ) => { this.setState({ person_role: text })} } />
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