import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const SubmitButton = ({ submitTodo, disabled, theme }) => {
	return (
		<View style={styles.buttonContainer}>
			<TouchableHighlight
				onPress={submitTodo}
				style={[
					styles.button,
					theme !== 'dark' ? null : styles.darkButtonBg
				]}
				underlayColor="#efefef"
				disabled={disabled}
			>
				<Text
					style={
						theme !== 'dark' ?
							(disabled ? styles.submitTextDisabled : styles.submitText) :
							(disabled ? [styles.submitTextDisabled, styles.darkTextColorDisabled] : [styles.submitText, styles.darkTextColor])
					}
				>
					Submit
				</Text>
			</TouchableHighlight>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		alignItems: 'flex-end',
	},
	button: {
		height: 50,
		backgroundColor: '#fff',
		paddingLeft: 20,
		paddingRight: 20,
		width: 200,
		marginRight: 20,
		marginTop: 15,
		borderWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.1)',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	darkButtonBg: {
		backgroundColor: 'rgb(25,25,25)',
	},
	submitText: {
		color: '#666',
		fontWeight: '600',
	},
	darkTextColor: {
		color: 'whitesmoke',
	},
	submitTextDisabled: {
		color: '#b1b1b1',
		fontWeight: '600',
	},
	darkTextColorDisabled: {
		color: '#666',
	},
});

export default SubmitButton;
