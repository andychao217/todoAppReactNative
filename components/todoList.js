import React from 'react';
import { View } from 'react-native';
import Todo from './todo';
const TodoList = ({ todoList, deleteTodo, toggleComplete, type }) => {
	const getVisibleTodoList = (list, type) => {
		switch (type) {
			case 'All':
				return list;
			case 'Complete':
				return list.filter((t) => t.complete);
			case 'Active':
				return list.filter((t) => !t.complete);
		}
	};
	todoList = getVisibleTodoList(todoList, type);
	todoList = todoList.map((todo, i) => {
		return (
			<Todo
				key={todo.todoIndex}
				todo={todo}
				deleteTodo={deleteTodo}
				toggleComplete={toggleComplete}
			/>
		);
	});

	return <View>{todoList}</View>;
};

export default TodoList;
