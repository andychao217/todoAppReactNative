import React, {PureComponent} from 'react';
import { View } from 'react-native';
import Todo from './todo';

function getListByType(list = [], type = 'All') {
	if (type === 'Active') {
		return list.filter(r => !r.complete);
	} else if (type === 'Complete') {
		return list.filter(r => r.complete);
	} else {
		return list;
	}
}

export default class TodoList extends PureComponent{	
	render() {
		const {
			todoList,
			deleteTodo,
			toggleComplete,
			type,
			theme,
		} = this.props;
		
		//根据页面类型，遍历生成todo项目列表
		let list = getListByType(todoList, type);
		if (list && list.length) {
			list = list.map((todo, i) => {
				return (
					<Todo
						key={todo.todoIndex}
						todo={todo}
						deleteTodo={deleteTodo}
						toggleComplete={toggleComplete}
						theme={theme}
					/>
				);
			});
		}

		return <View>{list}</View>;
	}
}
