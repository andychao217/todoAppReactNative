import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import AsyncStorage from '@react-native-community/async-storage';
import todoApp from './todoApp';

let todoListLength = 0;
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
                getData();
            },
            // tabBarIcon: ({ focused, color, size }) => {
            //     // let iconName;
            //     // if (route.name === 'Home') {
            //     // iconName = focused
            //     //     ? 'ios-information-circle'
            //     //     : 'ios-information-circle-outline';
            //     // } else if (route.name === 'Settings') {
            //     // iconName = focused ? 'ios-list-box' : 'ios-list';
            //     // }
            //     // You can return any component that you like here!
            //     return <Text>{todoListLength}</Text>;
            // },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'lightgray',
        },
    }
);

const AppContainer = createAppContainer(TabNavigator);
	
async function getData(){
    try {
        let todoList = await AsyncStorage.getItem('todoList');
        todoList = JSON.parse(todoList);
        if (todoList && todoList.length) {
            todoListLength = todoList.length;
        }
    } catch (e) {
        console.log('Error from AsyncStorage: ', e);
    }
}

export default () =>{
    useEffect(() =>  {
        getData();
    }, []);
    const theme = useColorScheme();
    return (
        <AppearanceProvider>
            <AppContainer theme={theme} />
        </AppearanceProvider>
    );
}