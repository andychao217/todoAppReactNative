import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TodoButton from './TodoButton';

const Todo = ({ todo, deleteTodo, toggleComplete }) => {
	return (
		<View style={styles.todoContainer}>
			<Text
				style={styles.todoText}
				numberOfLines={1}
				ellipsizeMode="tail"
			>
				{todo.title}
			</Text>
			<View style={styles.buttons}>
				<TodoButton
					name="Done"
					complete={todo.complete}
					onPress={() => toggleComplete(todo.todoIndex)}
				/>
				<TodoButton
					name="Delete"
					onPress={() => deleteTodo(todo.todoIndex)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	todoContainer: {
		marginRight: 20,
		marginLeft: 20,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderColor: '#ededed',
		paddingLeft: 14,
		paddingTop: 7,
		paddingBottom: 7,
		shadowOpacity: 0.2,
		shadowRadius: 3,
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 2 },
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5,
		marginTop: 3,
	},
	todoText: {
		fontSize: 17,
		width: 280,
	},
	buttons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
});

export default Todo;
