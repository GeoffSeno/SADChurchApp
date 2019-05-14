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
    this.state = { saldo: '', 
    itemSUV: false, 
    itemPUT: false, 
    itemLT: false, 
    itemMotor: false, 
    itemChain: false, 
    itemMechJ: false, 
    itemGenSet: false, 
    itemPT: false, 
    itemTWR: false, 
    itemSatD: false,
    h_id: 0
    }

  }

  assetChecker(){
      var suv = this.state.itemSUV;
      var put = this.state.itemPUT;
      var lt = this.state.itemLT;
      var motor = this.state.itemMotor;
      var chain = this.state.itemChain;
      var mechj = this.state.itemMechJ;
      var itemgenset = this.state.itemGenSet;
      var pt = this.state.itemPT;
      var twr = this.state.itemTWR;
      var satd = this.state.itemSatD;

      if (suv == true) {
        this.insertPhysAsset("Transportation", "SUV");
      }

      if (put == true) {
        this.insertPhysAsset("Transportation", "Pick-Up Truck");
      }

      if (lt == true) {
        this.insertPhysAsset("Transportation", "Light Truck");
      }

      if (motor == true) {
        this.insertPhysAsset("Transportation", "Motorcycle");
      }

      if (chain == true) {
        this.insertPhysAsset("Equipment", "Chainsaws");
      }

      if (mechj == true) {
        this.insertPhysAsset("Equipment", "Mechanical Jacks");
      }

      if (itemgenset == true) {
        this.insertPhysAsset("Equipment", "Generator Set");
      }

      if (pt == true) {
        this.insertPhysAsset("Equipment", "Power Tools");
      }

      if (twr == true) {
        this.insertPhysAsset("Communication", "Two-Way Radios");
      }

      if (satd == true) {
        this.insertPhysAsset("Communication", "Satellite");
      }
  }

  insertPhysAsset(type, kind){
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM household_t ORDER BY household_id DESC LIMIT 1', [], (tx, results) => {
        var id;
        for (let i = 0; i < results.rows.length; ++i) {
          id = results.rows.item(i).household_id;
          this.insertToTable(id, type, kind);
        }
      });
    });
  }

  insertToTable(id, type, kind){
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO physical_asset_t (household_id, asset_type, asset_kind) VALUES (?,?,?)',
        [id, type, kind],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {

          } else {
            alert('Registration Failed');
          }
        }
      );
    });
  }

  addHousehold() {
    var addData = this.props.navigation.getParam('addData');
    const address_number = addData['num'];
    const address_street = addData['street'];
    const address_barangay = addData['bar'];
    const address_bec = addData['bec'];
    const equip = addData['equip'];
    const shelter = addData['shelter'];
    const evac = addData['evac'];

    db.transaction(function(tx) {
      tx.executeSql(
        'INSERT INTO household_t (household_number, household_street, household_barangay, bec_number, has_medical_equipment, allow_victims, allow_evacuation, date_added) VALUES (?,?,?,?,?,?,?, datetime())',
        [address_number, address_street, address_barangay, address_bec, equip, shelter, evac],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {

          } else {
            alert('Registration Failed');
          }
        }
      );
    });

    this.assetChecker();
    this.props.navigation.navigate('Home');
  }

  render() {
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
                <ListItem>    
                    <CheckBox checked={this.state.itemSUV} onPress={() => this.setState({ itemSUV: !this.state.itemSUV })} />
                    <Body>
                      <Text>SUV</Text>
                    </Body> 
                    <CheckBox checked={this.state.itemPUT} onPress={() => this.setState({ itemPUT: !this.state.itemPUT })} />
                    <Body>
                      <Text>Pick-up Truck</Text>
                    </Body>
                </ListItem>
                <ListItem>             
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
                <ListItem>
                  <CheckBox checked={this.state.itemChain} onPress={() => this.setState({ itemChain: !this.state.itemChain })} />
                    <Body>
                      <Text>Chainsaw</Text>
                    </Body>
                    <CheckBox checked={this.state.itemMechJ} onPress={() => this.setState({ itemMechJ: !this.state.itemMechJ })} />
                    <Body>
                      <Text>Mechani-{"\n"}cal Jacks</Text>
                    </Body>      
                </ListItem>
                <ListItem>
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
                <ListItem>
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