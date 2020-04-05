import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground
} from 'react-native';
import Carousel, { Pagination } from 'react-native-anchor-carousel'; 

const { width } = Dimensions.get('window');

const data = [
  {
    uri: 'https://creativebonito.com/wp-content/uploads/2018/08/Online-Shopping.png',
  },
  {
    uri: 'https://serving.photos.photobox.com/62668354e30a13bc93c0298637f069018ac6e8a9616e5d41f65590f13210ae41ae89abc5.jpg',
  },
  {
    uri: 'https://external-preview.redd.it/5vU2lOz6BfhuEedYaMS1OkF2x8bHPmDh8T5ZXj6xp30.jpg?width=1024&height=512&auto=webp&s=2e0609715cf77162a2f9499e80b6e2615ef55e90',
  },
];

export default class IklanSlider extends Component {
  renderItem = ({ item, index }) => {
    const { uri, title, content } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}
      >
        <ImageBackground
          source={{ uri: uri }}
          style={styles.imageBackground}
        >
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Carousel
        data={data}
        renderItem={this.renderItem}
        itemWidth={0.7 * width}
        inActiveOpacity={0.3}
        autoplay
        containerWidth={width - 10}
        ref={(c) => {
          this.numberCarousel = c;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    backgroundColor: 'white',

  },
  item: {
    borderWidth: 0.5,
    flex: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    elevation: 1,
  },
  imageBackground: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: 'white',
    width: 200,
    height: 100
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  rightText: { color: 'white' },
  lowerContainer: {
    flex: 1,
    margin: 10
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  contentText: { 
    fontSize:12,
    color: 'white'
  }
});
