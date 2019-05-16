import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Text, List, ListItem, Fab, CardItem, Card, H3 } from 'native-base';
import { View, FlatList, StyleSheet } from 'react-native';
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
    fontWeight: 'bold',
    marginLeft: 10
  },
  headerH: {
    fontWeight: 'bold',
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
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  button: {
    margin: 1,
    marginLeft: 18,
    marginTop: 10
  }

});

class HouseholdScreen extends Component {
  static navigationOptions = {
    title: 'Household',
  };

  constructor(props) {
    super(props)
    this.state = {
      active: 'true',
      Assets: [],
      Pets: [],
      People: [],
      Household: "",
    };
    this.getAll();
  }

  componentWillMount() {
    
  }

  render() {
    const h_id = this.props.navigation.getParam('h_id');
    return (
      <Container style={styles.container}>
        <Content>
        <Card style={styles.card}>
          <Row onPress={() => this.props.navigation.push('EditHousehold', {Household: this.state.Household})}>
            <Col>
            <CardItem>
            <Body>
              <Text style={styles.headerH}>{this.state.Household.household_number} {this.state.Household.household_street}</Text>
              <Text style={styles.sub}>{this.state.Household.household_barangay} BEC# {this.state.Household.bec_number}</Text>
            </Body> 
            </CardItem>   
            </Col>
            <Col>
              <Body>
                <Text style={styles.perm}>Medial equipment? {this.state.Household.has_medical_equipment}</Text>
                <Text style={styles.perm}>Allow victims? {this.state.Household.allow_victims}</Text>
                <Text style={styles.perm}>Allow evacuation? {this.state.Household.allow_evacuation}</Text>
              </Body>
            </Col>
          </Row>
          <Row>
          </Row>
        </Card>

        <Card style={styles.card}>
          <CardItem header>
            <Text style={styles.header}>People</Text>
          </CardItem>
          <List>
            <FlatList
              data={this.state.People}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem onPress={()=>this.props.navigation.navigate('Person', {p_id: item.person_id})}>
                  <Body>
                    <Text>{item.first_name} {item.last_name}</Text>
                    <Text note style={styles.sub}>{item.family_role}</Text>
                  </Body>
                </ListItem>
              )}
            />
          </List>
        </Card>

        <Card style={styles.card}>
          <CardItem header>
            <Text style={styles.header}>Pets</Text>
          </CardItem>
          <List>
            <FlatList
              data={this.state.Pets}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem>
                  <Body>
                    <Text>{item.pet_name}</Text>
                    <Text note style={styles.sub}>{item.pet_type} | Dangerous? {item.is_dangerous}</Text>
                  </Body>
                </ListItem>
              )}
            />
          </List>
        </Card>

        <Card style={styles.card}>
          <CardItem header>
            <Text style={styles.header}>Assets</Text>
          </CardItem>
          <List>
            <FlatList
              data={this.state.Assets}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem>
                  <Body>
                    <Text>{item.asset_kind}</Text>
                    <Text note style={styles.sub}>{item.asset_type}</Text>
                  </Body>
                </ListItem>
              )}
            />
          </List>
          <Button block style={styles.button} onPress={()=>this.props.navigation.navigate('EditHouseholdAssets', {h_id: h_id})}>
            <Text>Edit Assets</Text>
          </Button>
        </Card>
          
        <View/><View/><View/>
        </Content>
        <Fab
          active={!this.state.active}
          direction="left"
          containerStyle={{ }}
          style={{ backgroundColor: '#16006a' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="ios-list" />
          <Button style={{ backgroundColor: '#5b63ff' }} onPress={() => this.props.navigation.navigate('AddPerson', {h_id: h_id})}>
            <Icon name="ios-person-add" />
          </Button>
          <Button style={{ backgroundColor: '#5b63ff' }} onPress={() => this.props.navigation.navigate('AddPet', {h_id: h_id})}>
            <Icon name="ios-paw" />
          </Button>
        </Fab>
      </Container>
    );
  }

  getAll(){
    const h_id = this.props.navigation.getParam('h_id');

    db.transaction(tx => {
      //Get Household Info
      tx.executeSql('SELECT * FROM household_t WHERE household_id=' + h_id, [], (tx, results) => {
        var perms = [];
        for (let i = 0; i < results.rows.length; ++i) {
          this.setState({
            Household: results.rows.item(0),
          });
        }
      });

      //Get Physical Assets
      tx.executeSql('SELECT * FROM physical_asset_t WHERE household_id=' + h_id, [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          Assets: temp,
        });
      });

      //Get Pets
      tx.executeSql('SELECT * FROM pet_t WHERE household_id=' + h_id, [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          Pets: temp,
        });
      });

      //Get People
      tx.executeSql('SELECT * FROM person_t WHERE household_id=' + h_id, [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          People: temp,
        });
      });

    });
  }

  componentDidMount(){
    this.getAll();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props !== prevProps) {
      this.getAll();
    }
  }


  componentWillUnmount() {
      
  }
}

export default HouseholdScreen;
