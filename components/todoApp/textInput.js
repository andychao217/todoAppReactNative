import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import I18n from '../languages';

// /todo项目文字输入框
const Input = ({ inputValue, inputChange, theme, langScheme }) => {
	I18n.locale = langScheme;
	return (
		<View style={styles.inputContainer}>
			<TextInput
				value={inputValue}
				onChangeText={inputChange}
				style={[
					styles.input,
					theme !== 'dark' ? null : styles.darkBgColor,
				]}
				placeholder={I18n.t('todoPlaceholder')}
				placeholderTextColor={theme !== 'dark' ? 'rgba(0,0,0,0.7)' : 'rgb(149,149,149)'}
				selectionColor="orangered"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		marginLeft: 20,
		marginRight: 20,
		shadowOpacity: 0.2,
		shadowRadius: 3,
		shadowColor: '#000',
		shadowOffset: {
			width: 2,
			height: 2,
		},
	},
	input: {
		height: 60,
		backgroundColor: 'rgba(255,255,255,0.5)',
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 5,
	},
	//暗色主题输入框背景色
	darkBgColor: {
		backgroundColor: 'rgba(47,54,61, 0.7)',
	}
});

export default Input;
