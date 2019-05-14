import React, { Component } from 'react';
import { Container, H3, Button, Icon, Content, Text, CardItem, Card, Form, Item, Input, Label, Picker } from 'native-base';
import { StyleSheet } from 'react-native';

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

class AddHouseholdScreenII extends Component {
  static navigationOptions = {
    title: 'Add Household',
  };

    constructor(props) {
    super(props);
    this.state = {
      equip: "1",
      shelter: "1",
      evac: "1",
    };
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

  nextPage(){
    var addData = this.props.navigation.getParam('addData');
    addData.equip = this.state.equip; 
    addData.shelter = this.state.shelter;
    addData.evac = this.state.evac;
    this.props.navigation.navigate('AddHouseholdAssets', {addData: addData});
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
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
                  <Picker.Item label="Yes" value="1" />
                  <Picker.Item label="No" value="0" />
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
                  <Picker.Item label="Yes" value="1" />
                  <Picker.Item label="No" value="0" />
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
                  <Picker.Item label="Yes" value="1" />
                  <Picker.Item label="No" value="0" />
                </Picker>
                </Item>
              </Form>
          </Card>
          <Button block style={styles.button} onPress={()=>this.nextPage()}>
            <Text>Next Step</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


export default AddHouseholdScreenII;
