import React, { PureComponent } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text
} from 'react-native';
import I18n from '../languages';
import ActionSheet from 'react-native-actionsheet';

import { AppContext } from '../../AppContext';

//选择壁纸
export default class ImagePicker extends PureComponent
{
    static contextType = AppContext;

	render() {
		const { colorScheme, langScheme } = this.context;
		const _this = this;

		I18n.locale = langScheme;
        return (
            <View>
                <TouchableOpacity
                    onPress={() => _this.ActionSheet.show()}
                    underlayColor={'#efefef'}
                >
                    <View style={[
                        styles.container,
                        colorScheme !== 'dark' ? null : styles.darkContainer,
                    ]}>
                        <Text style={[
                            styles.text,
                            colorScheme !== 'dark' ? null : styles.darkTextColor,
                        ]}>
                            {I18n.t('backgroundImage')}
                        </Text>
                    </View>
                </TouchableOpacity>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={I18n.t('pickSourceHint')}
                    options={[
                        I18n.t('takePhoto'),
                        I18n.t('imageLibrary'),
                        I18n.t('cancel'),
                    ]}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => { /* do something */ }}
                />
            </View>
		);
	}
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        color: '#252525',
    },
    darkTextColor: {
        color: '#ededed', //暗色主题标题文字颜色
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
		backgroundColor: 'lightgray',
        marginBottom: 1,
    },
    darkContainer: {
		backgroundColor: 'rgb(37,37,37)', //暗色主题手动选择主题列表背景色
	},
});
