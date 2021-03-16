import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Heading = ({ theme }) =>{
	return (
		<View style={styles.header}>
			<Text
				style={[
					styles.headerText,
					theme !== 'dark' ? null : styles.darkTextColor,
				]}
			>
				{'todo'}
			</Text>
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
	darkTextColor: {
		color: 'rgba(241,73,94, 1.0)',
	},
});

export default Heading;
