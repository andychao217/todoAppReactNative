import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TodoButton from './TodoButton';

// /todo项目
const Todo = ({ todo, deleteTodo, toggleComplete, theme }) => {
	return (
		<View
			style={[
				styles.todoContainer,
				theme !== 'dark' ? null : styles.todoDarkColor,
			]}
		>
			<Text
				style={[
					styles.todoText,
					theme !== 'dark' ? null : styles.darkTodoTextColor,
				]}
				numberOfLines={1} //文字显示行数
				ellipsizeMode="tail" //文字超长时显示类型...
			>
				{/* todo项目文字内容 */}
				{todo.title}
			</Text>
			<View style={styles.buttons}>
				{/* todo项目完成控制按钮 */}
				<TodoButton
					name="Done"
					complete={todo.complete}
					onPress={() => toggleComplete(todo.todoIndex)}
					theme={theme}
				/>
				{/* todo项目删除控制按钮 */}
				<TodoButton
					name="Delete"
					onPress={() => deleteTodo(todo.todoIndex)}
					theme={theme}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	// /todo项目布局
	todoContainer: {
		marginRight: 20,
		marginLeft: 20,
		backgroundColor: 'rgba(255,255,255,0.5)',
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderColor: 'rgba(255,255,255,0.5)',
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
	//暗色主题todo项目背景、边框颜色
	todoDarkColor: {
		backgroundColor: 'rgba(53,56,59,0.7)',
		borderColor: 'rgba(25,25,25,0.7)',
	},
	todoText: {
		fontSize: 17,
		width: 280,
		color: 'rgb(0,0,0)',
	},
	//暗色主题todo项目文字颜色
	darkTodoTextColor: {
		color: 'rgba(255,255,255,0.7)',
	},
	buttons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
});

export default Todo;
