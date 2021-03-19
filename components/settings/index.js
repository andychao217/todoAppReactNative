import React, { PureComponent } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Appearance,
    Switch,
    StatusBar,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Settings extends PureComponent {
	state = {
        colorScheme: 'dark',
        isAutoTheme: false,
	};

    //开启关闭自动选择手机系统主题色
    toggleSwitch(value) {
        let colorScheme = this.state.colorScheme;
        if (value) {
            colorScheme = Appearance.getColorScheme();
        }
		this.setState({
            colorScheme,
            isAutoTheme: value,
        });
        AsyncStorage.setItem('colorScheme', colorScheme);
        this.props.screenProps.getData();
        this.forceUpdate();
    }

    //手动选择主题
    manualSelectTheme(theme) 
    {
        const colorScheme = theme;
        this.setState({
            colorScheme,
        });
        AsyncStorage.setItem('colorScheme', colorScheme);
        this.props.screenProps.getData();
        // this.forceUpdate();
    }

	async componentDidMount() {
        const colorScheme = await AsyncStorage.getItem('colorScheme');
        this.setState({
            colorScheme,
        });
	}

    async componentDidUpdate() {
        const colorScheme = await AsyncStorage.getItem('colorScheme');
        this.setState({
            colorScheme,
        });
    }

	render() {
        const { colorScheme, isAutoTheme } = this.state;
        const colorSchemeList = [
            {
                title: 'Dark mode',
                name: 'dark',
            },
            {
                title: 'Light mode',
                name: 'light',
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
                <View
                    style={styles.headerContainer}
                >
                    <Text style={styles.headerTitleText}>
                        Setting
                    </Text>
                </View>
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
                            Automatic
                        </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={colorScheme !== 'dark' ? "#fff" : 'gray'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.toggleSwitch.bind(this)}
                            value={isAutoTheme}
                        />
                    </View>
                    {/* 手动选择主题 */}
                    <View style={[
                        styles.checkListContainer,
                        isAutoTheme ? styles.hideCheckListContainer : null,
                    ]}>
                        <Text style={[
                            styles.switchText,
                            colorScheme !== 'dark' ? null : styles.darkSwitchText,
                            {marginLeft: 10, marginBottom: 10}
                        ]}>
                            Select Manually
                        </Text>
                        {
                            //遍历生成主题列表
                            colorSchemeList.map((theme) => {
                                const { name, title } = theme;
                                return (
                                   <TouchableOpacity
                                        onPress={_this.manualSelectTheme.bind(_this, name)}
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
                                                    display: name === 'dark' ? (
                                                        colorScheme !== 'dark' ? 'none' : 'flex'
                                                    ): (
                                                        colorScheme !== 'dark' ? 'flex' : 'none'    
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
    //顶部页面标题布局
    headerContainer: {
        padding: 10,
        height: 50,
        marginTop: 30,
    },
    //顶部页面标题文字
    headerTitleText: {
        fontSize: 24,
        textAlign: 'center',
        color: 'dimgray',
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

export default Settings;
