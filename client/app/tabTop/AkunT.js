import React, {Component} from 'react';  
import {View,Text} from 'react-native';  
import Icon from 'react-native-vector-icons/Ionicons';  
export default class AkunT extends Component{  
    render(){  
        return(  
            <View>  
                <Text>this is AkunT screen</Text>  
            </View>  
        )  
    }  
}  
AkunT.navigationOptions={  
    tabBarIcon:({tintColor, focused})=>(  
        <Icon  
            name={focused ? 'ios-person' : 'md-person'}  
            color={tintColor}  
            size={25}  
        />  
    )  
}  