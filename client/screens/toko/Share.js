import React, {Component} from 'react';
import {View, Image, Text, AppRegistry, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Linking} from 'react-native';
import { EvilIcons, Entypo, FontAwesome } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';
import {LoginButton, ShareDialog} from 'react-native-fbsdk';

export default class Share extends Component {
  constructor(props) {
    super(props);
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: 'https://www.facebook.com/',
      contentDescription: 'Facebook sharing is easy!'
    };

    this.state = {shareLinkContent: shareLinkContent,};
  }

  shareLinkWithShareDialog() {
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          alert('Share cancelled');
        } else {
          alert('Share success with postId: ' + result.postId);
        }
      },
      function(error) {
        alert('Share fail with error: ' + error);
      }
    );
  }
  render(){
    return(
      <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
           <Icon
                name="like1"
                size={20}
                color='white'
                style={{paddingLeft: -10, marginTop: -2}}
              />
            <Text style={{paddingLeft: 5, color: 'white'}}>like</Text>

             <FontAwesome
                name="comment"
                size={20}
                color='white'
                style={{paddingLeft: 13}}
              />
            <Text style={{paddingLeft: 5, color: 'white'}}>comment</Text>

            <Entypo
                name="share"
                size={20}
                color='white'
                style={{paddingLeft: 100}}
                onPress={this.shareLinkWithShareDialog.bind(this)}
              />
             <Text style={{paddingLeft: 5, color: 'white'}}>share</Text>
        
           </View>
      </View>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  TitleText: {
    fontSize: 22,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom: 20
  },
  SubTitle: {
    fontSize: 18,
    textAlign:'center',
    marginBottom: 10
  },
  StyleTitle: {
    fontSize: 22,
    textAlign:'center',
    marginBottom: 10
  }
});