import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';

export default class Forgot extends React.Component{
	static navigationOptions = ({navigation}) => {
        return {
			header: null
        };
    };
    
  constructor(props){
    super(props);
    this.state={
      typing_email: false,
      typing_password: false,
      animation_login : new Animated.Value(width-40),
      enable:true
    }
  }

  _foucus(value){
    if(value=="email"){
      this.setState({
        typing_email: true,
        typing_password: false
      })
    }
    else{
      this.setState({
        typing_email: false,
        typing_password: true
      })
    }
  }

  _typing(){
    return(
      <TypingAnimation 
        dotColor="#93278f"
        style={{marginRight:25}}
      />
    )
  }

  _animation(){
    Animated.timing(
      this.state.animation_login,
      {
        toValue: 40,
        duration: 250
      }
    ).start();

    setTimeout(() => {
      this.setState({
        enable:false,
        typing_email: false,
        typing_password: false
      })
    }, 150);
  }

  render(){
    const width = this.state.animation_login;
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={'blue'} barStyle="light-content" />
          <View style={styles.header}>
              <ImageBackground
                source={{uri: 'https://i.imgur.com/IE5Gl7I.png'}}
                tintColor='blue'
                style={styles.imageBackground}
              >
                <Text style={{
                  color:'white',
                  fontWeight:'bold',
                  fontSize: 20,
                  textAlign: 'center'
                }}>Selamat Datang Di Layanan</Text>
                <Text style={{lineHeight: 30, fontSize: 20, color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Aplikasi Sewabarang</Text>
              </ImageBackground>
          </View>
          <View style={styles.footer}>
                <Text style={[styles.title,{
                  marginTop:50
                }]}>Email</Text>
                <View style={styles.action}>
                    <TextInput 
                      placeholder="Masukan email"
                      style={styles.textInput}
                      onFocus={()=>this._foucus("email")}
                    />

                </View>

                <TouchableOpacity
                onPress={()=>this._animation()}>
                  <View style={styles.button_container}>
                        <Animated.View style={[styles.animation,{
                          width
                        }]}>
                          {this.state.enable ?
                            <Text style={styles.textLogin}>Kirim</Text>
                            :
                            <Animatable.View
                            animation="bounceIn"
                            delay={50}>
                              <FontAwesome 
                                name="check"
                                color="white"
                                size={20}
                              />
                            </Animatable.View>
                          }
                        </Animated.View >
                  </View>
                </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
    justifyContent:'center'
  },
  header: {
    flex:1,
  },
  footer: {
    flex:2,
    padding:20
  },
  imageBackground:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:"100%",
    height:'100%'
  },
  title: {
    color:'black',
    fontWeight:'bold'
  },
  action: {
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#f2f2f2'
  },
  textInput: {
    flex:1,
    marginTop:5,
    paddingBottom:5,
    color:'gray'
  },
  button_container: {
    alignItems: 'center',
    justifyContent:'center'
  },
  animation: {
    backgroundColor:'blue',
    paddingVertical:10,
    marginTop:30,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center'
  },
  textLogin: {
    color:'white',
    fontWeight:'bold',
    fontSize:18
  },
  signUp: {
    flexDirection:'row',
    justifyContent:'center',
    marginTop:20
  }
});