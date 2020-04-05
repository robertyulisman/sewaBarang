import React, { Component } from 'react'
import { View, ScrollView, Text, ImageBackground, StyleSheet, Image, TouchableNativeFeedback, StatusBar, Platform, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {withNavigation} from 'react-navigation';
import TouchableScale from 'react-native-touchable-scale';
import Kendaraan from '../../components/kendaraan/Kendaraan';
import Pakaian from '../../components/pakaian/Pakaian';
import Sarana from '../../components/sarana/Sarana';
import Vendor from '../toko/Vendor';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import Loading from 'react-native-whc-loading';

class Menu extends Component {
  constructor(props){
    super(props)
    this.state={
      isfetched: false,
    }
  }


  componentWillMount() {
    setTimeout(() => this.setState({ isfetched: true }), 8000);
  }
  render(){
    const menus = [
      {
        icon: require('../../images/9.png'),
        title: 'Kendaraan',
        navigate: 'Kendaraan',
        params: ''
      },
      {
        icon: require('../../images/10.png'),
        title: 'Pakaian',
        navigate: 'Pakaian',
        params: ''
      },
      {
        icon: require('../../images/8.png'),
        title: 'Sarana',
        navigate: 'Sarana',
        params: ''
      },
      {
        icon: require('../../images/6.png'),
        title: 'Vendor',
        navigate: 'Vendor',
        params: ''
      },
    ]

    const { isfetched } = this.state;
    return(
      <View style={styles.View1}>
       <View style={styles.View2}>
       {
        menus.map((data, index) => 
          <TouchableScale key={index} style={styles.iconWrap} onPress={() => { 
            this.refs.loading1.show();
            setTimeout(() => {
              this.refs.loading1.close();
              this.props.navigation.navigate(data.navigate, {params: data })
            }, 2000);
          }}>
          <View>
            <ShimmerPlaceHolder autoRun={true} duration={2000} visible={isfetched}  style={{...styles.icon, borderRadius: 35}}>
              <Image source={data.icon} style={styles.icon} />
            </ShimmerPlaceHolder>
          </View>
          <ShimmerPlaceHolder autoRun={true} duration={2000} visible={isfetched} style={{borderRadius: 10, width: 60, marginTop: 5}}>
            <Text style={styles.subTitle}>{data.title}</Text>
          </ShimmerPlaceHolder>
          </TouchableScale> 
        )
       }
       </View>
       <Loading ref="loading1"
       image={require('../../assets/icon.png')}
       seasing={Loading.EasingType.linear}
       imageSize={70}
       size={70} 
       />
      </View>

    )
  }
}

export default withNavigation(Menu)

const styles = StyleSheet.create({
View1: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    alignSelf: 'center', 
    backgroundColor: 'white',  
    height: 120,
    width: 340, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
},
View2: {
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    paddingLeft: 7
},
icon: {
  height: 65,
  width: 65,
  resizeMode: 'stretch',
},
subTitle: {
  fontSize: 10.5, 
  color: 'black', 
  fontWeight: 'bold', 
  marginTop: 5
},
iconWrap: {
  width: 60,
  alignItems: 'center',
  padding: 5,
  margin: 10.5
},
CardV: {
    borderRadius: 10, 
    height: 60, 
    width: 60,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 1,
    borderColor: '#ddd',
},
})