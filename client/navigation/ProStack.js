import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';

import Tentang from '../components/sewabarang/Tentang';
import Privacy from '../components/sewabarang/Privacy';
import Faq from '../components/sewabarang/Faq';
import TabTopScreen from '../navigation/TabTopScreen';

const FilStack = createStackNavigator({
    TabTopScreen: {
        screen: TabTopScreen,
        navigationOptions: {
            header: null,
            headerStyle: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }
        }
    },
    Tentang: {
        screen: Tentang,
        navigationOptions: {
            header: null
        }
    },
    Privacy: {
        screen: Privacy,
        navigationOptions: {
            header: null
        }
    }
})

const AppNavigator = createAppContainer ( createSwitchNavigator (
    {
      FilStack: FilStack,
    },
  ));
  
  export default AppNavigator;