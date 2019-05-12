import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Text, List, ListItem } from 'native-base';


class HouseholdScreen extends Component {
  static navigationOptions = {
    title: 'Mignolet Household',
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Body>
                <Text>John Mignolet</Text>
                <Text note numberOfLines={1}>Father</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Jane Mignolet</Text>
                <Text note numberOfLines={1}>Mother</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Joe Mignolet</Text>
                <Text note numberOfLines={1}>Child</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default HouseholdScreen;
