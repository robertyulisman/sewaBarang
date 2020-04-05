import React from 'react';  
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation';  
import AkunP from "../app/tabTop/AkunP";
import AkunT from "../app/tabTop/AkunT";   
  
const AppNavigator = createMaterialTopTabNavigator(  
    {  
        AkunP: AkunP,  
        AkunT: AkunT,  
    },  
    {  
        tabBarOptions: {  
            activeTintColor: 'blue',
            inactiveTintColor: 'grey',
            indicatorStyle: {
            backgroundColor: 'blue',
        },  
            showIcon: false,  
            showLabel:true,  
            style: {  
                backgroundColor:'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }  
        }, 
    }  
)  
export default createAppContainer(AppNavigator);  