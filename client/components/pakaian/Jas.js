import React, { Component } from 'react'
import { 
  Text, View, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  Platform, 
  StatusBar, 
  ScrollView,
  Image, 
  Dimensions, 
  ImageBackground, 
  Animated, 
  params, 
  Alert, 
  AppRegistry, 
  ActivityIndicator, 
  FlatList, 
  TouchableOpacity, 
  TouchableHighlight,
} from 'react-native';
import { MaterialCommunityIcons, AntDesign, Ionicons, FontAwesome, Feather} from 'react-native-vector-icons';
import { default as NumberFormat } from 'react-number-format';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window');
export default class Jas extends Component {
  static navigationOptions = {
      header: null
  };

 constructor(props){
  super(props);
  this.state ={ 
    isLoading: true, 
    text: ''}
}

render(){
   return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'}/>
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <Image
          source={{uri: 'https://i.ibb.co/BHkP0rj/bg-edit.png'}}
          style={styles.imageBanner}
        />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{position: 'absolute', left: 10, top: 30, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 50}}>
          <Feather 
            name="arrow-left" size={24} color={'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')} style={{position: 'absolute', right: 20, top: 30, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 50}}>
          <Feather 
            name="shopping-cart" size={24} color={'white'} 
          />
        </TouchableOpacity>
        <View style={styles.wrapper}>
          <Feather name="search" size={24} color={'white'} style={{marginTop: 13, left: 10 }}/>
          <TextInput
            style={{flex: 1, marginLeft: 15, backgroundColor: 'white', borderBottomRightRadius: 15, borderTopRightRadius: 15}}
            underlineColorAndroid="transparent"
            placeholder="Cari mobil sesuai keinginan mu"
            placeholderStyle={{left: 10}}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            clearButtonMode="always"
            clearTextOnFocus
          />
        </View>
        <ScrollView style={{flex: 1, marginTop: 10}}>
          <TouchableOpacity>
          <View style={styles.card}>
            <Image 
              source={{uri: 'https://berita.rajamobil.com/wp-content/uploads/2017/11/IMG_3509-1.jpg'}}
              style={{height: 80, width: 85, borderRadius: 20, resizeMode: 'stretch', right: 20, top: 20}}
            />
            <Text style={{left: 70, top: -40, fontWeight: 'bold', fontSize: 17}}>All New Rush</Text>
            <NumberFormat
              value={70.000}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp.'}
              renderText={(value) => (
                  <Text
                      style={{
                          left: 70, top: -40, fontWeight: 'bold', fontSize: 17, color: 'green'
                      }}
                  >
                      {value}/Hari
                  </Text>
              )}
            />
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('')} style={{position: 'absolute', right: 15, top: 40, backgroundColor: 'rgba(0, 0, 255, 0.8)', padding: 10, borderRadius: 50}}>
            <Feather 
              name="heart" size={24} color={'white'} 
            />
          </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
    )    
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#efefef'
  },
  imageBanner: {
    width: width, 
    height: 160
  },
  wrapper: {
    marginHorizontal: 18,
    height: 50,
    marginTop: -25,
    backgroundColor: 'blue',
    elevation: 4,
    borderRadius: 15,
    flexDirection: 'row',
  },
  card: {
    height: 120,
    width: '80%',
    marginLeft: 40,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#efefef',
    borderRadius: 25,
  }
});
