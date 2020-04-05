import React, { Component } from 'react';
import {Text, View, Image,  StyleSheet, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

var {height, width} = Dimensions.get('window');

export default class Gradient extends Component {
	render() {
		return(

		<View style={styles.View4}>
    <TouchableScale>
		<LinearGradient
          colors={['#1FA2FF', '#12D8FA', '#A6FFCB']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.2, y: 0 }}
          style={{padding: 15, alignItems: 'center', borderRadius: 15, margin: 10, height: 80, width: 340, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
          <Image 
            source={require('./thumbs-up.png')}
            style={{width: 30, height: 30, margin: 10}}
            />
          <Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 15,
              color: '#000',
              fontWeight: 'bold',
              marginTop: 23
            }}>
            Produk Pilihan
          </Text>
          </View>
          <View>
            <Text style={{backgroundColor: 'transparent', fontSize: 13, color: '#000', }}>
              Produk-produk yang kami rekomendasikan!</Text>
          </View>
        </LinearGradient>
        </TouchableScale>
		</View>
		)
	}
}

const styles = StyleSheet.create({
	View4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: wp('80%'),
    height: 80,
    borderRadius: 15,
    elevation: 1,
}
})