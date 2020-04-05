import React, { Component } from 'react'
import {createAppContainer, createStackNavigator, StackActions, NavigationActions, createSwitchNavigator, withNavigation} from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// TabBottomScreenTabbottom
import Home from '../screens/home/Home';
import TabBottomScreen from '../navigation/TabBottomScreen';
import TabTopScreen from '../navigation/TabTopScreen';
import CustomeNavigation from '../navigation/CustomeNavigation';

//catlist
import CatList from '../app/tabTop/CatList';
import MemberVip from '../screens/toko/member/MemberVip';

// Kategori
import Kendaraan from '../components/kendaraan/Kendaraan';
import Mainananak from '../components/anak&mainan/Mainananak';
import Pakaian from '../components/pakaian/Pakaian';
import Sarana from '../components/sarana/Sarana';
import Jas from '../components/pakaian/Jas';
import Kebaya from '../components/pakaian/Kebaya';
import Baju from '../components/anak&mainan/Baju';
import Mainan from '../components/anak&mainan/Mainan';
import Mobil from '../components/kendaraan/Mobil';
import Motor from '../components/kendaraan/Motor';
import Sepeda from '../components/kendaraan/Sepeda';
import Gedung from '../components/sarana/Gedung';

//Payment
import Pay from '../screens/payment/Pay';

// Toko
import Vendor from '../screens/toko/Vendor';
import Toko from '../screens/toko/Toko';

// Notifikasi
import Notifikasi from '../screens/notifikasi/Notifikasi';
import Message from '../app/message/Message';
import CallScreen from '../app/message/components/CallScreen';

// Auth
import Login from '../auth/Login';
import Registrasi from '../auth/Registrasi';
import Forgot from '../auth/Forgot';
import AuthLoadingScreen from '../auth/AuthLoadingScreen';
import EditProfil from '../auth/EditProfil';
import Profile from '../auth/Profile';

// Cart
import Cart from '../screens/cart/Cart';

// Component
import Search from '../screens/search/Search';
import Detail from '../screens/detail/Detail';

// sewabarang
import Tentang from '../components/sewabarang/Tentang';
import Privacy from '../components/sewabarang/Privacy';
import Faq from '../components/sewabarang/Faq';

// component

//testing
import Promo from '../screens/home/Promo'
import Lokasi from '../screens/lokasi/Lokasi';
import Tes from '../screens/Tes';





const RootRouterStack = createStackNavigator({

  CustomeNavigation: { 
    screen: CustomeNavigation,
     navigationOptions: {
      header: null
    }
  },  
  
  // TabBottomScreen: { 
    //   screen: TabBottomScreen,
    //    navigationOptions: {
    //     header: null
    //   }
    // },

    // Home: { 
    //   screen: Home,
    //   navigationOptions: { 
    //     header: null,
        
    //   }
    // },
    // Toko: { 
    //   screen: Toko,
    //   navigationOptions: { header: null, initialRouteName: 'Home'}
    // },
    // Cart: { 
    //   screen: Cart,
    //   navigationOptions: { header: null, initialRouteName: 'Home'}
    // },
    // Profile: { 
    //   screen: Profile,
    //   navigationOptions: { header: null, initialRouteName: 'Home'}
    // },
    Vendor: { 
      screen: Vendor,
      navigationOptions: {tabBarVisible: false}
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
    Promo: {
      screen: Promo,
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
    CatList: {
      screen: CatList,
      navigationOptions: {tabBarVisible: false, header: null}
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
    Mainananak: {
      screen: Mainananak,
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
  })


const AuthStack = createStackNavigator({
Login: {
      screen: Login,
      navigationOptions: {tabBarVisible: false}
  },
Registrasi: {
    screen: Registrasi,
    navigationOptions: {tabBarVisible: false}
  },
Forgot: {
    screen: Forgot,
    navigationOptions: {tabBarVisible: false}
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