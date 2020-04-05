
import React, { Component } from 'react';
import { StyleSheet, View, Animated, Text, TouchableOpacity, Dimensions} from 'react-native';
import Swipeable from 'react-native-swipeable';

const catImage = { uri: 'https://www.creativefabrica.com/wp-content/uploads/2019/01/Trusted-Marketplace-Illustration-by-MatFine-580x368.jpg' };

const IMAGE_HEIGHT = 300;
const {height, width} = Dimensions.get('window')

export default class MemberVip extends Component {


  constructor(props) {
    super(props)
      this.state={
        leftActionActivated: false,
        toggle: false,
      }
      
  }

  scrollAnimatedValue = new Animated.Value(0);

  componentDidMount() {
   
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={{height: 30, backgroundColor: 'blue'}}/>
        <Animated.Image source={catImage} style={[styles.catImage, {
          transform: [
            {translateY: this.scrollAnimatedValue.interpolate({
              inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
              outputRange: [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT / 2],
              extrapolateRight: 'clamp',
            })},
            {scale: this.scrollAnimatedValue.interpolate({
              inputRange: [-IMAGE_HEIGHT, 0],
              outputRange: [2, 1],
              extrapolateRight: 'clamp',
            })},
          ],
        }]}/>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollAnimatedValue }} }],
           
            { useNativeDriver: true },
          )}
          contentContainerStyle={styles.scrollViewContentContainer}
          scrollEventThrottle={8}
        >
        <View style={styles.card}>

        </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

const FakeItem = () => <View style={styles.fakeItemContainer} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    height: height, 
    width: width, 
    backgroundColor: 'white', 
    borderTopRightRadius: 20, 
    borderTopLeftRadius: 20, 
    borderColor: 'grey', 
    shadowRadius: 2,
    shadowOffset: {
    width: 0,
    height: -3,
    },
    shadowColor: '#000000',
    elevation: 10,
  },
  scrollViewContentContainer: {
    marginTop: IMAGE_HEIGHT,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: 10,
  },
  fakeItemContainer: {
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#dedede',
  },
  catImage: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: IMAGE_HEIGHT,
    alignSelf: 'center',
  },
  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
});
