import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import {withNavigation} from 'react-navigation';

const {height, width} = Dimensions.get('window')

class Tes extends Component {
  render() {

    const menus = [
      {
        navigate: 'CatList',
        params: ''
      },
    ]

    return (

      <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
      <View style={{borderRadius: 10, borderWidth: 0.5, borderColor: 'grey', alignSelf: 'center', width: 350, height: 200}}>
      <LinearGradient
          colors={['#355C7D', '#6C5B7B', '#C06C84']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{alignSelf: 'center', width: 350, height: 100, flexDirection:'row', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
        <Image
          style={styles.jas}
          source={require('../home/components/jas.png')}
        />
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 25, marginHorizontal: -20, color: 'white'}}>MENS</Text>
      
      {
        menus.map((data, index) =>
      <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate(data.navigate, 
      {params: data })}>
      <View style={{paddingLeft: 140, marginTop: 5}}>
      <Text style={{fontWeight: 'bold', fontSize: 10, color: 'white'}}>Lihat Sekarang > </Text>
      </View>
      </TouchableOpacity>
      )
    }

      </LinearGradient>
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 25, marginTop: -60, marginHorizontal: 90, color: 'white'}}>NEW</Text>
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 25, marginHorizontal: 95, marginTop: -13, color: 'white'}}>ARRIVALS</Text>
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 10, marginHorizontal: 90}}>HONDA PCX</Text>
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 10, paddingLeft: 230, marginTop: -18}}>TOYOTA AVANZA</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row', marginTop: -90, paddingLeft: 110}}>
       <Image
          style={styles.pcx}
          source={require('../home/components/pcx.png')}
        />
      <View style={{paddingLeft: 20}}>
       <Image
          style={styles.mobil}
          source={require('../home/components/mobil.png')}
        />
       </View>
      </View>
      </View>

      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
      <View style={{borderRadius: 10, borderWidth: 0.5, borderColor: 'grey', alignSelf: 'center', width: 350, height: 200}}>
      <LinearGradient
          colors={['#403A3E', '#BE5869']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{alignSelf: 'center', width: 350, height: 100, flexDirection:'row', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
        <Image
          style={styles.sepeda}
          source={require('../home/components/gambar-sepeda-png-6.png')}
        />
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 15, marginHorizontal: -20, color: 'white'}}>JELAJAH TANPA BATAS</Text>
      <View style={{paddingLeft: 20, marginTop: 5}}>
      <Text style={{fontWeight: 'bold', fontSize: 10, color: 'white'}}>SEWABARANG</Text>
      </View>
      </LinearGradient>
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 25, marginTop: -60, marginHorizontal: 120, color: 'white'}}>&</Text>
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 15, marginHorizontal: 120, marginTop: -10, color: 'white'}}>HIDUP SEHAT</Text>
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 15, paddingLeft: 30}}>KEBAYA WISUDA</Text>
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 10, paddingLeft: 25}}>Rayakan moment bahagiamu</Text>
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 10, paddingLeft: 40}}>Bersama Sahabat!!!</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row', marginTop: -115, paddingLeft: 170}}>
       <Image
          style={styles.kebaya}
          source={require('../home/components/kebaya.png')}
        />
      </View>
      </View>
      </ScrollView>
    );
  }
}

export default withNavigation(Tes)

const styles = StyleSheet.create({
  jas: {
    width: 100,
    height: 200,
    resizeMode: 'stretch',
    marginTop: -10
  },
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: -5,
  },
  logo: {
    width: 65,
    height: 65,
    resizeMode: 'stretch',
  },
  pcx: {
    width: 110,
    height: 90,
    resizeMode: 'stretch',
  },
  mobil: {
    width: 130,
    height: 90,
    resizeMode: 'stretch',
  },
  sepeda: {
    width: 130,
    height: 90,
    resizeMode: 'stretch',
    marginTop: 10
  },
  kebaya: {
    width: 150,
    height: 100,
    resizeMode: 'stretch',
    borderRadius: 10
  },
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    width: 70,
    flexDirection: 'row',
  },
});