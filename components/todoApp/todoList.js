import React, {PureComponent} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

export default class TodoList extends PureComponent
{
	_keyExtractor = (item, index) => item.todoIndex;
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
		return (
			<SwipeListView
				data={list}
				renderItem={ (data, rowMap) => (
					<Todo
						key={data.item.todoIndex}
						todo={data.item}
						theme={theme}
					/>
				)}
				renderHiddenItem={ (data, rowMap) => (
					<View style={styles.rowBackContainer}>
						<TouchableOpacity
							style={[
								styles.backRightBtnContainer,
								styles.doneBtn,
								data.item.complete ? styles.undoneBtn : null,
							]}
							onPress={() => toggleComplete(data.item.todoIndex)}
						>
							<MaterialIcons
								name={'check'}
								size={18}
								color={'#fff'}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.backRightBtnContainer, styles.deleteBtn]}
							onPress={() => deleteTodo(data.item.todoIndex)}
						>
							<MaterialIcons
								name={'delete-outline'}
								size={18}
								color={'#fff'}
							/>
						</TouchableOpacity>
					</View>
				)}
				leftOpenValue={0}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
				keyExtractor={this._keyExtractor}
			/>
		);
	}
}

const styles = StyleSheet.create({
	//左右滑动底层按钮文字颜色
    backTextWhite: {
        color: '#FFF',
	},
	//左右滑动底层容器
    rowBackContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
		paddingLeft: 15,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 3,
		borderRadius: 5,
		shadowOpacity: 0.2,
		shadowRadius: 3,
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 2 },
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		paddingTop: 12,
		paddingBottom: 12,
	},
	//左滑右侧组按钮容器
    backRightBtnContainer: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
	},
	//完成按钮
    doneBtn: {
        backgroundColor: 'rgba(44,198,44,0.7)',
        right: 75,
	},
	//撤销完成按钮
	undoneBtn: {
        backgroundColor: 'dimgray',
	},
	//删除按钮
    deleteBtn: {
		backgroundColor: 'rgba(255,60,0,0.7)',
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
        right: 0,
    },
});