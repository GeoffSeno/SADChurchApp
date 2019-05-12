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
      equip: "yes",
      shelter: "yes",
      evac: "yes",
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

  render() {
    const name= this.props.navigation.getParam('name');
    const address= this.props.navigation.getParam('address');
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
                  <Picker.Item label="Yes" value="yes" />
                  <Picker.Item label="No" value="no" />
                </Picker>
                </Item>
                <Item>
                  <Text>{"\n"}Are you willing to take in anyone hurt?{"\n"}</Text>
                  <Text>{"\n"}{name}, {address}</Text>
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
                  <Picker.Item label="Yes" value="yes" />
                  <Picker.Item label="No" value="no" />
                </Picker>
                </Item>
                <Item>
                  <Text>Would you allow your family to evacuate to your neighbor or team leader?{"\n"}</Text>
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
                  <Picker.Item label="Yes" value="yes" />
                  <Picker.Item label="No" value="no" />
                </Picker>
                </Item>
              </Form>
          </Card>
          <Button block style={styles.button} onPress={()=>this.props.navigation.navigate('AddHouseholdAssets', {name: name, address: address, equip: this.state.equip, shelter: this.state.shelter, evac: this.state.evac })}>
            <Text>Next Step</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


export default AddHouseholdScreenII;
