import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Input = ({ inputValue, inputChange, theme }) => {
	return (
		<View style={styles.inputContainer}>
			<TextInput
				value={inputValue}
				onChangeText={inputChange}
				style={[
					styles.input,
					theme !== 'dark' ? null : styles.darkBgColor,
				]}
				placeholder="What needs to be done ?"
				placeholderTextColor={theme !== 'dark' ? '#CACACA' : 'rgb(149,149,149)'}
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
		backgroundColor: '#fff',
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 5,
	},
	darkBgColor: {
		backgroundColor: 'rgb(47,54,61)',
	}
});

export default Input;
