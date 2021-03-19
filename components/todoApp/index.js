import React, { PureComponent } from 'react';
import { View, ScrollView, StyleSheet, Appearance, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Heading from './heading';
import TextInput from './textInput';
import SubmitButton from './SubmitButton';
import TodoList from './todoList';

class TodoApp extends PureComponent {
	state = {
		inputValue: '',
		todoList: [],
		type: 'All',
		colorScheme: 'dark',
	};

	//监听input框输入事件
	inputChange(value) {
		this.setState({
			inputValue: value,
		});
	}

	//添加新todo项目
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

	//删除todo项目
	deleteTodo(index) {
		let { todoList } = this.state;
		todoList = todoList.filter((todo) => todo.todoIndex !== index);
		this.setState({ todoList });
		AsyncStorage.setItem('todoList', JSON.stringify(todoList));
		this.forceUpdate();
	}

	//标记是否完成todo项目
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

	//切换页面类型全部、已完成、未完成
	setType(type = 'All') {
		this.setState({ type });
		this.forceUpdate();
	}

	//获取todoList数据，主题配色类型
	async getData() {
		const _this = this;
		try {
			let todoList = await AsyncStorage.getItem('todoList');
			todoList = JSON.parse(todoList);
			if (todoList && todoList.length) {
				_this.setState({ todoList });
			}
			const type = await AsyncStorage.getItem('type');
			if (type) {
				_this.setType(type);
			} else {
				_this.setType('All');
			}
			const colorScheme = await AsyncStorage.getItem('colorScheme');
			if (colorScheme) {
				_this.setState({
					colorScheme,
				});
			}
		} catch (e) {
			console.log('Error from AsyncStorage: ', e);
		}
	}
		
	componentDidMount() {
		const { navigation } = this.props;
		const _this = this;
		_this.getData();
		//监听tab页面切换事件
		const didFocusSubscription = navigation.addListener(
			'didFocus',
			payload => {
				_this.getData();
			}
		);
	}

	render() {
		const {
			inputValue,
			todoList,
			type,
			colorScheme
		} = this.state;
		return (
			<View
				style={[
                    styles.container,
                    colorScheme !== 'dark' ? null : styles.darkBackground,
                ]}
			>
				<StatusBar
					barStyle={
						colorScheme !== 'dark' ? 'dark-content' : 'light-content'
					}
				/>
				<ScrollView
					keyboardShouldPersistTaps="always"
					style={styles.content}
				>
					<Heading theme={colorScheme} />
					<TextInput
						inputValue={inputValue}
						inputChange={(text) => this.inputChange(text)}
						theme={colorScheme}
					/>
					<View style={{marginTop: 15}}>
						<TodoList
							todoList={todoList}
							deleteTodo={this.deleteTodo.bind(this)}
							toggleComplete={this.toggleComplete.bind(this)}
							type={type}
							theme={colorScheme}
						/>
						<SubmitButton
							submitTodo={this.submitTodo.bind(this)}
							disabled={!inputValue}
							theme={colorScheme}
						/>
					</View>
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
	//暗色主题背景色
	darkBackground: {
		backgroundColor: 'rgb(37,33,32)',
	},
	content: {
		flex: 1,
		paddingTop: 60,
	},
});

export default TodoApp;