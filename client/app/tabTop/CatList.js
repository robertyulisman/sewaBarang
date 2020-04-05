import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Platform,
  Alert,
  StatusBar
} from 'react-native';

import AppNavigator from '../../navigation/TabTopScreen';

export default class CatList extends Component {
  render() {
    return (
        <AppNavigator/>  
    );
  }
}

const styles = StyleSheet.create({  
  wrapper: {  
      flex: 1,  
  },  
  header:{  
      flexDirection: 'row',  
      alignItems: 'center',  
      justifyContent: 'space-between',  
      backgroundColor: 'red',  
      paddingHorizontal: 18,  
      paddingTop: 5,  
  }  
});  