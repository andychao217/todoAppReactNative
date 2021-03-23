import React, { PureComponent } from 'react';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import TodoApp from './components/todoApp';

import ThemeSwitcher from './components/settings/themeSwitcher';
import SettingHome from './components/settings/settingHome';
import LanguageSwitcher from './components/settings/languageSwitcher';

import I18n from './components/languages';
import { Provider } from './AppContext';

// 设置页面导航
function SettingsStackScreen() {
    const SettingStack = createStackNavigator();
    return (
        <SettingStack.Navigator
            initialRouteName="Setting"
            screenOptions={{ gestureEnabled: true }}
        >
            <SettingStack.Screen
                name="Setting"
                component={SettingHome}
                options={{ title: I18n.t('setting') }}
            />
            <SettingStack.Screen
                name="Theme"
                component={ThemeSwitcher}
                options={{ title: I18n.t('theme') }}
            />
            <SettingStack.Screen
                name="Language"
                component={LanguageSwitcher}
                options={{ title: I18n.t('language') }}
            />
        </SettingStack.Navigator>
    );
}

// 配置页面地步tab导航栏
function BottomTabScreen() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="All"
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'lightgray',
            }}
            screenOptions={({ navigation, route }) => ({
                tabPress: (scene) =>
                {
                    console.log('tabPress');
                    const routeName = route.name;
                    AsyncStorage.setItem('type', routeName);
                    navigation.navigate(route.name);
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName, routeName = route.name;
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
            })}
        >
            <Tab.Screen
                name="All"
                component={TodoApp}
                options={{
                    tabBarLabel: I18n.t('all')
                }}
            />
            <Tab.Screen
                name="Active"
                component={TodoApp}
                options={{
                    tabBarLabel: I18n.t('active')
                }}
            />
            <Tab.Screen
                name="Complete"
                component={TodoApp}
                options={{
                    tabBarLabel: I18n.t('complete')
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingsStackScreen}
                options={{
                    tabBarLabel: I18n.t('setting')
                }}
            />
        </Tab.Navigator>
    );
}

export default class App extends PureComponent {
    state = {
        colorScheme: 'dark',
        langScheme: 'en',
    };

    //获取todoList、colorScheme数据
    async getData() {
        const _this = this;
        try {
            const colorScheme = await AsyncStorage.getItem('colorScheme');
            const langScheme = await AsyncStorage.getItem('langScheme');
            if (colorScheme) {
                _this.setState({
                    colorScheme,
                });
            }
            if (langScheme) {
                I18n.locale = langScheme;
                _this.setState({
                    langScheme,
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
            <Provider
                value={{
                    ...this.state,
                    getData: this.getData.bind(this),
                }}
            >
                <NavigationContainer
                    theme={
                        this.state.colorScheme === 'dark' ? DarkTheme : DefaultTheme
                    }
                >
                    <BottomTabScreen />
                </NavigationContainer>
            </Provider>
        );
    }
}