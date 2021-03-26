import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// /todo项目
const Todo = ({ todo, theme }) => {
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
					!todo.complete ? styles.activeText : null,
				]}
				numberOfLines={1} //文字显示行数
				ellipsizeMode="tail" //文字超长时显示类型...
			>
				{/* todo项目文字内容 */}
				{todo.title}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	// /todo项目布局
	todoContainer: {
		marginRight: 20,
		marginLeft: 20,
		backgroundColor: 'rgba(255,255,255,1)',
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderColor: 'rgba(255,255,255,1)',
		paddingLeft: 14,
		paddingTop: 12,
		paddingBottom: 12,
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
		backgroundColor: 'rgba(53,56,59,1)',
		borderColor: 'rgba(25,25,25,1)',
	},
	todoText: {
		fontSize: 17,
		width: 350,
		color: 'rgb(0,0,0)',
	},
	//暗色主题todo项目文字颜色
	darkTodoTextColor: {
		color: 'rgba(255,255,255,1)',
	},
	//进行中任务文字颜色
	activeText: {
		color: 'limegreen'
	}
});

export default Todo;
