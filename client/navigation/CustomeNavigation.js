import * as React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, Image} from 'react-native';
import { FlexibleTabBarComponent, withCustomStyle } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
import { AnimatedCircleBarComponent } from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import Home from '../screens/home/Home'
import Toko from '../screens/toko/toko/Toko'
import Cart from '../screens/cart/Cart'
import Profile from '../auth/Profile'
import addButton from '../navigation/addButton';

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    },
  },
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <Image source={{uri: 'https://i.ibb.co/w0k60dn/homepage.png'}} style={{ height: 23, width: 23, tintColor: focused ? 'blue' : 'grey', resizeMode: 'stretch' }} />
  ),
};

const TokoStack = createStackNavigator({
  Home: {
    screen: Toko,
    navigationOptions: {
      header: null
    },
  },
});

TokoStack.navigationOptions = {
  tabBarLabel: 'Toko',
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <Image source={{uri: 'https://i.ibb.co/yy8zj3K/store.png'}} style={{ height: 22, width: 22, tintColor: focused ? 'blue' : 'grey', resizeMode: 'stretch' }} />
  ),
};

const addButtonStack = createStackNavigator ({
    addButton: {
    screen: () => null,
    navigationOptions: {
        // tabBarIcon: <addButton />
        header: null
    }
  }
});

addButtonStack.navigationOptions = {
  tabBarLabel: 'Other',
  tabBarIcon: ({focused} : { focused: boolean }) => (
  <View><addButton/></View>
  ),
}

const CartStack = createStackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: {
      
    },
  },
});

CartStack.navigationOptions = {
  tabBarLabel: 'Order',
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <Image source={{uri: 'https://i.ibb.co/KKfW8xt/orders.png'}} style={{ height: 23, width: 23, tintColor: focused ? 'blue' : 'grey', resizeMode: 'stretch' }} />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null
    },
  },
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Akun',
  tabBarIcon: ({ focused }: { focused: boolean }) => (
<Image source={{uri: 'https://i.ibb.co/jVmGdDj/user.png'}} style={{ height: 23, width: 23, tintColor: focused ? 'blue' : 'grey', resizeMode: 'stretch' }} />
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
    })(FlexibleTabBarComponent),
  },
);

export default createAppContainer(Navigation)