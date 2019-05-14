import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Text, List, ListItem, Fab, CardItem, Card, H3 } from 'native-base';
import { View, FlatList, StyleSheet } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

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
    fontWeight: 'bold',
    textAlign: 'left',
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
  }

});

class HouseholdScreen extends Component {
  _isMounted = false;
  static navigationOptions = {
    title: 'Household',
  };

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      FlatListItems: [],
      Assets: [],
      Perms: [],
      Pets: [],
    };
  }

  componentWillUnmount() {
      this._isMounted = false;
  }

  getAll(){
    this._isMounted = true;
    const h_id = this.props.navigation.getParam('h_id');

    db.transaction(tx => {
      //Get Household Info
      tx.executeSql('SELECT * FROM household_t WHERE household_id=' + h_id, [], (tx, results) => {
        var temp = [];
        var perms = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          if (results.rows.item(i).has_medical_equipment == 1) {
            perms.push("Medical equipment? Yes");
          }

          else {
            perms.push("Medical equipment? No");
          }

          if (results.rows.item(i).allow_victims == 1) {
            perms.push("Allow victims to stay? Yes");
          }

          else {
            perms.push("Allow victims to stay? No");
          }

          if (results.rows.item(i).allow_evacuation == 1) {
            perms.push("Allow evacuation? Yes");
          }

          else {
            perms.push("Allow evacuation? No");
          }
        }
        this.setState({
          FlatListItems: temp,
          Perms: perms,
        });
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
    });

    this.componentWillUnmount();
  }

  render() {
    const h_id = this.props.navigation.getParam('h_id');
    this.getAll();
    return (
      <Container style={styles.container}>
        <Content>
        <Card style={styles.card}>
          <Row>
            <Col>
            <CardItem>
              <FlatList
                data={this.state.FlatListItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Body>
                      <Text style={styles.header}>{item.household_number} {item.household_street}</Text>
                      <Text style={styles.sub}>{item.household_barangay} BEC# {item.bec_number}</Text>
                    </Body> 
                )}
              />
            </CardItem>   
            </Col>
            <Col>
              <FlatList
                data={this.state.Perms}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Body>
                      <Text style={styles.perm}>{item}</Text>
                    </Body>
                )}
              />
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
            <ListItem>
              <Body>
                <Text>John Mignolet</Text>
                <Text note numberOfLines={1} style={styles.sub}>Father</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Jane Mignolet</Text>
                <Text note numberOfLines={1} style={styles.sub}>Mother</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Joe Mignolet</Text>
                <Text note numberOfLines={1} style={styles.sub}>Child</Text>
              </Body>
            </ListItem>
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
        </Card>
          
        <View/><View/><View/>
        </Content>
        <Fab
          active= {this.state.active}
          direction="left"
          containerStyle={{ }}
          style={{ backgroundColor: '#16006a' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active})}>
          <Icon name="list" />
          <Button style={{ backgroundColor: '#34A34F' }} onPress={() => this.props.navigation.navigate('AddPet', {h_id: h_id})}>
            <Icon name="paw" />
          </Button>
          <Button style={{ backgroundColor: '#34A34F' }} onPress={() => this.props.navigation.navigate('AddPerson', {h_id: h_id})}>
            <Icon name="person" />
          </Button>
        </Fab>
      </Container>
    );
  }
}

export default HouseholdScreen;
