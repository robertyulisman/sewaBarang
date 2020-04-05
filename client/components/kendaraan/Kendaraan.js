import React, { Component } from 'react'
import { View, ScrollView, Text,  StyleSheet, Image, StatusBar, Platform, RefreshControl, Dimensions } from 'react-native';
import { Header } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from "react-native-elements";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import TouchableScale from 'react-native-touchable-scale';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loading from 'react-native-whc-loading';
import Swipeable from 'react-native-swipeable';

var {height, width} = Dimensions.get('window');

export default class Kendaraan extends Component {
  static navigationOptions = ({navigation}) => {
    return{
      header: null
    }
  }
  
constructor(props){
    super(props)
    this.state={
        imgUri: 'https://serving.photos.photobox.com/835809569ba98e7d41a64799e0eb4f79cc2feef6daef0a37725a7026f5c4bbb346eb5f3d.jpg',
        imageHeight: 165,
        leftActionActivated: false,
        toggle: false,
        currentlyOpenSwipeable: null,
        marginTop: -50,
        yAxis: 0,
        dataSource: [],
        isfetched: false,
        refreshing: false,
        isLoading: true,
        isVisible: false,
        Default_Rating: 0,
        Max_Rating: 5,
    }

    this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
}

_onRefresh(){
  this.setState({refreshing: true});
  this.componentDidMount().then(() =>{
    this.setState({refreshing: false})
  });
}

UpdateRating(key) {
  this.setState({ Default_Rating: key });
}

setBackground=(data)=>{
    this.setState({imgUri: data})
}
handleScroll=(event)=>{
    // console.log(event.nativeEvent.contentOffset.y);
    const yAxis = event.nativeEvent.contentOffset.y
    if(yAxis >= 0){
        imageHeight = 165
        this.setState({imageHeight, marginTop: -50})
    }
    else if(yAxis < 0){
        imageHeight = Math.abs(yAxis)+265
        this.setState({imageHeight, marginTop: yAxis-150})
    }
    this.setState({yAxis})
}

// componentDidMount(){
//     return fetch('http://192.168.1.5/api/sewabarang/index.php/home/')
//     .then((response) => response.json())
//     .then((responseJson) => {

//       this.setState({
//         isLoading: false,
//         dataSource: responseJson.barang,
//       }, function(){

//       });  

//     })
//     .catch((error) =>{ 
//       console.error(error);
//     });
//   }

  componentWillMount() {
    setTimeout(() => this.setState({ isfetched: true }), 8000);
    }

  handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

render(){

  const { isfetched } = this.state;
  randomNumber = Math.floor(Math.random() * 7)

    // if (this.state.isLoading){
    //   return(
    //     <View style={{flex:1, alignContent:"center", justifyContent:"center"}}>
    //     <View style={{alignItems: 'center', alignSelf: 'center'}}>
    //     <Image source={require('../assets/splash1.png')}
    //            style={{height: 150, width: 150}}
    //     />
    //     </View>
    //       <ActivityIndicator size='large' color='blue'/>
    //     </View>
    //   );
    // }

    const {currentlyOpenSwipeable} = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({currentlyOpenSwipeable: swipeable});
      },
      onClose: () => this.setState({currentlyOpenSwipeable: null})
    };

    let React_Native_Rating_Bar = [];
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableScale
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}>
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating
                ? { uri: this.Star }
                : { uri: this.Star_With_Border }
            }
          />
        </TouchableScale>
      );
    }

    return(
      <View style={{flex: 1, width: width}}>
        <StatusBar translucent backgroundColor='transparent' barStyle={this.state.yAxis > 30? 'dark-content' : 'light-content'}/>
          <View style={[styles.header,this.state.yAxis>50? styles.shadow: null ,{backgroundColor: `rgba(255,255,255,${this.state.yAxis>50?1:(this.state.yAxis/50)})`}]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '50%'}}>
            <Image 
            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Ski_trail_rating_symbol_black_circle.png'}}
            style={{height: 50, width: 50, top: '8%', left: '-5%', resizeMode: 'stretch', tintColor: this.state.yAxis>50? 'rgba(0,0,0,0.0)' : 'rgba(0,0,0,0.5)'}}
            />
            <Text style={{fontSize: 15, color: this.state.yAxis>50? 'black' : 'transparent', top: '15%', left: '-25%'}}>Mobil</Text>
            <Image 
            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Ski_trail_rating_symbol_black_circle.png'}}
            style={{height: 50, width: 50, top: '8%', resizeMode: 'stretch', left: '230%', tintColor: this.state.yAxis>50? 'rgba(0,0,0,0.0)' : 'rgba(0,0,0,0.5)'}}
            />
            </View>
            <View style={styles.iconContainer}>
              <Icon type='feather' name='arrow-left' color={this.state.yAxis>50? 'grey':'white'} underlayColor={this.state.yAxis>50? 'rgba(0,0,0,0.0)' : 'transparent'} size={27} onPress={() => this.props.navigation.navigate('Home')} containerStyle={{left: '-326%', top: '15%'}}/>
              <Icon type="font-awesome" name='filter' color={this.state.yAxis>50? 'grey':'white'} underlayColor={this.state.yAxis>50? 'rgba(0,0,0,0.0)' : 'transparent'} size={27} onPress={() => this.props.navigation.navigate('Cart')} containerStyle={{left: '-2%', top: '15%'}}/>
            </View>
          </View>
        <ScrollView style={styles.container} onScroll={this.handleScroll} scrollEventThrottle={8} showsVerticalScrollIndicator={false} 
          refreshControl={
            <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
        <Image source={require('./img/bgk.png')} style={[styles.imageStyle, {height: Platform.OS == 'ios'? this.state.imageHeight : hp('45%'), marginTop: Platform.OS == 'ios'? this.state.marginTop : 0}]}/>
          <View style={styles.bg}>

            <View style={{backgroundColor: 'rgba(232, 232, 232, 1)', height: 5, width: 80, left: '40%', top: '5%', borderRadius: 15}} />

            <Swipeable
              style={{top: 40}}
              rightButtons={[
                <TouchableScale onPress={() => this.props.navigation.navigate('Tentang')} style={[styles.rightSwipeItem, {backgroundColor: 'white'}]}>
                  <Ionicons 
                    name="ios-information-circle" size={25} color='blue'
                  />
                </TouchableScale>,
                <TouchableScale onPress={() => this.props.navigation.navigate('Mobil')} style={[styles.rightSwipeItem, {backgroundColor: 'blue'}]}>
                  <Ionicons 
                    name="ios-arrow-forward" size={25} color='white'
                  />
                </TouchableScale>
              ]}>
              <View style={[styles.listItem, {backgroundColor: 'transparent'}]}>
                <Image
                  source={require('./img/4.png')}
                  style={{height: 65, width: 65, resizeMode: 'stretch'}}
                />
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>Mobil</Text>
                <Text style={{color: '#ddd', fontSize: 10}}> Geser ke kiri untuk melihat informasi</Text>
              </View>
            </Swipeable>

            <Swipeable
              style={{top: 50}}
              rightButtons={[
                <TouchableScale onPress={() => this.props.navigation.navigate('Tentang')} style={[styles.rightSwipeItem, {backgroundColor: 'white'}]}>
                  <Ionicons 
                    name="ios-information-circle" size={25} color='blue'
                  />
                </TouchableScale>,
                <TouchableScale onPress={() => this.props.navigation.navigate('Motor')} style={[styles.rightSwipeItem, {backgroundColor: 'blue'}]}>
                  <Ionicons 
                    name="ios-arrow-forward" size={25} color='white'
                  />
                </TouchableScale>
              ]}>
              <View style={[styles.listItem, {backgroundColor: 'transparent'}]}>
                <Image
                  source={require('./img/1.png')}
                  style={{height: 65, width: 65, resizeMode: 'stretch'}}
                />
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>Motor</Text>
                <Text style={{color: '#ddd', fontSize: 10}}> Geser ke kiri untuk melihat informasi</Text>
              </View>
            </Swipeable>

            <Swipeable
              style={{top: 60}}
              rightButtons={[
                <TouchableScale onPress={() => this.props.navigation.navigate('Tentang')} style={[styles.rightSwipeItem, {backgroundColor: 'white'}]}>
                  <Ionicons 
                    name="ios-information-circle" size={25} color='blue'
                  />
                </TouchableScale>,
                <TouchableScale onPress={() => this.props.navigation.navigate('Sepeda')} style={[styles.rightSwipeItem, {backgroundColor: 'blue'}]}>
                  <Ionicons 
                    name="ios-arrow-forward" size={25} color='white'
                  />
                </TouchableScale>
              ]}>
              <View style={[styles.listItem, {backgroundColor: 'transparent'}]}>
                <Image
                  source={require('./img/5.png')}
                  style={{height: 65, width: 62, resizeMode: 'stretch'}}
                />
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>Sepeda</Text>
                <Text style={{color: '#ddd', fontSize: 10}}> Geser ke kiri untuk melihat informasi</Text>
              </View>
            </Swipeable>

          </View>
        </ScrollView>
          <Loading ref="loading1"
          image={require('../../assets/icon.png')}
          seasing={Loading.EasingType.linear}
          imageSize={70}
          size={70}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
wrapper: {
},
container:{
    marginTop: Platform.OS == 'ios'? -Header.HEIGHT : -(Header.HEIGHT+25),
},
header:{
    height: Platform.OS == 'ios'? Header.HEIGHT : Header.HEIGHT+25,
    zIndex: 1,
    alignItems: 'center',
    flexDirection: 'row',
},
rightSwipeItem: {
  flex: 1,
  justifyContent: 'center',
  paddingLeft: 20
},
listItem: {
  height: 75,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row'
},
card: {
  height: '40%', 
  width: '45%', 
  backgroundColor: 'white', 
  top: '5%', 
  left: '2%', 
  borderRadius: 15,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
},
bg: {
    flex: 1,
    left: 10,
    width: wp('94.4%'),
    top: '-14%',
    height: hp('53%'),
    backgroundColor: 'white', 
    borderRadius: 20,
    elevation: 50,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,  
    elevation: 5,
},
shadow:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,  
    elevation: 5,
},
textStyle: {
  fontSize: 10,
  color: '#000',
  paddingLeft: 5
},
iconi: {
  paddingLeft: 10,
},
iconContainer: {
  flexDirection: "row",
  justifyContent: "space-evenly",
  width: 85,
  left: '25%'
},
imageStyle:{
    height: 200,
    width: wp('110%'),
    resizeMode: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,  
    elevation: 5,
},
StarImage: {
  width: 20,
  height: 20,
  resizeMode: 'cover',
},
childView: {
  flexDirection: 'row',
  marginTop: 10,
  margin: 15,
  marginHorizontal: 7
},
price: {
  color: 'green', 
  paddingLeft: 10, 
},
Viewp: { 
  paddingTop: 2,
},
icon: {
  paddingLeft: 10, 
  marginTop: 30
}
})

