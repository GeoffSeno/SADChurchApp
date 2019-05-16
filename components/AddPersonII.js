import React, { Component } from 'react';
import { Container, H3, Button, Icon, Content, Text, CardItem, Card, Form, Item, Input, Label, Picker, ListItem, CheckBox, Body, Left, Right } from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import { skillChecker, volunteerChecker } from './functions/addPersonFunctions.js'

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
  button: {
    margin: 1,
    marginTop: 10
  }
});

class AddHouseholdScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { saldo: '', 
    itemDoctor: false, 
    itemNurse: false, 
    itemCMedic: false, 
    itemPsych: false, 
    itemVet: false, 
    itemDamage: false, 
    itemStruc: false, 
    itemPlumb: false, 
    itemElec: false, 
    itemFire: false,
    itemSR: false,
    itemSecur: false,
    itemComms: false,
    //volunteer checkboxes
    itemCommsVol: false,
    itemSRVol: false,
    itemMedicVol: false,
    itemVTVol: false,
    itemEngVol: false,
    itemSecurVol: false,
    itemSanitVol: false,
    itemMessVol: false,
    itemEvacVol: false,
    itemTSCVol: false,
    itemRGDVol: false,
    itemFCVol: false,
    h_id: 0
    };
  }

  static navigationOptions = {
    title: 'Add Person',
  };


  componentWillUnmount() {
      this._isMounted = false;
  }



  submitRest(){
    var skillData =  new Object();
    skillData.Doctor = this.state.itemDoctor;
    skillData.Nurse = this.state.itemNurse;
    skillData.CMedic = this.state.itemCMedic;
    skillData.Psych = this.state.itemPsych;
    skillData.Vet = this.state.itemVet;
    skillData.Damage = this.state.itemDamage;
    skillData.Struc = this.state.itemStruc;
    skillData.Plumb = this.state.itemPlumb;
    skillData.Elec = this.state.itemElec;
    skillData.Fire = this.state.itemFire;
    skillData.SR = this.state.itemSR;
    skillData.Secur = this.state.itemSecur;
    skillData.Comms = this.state.itemComms;
    skillChecker(skillData);

    var volData =  new Object();
    volData.CommsVol = this.state.itemCommsVol;
    volData.SRVol = this.state.itemSRVol;
    volData.MedicVol = this.state.itemMedicVol;
    volData.VTVol = this.state.itemVTVol;
    volData.EngVol = this.state.itemEngVol;
    volData.SecurVol = this.state.itemSecurVol;
    volData.SanitVol = this.state.itemSanitVol;
    volData.MessVol = this.state.itemMessVol;
    volData.EvacVol = this.state.itemEvacVol;
    volData.TSCVol = this.state.itemTSCVol;
    volData.RGDVol = this.state.itemRGDVol;
    volData.FCVol = this.state.itemFCVol;
    volunteerChecker(volData);
  }

  //Adds the person to localdb
  addPerson() {
    var addPData = this.props.navigation.getParam('addPData');
    var household_id = addPData['household_id'];
    var first_name = addPData['first_name'];
    var middle_name = addPData['middle_name'];
    var last_name = addPData['last_name'];
    var birthday = addPData['birthday'];
    var contact_number = addPData['contact_number'];
    var email = addPData['email'];
    var religion = addPData['religion'];
    var occupation = addPData['occupation'];
    var family_role = addPData['family_role'];
    var that = this;

    db.transaction(function(tx) {
      tx.executeSql(
        'INSERT INTO person_t (household_id, first_name, middle_name, last_name, birthday, contact_number, email, religion, occupation, family_role, date_added) VALUES (?,?,?,?,?,?,?,?,?,?,date())',
        [household_id, first_name, middle_name, last_name, birthday, contact_number, email, religion, occupation, family_role],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert( 'Success', 'Person added!',
              [
                {text: 'Ok', onPress: () => that.props.navigation.navigate('AddPersonQ')},
              ],
              { cancelable: false }
            );
          } else {
            alert('Registration Failed');
          }
        }
      );
    });

    this.submitRest();
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Card style={styles.card}>
            <CardItem header>
              <H3 style={styles.header}>Skills</H3>
            </CardItem>
              <Form>
                <Item stackedLabel>
                  <Label>Medical</Label>
                </Item>
                <ListItem>
                 <CheckBox checked={this.state.itemDoctor} onPress={() => this.setState({ itemDoctor: !this.state.itemDoctor })} />
                    <Body>
                      <Text>Doctor</Text>
                    </Body>                  
                </ListItem>
                <ListItem>
                <CheckBox checked={this.state.itemNurse} onPress={() => this.setState({ itemNurse: !this.state.itemNurse })} />
                    <Body>
                      <Text>Nurse</Text>
                    </Body>                 
                </ListItem>
                <ListItem>
                 <CheckBox checked={this.state.itemCMedic} onPress={() => this.setState({ itemCMedic: !this.state.itemCMedic })} />
                    <Body>
                      <Text>Certified Medic</Text>
                    </Body>                 
                </ListItem>
                <ListItem>
                 <CheckBox checked={this.state.itemPsych} onPress={() => this.setState({ itemPsych: !this.state.itemPsych })} />
                    <Body>
                      <Text>Psychiatrist</Text>
                    </Body>                  
                </ListItem>
                <ListItem>
                 <CheckBox checked={this.state.itemVet} onPress={() => this.setState({ itemVet: !this.state.itemVet })} />
                    <Body>
                      <Text>Veterinarian</Text>
                    </Body>                  
                </ListItem>
                <Item stackedLabel>
                  <Label>Construction</Label>
                </Item>
                <ListItem>
                 <CheckBox checked={this.state.itemDamage} onPress={() => this.setState({ itemDamage: !this.state.itemDamage })} />
                    <Body>
                      <Text>Damage assesment</Text>
                    </Body>
                </ListItem>
                <ListItem>
                 <CheckBox checked={this.state.itemStruc} onPress={() => this.setState({ itemStruc: !this.state.itemStruc })} />
                    <Body>
                      <Text>Structural</Text>
                    </Body>
                </ListItem>
                <ListItem>
                 <CheckBox checked={this.state.itemPlumb} onPress={() => this.setState({ itemPlumb: !this.state.itemPlumb })} />
                    <Body>
                      <Text>Plumbing</Text>
                    </Body>
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.itemElec} onPress={() => this.setState({ itemElec: !this.state.itemElec })} />
                    <Body>
                      <Text>Electrical</Text>
                    </Body>
                </ListItem>
                <Item stackedLabel>
                  <Label>Others</Label>
                </Item>
                <ListItem>
                  <CheckBox checked={this.state.itemFire} onPress={() => this.setState({ itemFire: !this.state.itemFire })} />
                      <Body>
                        <Text>Fire Suppression</Text>
                      </Body>
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.itemSR} onPress={() => this.setState({ itemSR: !this.state.itemSR })} />
                      <Body>
                        <Text>Search & Rescue</Text>
                      </Body>
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.itemSecur} onPress={() => this.setState({ itemSecur: !this.state.itemSecur })} />
                      <Body>
                        <Text>Security</Text>
                      </Body>
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.itemComms} onPress={() => this.setState({ itemComms: !this.state.itemComms })} />
                      <Body>
                        <Text>Communication</Text>
                      </Body>
                </ListItem>
              </Form>
          </Card>
          <Card style={styles.card}>
            <CardItem header>
              <H3 style={styles.header}>Preferences</H3>
            </CardItem>
            <Form>
              <Item stackedLabel>
              <Label>What are you willing to volunteer as?</Label>
              </Item>
              <ListItem>
                <CheckBox checked={this.state.itemCommsVol} onPress={() => this.setState({ itemCommsVol: !this.state.itemCommsVol })} />
                    <Body>
                      <Text>Communication</Text>
                    </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.itemSRVol} onPress={() => this.setState({ itemSRVol: !this.state.itemSRVol })} />
                    <Body>
                      <Text>Search & Rescue</Text>
                    </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.itemMedicVol} onPress={() => this.setState({ itemMedicVol: !this.state.itemMedicVol })} />
                    <Body>
                      <Text>Medical</Text>
                    </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.itemVTVol} onPress={() => this.setState({ itemVTVol: !this.state.itemVTVol })} />
                    <Body>
                      <Text>Vehicle Transport</Text>
                    </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.itemEngVol} onPress={() => this.setState({ itemEngVol: !this.state.itemEngVol })} />
                    <Body>
                      <Text>Engineer</Text>
                    </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.itemSecurVol} onPress={() => this.setState({ itemSecurVol: !this.state.itemSecurVol })} />
                    <Body>
                      <Text>Security & Safety</Text>
                    </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.itemSanitVol} onPress={() => this.setState({ itemSanitVol: !this.state.itemSanitVol })} />
                    <Body>
                      <Text>Sanitation & Hygiene</Text>
                    </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.itemMessVol} onPress={() => this.setState({ itemMessVol: !this.state.itemMessVol })} />
                    <Body>
                      <Text>Messing (food)</Text>
                    </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.itemEvacVol} onPress={() => this.setState({ itemEvacVol: !this.state.itemEvacVol })} />
                    <Body>
                      <Text>Evacuation Shelter</Text>
                    </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.itemTSCVol} onPress={() => this.setState({ itemTSCVol: !this.state.itemTSCVol })} />
                    <Body>
                      <Text>Traumatic Stress Counselor</Text>
                    </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.itemRGDVol} onPress={() => this.setState({ itemRGDVol: !this.state.itemRGDVol })} />
                    <Body>
                      <Text>Relief Goods Distribution</Text>
                    </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.itemFCVol} onPress={() => this.setState({ itemFCVol: !this.state.itemFCVol })} />
                    <Body>
                      <Text>Financing Coordination</Text>
                    </Body>
              </ListItem>
            </Form>
          </Card>
          <Button block style={styles.button} onPress={()=>this.addPerson()}>
            <Text>Next</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


export default AddHouseholdScreen;