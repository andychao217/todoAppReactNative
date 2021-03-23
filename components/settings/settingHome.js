import React, { PureComponent } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Text
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import I18n from '../languages';

import { AppContext } from '../../AppContext';

export default class SettingHome extends PureComponent
{
	static contextType = AppContext;

	render() {
		const { navigation } = this.props;
		const { colorScheme, langScheme } = this.context;
		console.log('locale', langScheme);
		I18n.locale = langScheme;
		const settingList = [
			{ name: 'Theme', title: I18n.t('theme') },
			{ name: 'Language', title: I18n.t('language') },
		];
		return (
			<ScrollView
				keyboardShouldPersistTaps="always"
				style={styles.container}
			>
				{
					settingList.map((setting) => {
						const { name, title } = setting;
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
										colorScheme !== 'dark' ? null : styles.darkSwitchText,
									]}>
										{title}
									</Text>
									<MaterialIcons
										name={'arrow-forward-ios'}
										size={26}
										color={'#81b0ff'}
									/>
								</View>
							</TouchableOpacity>
						);
					})
				}
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
    darkSwitchText: {
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
});
