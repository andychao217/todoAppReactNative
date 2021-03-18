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

    manualSelectTheme(theme)
    {
        console.log('theme', theme)
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
                        <TouchableHighlight
                            onPress={this.manualSelectTheme.bind(this, 'dark')}
                            underlayColor="#efefef"
                        >
                             <View style={[
                                styles.checkContainer,
                                colorScheme !== 'dark' ? null : styles.darkCheckContainer,
                            ]}>
                                <Text style={[
                                    styles.switchText,
                                    colorScheme !== 'dark' ? null : styles.darkSwitchText,
                                ]}>
                                    Dark mode
                                </Text>
                                <MaterialIcons
                                    name={'check'}
                                    size={26}
                                    color={'green'}
                                    style={{
                                        display: colorScheme !== 'dark' ? 'none' : 'flex',
                                    }}
                                />
                            </View>               
                        </TouchableHighlight>
                       <TouchableHighlight
                            onPress={this.manualSelectTheme.bind(this, 'light')}
                            underlayColor="#efefef"
                        >
                            <View style={[
                                styles.checkContainer,
                                colorScheme !== 'dark' ? null : styles.darkCheckContainer,
                            ]}>
                                <Text style={[
                                    styles.switchText,
                                    colorScheme !== 'dark' ? null : styles.darkSwitchText,
                                ]}>
                                    Light mode
                                </Text>
                                <MaterialIcons
                                    name={'check'}
                                    size={26}
                                    color={'green'}
                                    style={{
                                        display: colorScheme !== 'dark' ? 'flex' : 'none',
                                    }}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	darkBackground: {
		backgroundColor: 'rgb(37,33,32)',
	},
	content: {
		flex: 1,
		paddingTop: 0,
    },
    headerContainer: {
        padding: 10,
        height: 50,
        marginTop: 30,
    },
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
        backgroundColor: 'rgb(37,37,37)',
    },
    switchText: {
        flex: 1,
        color: '#252525',
    },
    darkSwitchText: {
        color: '#ededed',
    },
    hideCheckListContainer: {
        display: 'none',
    },
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
        backgroundColor: 'rgb(37,37,37)',
    },
});

export default Settings;
