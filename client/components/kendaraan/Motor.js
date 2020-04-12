import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, SafeAreaView, 
    TextInput, Platform, StatusBar, ScrollView,
    Image, Dimensions, ImageBackground, Animated, Alert,TouchableNativeFeedback, AppRegistry, ActivityIndicator, FlatList, TouchableOpacity, TouchableHighlight,
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import { default as NumberFormat } from 'react-number-format';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Motor extends Component {
  static navigationOptions = {
    title: 'Motor',
    headerStyle: {
      backgroundColor: 'blue',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

    constructor(props){
    super(props);
    this.state ={ isLoading: true, text: ''}
  }

  componentDidMount(){
  return fetch('http://192.168.100.6/api/sewabarang/index.php/kendaraan/motor')
  .then((response) => response.json())
  .then((responseJson) => {

    this.setState({
      isLoading: false,
      dataSource: responseJson.kendaraan,
    }, function(){

    });

  })
  .catch((error) =>{ //catch menangkap eror.
    console.error(error);
  });

}

  render(){

   randomNumber = Math.floor(Math.random() * 7)
   if (this.state.isLoading){
      return(
        <View style={{flex:1, alignContent:"center", justifyContent:"center"}}>
        <View style={{alignItems: 'center', alignSelf: 'center'}}>
        <Image source={require('./splash1.png')}
               style={{height: 150, width: 150}}
        />
        </View>
          <ActivityIndicator size='large' color='blue'/>
        </View>
      );
    }

   return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'}/>
      <FlatList  style={{width:'100%'}}
         data={this.state.dataSource}
         keyExtractor={(item,index) => index.toString()} 
         showsVerticalScrollIndicator={false}
         renderItem= {({item}) => {
   return (
    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Detail', {...item})} >
      <View style={{marginVertical: 10, marginHorizontal:15, borderRadius:15,  backgroundColor:'#ced6e0', elevation: 5}}>
        <View style={{padding:15,  backgroundColor:'white',borderTopLeftRadius:15, borderTopRightRadius:15 }}  >
          <Text style={{ fontSize:15, fontWeight:'bold', }} >{item.nama_barang}</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:8, alignItems:'baseline'}} >
              <View style={{flexDirection:'row', alignItems:'baseline' }} >
                <NumberFormat 
                  value={item.harga} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'Rp.'} renderText={value => <Text style= {styles.price}>{value}/Hari</Text>} />
              </View>
                
                <Icon
                  name="location-on" size={22} color="blue"
                />
                <Text style={{fontSize:14, fontWeight:'bold'}} >{item.nama_kabupaten} </Text>
              </View>
            </View>
          <View style={{ height:200, maxwidth:'100%', }} >
            <Image source={{uri:item.gambar_barang}} resizeMode="cover" style={{ flex:1, alignSelf:'stretch', borderBottomLeftRadius:15, borderBottomRightRadius:15,   }} /> 
          </View>
        </View>
      </TouchableNativeFeedback>
      )
    }}
  />
</View>

    )    
  }
}

const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor:'#f1f2f6'
},
price: {
  paddingTop: 15, 
  color: 'green', 
  width: '70%' 
},
});
