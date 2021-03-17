import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StyleSheet, Appearance, Switch, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Settings extends PureComponent {
	state = {
		colorScheme: 'dark',
	};

    toggleSwitch(value) {
        const colorScheme = value ? 'dark' : 'light';
        console.log(value);
		this.setState({
			colorScheme,
        });
        AsyncStorage.setItem('colorScheme', colorScheme);
        this.props.screenProps.getData();
        this.forceUpdate();
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
		// const colorScheme = Appearance.getColorScheme();
        const colorScheme = this.state.colorScheme;
        const switchStatus = this.state.colorScheme === 'dark' ? true : false;
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
                            Dark mode
                        </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={colorScheme !== 'dark' ? "#fff" : 'gray'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.toggleSwitch.bind(this)}
                            value={switchStatus}
                        />
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
        backgroundColor: 'lightgray'
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
    }
});

export default Settings;
