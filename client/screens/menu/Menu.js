import React, { Component, createRef } from 'react'
import { View, ScrollView, Text, Dimensions, StyleSheet, Image, TouchableNativeFeedback, StatusBar, Platform, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {withNavigation} from 'react-navigation';
import TouchableScale from 'react-native-touchable-scale';
// import Kendaraan from '../../components/kendaraan/Kendaraan';
// import Pakaian from '../../components/pakaian/Pakaian';
// import Sarana from '../../components/sarana/Sarana';
// import Vendor from '../toko/Vendor';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import Loading from 'react-native-whc-loading';
import ActionSheet from "react-native-actions-sheet";

const actionSheetRef = createRef();

const {height, width} = Dimensions.get('screen');

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
    let actionSheet;
    const menus = [
      {
        icon: {uri: 'https://i.ibb.co/xzV1cdY/kendaraan.png'},
        title: 'Kendaraan',
        navigate: 'Kendaraan',
        params: ''
      },
      {
        icon: {uri: 'https://i.ibb.co/sq70BBV/pakaian.png'},
        title: 'Pakaian',
        navigate: 'Pakaian',
        params: ''
      },
      {
        icon: {uri: 'https://i.ibb.co/gzgB2GL/sarana.png'},
        title: 'Sarana',
        navigate: 'Sarana',
        params: ''
      },
      {
        icon: {uri: 'https://i.ibb.co/k27v4wm/vendor.png'},
        title: 'Vendor',
        navigate: 'Vendor',
        params: ''
      },
    ]

    const menu = [
      {
        icon: {uri: 'https://i.ibb.co/jfCtWZ9/elektronik.png'},
        title: 'Elektronik',
        navigate: 'Elektronik',
        params: ''
      },
      {
        icon: {uri: 'https://i.ibb.co/3hsPQ9t/bayi.png'},
        title: 'Peralatan Bayi',
        navigate: 'Kids',
        params: ''
      },
      {
        icon: {uri: 'https://i.ibb.co/4FdfwBX/covid.png'},
        title: 'Covid-19',
        navigate: '',
        params: ''
      },
      {
        icon: {uri: 'https://i.ibb.co/yQR4MR0/more.png'},
        title: 'More',
        navigate: '',
        params: ''
      },
    ]

    const { isfetched } = this.state;
    return(
      <View style={styles.View1}>
       <View style={styles.View2}>
       {
        menus.map((data, index) => 
          <TouchableOpacity key={index} style={styles.iconWrap} activeOpacity={0.9} onPress={() => { 
            this.refs.loading1.show();
            setTimeout(() => {
              this.refs.loading1.close();
              this.props.navigation.navigate(data.navigate, {params: data })
            }, 2000);
          }}>
          <View style={[styles.tab, styles.shadow]}>
            <ShimmerPlaceHolder autoRun={true} duration={2000} visible={isfetched}  style={{...styles.iconShimmer, borderRadius: 35}}>
              <Image source={data.icon} style={styles.icon} />
            </ShimmerPlaceHolder>
          </View>
          <ShimmerPlaceHolder autoRun={true} duration={2000} visible={isfetched} style={{borderRadius: 10, width: 60, marginTop: 5}}>
            <Text style={styles.subTitle}>{data.title}</Text>
          </ShimmerPlaceHolder>
          </TouchableOpacity> 
        )
       }
       </View>

       <View style={styles.View3}>
       {
        menu.map((data, index) => 
          <TouchableOpacity key={index} style={styles.iconWrap} onPress={() => { 
            this.refs.loading1.show();
            setTimeout(() => {
              this.refs.loading1.close();
              this.props.navigation.navigate(data.navigate, {params: data })
            }, 2000);
          }}>
          <View style={[styles.shadow, styles.tab]}>
            <ShimmerPlaceHolder autoRun={true} duration={2000} visible={isfetched}  style={{...styles.iconShimmer, borderRadius: 35}}>
              <Image source={data.icon} style={styles.icon} />
            </ShimmerPlaceHolder>
          </View>
          <ShimmerPlaceHolder autoRun={true} duration={2000} visible={isfetched} style={{borderRadius: 10, width: 60, marginTop: 5}}>
            <Text style={styles.subTitle}>{data.title}</Text>
          </ShimmerPlaceHolder>
          </TouchableOpacity> 
        )
       }
        {/* <TouchableOpacity onPress={() => { actionSheetRef.current?.setModalVisible(); }}
        style={{right: 10, top: 10}}>
          <Image 
            source={{uri: 'https://img.icons8.com/clouds/100/000000/more.png'}}
            style={styles.icon}
          />
          <Text style={styles.subTitle}>More</Text>
        </TouchableOpacity> */} 
        <ActionSheet ref={actionSheetRef}>
          <View>
            <Text>AKU DAN KAMU INGIN INI ITU DAN KAMU INGIN ITU AKU BINGUNG HARUS BAGAI MANA WOW D,DKDKDKDKDKKDKDKDKD</Text>
          </View>
        </ActionSheet>
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: width, 
},
View2: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '93%',
},
View3: {
  flexDirection: 'row', 
  justifyContent: 'space-between',
  width: '93%',
  marginTop: -30
},
icon: {
  height: 45,
  width: 45,
  resizeMode: 'stretch',
},
iconShimmer: {
  height: 60,
  width: 60,
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
 shadow:{
    shadowColor: '#000',
    shadowRadius: 2.62,
    shadowOpacity: 0.23,
    shadowOffset:{width: 0, height: 2},
    elevation: 4,
    borderRadius: 15,
    backgroundColor: '#fff'
 },
 tab:{
     height: 70,
     width: 70,
     alignItems:'center',
     justifyContent: 'space-around',
     marginTop:20,
     borderRadius:10
 },
})