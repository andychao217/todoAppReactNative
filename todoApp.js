import React, { PureComponent } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Heading from './components/heading';
import TextInput from './components/textInput';
import SubmitButton from './components/SubmitButton';
import TodoList from './components/todoList';

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
		let todoIndex = Math.floor((Math.random()*10000)+1) + new Date();
		const todo = {
			title: this.state.inputValue,
			todoIndex,
			complete: false,
		};
		const todoList = [...this.state.todoList, todo];
		this.setState({
			todoList,
			inputValue: '',
		});
		AsyncStorage.setItem('todoList', JSON.stringify(todoList));
	}

	deleteTodo(index) {
		let { todoList } = this.state;
		todoList = todoList.filter((todo) => todo.todoIndex !== index);
		this.setState({ todoList });
		AsyncStorage.setItem('todoList', JSON.stringify(todoList));
		this.forceUpdate();
	}

	toggleComplete(index) {
		let { todoList } = this.state;
		todoList.forEach((todo) => {
			if (todo.todoIndex === index) {
				todo.complete = !todo.complete;
			}
		});
		this.setState({ todoList });
		AsyncStorage.setItem('todoList', JSON.stringify(todoList));
		this.forceUpdate();
	}

	setType(type = 'All') {
		this.setState({ type });
		this.forceUpdate();
	}

	async componentDidMount() {
		const { navigation, screenProps } = this.props;
		const _this = this;

		async function getData(){
			try {
				let todoList = await AsyncStorage.getItem('todoList');
				todoList = JSON.parse(todoList);
				if (todoList && todoList.length) {
					_this.setState({ todoList });
				}
				let type = await AsyncStorage.getItem('type');
				if (type) {
					_this.setType(type);
				}
			} catch (e) {
				console.log('Error from AsyncStorage: ', e);
			}
		}
		
		getData();
		
		const didFocusSubscription = navigation.addListener(
			'didFocus',
			payload => {
				getData();
			}
		);
		
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
						disabled={!inputValue}
					/>
				</ScrollView>
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
