import React, { Component } from 'react';
import { Container, H3, Button, Icon, Content, Text, CardItem, Card, Form, Item, Input, Label, Picker, ListItem, Radio, Right, CheckBox, Body } from 'native-base';
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
      //health program checkboxes + hours
      voldoc: false,
      volnurse: false,
      healthco: false,
      feedco: false,
      hphours: '',
      //education program + hours
      volcath: false,
      scholarco: false,
      guidecoun: false,
      ephours: '',
      //livelihood program checkboxes + hours
      hhmember: false,
      hhcmember: false,
      stmmember: false,
      sbmmember: false,
      jpcoor: false,
      lphours: '',
      //spiritual program checkboxes + hours
      becmem: false,
      //ministry checkbox
      cbministry: false,
      //ministry input - if ministry checkbox checked is true, input expected
      ministry: '',
      sphours: '',
      //Treasure card
      amount: '',
      treasurefor: "1",
      
    };
  }

  static navigationOptions = {
    title: 'Add Person',
  };

  componentWillUnmount() {
      this._isMounted = false;
  }

    setTreasurefor(value: string) {
    this.setState({
      treasurefor: value
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Card style={styles.card}>
            <CardItem header>
              <H3 style={styles.header}>Time and Talent</H3>
            </CardItem>
              <Form>
                <Item stackedLabel>
                  <Label>Health Program</Label>
                </Item>
                <ListItem>
                  <CheckBox checked={this.state.voldoc} onPress={() => this.setState({ voldoc: !this.state.voldoc })} />
                    <Body>
                      <Text>Volunteer Doctor</Text>
                    </Body> 
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.volnurse} onPress={() => this.setState({ volnurse: !this.state.volnurse })} />
                    <Body>
                      <Text>Volunteer Nurse</Text>
                    </Body> 
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.healthco} onPress={() => this.setState({ healthco: !this.state.healthco })} />
                    <Body>
                      <Text>Health Coordinator</Text>
                    </Body> 
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.feedco} onPress={() => this.setState({ feedco: !this.state.feedco })} />
                    <Body>
                      <Text>Feeding Coordinator</Text>
                    </Body> 
                </ListItem>
                <Item stackedLabel>
                  <Label>How many hours are you willing to share per week?</Label>
                  <Input keyboardType = 'numeric' onChangeText = { ( text ) => { this.setState({ hphours: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Education Program</Label>
                </Item>
                <ListItem>
                  <CheckBox checked={this.state.volcath} onPress={() => this.setState({ volcath: !this.state.volcath })} />
                    <Body>
                      <Text>Volunteer Cathecist</Text>
                    </Body> 
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.scholarco} onPress={() => this.setState({ scholarco: !this.state.scholarco })} />
                    <Body>
                      <Text>Scholar Coordinator</Text>
                    </Body> 
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.guidecoun} onPress={() => this.setState({ guidecoun: !this.state.guidecoun })} />
                    <Body>
                      <Text>Guidance Counselor</Text>
                    </Body> 
                </ListItem>
                <Item stackedLabel>
                  <Label>How many hours are you willing to share per week?</Label>
                  <Input keyboardType = 'numeric' onChangeText = { ( text ) => { this.setState({ ephours: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Livelihood Program</Label>
                </Item>
                <ListItem>
                  <CheckBox checked={this.state.hhmember} onPress={() => this.setState({ hhmember: !this.state.hhmember })} />
                    <Body>
                      <Text>Helping Hands Member</Text>
                    </Body> 
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.hhcmember} onPress={() => this.setState({ hhcmember: !this.state.hhcmember })} />
                    <Body>
                      <Text>Helping Hands Committee Member</Text>
                    </Body> 
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.stmmember} onPress={() => this.setState({ stmmember: !this.state.stmmember })} />
                    <Body>
                      <Text>Skills Training Mentor</Text>
                    </Body> 
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.sbmmember} onPress={() => this.setState({ sbmmember: !this.state.sbmmember })} />
                    <Body>
                      <Text>Small Business Mentor</Text>
                    </Body> 
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.jpcoor} onPress={() => this.setState({ jpcoor: !this.state.jpcoor })} />
                    <Body>
                      <Text>Job Placement Coordinator</Text>
                    </Body> 
                </ListItem>
                <Item stackedLabel>
                  <Label>How many hours are you willing to share per week?</Label>
                  <Input keyboardType = 'numeric' onChangeText = { ( text ) => { this.setState({ lphours: text })} } />
                </Item>
                <Item stackedLabel>
                  <Label>Spiritual Program</Label>
                </Item>
                <ListItem>
                  <CheckBox checked={this.state.becmem} onPress={() => this.setState({ becmem: !this.state.becmem })} />
                  <Body>
                    <Text>BEC Member in my area</Text>
                  </Body>
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.cbministry} onPress={() => this.setState({ cbministry: !this.state.cbministry })} />
                  <Body>
                    <Text>Ministry :</Text>
                  </Body>
                  <Input onChangeText = { ( text ) => { this.setState({ ministry: text })} } />
                </ListItem>
                <Item stackedLabel>
                  <Label>How many hours are you willing to share per week?</Label>
                  <Input keyboardType = 'numeric' onChangeText = { ( text ) => { this.setState({ sphours: text })} } />
                </Item>
              </Form>
          </Card>
          <Card style={styles.card}>
            <CardItem header>
              <H3 style={styles.header}>Treasure </H3>
            </CardItem>
              <Form>
                 <Item stackedLabel>
                  <Label>Amount (₱)</Label>
                  <Input keyboardType = 'numeric' onChangeText = { ( text ) => { this.setState({ amount: text })} } />
                </Item>
                <Item>
                  <Text>{"\n"}For:{"\n"}</Text>       
                <Picker
                  mode="dropdown"
                  headerStyle={{ backgroundColor: "#16006a" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  selectedValue={this.state.treasurefor}
                  onValueChange={this.setTreasurefor.bind(this)}
                  >
                  <Picker.Item label="Feeding" value="1" />
                  <Picker.Item label="Education" value="2" />
                  <Picker.Item label="Livelihood" value="3" />
                  <Picker.Item label="Medical Missions" value="4" />
                  <Picker.Item label="Spiritual Program" value="5" />
                </Picker>
                </Item>
              </Form>
            </Card>
          <Button block style={styles.button} onPress={()=>this.nextPage()}>
            <Text>Finish</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


export default AddHouseholdScreen;