import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ActivityIndicator,
    ToastAndroid,
    TouchableOpacity,
    Text,
    Keyboard,
    Alert,
    TouchableHighlight,
    AsyncStorage,
    Dimensions,
    SafeAreaView,
} from 'react-native';
// import Dimensions from 'Dimensions';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import Loading from 'react-native-whc-loading';
import { TextInput, TextInputOutlined, Theme } from 'react-native-paper';
import Line from '../components/line/Line';
import GradientButton from 'react-native-gradient-buttons';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import TouchableScale from 'react-native-touchable-scale';
import KeyboardStickyView from 'react-native-keyboard-sticky-view';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/authAction';

const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat,
} = Animated;

const { height, width } = Dimensions.get('window');

function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position,
    ]);
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isReady: false,
            errors: {},
        };

        this.buttonOpacity = new Value(1);

        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(
                                this.buttonOpacity,
                                runTiming(new Clock(), 1, 0),
                            ),
                        ),
                    ]),
            },
        ]);

        this.onCloseState = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(
                                this.buttonOpacity,
                                runTiming(new Clock(), 0, 1),
                            ),
                        ),
                    ]),
            },
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP,
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3 - 130, 0],
            extrapolate: Extrapolate.CLAMP,
        });

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP,
        });

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP,
        });

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP,
        });

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP,
        });
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
        // var email = this.state.email;
        // var password = this.state.password;
        // return fetch('http://192.168.4.7/api/sewabarang/index.php/auth/login', {
        //     method: 'post',
        //     headers: new Headers({
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     }),
        //     body: 'email=' + email + '&password=' + password,
        // })
        // .then((response) => response.json())
        // .then((responseJson) => {
        //     this.refs.loading1.show();
        //     setTimeout(() => {
        //         this.refs.loading1.close();
        //         if (responseJson) {
        //             let email = this.state.email;
        //             AsyncStorage.setItem('email', email);
        //             //untuk menyimpan datauser y login /
        //             this.props.navigation.navigate('Home');
        //         } else {
        //             ToastAndroid.show('responseJson', ToastAndroid.SHORT);
        //         }
        //     }, 2000);
        // })
        // .catch((error) => {
        //     console.error(error);
        // });
    };

    static navigationOptions = {
        header: null,
        tabBarVisible: false,
    };

    async _loadAssetsAsync() {
        const imageAssets = cacheImages([
            require('../images/facebook.png'),
            require('../images/Google_icon.png'),
            require('../images/BG.jpg'),
        ]);

        await Promise.all([...imageAssets]);
    }

    render() {
        const { errors } = this.state;

        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateY: this.bgY }],
                    }}
                >
                    <Svg height={height + 50} width={width}>
                        <ClipPath id="clip">
                            <Circle r={height + 50} cx={width / 2} />
                        </ClipPath>
                        <Image
                            href={require('../images/BG.jpg')}
                            height={height + 50}
                            width={width}
                            preserveAspectRatio="xMidYMid slice"
                            clipPath="url(#clip)"
                        />
                    </Svg>
                </Animated.View>
                <View style={{ height: height / 3, justifyContent: 'center' }}>
                    <TapGestureHandler
                        onHandlerStateChange={this.onStateChange}
                    >
                        <Animated.View
                            style={{
                                ...styles.button,
                                opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }],
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'white',
                                }}
                            >
                                MASUK
                            </Text>
                        </Animated.View>
                    </TapGestureHandler>

                    <Animated.View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 20,
                        }}
                    >
                        <TouchableScale>
                            <Animated.View
                                style={{
                                    ...styles.buttonF,
                                    backgroundColor: 'white',
                                    opacity: this.buttonOpacity,
                                    transform: [{ translateY: this.buttonY }],
                                }}
                            >
                                <Svg height={45} width={45}>
                                    <Image
                                        href={require('../images/facebook.png')}
                                        height={45}
                                        width={45}
                                    />
                                </Svg>
                                {/* <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Facebook</Text> */}
                            </Animated.View>
                        </TouchableScale>

                        <Animated.View
                            style={{
                                opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }],
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 10,
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                Atau
                            </Text>
                        </Animated.View>

                        <TouchableScale>
                            <Animated.View
                                style={{
                                    ...styles.buttonG,
                                    backgroundColor: 'white',
                                    opacity: this.buttonOpacity,
                                    transform: [{ translateY: this.buttonY }],
                                }}
                            >
                                <Svg height={45} width={45}>
                                    <Image
                                        href={require('../images/Google_icon.png')}
                                        height={45}
                                        width={45}
                                    />
                                </Svg>
                                {/* <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Google</Text> */}
                            </Animated.View>
                        </TouchableScale>
                    </Animated.View>

                    <Animated.View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 10,
                            opacity: this.buttonOpacity,
                            transform: [{ translateY: this.buttonY }],
                        }}
                    >
                        <Text style={{ color: 'black', fontSize: 15 }}>
                            Belum punya akun?
                        </Text>
                        <TouchableScale
                            onPress={() =>
                                this.props.navigation.navigate('Registrasi')
                            }
                        >
                            <Text
                                style={{
                                    color: 'blue',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}
                            >
                                {' '}
                                Daftar disini
                            </Text>
                        </TouchableScale>
                    </Animated.View>

                    {/* <Animated.View style={{opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }], justifyContent: 'center', alignItems: 'center', marginVertical: 3}}>
          <TouchableScale onPress={() => this.props.navigation.navigate('Home')}>
            <Animated.View style={{ opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }], 
              justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', height: 30, width: 90, borderRadius: 30}}>
              <Text style={{color: 'white', fontSize: 15}}>Get Started</Text>
            </Animated.View>
          </TouchableScale>
        </Animated.View> */}

                    <Animated.View
                        style={{
                            zIndex: this.textInputZindex,
                            opacity: this.textInputOpacity,
                            transform: [{ translateY: this.textInputY }],
                            height: height / 3,
                            ...StyleSheet.absoluteFill,
                            top: null,
                            justifyContent: 'center',
                        }}
                    >
                        <TapGestureHandler
                            onHandlerStateChange={this.onCloseState}
                        >
                            <Animated.View style={styles.closeButton}>
                                <Animated.Text
                                    style={{
                                        fontSize: 15,
                                        transform: [
                                            {
                                                rotate: concat(
                                                    this.rotateCross,
                                                    'deg',
                                                ),
                                            },
                                        ],
                                    }}
                                >
                                    X
                                </Animated.Text>
                            </Animated.View>
                        </TapGestureHandler>

                        <Animated.View style={{ margin: 20, top: -20 }}>
                            <TextInput
                                label="Email"
                                mode="outlined"
                                ref={(input) => {
                                    this.fifthTextInput = input;
                                }}
                                onChangeText={(email) =>
                                    this.setState({ email })
                                }
                                value={this.state.email}
                                autoCorrect={false}
                                autoCapitalize="none"
                                theme={{
                                    colors: {
                                        primary: 'blue',
                                        underlineColor: 'transparent',
                                    },
                                }}
                            ></TextInput>
                            {errors.email && (
                                <Text style={{ color: 'red', marginLeft: 20 }}>
                                    *{errors.email}
                                </Text>
                            )}

                            <TextInput
                                label="Password"
                                mode="outlined"
                                ref={(input) => {
                                    this.fifthTextInput = input;
                                }}
                                secureTextEntry={true}
                                onChangeText={(password) =>
                                    this.setState({ password })
                                }
                                value={this.state.password}
                                autoCapitalize="none"
                                theme={{
                                    colors: {
                                        primary: 'blue',
                                        underlineColor: 'transparent',
                                    },
                                }}
                            ></TextInput>
                            {errors.password && (
                                <Text style={{ color: 'red', marginLeft: 20 }}>
                                    *{errors.password}
                                </Text>
                            )}
                        </Animated.View>

                        <Animated.View style={{ top: -30, left: 220 }}>
                            <TouchableScale
                                onPress={() =>
                                    this.props.navigation.navigate('Forgot')
                                }
                            >
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 15,
                                        color: 'black',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Lupa Kata Sandi ?
                                </Text>
                            </TouchableScale>
                        </Animated.View>

                        <Animated.View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: -15,
                            }}
                        >
                            <TouchableHighlight
                                onPress={this.login}
                                underlayColor="blue"
                                style={{
                                    width: '85%',
                                    height: '50%',
                                    borderRadius: 20,
                                    backgroundColor: 'blue',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Animated.View
                                    style={{
                                        width: '85%',
                                        height: '50%',
                                        borderRadius: 20,
                                        backgroundColor: 'blue',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        MASUK
                                    </Text>
                                </Animated.View>
                            </TouchableHighlight>
                        </Animated.View>
                    </Animated.View>
                </View>
                <Loading
                    ref="loading1"
                    image={require('../assets/icon.png')}
                    seasing={Loading.EasingType.ease}
                    imageSize={70}
                    size={70}
                />
            </View>
        );
    }
}

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
        backgroundColor: 'white',
        justifyContent: 'flex-end',
    },
    backgroundImage: {
        width: 360,
        height: '85%',
        resizeMode: 'stretch',
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -100,
        left: width / 2 - 20,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 5,
    },
    content: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 140,
    },
    inputContainer: {
        marginTop: 160,
        width: 330,
    },
    input: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 137,
        margin: 10,
    },
    buttonContainer: {
        alignSelf: 'stretch',
        margin: 20,
        padding: 20,
        backgroundColor: 'blue',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    button: {
        backgroundColor: 'blue',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 3,
    },
    buttonF: {
        backgroundColor: 'white',
        height: 45,
        width: 45,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 3,
    },
    buttonG: {
        backgroundColor: 'white',
        height: 50,
        width: 50,
        marginHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    LoginV: {
        flexDirection: 'row',
        marginTop: 30,
        paddingLeft: 20,
        backgroundColor: '#ddd',
        width: 360,
        height: 80,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
