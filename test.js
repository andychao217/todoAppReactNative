import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import todoApp from './todoApp';

const TabNavigator = createBottomTabNavigator(
    {
        All: todoApp,
        Active: todoApp,
        Complete: todoApp
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarOnPress: (scene,jumpToIndex) => {
                console.log(scene); 
                navigation.navigate(scene.state.routeName)
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);

export default createAppContainer(TabNavigator);