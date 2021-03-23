import React, { PureComponent } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Switch,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import I18n from '../languages';
import * as RNLocalize from "react-native-localize";

import { AppContext } from '../../AppContext';

class LanguageSwitcher extends PureComponent
{
    static contextType = AppContext;

	state = {
        langScheme: 'zh',
        isAutoLang: false,
	};

    //开启关闭自动选择手机系统主题色
    toggleSwitch(value) {
		this.setState({
            isAutoLang: value,
        });
        if (value){
            const locales = RNLocalize.getLocales();
            const langScheme = locales[0]?.languageCode;
            I18n.locale = langScheme;
            this.setState({
                langScheme,
            });
            AsyncStorage.setItem('langScheme', langScheme);
        }
        AsyncStorage.setItem('isAutoLang', JSON.stringify(value));
        this.context.getData();
        if (value) {
            this.props.navigation.navigate('Setting');
        }
        // this.forceUpdate();
    }

    //手动选择主题
    manualSelectLanguage(theme) 
    {
        const langScheme = theme;
        this.setState({
            langScheme,
        });
        I18n.locale = langScheme;
        AsyncStorage.setItem('langScheme', langScheme);
        this.context.getData();
        this.props.navigation.navigate('Setting');
        // this.forceUpdate();
    }

	async getData() {
        const langScheme = await AsyncStorage.getItem('langScheme');
        const isAutoLang = JSON.parse(await AsyncStorage.getItem('isAutoLang'));
        this.setState({
            langScheme,
            isAutoLang,
        });
    }

	componentDidMount() {
        this.getData();
	}

    componentDidUpdate() {
        this.getData();
	}

	render() {
        const { langScheme, isAutoLang } = this.state;
        const { colorScheme } = this.context;
        const langSchemeList = [
            {
                title: '中文',
                name: 'zh',
            },
            {
                title: 'English',
                name: 'en',
            }
        ];
        const _this = this;
		return (
			<View
                style={[
                    styles.container,
                    colorScheme !== 'dark' ? null : styles.darkBackground,
                ]}
            >
                <StatusBar
					barStyle={
						colorScheme !== 'dark' ? 'dark-content' : 'light-content'
					}
				/>
				<ScrollView
					keyboardShouldPersistTaps="always"
					style={styles.content}
				>
                    <View style={[
                        styles.switchContainer,
                        colorScheme !== 'dark' ? null : styles.darkSwitchContainer,
                    ]}>
                        <Text style={[
                            styles.switchText,
                            colorScheme !== 'dark' ? null : styles.darkSwitchText,
                        ]}>
                            {I18n.t('automatic')}
                        </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={colorScheme !== 'dark' ? "#fff" : 'gray'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.toggleSwitch.bind(this)}
                            value={isAutoLang}
                        />
                    </View>
                    {/* 手动选择主题 */}
                    <View style={[
                        styles.checkListContainer,
                        isAutoLang ? styles.hideCheckListContainer : null,
                    ]}>
                        <Text style={[
                            styles.switchText,
                            colorScheme !== 'dark' ? null : styles.darkSwitchText,
                            {marginLeft: 10, marginBottom: 10}
                        ]}>
                            {I18n.t('manually')}
                        </Text>
                        {
                            //遍历生成主题列表
                            langSchemeList.map((theme) => {
                                const { name, title } = theme;
                                return (
                                    <TouchableOpacity
                                        onPress={_this.manualSelectLanguage.bind(_this, name)}
                                        underlayColor="#efefef"
                                        key={name}
                                    >
                                        <View style={[
                                            styles.checkContainer,
                                            colorScheme !== 'dark' ? null : styles.darkCheckContainer,
                                        ]}>
                                            <Text style={[
                                                styles.switchText,
                                                colorScheme !== 'dark' ? null : styles.darkSwitchText,
                                            ]}>
                                                {title}
                                            </Text>
                                            <MaterialIcons
                                                name={'check'}
                                                size={26}
                                                color={'green'}
                                                style={{
                                                    display: name === 'zh' ? (
                                                        langScheme !== 'zh' ? 'none' : 'flex'
                                                    ): (
                                                        langScheme !== 'zh' ? 'flex' : 'none'    
                                                    ),
                                                }}
                                            />
                                        </View>            
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	//整体布局
    container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
    },
    //暗色主题背景色
	darkBackground: {
		backgroundColor: 'rgb(37,33,32)',
	},
	content: {
		flex: 1,
		paddingTop: 0,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lightgray',
        marginBottom: 10,
    },
    darkSwitchContainer: {
        backgroundColor: 'rgb(37,37,37)', //暗色主题Switch背景色
    },
    switchText: {
        flex: 1,
        color: '#252525',
    },
    darkSwitchText: {
        color: '#ededed', //暗色主题Switch开关标题文字颜色
    },
    hideCheckListContainer: {
        display: 'none', //隐藏手动选择主题列表
    },
    //手动选择主题列表
    checkListContainer: {
        flexDirection: 'column', 
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lightgray',
    },
    darkCheckContainer: {
        backgroundColor: 'rgb(37,37,37)', //暗色主题手动选择主题列表背景色
    },
});

export default LanguageSwitcher;
