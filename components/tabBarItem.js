import React from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';

const TabBarItem = ({ disabled, border, title, selected, setType, type }) => {
	return (
		<TouchableHighlight
			onPress={setType}
			underlayColor="#efefef"
			style={[
				styles.item,
				selected ? styles.selected : null,
				border ? styles.boarder : null,
				type === title ? styles.selected : null,
				disabled ? styles.disabled : null,
			]}
			disabled={disabled}
		>
			<Text
				style={[styles.itemText, type === title ? styles.bold : null]}
			>
				{title}
			</Text>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	item: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	border: {
		borderLeftWidth: 1,
		borderLeftColor: '#ddd',
	},
	itemText: {
		color: '#777',
		fontSize: 16,
	},
	selected: {
		backgroundColor: '#fff',
	},
	bold: {
		fontWeight: 'bold',
	},
	disabled: {
		backgroundColor: 'lightgray',
		color: '#fff',
	},
});

export default TabBarItem;
