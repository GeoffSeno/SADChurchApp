import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Title, Content, Text, List, ListItem } from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './components/Main';
import HouseholdScreen from './components/Household';
import AddHouseholdScreen from './components/AddHousehold';
import AddHouseholdScreenII from './components/AddHouseholdII';
import AddHouseholdScreenAssets from './components/AddHouseholdAssets';
import AddPetScreen from './components/AddPet';
import AddPersonScreen from './components/AddPerson';
import AddPersonScreenII from './components/AddPersonII';
import AddPersonScreenSteward from './components/AddPersonSteward';

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppStackNavigator = createStackNavigator(
	{
		Home: Main,
		Household: HouseholdScreen,
		AddHousehold: AddHouseholdScreen,
		AddHouseholdII: AddHouseholdScreenII,
		AddHouseholdAssets: AddHouseholdScreenAssets,
		AddPet: AddPetScreen,
		AddPerson: AddPersonScreen,
		AddPersonII: AddPersonScreenII,
		AddPersonSteward: AddPersonScreenSteward
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#16006a'
			},
			headerTintColor: '#fff'
		}
	}
);

const AppContainer = createAppContainer(AppStackNavigator);