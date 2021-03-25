import React, { PureComponent } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text
} from 'react-native';
import I18n from '../languages';
import ActionSheet from 'react-native-actionsheet';
import AsyncStorage from '@react-native-community/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { AppContext } from '../../AppContext';

//图片选择器参数设置
const imagePickerOptions = {
    mediaType: 'photo',
    quality: 1,
    saveToPhotos: true,
};

//选择壁纸
export default class ImagePicker extends PureComponent
{
    static contextType = AppContext;

    onChoosePhotoSource(index) {
        if (index === 0) {
            //选择相册
            launchImageLibrary(imagePickerOptions, (response) => {
                this.callBackForImagePicker(response);
            });
        } else if (index === 1) {
            //拍照
            launchCamera(imagePickerOptions, (response) => {
                this.callBackForImagePicker(response);
            });
        }
    }

    //图片选择回调函数
    callBackForImagePicker(res) {
        const response = res;
        const _this = this;
        if (response.didCancel) {
            console.log('用户取消了选择！');
        } else if (response.errorCode) {
            alert(response.errorMessage);
        } else {
            // console.log(res);
            // const source = { uri: response.uri };
            AsyncStorage.setItem('backgroundImageUri', res.uri);
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            // this.setState({
            //     avatarSource: source
            // });
            _this.props.navigation.navigate('All');
        }
    }

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
                        I18n.t('imageLibrary'),
                        I18n.t('takePhoto'),
                        I18n.t('cancel'),
                    ]}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => {
                        this.onChoosePhotoSource(index);
                    }}
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
