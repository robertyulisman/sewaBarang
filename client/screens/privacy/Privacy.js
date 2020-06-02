import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native';

export default class Privacy extends Component {
static navigationOptions = {
	title: 'Privacy Policy',
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
         <Text style = {styles.text}>
            <Text style = {styles.capitalLetter}>
               Selamat datang di aplikasi Sewabarang.
            </Text>  
         </Text>

      	<Text style={{paddingHorizontal: 14, opacity: 0.3, fontSize: 14, justifyContent: 'flex-start', textAlign: 'justify', lineHeight: 26}}>
            Syarat dan Ketentuan dan Kebijakan Privasi yang ditetapkan terkait penggunaan aplikasi Sewabarang. Pengguna disarnakan membaca seksama karena dapat berdampak kepada hak dan kewajiban pengguna dibawah hukum.
        </Text>

        <Text style={{paddingHorizontal: 14, opacity: 0.3, fontSize: 14, justifyContent: 'flex-start', textAlign: 'justify', lineHeight: 26}}>
            Dengan mendaftar dan/atau menggunakan aplikasi Sewabarang telah dianggap membaca, mengerti, memahami dan menyetujui semua isi dalam Syarat, Ketentuan dan Kebijakan Privasi.
        </Text>

        <Text style={{paddingHorizontal: 14, opacity: 0.3, fontSize: 14, justifyContent: 'flex-start', textAlign: 'justify', lineHeight: 26}}>
            Privasi ini merupakan bentuk kesepakatan yang dituangkan dalam sebuah perjanjian yang sah antara Pengguna dengan Sewabarang. Jika pengguna tidak menyetujui salah satu sebagian, atau seluruh isi Syarat, Ketentuan dan Kebijakan Privasi maka pengguna tidak diperkenankan menggunakan layanan di aplikasi Sewabarang.
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