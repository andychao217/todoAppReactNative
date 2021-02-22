import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Heading = () => {
	return (
		<View style={styles.header}>
			<Text style={styles.headerText}> {'todo'} </Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		marginTop: 80,
	},
	headerText: {
		textAlign: 'center',
		fontSize: 70,
		color: 'rgba(175, 47, 47, 0.25)',
		fontWeight: '200',
	},
});

export default Heading;
