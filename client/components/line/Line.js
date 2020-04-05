import React, { Component } from 'react'
import { View, ScrollView, Text, ImageBackground, StyleSheet, Image, ActivityIndicator, FlatList, TouchableNativeFeedback, StatusBar, Platform, TouchableOpacity, Linking } from 'react-native';


export default class Line extends Component {
	render(){
		return (
			<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
			<View style={styles.hairline} />
				<Text style={{fontWeight: 'bold', color: 'grey'}}>SOSIAL MEDIA</Text>
			<View style={styles.hairline} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
hairline: {
	backgroundColor: '#A2A2A2',
	height: 1,
	width: 110,
	paddingLeft: 100,
	margin: 11,
},
Text1: {
	fontWeight: 'bold',
	fontSize: 15,
	color: '#ddd',
}
})