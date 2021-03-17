import React from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TodoButton = ({ onPress, complete, name, theme }) => {
	return (
		<TouchableHighlight
			onPress={onPress}
			style={styles.button}
			underlayColor="#efefef"
		>
			<MaterialIcons
				name={
					name === 'Delete' ? 'delete-outline' : 'check'
				}
				size={18}
				color={
					name === 'Delete' ?
						'red' : (complete ? 'green' : '#666')
				}
			/>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	button: {
		alignSelf: 'flex-end',
		padding: 7,
		marginRight: 5,
		borderWidth: 0,
		width: 32,
		height: 32,
	},
});

export default TodoButton;
