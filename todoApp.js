import React, { PureComponent } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Heading from './components/heading';
import TextInput from './components/textInput';
import SubmitButton from './components/SubmitButton';
import TodoList from './components/todoList';
import TabBar from './components/tabBar';

let todoIndex = 0;
class todoApp extends PureComponent {
	state = {
		inputValue: '',
		todoList: [],
		type: 'All',
	};

	inputChange(value) {
		this.setState({
			inputValue: value,
		});
	}
	submitTodo() {
		if (this.state.inputValue.match(/^\s*$/)) {
			//判断inputValue是否为空或者仅包含空格
			return;
		}
		const todo = {
			title: this.state.inputValue,
			todoIndex,
			complete: false,
		};
		todoIndex++;
		const todoList = [...this.state.todoList, todo];
		this.setState({
			todoList,
			inputValue: '',
		});
	}

	deleteTodo(index) {
		let { todoList } = this.state;
		todoList = todoList.filter((todo) => todo.todoIndex !== index);
		this.setState({ todoList });
	}

	toggleComplete(index) {
		let { todoList } = this.state;
		todoList.forEach((todo) => {
			if (todo.todoIndex === index) {
				todo.complete = !todo.complete;
			}
		});
		this.setState({ todoList });
		this.forceUpdate();
	}

	setType(type) {
		this.setState({ type });
	}

	render() {
		const { inputValue, todoList, type } = this.state;
		return (
			<View style={styles.container}>
				<ScrollView
					keyboardShouldPersistTaps="always"
					style={styles.content}
				>
					<Heading />
					<TextInput
						inputValue={inputValue}
						inputChange={(text) => this.inputChange(text)}
					/>
					<TodoList
						todoList={todoList}
						deleteTodo={this.deleteTodo.bind(this)}
						toggleComplete={this.toggleComplete.bind(this)}
						type={type}
					/>
					<SubmitButton
						submitTodo={this.submitTodo.bind(this)}
						disabled={!this.state.inputValue}
					/>
				</ScrollView>
				<TabBar
					todoList={todoList}
					setType={this.setType.bind(this)}
					type={type}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	content: {
		flex: 1,
		paddingTop: 60,
	},
});

export default todoApp;
