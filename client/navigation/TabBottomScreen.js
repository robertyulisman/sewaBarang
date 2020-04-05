import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from '../screens/home/Home'
import Toko from '../screens/toko/Toko'
import Cart from '../screens/cart/Cart'
import Profile from '../auth/Profile'


const AppTabNavigator = createBottomTabNavigator({
  Home:{
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'BERANDA',
      tabBarIcon: ({tintColor}) => (
        <FontIcon
        name="home" size={24} color={tintColor}
        />
      )
    }
  },
  Toko: {
    screen: Toko,
    navigationOptions: {
      tabBarLabel: 'TOKO',
      tabBarIcon: ({tintColor}) => (
        <FontIcon
        name="toko" size={24} color={tintColor}
        />
      )
    }
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      tabBarLabel: 'KERANJANG',
      tabBarIcon: ({tintColor}) => (
        <FontIcon 
        name="cart" size={24} color={tintColor}
        />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'AKUN',
      tabBarIcon: ({tintColor}) => (
        <FontIcon
        name="akun" size={24} color={tintColor}
        />
      )
    }
  }
},{
    animationEnabled: true
  },
  {
  tabBarOptions:{
    activeTintColor: 'blue',
    inactiveTintColor: 'grey',
    style: {
        backgroundColor: '#F5F5F5',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
    }
  },
});

export default createAppContainer(AppTabNavigator) //kan sudah d export nah ini baru kita panggil di stack nav


