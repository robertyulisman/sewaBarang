import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, SafeAreaView, 
    TextInput, Platform, StatusBar, ScrollView,
    Image, Dimensions, ImageBackground, Animated, RefreshControl, Alert, AppRegistry, ActivityIndicator, FlatList, TouchableOpacity, ListView, TouchableNativeFeedback
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import {Carousel} from 'react-native-snap-carousel';
import { Card } from 'react-native-paper';
import { Button } from 'react-native-elements';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { FontAwesomeIcon } from 'react-native-fontawesome';
import { default as NumberFormat } from 'react-number-format';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import {CirclesLoader, PulseLoader, TextLoader, DotsLoader} from 'react-native-indicator';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked'

export default class Tentang extends Component {
static navigationOptions = {
	title: 'Tentang Kami',
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
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Image 
      	source={require('../sewabarang/logoundiksha.png')}
      	style={{height: 95, width: 95}}
      />

      <Image 
      	source={require('../sewabarang/LogoMobile.png')}
      	style={{height: 130, width: 130}}
      />
      
     
      <Image 
      	source={require('../sewabarang/manajemen.png')}
      	style={{height: 100, width: 100}}
      />
      </View>

         <Text style = {styles.text}>
            <Text style = {styles.capitalLetter}>
               APLIKASI SEWABARANG BERBASIS MOBILE
            </Text>
         </Text>
      	 <Text>
               Tujuan dari pembuatan aplikasi sewabarang barang ini untuk menyelesaikan tugas akhir
               membantu masyarakat dalam yang membuka usaha dan meringankan orang untuk mendapatkan 
               barang yang diperlukan tanpa harus mengeluarkan uang yang banyak untuk membeli atau 
               merawat barang tersebut. 

               Tidak perlu menyiapkan tempat untuk menyimpannya selesai dipakai tinggal dikembalikan. 
               Yang menjadi kendala adalah mencari tempat yang menyewakan barang yang dibutuhkan. 
               Sehingga diperlukannya aplikasi untuk memudahkan orang untuk mencari barang yang ingin disewa. 
            </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
   container: {
      alignItems: 'center',
      marginTop: 10,
      padding: 20
   },
   text: {
      color: '#41cdf4',
      margin: 10
   },
   capitalLetter: {
      color: 'black',
      fontSize: 15,
      fontWeight: 'bold'
   },
   wordBold: {
      fontWeight: 'bold',
      color: 'black'
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