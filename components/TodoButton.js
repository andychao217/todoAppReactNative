import React from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';

const TodoButton = ({ onPress, complete, name }) => {
	return (
		<TouchableHighlight
			onPress={onPress}
			style={styles.button}
			underlayColor="#efefef"
		>
			<Text
				style={[
					styles.text,
					complete ? styles.complete : null,
					name === 'Delete' ? styles.deleteButton : null,
				]}
			>
				
			</Text>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	button: {
		alignSelf: 'flex-end',
		padding: 7,
		marginRight: 5,
		borderWidth: 1,
		borderColor: '#ededed',
		borderRadius: 32,
		width: 32,
		height: 32,
	},
	text: {
		color: '#666',
	},
	complete: {
		color: 'green',
		fontWeight: 'bold',
	},
	deleteButton: {
		color: 'rgba(175, 47, 47, 1)',
	},
});

export default TodoButton;
