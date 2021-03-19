import React, { PureComponent } from 'react';
import { View, Button, ScrollView, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class SettingHome extends PureComponent {
	render() {
		const { navigation } = this.props;
		return (
			<ScrollView
				keyboardShouldPersistTaps="always"
				style={styles.container}
			>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Button
						title="Go to themes"
						onPress={() => navigation.navigate('Theme')}
					/>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
