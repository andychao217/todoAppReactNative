import React, { PureComponent } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { AppearanceProvider } from 'react-native-appearance';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import TodoApp from './components/todoApp';

import ThemeSwitcher from './components/settings/themeSwitcher';
import SettingHome from './components/settings/settingHome';
import LanguageSwitcher from './components/settings/languageSwitcher';

//设置页面导航
const SettingNavigator = createStackNavigator(
	{
		Setting: SettingHome,
        Theme: ThemeSwitcher,
        Language: LanguageSwitcher,
	},
	{
		initialRouteName: 'Setting',
	}
);

//配置页面地步tab导航栏
const TabNavigator = createBottomTabNavigator(
    {
        All: TodoApp,
        Active: TodoApp,
        Complete: TodoApp,
        Setting: SettingNavigator,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            //tab导航栏切换事件
            tabBarOnPress: (scene) =>
            {
                const routeName = navigation.state.routeName;
                AsyncStorage.setItem('type', routeName);
                navigation.navigate(navigation.state.routeName, {
                    routeName,
                });
            },
            //tab导航栏图标
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
        //tab导航栏样式
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
    };

    //获取todoList、colorScheme数据
    async getData() {
        const _this = this;
        try {
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