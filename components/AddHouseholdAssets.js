import React, { Component } from 'react';
import { Container, H3, Button, Icon, Content, Text, CardItem, Card, Form, Item, Input, Label, Picker, ListItem, CheckBox, Body, Separator } from 'native-base';
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

class AddHouseholdScreenAssets extends Component {
  static navigationOptions = {
    title: 'Add Household',
  };

  constructor(props) {
    super(props);
    this.state = { saldo: '', itemSUV: false, itemPUT: false, itemLT: false, itemMotor: false, itemChain: false, itemMechJ: false, itemGenSet: false, itemPT: false, itemTWR: false, itemSatD: false }

  }

  addHousehold(){
    var that = this;
    const name = this.props.navigation.getParam('name');;
    const address = this.props.navigation.getParam('address');;

    if (name) {
      if (address) {
        db.transaction(function(tx) {
          tx.executeSql(
            'INSERT INTO household (name, address) VALUES (?,?)',
            [name, address],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'Household added',
                  [
                    {
                      text: 'Ok',
                      onPress: () => that.props.navigation.navigate('Home'),
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


  render() {
    const name= this.props.navigation.getParam('name');
    const address= this.props.navigation.getParam('address');
    const evac= this.props.navigation.getParam('evac');
    const shelter= this.props.navigation.getParam('shelter');
    return (
      <Container style={styles.container}>
        <Content>
          <Card style={styles.card}>
            <CardItem header>
              <Text>Physical Assets</Text>
            </CardItem>
              <Form>
                <Item>
                  <Text>Transportation{"\n"}</Text>
                </Item>
                <ListItem onPress={() => this.setState({ itemSUV: !this.state.itemSUV, itemPUT: !this.state.itemPUT  })}>    
                    <CheckBox checked={this.state.itemSUV} onPress={() => this.setState({ itemSUV: !this.state.itemSUV })} />
                    <Body>
                      <Text>SUV</Text>
                    </Body> 
                    <CheckBox checked={this.state.itemPUT} onPress={() => this.setState({ itemPUT: !this.state.itemPUT })} />
                    <Body>
                      <Text>Pick-up Truck</Text>
                    </Body>
                </ListItem>
                <ListItem onPress={() => this.setState({ itemLT: !this.state.itemLT, itemMotor: !this.state.itemMotor  })}>             
                    <CheckBox checked={this.state.itemLT} onPress={() => this.setState({ itemLT: !this.state.itemLT })} />
                    <Body>
                      <Text>Light Truck</Text>
                    </Body>
                    <CheckBox checked={this.state.itemMotor} onPress={() => this.setState({ itemMotor: !this.state.itemMotor })} />
                    <Body>
                      <Text>Motor-{"\n"}cycle</Text>
                    </Body>
                </ListItem>
                <Item>
                  <Text>{"\n"}Equipment{"\n"}</Text>
                </Item>
                <ListItem onPress={() => this.setState({ itemChain: !this.state.itemChain, itemMechJ: !this.state.itemMechJ  })}>
                  <CheckBox checked={this.state.itemChain} onPress={() => this.setState({ itemChain: !this.state.itemChain })} />
                    <Body>
                      <Text>Chainsaw</Text>
                    </Body>
                    <CheckBox checked={this.state.itemMechJ} onPress={() => this.setState({ itemMechJ: !this.state.itemMechJ })} />
                    <Body>
                      <Text>Mechani-{"\n"}cal Jacks</Text>
                    </Body>      
                </ListItem>
                <ListItem onPress={() => this.setState({ itemGenSet: !this.state.itemGenSet, itemPT: !this.state.itemPT  })}>
                    <CheckBox checked={this.state.itemGenSet} onPress={() => this.setState({ itemGenSet: !this.state.itemGenSet })} />
                    <Body>
                      <Text>Generator set</Text>
                    </Body>
                    <CheckBox checked={this.state.itemPT} onPress={() => this.setState({ itemPT: !this.state.itemPT })} />
                    <Body>
                      <Text>Power Tools</Text>
                    </Body>
                </ListItem>
                <Item>
                  <Text>{"\n"}Communications {this.state.itemMechJ}{"\n"}</Text>
                </Item>
                <ListItem onPress={() => this.setState({ itemTWR: !this.state.itemTWR, itemSatD: !this.state.itemSatD  })}>
                <CheckBox checked={this.state.itemTWR} onPress={() => this.setState({ itemTWR: !this.state.itemTWR })} />
                    <Body>
                      <Text>Two-way{"\n"}radios</Text>
                    </Body> 
                  <CheckBox checked={this.state.itemSatD} onPress={() => this.setState({ itemSatD: !this.state.itemSatD })} />
                    <Body>
                      <Text>Satellite Dish</Text>
                    </Body> 
                </ListItem>
              </Form>
          </Card>
          <Button block style={styles.button} onPress={()=>this.addHousehold()}>
            <Text>Finish Household</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


export default AddHouseholdScreenAssets;