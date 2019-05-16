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
    title: 'Person',
  };

  constructor(props) {
    super(props)
    this.state = {
      active: 'true',
      Skills: [],
      Vols: [],
      Person: "",
    };
  }

  render() {
    const p_id = this.props.navigation.getParam('p_id');
    return (
      <Container style={styles.container}>
        <Content>
        <Card style={styles.card}>
            <Col>
            <CardItem>
            <Body>
              <Text style={styles.headerH}>{this.state.Person.first_name} {this.state.Person.middle_name} {this.state.Person.last_name}</Text>
              <Text style={styles.sub}>Birthday: {this.state.Person.birthday}</Text>
              <Text style={styles.sub}>Contact: {this.state.Person.contact_number}</Text>
              <Text style={styles.sub}>Email: {this.state.Person.email}</Text>
              <Text style={styles.sub}>Religion: {this.state.Person.religion}</Text>
              <Text style={styles.sub}>Occupation: {this.state.Person.occupation}</Text>
              <Text style={styles.sub}>Family role: {this.state.Person.family_role}</Text>
            </Body> 
            </CardItem>   
            </Col>
            <Col>
              <Body>
              </Body>
            </Col>
        </Card>

        <Card style={styles.card}>
          <CardItem header>
            <Text style={styles.header}>Skills</Text>
          </CardItem>
          <List>
            <FlatList
              data={this.state.Skills}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem>
                  <Body>
                    <Text>{item.skill_name}</Text>
                  </Body>
                </ListItem>
              )}
            />
          </List>
        </Card>

        <Card style={styles.card}>
          <CardItem header>
            <Text style={styles.header}>Volunteer Roles</Text>
          </CardItem>
          <List>
            <FlatList
              data={this.state.Vols}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem>
                  <Body>
                    <Text>{item.preference} Team</Text>
                  </Body>
                </ListItem>
              )}
            />
          </List>
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
        </Fab>
      </Container>
    );
  }

  getAll(){
    const p_id = this.props.navigation.getParam('p_id');;

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM person_t WHERE person_id=' + p_id, [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          this.setState({
            Person: results.rows.item(0),
          });
        }
      });

      //Get Skills
      tx.executeSql('SELECT * FROM skill_t WHERE person_id=' + p_id, [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(results.rows.item(i));
        }
        this.setState({
          Skills: temp,
        });
      });

      //Get Volunteer Roles
      tx.executeSql('SELECT * FROM volunteer_role_t WHERE person_id=' + p_id, [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(results.rows.item(i));
        }
        this.setState({
          Vols: temp,
        });
      });

    });
  }

  componentDidMount(){
    this.getAll();
  }

  componentDidUpdate() {
    this.getAll();
  }
}

export default HouseholdScreen;
