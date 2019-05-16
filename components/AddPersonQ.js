import React, { Component } from 'react';
import { Container, H3, Button, Icon, Content, Text, CardItem, Card, Form, Item, Input, Label, Picker } from 'native-base';
import { StyleSheet, Alert } from 'react-native';

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
  constructor(props) {
    super(props);
    this.state = {
      stewardpage: "1",
    };
  }

  setStewardpage(value: string) {
    this.setState({
      stewardpage: value
    });
  }

  static navigationOptions = {
    title: 'Add Household',
  };

  nextPage(){
    var sp = this.state.stewardpage;

    if (sp == "1")
      {
        this.props.navigation.navigate('AddPersonSteward');
      }
    else
    {
      this.props.navigation.navigate('Home');
    }
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
                <Item>
                <Text>{"\n"}Would you like to be a steward?{"\n"}</Text>   
                </Item>
                <Item>    
                <Picker
                  mode="dropdown"
                  headerStyle={{ backgroundColor: "#16006a" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  selectedValue={this.state.stewardpage}
                  onValueChange={this.setStewardpage.bind(this)}
                  >
                  <Picker.Item label="Yes" value="1" />
                  <Picker.Item label="No" value="0" />
                  </Picker>
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