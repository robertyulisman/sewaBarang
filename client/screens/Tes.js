import * as React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import Constants from 'expo-constants';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    image:'https://ae01.alicdn.com/kf/HTB1ureEPXXXXXaTapXXq6xXFXXXB/Printemps-automne-mode-casual-hommes-blazer-costumes-top-brand-hommes-surv-tement-hommes-formelle-veste-manteaux.jpg_640x640.jpg',
    title: 'Printemps automne mode casual',
    shop: 'Amazon',
    price: 58.9,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRtQnw_MXzrDzjLbYaTVtzT1zLuE_bONW0Mp1UCV6tUwXaBIQn',
    title: 'Pluz men Blazer ',
    shop: 'Ebay',
    price: 23.5,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdE3Cl-oH7OQ9jEVXC0TiUp5IIYiQrE2uan0Fd_M94vcprNuV1',
    title: 'Aponia Projekt Kapturem Męska',
    shop: 'Aliexpress',
    price: 28.9,
  },
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
