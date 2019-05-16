import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Title, Content, Text, List, ListItem } from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './components/Main';
import HouseholdScreen from './components/Household';
import AddHouseholdScreen from './components/AddHousehold';
import AddHouseholdScreenII from './components/AddHouseholdII';
import AddHouseholdScreenAssets from './components/AddHouseholdAssets';
import EditHouseholdScreen from './components/EditHousehold';
import EditHouseholdAssetsScreen from './components/EditHouseholdAssets';
import AddPetScreen from './components/AddPet';
import AddPersonScreen from './components/AddPerson';
import AddPersonScreenII from './components/AddPersonII';
import AddPersonScreenQ from './components/AddPersonQ'
import AddPersonScreenSteward from './components/AddPersonSteward';
import PersonScreen from './components/Person';


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
		EditHousehold: EditHouseholdScreen,
		EditHouseholdAssets: EditHouseholdAssetsScreen,
		AddPerson: AddPersonScreen,
		AddPersonII: AddPersonScreenII,
		AddPersonQ: AddPersonScreenQ,
		AddPersonSteward: AddPersonScreenSteward,
		Person: PersonScreen,
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