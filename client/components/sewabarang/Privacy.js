import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, SafeAreaView, 
    TextInput, Platform, StatusBar, ScrollView,
    Image, Dimensions, ImageBackground, Animated, RefreshControl, Alert, AppRegistry, ActivityIndicator, FlatList, TouchableOpacity, ListView, TouchableNativeFeedback
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import {Carousel} from 'react-native-snap-carousel';
import { Card } from 'react-native-paper';
import { withNavigation } from 'react-navigation'; 
import { Button } from 'react-native-elements';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { FontAwesomeIcon } from 'react-native-fontawesome';
import { default as NumberFormat } from 'react-number-format';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import {CirclesLoader, PulseLoader, TextLoader, DotsLoader} from 'react-native-indicator';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked'

export default class Privacy extends Component {
static navigationOptions = {
	title: 'Privacy Policy',
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
         <Text style = {styles.text}>
            <Text style = {styles.capitalLetter}>
               Selamat datang di aplikasi Sewabarang.
            </Text>  
         </Text>

      	<Text style={{marginTop: 10}}>
            Syarat dan Ketentuan dan Kebijakan Privasi yang ditetapkan
            terkait penggunaan aplikasi Sewabarang. Pengguna disarnakan
            membaca seksama karena dapat berdampak kepada hak dan kewajiban
            pengguna dibawah hukum.
        </Text>

        <Text style={{marginTop: 10}}>
            Dengan mendaftar dan/atau menggunakan aplikasi Sewabarang telah dianggap
          	membaca, mengerti, memahami dan menyetujui semua isi dalam Syarat, Ketentuan
          	dan Kebijakan Privasi.
        </Text>

        <Text style={{marginTop: 10}}>
            Privasi ini merupakan bentuk kesepakatan yang dituangkan dalam sebuah perjanjian
            yang sah antara Pengguna dengan Sewabarang. Jika pengguna tidak menyetujui salah
            satu sebagian, atau seluruh isi Syarat, Ketentuan dan Kebijakan Privasi maka
            pengguna tidak diperkenankan menggunakan layanan di aplikasi Sewabarang.
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
   },
   capitalLetter: {
      color: 'black',
      fontSize: 15,

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