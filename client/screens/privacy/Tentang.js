import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';

export default class Tentang extends Component {
static navigationOptions = {
	title: 'Tentang Kami',
  headerStyle: {
      backgroundColor: 'blue',
  },
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
      	source={require('../privacy/logoundiksha.png')}
      	style={{height: 95, width: 95}}
      />

      <Image 
      	source={require('../privacy/LogoMobile.png')}
      	style={{height: 130, width: 130}}
      />
      
     
      <Image 
      	source={require('../privacy/manajemen.png')}
      	style={{height: 100, width: 100}}
      />
      </View>

         <Text style = {styles.text}>
            <Text style = {styles.capitalLetter}>
               APLIKASI SEWABARANG BERBASIS MOBILE
            </Text>
         </Text>
      	 <Text style={{paddingHorizontal: 14, opacity: 0.3, fontSize: 14, justifyContent: 'flex-start', textAlign: 'justify', lineHeight: 26}}>
               Tujuan dari pembuatan aplikasi sewabarang barang ini untuk menyelesaikan tugas akhir membantu masyarakat dalam yang membuka usaha dan meringankan orang untuk mendapatkan barang yang diperlukan tanpa harus mengeluarkan uang yang banyak untuk membeli atau merawat barang tersebut. Tidak perlu menyiapkan tempat untuk menyimpannya selesai dipakai tinggal dikembalikan. Yang menjadi kendala adalah mencari tempat yang menyewakan barang yang dibutuhkan. Sehingga diperlukannya aplikasi untuk memudahkan orang untuk mencari barang yang ingin disewa. 
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
      fontSize: 14,
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