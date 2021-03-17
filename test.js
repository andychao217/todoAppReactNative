import React, { PureComponent } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import TodoApp from './todoApp';
import Settings from './components/setting';

const TabNavigator = createBottomTabNavigator(
    {
        All: TodoApp,
        Active: TodoApp,
        Complete: TodoApp,
        Setting: Settings,
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
            tabBarIcon: (props) =>
            {
                //console.log("props", props);
                let iconName, focused = props.focused, routeName = navigation.state.routeName;
                if (routeName === 'All') {
                    iconName = 'dehaze';
                } else if (routeName === 'Active') {
                    iconName = 'check';
                } else if (routeName === 'Complete') {
                    iconName = 'circle';
                } else {
                    iconName = 'settings';
                }
                // You can return any component that you like here!
                return (
                    <MaterialIcons
                        name={iconName}
                        size={26}
                        color={focused ? 'tomato' : 'lightgray'}
                    />
                );
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'lightgray',
        },
    }
);

const AppContainer = createAppContainer(TabNavigator);

export default class App extends PureComponent {
    state = {
        colorScheme: 'dark',
        todoListLength: 0,
    };

    async getData() {
        const _this = this;
        try {
            let todoList = await AsyncStorage.getItem('todoList');
            todoList = JSON.parse(todoList);
            if (todoList && todoList.length) {
                todoListLength = todoList.length;
                _this.setState({
                    todoListLength,
                });
            }
            const colorScheme = await AsyncStorage.getItem('colorScheme');
            if (colorScheme) {
                _this.setState({
                    colorScheme,
                });
            }
        } catch (e) {
            console.log('Error from AsyncStorage: ', e);
        }
    }

    componentDidMount() {
		this.getData();
    }

    render() {
        return (
            <AppearanceProvider>
                <AppContainer
                    theme={this.state.colorScheme}
                    screenProps={{ getData: this.getData.bind(this) }}
                />
            </AppearanceProvider>
        );
    }
}