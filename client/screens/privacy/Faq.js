import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native';

export default class Faq extends Component {
	static navigationOptions = {
   title: 'FAQ',
   backTitle: null,
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
   		<View style={{alignItems: 'center'}}>
            <Text style = {styles.capitalLetter}>
               FREQUENTLY ASKED QUESTIONS
            </Text>
        </View>

         <Text style = {styles.wordBold}>Sewabarang? </Text>
         <View style={{alignItems: 'center'}}>
         <Text style={{paddingHorizontal: 14, opacity: 0.3, fontSize: 14, justifyContent: 'flex-start', textAlign: 'justify', lineHeight: 26}}> 
	       Sewabarang merupakan sebuah aplikasi berbasis mobile untuk menyewa barang dengan mudah Sewabarang hadir sebagai solusi untuk kemudahan menyewa barang secara efektif,
	 	   aman dan efisien.
	     </Text>
         </View>

         <Text style = {styles.wordBold}>Vendor? </Text>
         <View style={{alignItems: 'center'}}>
 		 <Text style={{paddingHorizontal: 14, fontSize: 14, opacity: 0.3, justifyContent: 'flex-start', textAlign: 'justify', lineHeight: 26}}> 
           Vendor merupakan pihak ketiga yang terdaftar dan mempunyai barang yang dapat disewakan melalui aplikasi Sewabarang.
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