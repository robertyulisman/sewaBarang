import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, SafeAreaView, 
    TextInput, Platform, StatusBar, ScrollView,
    Image, Dimensions, ImageBackground, Animated, RefreshControl, Alert, AppRegistry, ActivityIndicator, FlatList, TouchableOpacity, ListView, TouchableNativeFeedback
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import {Carousel} from 'react-native-snap-carousel';
import { Card } from 'react-native-paper';
import moment from 'moment'; 
import { Button } from 'react-native-elements';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { FontAwesomeIcon } from 'react-native-fontawesome';
import { default as NumberFormat } from 'react-number-format';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import {CirclesLoader, PulseLoader, TextLoader, DotsLoader} from 'react-native-indicator';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked'

export default class Faq extends Component {
	static navigationOptions = {
	title: 'FAQ',
  headerStyle: {
      backgroundColor: 'blue',
  },
  //   headerBackground: (
  //   <LinearGradient
  //     style={{flex: 1}}
  //     colors={['#00d2ff', '#3a7bd5']}
  //     start={{x: 0, y: 0}}
  //     end={{x: 1, y: 0}}
  //   />
  // ),
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }; 

   render() {
    return (
      <View style = {styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'}/>
   		<View style={{alignItems: 'center'}}>
            <Text style = {styles.capitalLetter}>
               FREQUENTLY ASKED QUESTIONS
            </Text>
        </View>

         <Text style = {styles.wordBold}>Sewabarang? </Text>
         <View style={{alignItems: 'center'}}>
         <Text> 
	       Sewabarang merupakan sebuah aplikasi berbasis mobile untuk menyewa barang dengan mudah
	 	   Sewabarang hadir sebagai solusi untuk kemudahan menyewa barang secara efektif,
	 	   aman dan efisien.
	     </Text>
         </View>

         <Text style = {styles.wordBold}>Vendor? </Text>
         <View style={{alignItems: 'center'}}>
 		 <Text> 
           Vendor merupakan pihak ketiga yang terdaftar dan mempunyai barang yang dapat
           disewakan melalui aplikasi Sewabarang.
         </Text>
      	 </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
   container: {
      marginTop: 10,
      padding: 20
   },
   text: {
      color: '#41cdf4',
   },
   capitalLetter: {
      color: 'red',
      fontSize: 20,
      fontWeight: 'bold'
   },
   wordBold: {
      fontWeight: 'bold',
      color: 'black',
      marginTop: 15,
      fontSize: 15
   },
   italicText: {
      color: '#37859b',
      fontStyle: 'italic'
   },
   textShadow: {
      textShadowColor: 'red',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius : 5
   }
})