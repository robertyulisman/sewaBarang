import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, StatusBar, Platform, RefreshControl, Dimensions, SafeAreaView, Animated } from 'react-native';
import { MaterialCommunityIcons, AntDesign, Ionicons, FontAwesome, Feather} from 'react-native-vector-icons';
import {withNavigation} from 'react-navigation';
import { Icon} from "react-native-elements";
import { Appbar } from 'react-native-paper';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import TouchableScale from 'react-native-touchable-scale';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loading from 'react-native-whc-loading';
import Swipeable from 'react-native-swipeable';

var {height, width} = Dimensions.get('window');

const menus = [
  {
    icon: {uri: 'https://i.ibb.co/6B3pvgC/gedung.png'},
    title: 'Gedung',
    navigate: 'Gedung',
    params: ''
  },
  // {
  //   icon: require('./img/1.png'),
  //   title: 'Motor',
  //   navigate: 'Motor',
  //   params: ''
  // },
  // {
  //   icon: require('./img/5.png'),
  //   title: 'Sepeda',
  //   navigate: 'Sepeda',
  //   params: ''
  // }
]

class Kendaraan extends Component {
  static navigationOptions = ({navigation}) => {
    return{
      header: null
    }
  }
  
constructor(props){
    super(props)
    this.state={
        leftActionActivated: false,
        toggle: false,
        currentlyOpenSwipeable: null,
        isfetched: false,
        refreshing: false,
        isLoading: true,
        isVisible: false,
        scrollY: new Animated.Value(0)
    }
}

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
    const marginTopAnimated = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [100, 0],
      extrapolate: "clamp"
    });

    return(
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'}/>
          <Image 
            source={{uri: 'https://i.imgur.com/g9ozTdG.png'}}
            style={{width: width + 30, height: 350, resizeMode: 'stretch', position: 'absolute'}}
          />
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{position: 'absolute', left: 10, top: 30, backgroundColor: this.state.yAxis > 50 ? 'transparent' : 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 50}}>
            <Feather 
              name="arrow-left" size={24} color={this.state.yAxis > 50 ? 'grey' : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('')} style={{position: 'absolute', right: 20, top: 30, backgroundColor: this.state.yAxis > 50 ? 'transparent' : 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 50}}>
            <Feather 
              name="filter" size={24} color={this.state.yAxis > 50 ? 'grey' : 'white'}
            />
          </TouchableOpacity>
            <Animated.ScrollView
              style={[
                styles.scrollView,
                {
                  transform: [{ translateY: marginTopAnimated }]
                }
              ]}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: { contentOffset: { y: this.state.scrollY } }
                  }
                ],
                { useNativeDriver: true }
              )}
            >
          <View style={{ height: 1000}}>
          {
            menus.map((data, index) => 
          <Swipeable
              style={{top: 40}}
              rightButtons={[
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Tentang')} style={[styles.rightSwipeItem, {backgroundColor: 'white'}]}>
                  <Ionicons 
                    name="ios-information-circle" size={25} color='blue'
                  />
                </TouchableOpacity>,
                <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => this.props.navigation.navigate(data.navigate, {params: data })} style={[styles.rightSwipeItem, {backgroundColor: 'blue'}]}>
                  <Ionicons 
                    name="ios-arrow-forward" size={25} color='white'
                  />
                </TouchableOpacity>
              ]}>
              <View style={[styles.listItem, {backgroundColor: 'transparent'}]}>
                <Image
                  source={data.icon}
                  style={{height: 40, width: 40, resizeMode: 'stretch'}}
                />
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>{data.title}</Text>
                <Text style={{color: '#ddd', fontSize: 10}}> Geser ke kiri untuk melihat informasi</Text>
              </View>
            </Swipeable>
            )}
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    )
  }
}

export default withNavigation(Kendaraan)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    backgroundColor: "#FFF",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    ...Platform.select({
      ios: {
        
      },
      android: {
        top: 20
      }
    })
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%'
  },
  
  header: {
    ...Platform.select({
      ios: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute'
      },
      android: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        marginTop: 30,
        position: 'absolute'
      }
    })
  },
  headerImg1: {
    ...Platform.select({
      ios: {
        height: 45,
        width: 70,
        resizeMode: 'stretch',
        left: 3,
      },
      android: {
        height: 50,
        width: 50,
        resizeMode: 'stretch',
        left: 5
      }
    })
  },
  headerImg2: {
    ...Platform.select({
      ios: {
        height: 50,
        width: 50,
        resizeMode: 'stretch',
        left: -15.5
      },
      android: {
        height: 50,
        width: 50,
        resizeMode: 'stretch',
        left: 7.5
      }
    })
  },
  icon: {
    height: 50,
    width: 50,
    resizeMode: 'stretch'
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 80,
  },
})

