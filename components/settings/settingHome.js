import React, { PureComponent } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Text
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../languages';
import ImagePicker from './ImagePicker';

import { AppContext } from '../../AppContext';

export default class SettingHome extends PureComponent
{
	static contextType = AppContext;

	state = {
		values: {
			theme: '',
			language: '',
		},
	};

	async getData(){
		const colorScheme = await AsyncStorage.getItem('colorScheme');
		const isAutoTheme = JSON.parse(await AsyncStorage.getItem('isAutoTheme'));
		const langScheme = await AsyncStorage.getItem('langScheme');
		const isAutoLang = JSON.parse(await AsyncStorage.getItem('isAutoLang'));
		let values = {
			theme: '',
			language: '',
		}
		if (isAutoTheme) {
			values.theme = I18n.t('automatic');
		} else {
			values.theme = colorScheme === 'dark' ? I18n.t('darkMode') : I18n.t('lightMode');
		}
		if (isAutoLang) {
			values.language = I18n.t('automatic')
		} else {
			values.language = langScheme === 'en' ? 'English' : '中文';
		}
		this.setState({
			values
		});
	}

	componentDidMount() {
		this.getData();
	}

	componentDidUpdate() {
		this.getData();
	}
	
	render() {
		const { navigation } = this.props;
		const { colorScheme, langScheme } = this.context;
		const _this = this;

		I18n.locale = langScheme;
		const settingList = [
			{
				name: 'Theme',
				title: I18n.t('theme'),
				value: _this.state.values?.theme
			},
			{
				name: 'Language',
				title: I18n.t('language'),
				value: _this.state.values?.language
			},
		];
		return (
			<ScrollView
				keyboardShouldPersistTaps="always"
				style={styles.container}
			>
				{
					settingList.map((setting) => {
						const { name, title, value } = setting;
						return (
							<TouchableOpacity
								onPress={() => navigation.navigate(name)}
								underlayColor={'#efefef'}
								key={name}
							>
								<View style={[
									styles.checkContainer,
									colorScheme !== 'dark' ? null : styles.darkCheckContainer,
								]}>
									<Text style={[
										styles.switchText,
										colorScheme !== 'dark' ? null : styles.darkTextColor,
									]}>
										{title}
									</Text>
									<View style={{flexDirection: 'row',alignItems: 'center'}}>
										<Text style={[
											styles.valueText,
											colorScheme !== 'dark' ? null : styles.darkTextColor,
										]}>
											{value}
										</Text>
										<MaterialIcons
											name={'arrow-forward-ios'}
											size={26}
											color={'#81b0ff'}
										/>
									</View>
								</View>
							</TouchableOpacity>
						);
					})
				}
				<ImagePicker {..._this.props} />
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
    switchText: {
        flex: 1,
        color: '#252525',
    },
    darkTextColor: {
        color: '#ededed', //暗色主题Switch开关标题文字颜色
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
		backgroundColor: 'lightgray',
		marginBottom: 1,
    },
    darkCheckContainer: {
		backgroundColor: 'rgb(37,37,37)', //暗色主题手动选择主题列表背景色
	},
	//设置项当前值文字颜色
	valueText: {
		color: '#252525',
	},
});
