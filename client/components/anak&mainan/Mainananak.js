import React, { Component } from 'react'
import { Text, View, StyleSheet, Animated, Platform, TouchableOpacity, Image, Switch, ScrollView, Alert, AppRegistry, Dimensions, TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import {createStackNavigator} from 'react-native-navigation';

const {height, width} = Dimensions.get('window')

export default class Mainananak extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#F5F5F5',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }; 
  
  render() {
    return(
      <ScrollView style={styles.scroll}>
      <View style={styles.userRow}>
        <View style={styles.userImage}>
            <Image 
              source={require('../anak&mainan/ButtonAnak.png')}
              style={{height: 100, width: 100}}
            />
          </View>
          <View style={{flexWrap: 'wrap'}}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Anak & Mainan</Text>
            <Text style={{ fontSize: 13,color: '#000', width: '70%'}}>Berikut sub kategori yang terkait dengan kategori Anak & Mainan</Text>
          </View>
      </View>
      <View>
      <TouchableHighlight onPress={() => this.props.navigation.navigate('Baju')} underlayColor="#F5F5F5">
          <ListItem
            containerStyle={styles.listItemContainer}
            subtitle={
            <View style={styles.subtitleView}>
              <Image 
                source={require('./ButtonBaju.png')}
                style={{height: 75, width: 75, paddingLeft: -30}}
              />
              <Text style={styles.textt}>Baju Anak</Text>
            </View>
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
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.props.navigation.navigate('Mainan')} underlayColor="#F5F5F5">
          <ListItem
            containerStyle={styles.listItemContainer}
            subtitle={
            <View style={styles.subtitleView}>
              <Image 
                source={require('./ButtonMainan.png')}
                style={{height: 75, width: 75, paddingLeft: -30}}
              />
              <Text style={styles.textt}>Mainan</Text>
            </View>
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
        </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#F5F5F5',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 15,
    paddingTop: 6,
    margin: 5
  },
  userImage: {
    marginRight: 5,
    marginTop: 15,
  },
  listItemContainer: {
    height: 90,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  subtitleView: {
    flexDirection: 'row',
  },
  textt: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 10
  }
})