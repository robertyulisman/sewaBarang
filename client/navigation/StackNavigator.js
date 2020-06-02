import React, { Component } from 'react'
import {createAppContainer, createStackNavigator, StackActions, NavigationActions, createSwitchNavigator, withNavigation} from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// TabBottomScreenTabbottom
import CustomeNavigation from '../navigation/CustomeNavigation';

//Elektronik
import Elektronik from '../components/elektronik/Elektronik';
import Laptop from '../components/elektronik/Laptop';
import Kamera from '../components/elektronik/Kamera';

//Pakaian
import Pakaian from '../components/pakaian/Pakaian';
import Jas from '../components/pakaian/Jas';
import Kebaya from '../components/pakaian/Kebaya';

//Kids
import Kids from '../components/kids/Kids';
import Baju from '../components/kids/Baju';
import Mainan from '../components/kids/Mainan';

//Kendaraan
import Kendaraan from '../components/kendaraan/Kendaraan';
import Mobil from '../components/kendaraan/Mobil';
import Motor from '../components/kendaraan/Motor';
import Sepeda from '../components/kendaraan/Sepeda';

//Sarana
import Gedung from '../components/sarana/Gedung';
import Sarana from '../components/sarana/Sarana';

//Payment
import Pay from '../screens/payment/Pay';

// Toko
import Vendor from '../screens/toko/member/Vendor';
import MemberVip from '../screens/toko/member/MemberVip';
import SearchFeed from '../screens/toko/toko/SearchFeed';

// Notifikasi
import Notifikasi from '../screens/notifikasi/Notifikasi';
import Message from '../app/message/Message';
import CallScreen from '../app/message/components/CallScreen';

// Auth
import Login from '../auth/Login';
import Registrasi from '../auth/Registrasi';
import Forgot from '../auth/Forgot';
import EditProfil from '../auth/EditProfil';
import Profile from '../auth/Profile';
import AuthLoadingScreen from '../auth/AuthLoadingScreen';

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


const RootRouterStack = createStackNavigator({

    CustomeNavigation: { 
      screen: CustomeNavigation,
      navigationOptions: {
        header: null
      }
    }, 
    
    Vendor: { 
      screen: Vendor,
      navigationOptions: {tabBarVisible: false, header: null}
    },
    CallScreen: { 
      screen: CallScreen,
      navigationOptions: {tabBarVisible: false, header: null}
    },
    Notifikasi: {
      screen: Notifikasi,
      navigationOptions: {tabBarVisible: false}
    },
    MemberVip: {
      screen: MemberVip,
      navigationOptions: {tabBarVisible: false, header: null}
    },
    SearchFeed: {
      screen: SearchFeed,
      navigationOptions: {tabBarVisible: false, header: null}
    },
    Tes: {
      screen: Tes,
      navigationOptions: {tabBarVisible: false}
    },
    Pay: {
      screen: Pay,
      navigationOptions: {tabBarVisible: false}
    },
    Message: {
      screen: Message,
      navigationOptions: {tabBarVisible: false}
    },
    Kendaraan: {
      screen: Kendaraan,
      navigationOptions: {tabBarVisible: false}
    },
    Pakaian: { 
      screen: Pakaian,
      navigationOptions: {tabBarVisible: false}
    },
    Kids: {
      screen: Kids,
      navigationOptions: {tabBarVisible: false}
    },
    Baju: {
      screen: Baju,
      navigationOptions: {tabBarVisible: false}
    },
    Mainan: {
      screen: Mainan,
      navigationOptions: {tabBarVisible: false}
    },
    Sarana: {
      screen: Sarana,
      navigationOptions: {tabBarVisible: false}
    },
    Detail: {
      screen: Detail,
      navigationOptions: {tabBarVisible: false}
    },
    Jas: {
      screen: Jas,
      navigationOptions: {tabBarVisible: false}
    },
    Kebaya: {
      screen: Kebaya,
      navigationOptions: {tabBarVisible: false}
    },
    Mobil: {
      screen: Mobil,
      navigationOptions: {tabBarVisible: false}
    },
    Motor: {
      screen: Motor,
      navigationOptions: {tabBarVisible: false}
    },
    Sepeda: {
      screen: Sepeda,
      navigationOptions: {tabBarVisible: false}
    },
    Gedung: {
      screen: Gedung,
      navigationOptions: {tabBarVisible: false}
    },
    Search: {
       screen: Search,
       navigationOptions: {tabBarVisible: false, header: null}
     },
    EditProfil: {
      screen: EditProfil,
      navigationOptions: {tabBarVisible: false}
    },
    Tentang: {
      screen: Tentang,
      navigationOptions: {tabBarVisible: false}
    },
    Lokasi: {
      screen: Lokasi,
      navigationOptions: {tabBarVisible: false}
    },
    Privacy: {
      screen: Privacy,
      navigationOptions: {tabBarVisible: false}
    },
    Faq: {
      screen: Faq,
      navigationOptions: {tabBarVisible: false}
    },
    Elektronik: {
      screen: Elektronik,
      navigationOptions: {tabBarVisible: false, header: null}
    },
    Laptop: {
      screen: Laptop,
      navigationOptions: {tabBarVisible: false, header: null}
    },
    Kamera: {
      screen: Kamera,
      navigationOptions: {tabBarVisible: false, header: null}
    }
  })


const AuthStack = createStackNavigator({
Login: {
      screen: Login,
      navigationOptions: {tabBarVisible: false, header: null}
  },
Registrasi: {
    screen: Registrasi,
    navigationOptions: {tabBarVisible: false, header: null}
  },
Forgot: {
    screen: Forgot,
    navigationOptions: {tabBarVisible: false, header: null}
   },
})

const AppNavigator = createAppContainer ( createSwitchNavigator (
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    RootRouter: RootRouterStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default AppNavigator;