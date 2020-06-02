import React, { Component } from 'react';
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';

//TabBottom
import Home from '../screens/home/Home';
import Toko from '../screens/toko/Toko';
import Cart from '../screens/cart/Cart';
import Me from '../navigation/user/Me';
import LoginPage from '../navigation/user/LoginPage';
import SplashScreen from '../navigation/user/SplashScreen';

// Kategori
import Kendaraan from '../components/kendaraan/Kendaraan';
import Mainananak from '../components/kids/Mainananak';
import Pakaian from '../components/pakaian/Pakaian';
import Sarana from '../components/sarana/Sarana';
import Jas from '../components/pakaian/Jas';
import Kebaya from '../components/pakaian/Kebaya';
import Baju from '../components/kids/Baju';
import Mainan from '../components/kids/Mainan';
import Mobil from '../components/kendaraan/Mobil';
import Motor from '../components/kendaraan/Motor';
import Sepeda from '../components/kendaraan/Sepeda';
import Gedung from '../components/sarana/Gedung';

//Payment
import Pay from '../screens/payment/Pay';

// Toko
import Vendor from '../screens/toko/Vendor';
import MemberVip from '../screens/toko/member/MemberVip';

// Notifikasi
import Notifikasi from '../screens/notifikasi/Notifikasi';
import Message from '../app/message/Message';
import CallScreen from '../app/message/components/CallScreen';

// Auth
// import Login from '../auth/Login';
// import Registrasi from '../auth/Registrasi';
// import Forgot from '../auth/Forgot';
import EditProfil from '../auth/EditProfil';
import Profile from '../auth/Profile';

// Component
import Search from '../screens/search/Search';
import Detail from '../screens/detail/Detail';

// sewabarang
import Tentang from '../screens/privacy/Tentang';
import Privacy from '../screens/privacy/Privacy';
import Faq from '../screens/privacy/Faq';

//testing
import Tes from '../screens/Tes';

//Location
import Lokasi from '../screens/lokasi/Lokasi';
import LokasiToko from '../screens/lokasi/LokasiToko';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AppTabNavigator = createMaterialTopTabNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Beranda',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="home" color={tintColor} size={24} />
        )
      },
    },
    Toko: {
      screen: Toko,
      navigationOptions: {
        tabBarLabel: 'Feed',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="vector-arrange-above" color={tintColor} size={22} />
        )
      }
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        tabBarLabel: 'Order',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="local-mall" color={tintColor} size={22} />
        )
      }
    },
    Me: {
      screen: Me,
      navigationOptions: {
        tabBarLabel: 'Saya',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" color={tintColor} size={22} />
        )
      }
    },
  }, {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'grey',
      upperCaseLabel: false,
      labelStyle: {
        fontSize: 9,
        marginTop: 1
      },
      style: {
        backgroundColor: '#f2f2f2',
        elevation: 15,
        height: 50
      },
      indicatorStyle: {
        height: 0
      },
      showIcon: true
    }
  })

  const AppStackNavigator = createStackNavigator({
    Home: {
      screen: AppTabNavigator
    },
    Login: {
      screen: LoginPage
    },
    Registrasi: {
      screen: LoginPage,
    },
    EditProfil,
    Profile,
    Cart,
    Kendaraan,
    Mainananak,
    Mainan,
    Pakaian,
    Sarana,
    Jas,
    Kebaya,
    Baju,
    Mobil,
    Motor,
    Sepeda,
    Gedung,
    Pay,
    Vendor,
    MemberVip,
    Notifikasi,
    Message,
    CallScreen,
    Search,
    Detail,
    Tentang,
    Privacy,
    Faq,
    Lokasi,
    LokasiToko,
    Tes,
  }, {
    initialRouteName: 'Home',
    headerMode: 'none'
  })

  const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    App: AppStackNavigator
  });
  
  const AppNavigator = createAppContainer(InitialNavigator);
  
  export default AppNavigator;