import React,  { PureComponent } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import todoApp from './todoApp';

let todoIndex = 0;
const TabNavigator = createBottomTabNavigator(
    {
        All: todoApp,
        Active: todoApp,
        Complete: todoApp
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarOnPress: (scene) => {
                const routeName = navigation.state.routeName;
                AsyncStorage.setItem('type', routeName);
                navigation.navigate(navigation.state.routeName, {
                    routeName,
                });
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'lightgray',
        },
    }
);

const AppContainer = createAppContainer(TabNavigator);
	
export default class App extends PureComponent{
    render() {
		return (
			<AppContainer />
        )
    }
}