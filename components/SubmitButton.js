import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const SubmitButton = ({ submitTodo, disabled }) => {
	return (
		<View style={styles.buttonContainer}>
			<TouchableHighlight
				onPress={submitTodo}
				style={styles.button}
				underlayColor="#efefef"
				disabled={disabled}
			>
				<Text
					style={
						disabled ? styles.submitTextDisabled : styles.submitText
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
	},
	submitText: {
		color: '#666',
		fontWeight: '600',
	},
	submitTextDisabled: {
		color: '#b1b1b1',
		fontWeight: '600',
	},
});

export default SubmitButton;
