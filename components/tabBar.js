import React from 'react';
import { View, StyleSheet } from 'react-native';
import TabBarItem from './tabBarItem';

const TabBar = ({ todoList, setType, type }) => {
	return (
		<View style={styles.container}>
			<TabBarItem
				todoList={todoList}
				type={type}
				title="All"
				disabled={false}
				setType={() => setType('All')}
			/>
			<TabBarItem
				disabled={todoList.length ? false : true}
				type={type}
				title="Active"
				border
				setType={() => setType('Active')}
			/>
			<TabBarItem
				disabled={todoList.length ? false : true}
				todoList={todoList}
				type={type}
				title="Complete"
				border
				setType={() => setType('Complete')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 70,
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: '#ddd',
	},
});

export default TabBar;
