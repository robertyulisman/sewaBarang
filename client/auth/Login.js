import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Animated,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/authAction';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isReady: false,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.navigation.navigate('Home');
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        } 
    }


    login = () => {
        const { email, password } = this.state;
        const dataUser = {
            email,
            password,
        };

        this.props.loginUser(dataUser);
    };

    render() {
        const { errors } = this.state;

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='blue' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Selamat Datang</Text>
            <Text style={{fontSize: 12, color: '#fff'}}>Yuk, Masuk & Nikmati Fitur Dari Aplikasi Sewabarang!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <Text style={{...styles.text_footer, fontWeight: 'bold'}}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Masukan Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(email) =>
                        this.setState({ email })
                    }
                    value={this.state.email}
                />
                
                {/* <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View> */}
            </View>
            
            {errors.email && (
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{errors.email}</Text>
            </Animatable.View>
            )}

            <Text style={[styles.text_footer, {
                marginTop: 35, fontWeight: 'bold'
            }]}>Kata Sandi</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Masukan Kata Sandi"
                    secureTextEntry={true}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(password) =>
                        this.setState({ password })
                    }
                    value={this.state.password}
                />
                {/* <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {errors.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity> */}
            </View>
            {errors.password && (
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{errors.password}</Text>
            </Animatable.View>
            )}
            
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot')}>
                <Text style={{color: 'blue', marginTop:15}}>Lupa Kata Sandi?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={this.login}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>MASUK</Text>
            
                </TouchableOpacity>

                <View style={{flexDirection: 'row', top: 20, justifyContent: 'center'}}>
                    <Text>Belum punya akun?</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Registrasi')}>
                        <Text style={[styles.textSign, {
                            color: 'blue'
                        }]}> Daftar disini</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={{flexDirection: 'row', marginTop: 40, justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => Alert.alert( 'Coming Soon!')} style={{right: 5, flexDirection: 'row', height: 50, width: 150, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'blue'}}>
                    <Image 
                        source={{uri: 'https://i.imgur.com/Kmf37TT.png'}}
                        style={{height: 50, width: 50}}
                    />
                    <Text style={{fontSize: 14, color: '#000', fontWeight: 'bold'}}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert( 'Coming Soon!')} style={{left: 5, flexDirection: 'row', height: 50, width: 150, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'blue'}}>
                    <Image 
                        source={{uri: 'https://i.imgur.com/kTIrELw.png'}}
                        style={{height: 35, width: 35}}
                    />
                    <Text style={{fontSize: 14, color: '#000', fontWeight: 'bold'}}>  Google</Text>
                </TouchableOpacity>
            </View>

        </Animatable.View>
        </View>
        )
    }
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'blue'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'blue'
    },
    textSign: {
        fontSize: 15,
        fontWeight: 'bold'
    }
  });