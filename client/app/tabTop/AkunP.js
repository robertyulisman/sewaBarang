import React, {Component} from 'react';  
import {View, Text, Dimensions, StyleSheet, Image, TouchableNativeFeedback} from 'react-native';  
import { Icon, ListItem } from 'react-native-elements';
import {Separator, Right, Left} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-swipeable';
import TouchableScale from 'react-native-touchable-scale';
import { Ionicons } from '@expo/vector-icons';
const {HEIGHT, WIDTH} = Dimensions.get('window');

export default class AkunP extends Component {
    
    constructor(props){
        super(props)
        this.state={
            leftActionActivated: false,
            toggle: false,
            index: 0,
            routes: [
              { key: 'first', title: 'Akun Penyewa' },
              { key: 'second', title: 'Akun Toko' },
            ],
            currentlyOpenSwipeable: null,
            isfetched: false,
            refreshing: false,
            isLoading: true,
            isVisible: false,
        }
    }

    handleScroll = () => {
        const {currentlyOpenSwipeable} = this.state;
    
        if (currentlyOpenSwipeable) {
          currentlyOpenSwipeable.recenter();
        }
    };
    render(){
        const {currentlyOpenSwipeable} = this.state;
        const itemProps = {
            onOpen: (event, gestureState, swipeable) => {
              if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
                currentlyOpenSwipeable.recenter();
              }
      
              this.setState({currentlyOpenSwipeable: swipeable});
            },
            onClose: () => this.setState({currentlyOpenSwipeable: null})
        };
        return(  
            <View style={{flex: 1}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>Nama</Text>
                        <Text>Gede Sutawan</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%', top: '5%'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>Email</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>Tanggal Lahir</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%', top: '5%'}}>
                        <Text>sutaone13@gmail.com</Text>
                        <Text>13 Maret 1998</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', top: '25%'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>Alamat</Text>
                        <Text style={{left: '3%'}}>Jl. Kepundung No.57, Dangin Puri Kaja, Kec. Denpasar Tim., Kota Denpasar, Bali</Text>
                    </View>
                    </View>
                    <View style={{width: WIDTH, height: 5, backgroundColor: '#ddd', top: '10%', justifyContent: 'center'}}/> 
                    <View style={{top: '10%'}}>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Tentang')}>
                        <ListItem
                            title="Tentang Kami"
                            containerStyle={styles.listItemContainer}
                            leftIcon={
                            <Icon
                            size={24}
                            name='information-outline'
                            type='material-community'
                            color='blue'
                            />
                            }
                        rightIcon={
                            <Icon
                            size={24}
                            name='ios-arrow-forward'
                            type='ionicon' 
                            color='grey'
                            />
                        }
                        />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Faq')}>
                        <ListItem
                            title="FAQ"
                            containerStyle={styles.listItemContainer}
                            leftIcon={
                            <Icon
                            size={24}
                            name='questioncircleo'
                            type='antdesign'
                            color='blue'
                            />
                            }
                        rightIcon={
                            <Icon
                            size={24}
                            name='ios-arrow-forward'
                            type='ionicon' 
                            color='grey'
                            />
                        }
                        />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Privacy')}>
                        <ListItem
                            title="Privacy Policy"
                            containerStyle={styles.listItemContainer}
                            leftIcon={
                            <Icon
                            size={24}
                            name='shield-outline'
                            type='material-community'
                            color='blue'
                            />
                            }
                        rightIcon={
                            <Icon
                            size={24}
                            name='ios-arrow-forward'
                            type='ionicon' 
                            color='grey'
                            />
                        }
                        />
                        </TouchableNativeFeedback>
                        <ListItem
                            title="Keluar"
                            containerStyle={styles.listItemContainer}
                            onPress={() => {
                            this.refs.loading1.show();
                            setTimeout(() => {
                                this.refs.loading1.close();
                                this.logout();
                            }, 2000);
                            }}
                        leftIcon={
                            <Icon
                            size={24}
                            name='logout'
                            type='simple-line-icon' 
                            color='blue'
                            />
                        }
                        rightIcon={
                            <Icon
                            size={24}
                            name='ios-arrow-forward'
                            type='ionicon' 
                            color='grey'
                            />
                        }
                    />
                    </View>
            </View>  
        )  
    }  
}  
AkunP.navigationOptions={  
    tabBarIcon:({tintColor, focused})=>(  
        <Icon  
            name={focused ? 'ios-home' : 'md-home'}  
            color={tintColor}  
            size={25}  
        />  
    )  
} 

const styles = StyleSheet.create({
    rightSwipeItem: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 20
    },
    listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
      },
    listItem: {
      height: 75,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
})