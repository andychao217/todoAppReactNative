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

import I18n from './components/languages';

//设置页面导航
const SettingNavigator = createStackNavigator(
	{
        Setting: {
            screen: SettingHome,
            navigationOptions: {
                headerTitle: I18n.t('setting'),
            }
        },
        Theme: {
            screen: ThemeSwitcher,
            navigationOptions: {
                headerTitle: I18n.t('theme'),
            }
        },
        Language: {
            screen: LanguageSwitcher,
            navigationOptions: {
                headerTitle: I18n.t('language'),
            }
        },
	},
	{
        initialRouteName: 'Setting',
	}
);

//配置页面地步tab导航栏
const TabNavigator = createBottomTabNavigator(
    {
        All: {
            screen: TodoApp,
            navigationOptions: {
                title: I18n.t('all'),
            }
        },
        Active: {
            screen: TodoApp,
            navigationOptions: {
                title: I18n.t('active'),
            }
        },
        Complete: {
            screen: TodoApp,
            navigationOptions: {
                title: I18n.t('complete'),
            }
        },
        Setting: {
            screen: SettingNavigator,
            navigationOptions: {
                title: I18n.t('setting'),
            }
        },
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
        title: 'dfa',
    }
);

const AppContainer = createAppContainer(TabNavigator);

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
            <AppearanceProvider>
                <AppContainer
                    theme={this.state.colorScheme}
                    screenProps={{
                        getData: this.getData.bind(this),
                        colorScheme: this.state.colorScheme,
                        langScheme: this.state.langScheme,
                    }}
                />
            </AppearanceProvider>
        );
    }
}