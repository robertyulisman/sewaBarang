import * as React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, Image} from 'react-native';
import { FlexibleTabBarComponent, withCustomStyle } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
import { AnimatedCircleBarComponent } from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import Home from '../screens/home/Home'
import Toko from '../screens/toko/Toko'
import Cart from '../screens/cart/Cart'
import Profile from '../auth/Profile'

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  },
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Image source={require('../images/home.png')} style={{ height: 25, width: 25 }} />
  ),
};

const TokoStack = createStackNavigator({
  Home: {
    screen: Toko,
    navigationOptions: {
      title: 'Toko',
    },
  },
});

TokoStack.navigationOptions = {
  tabBarLabel: 'Toko',
  tabBarIcon: ({ focused }) => (
    <Image source={require('../images/store.png')} style={{ height: 25, width: 25}} />
  ),
};

const CartStack = createStackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: {
      title: 'Keranjang',
    },
  },
});

CartStack.navigationOptions = {
  tabBarLabel: 'Keranjang',
  tabBarIcon: ({ focused }) => (
    <Image source={require('../images/cart1.png')} style={{ height: 30, width: 30}} />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Akun',
    },
  },
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Akun',
  tabBarIcon: ({ focused }) => (
    <Image source={require('../images/person.png')} style={{ height: 25, width: 25 }} />
  ),
};

const Navigation = createBottomTabNavigator(
  {
    HomeStack,
    TokoStack,
    CartStack,
    ProfileStack
  },
  {
    tabBarComponent: withCustomStyle({
        style: {
            backgroundColor: 'white',
            height: 50
        },
    })(AnimatedCircleBarComponent),
  },
);

export default createAppContainer(Navigation)