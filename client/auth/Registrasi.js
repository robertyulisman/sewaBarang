import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import TouchableScale from 'react-native-touchable-scale';
import Loading from 'react-native-whc-loading';
import { Footer } from 'native-base';
import TabBottomScreen from '../navigation/TabBottomScreen';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GradientButton from 'react-native-gradient-buttons';
import axios from 'axios';
import { registerUser } from '../redux/actions/authAction';

const { height, width } = Dimensions.get('window');

class Registrasi extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
        tabBarVisible: false,
    });
    constructor(props) {
        super(props);
        this.state = {
            kabupaten: '',
            email: '',
            password: '',
            alamat: '',
            nama: '',
            errors: {},
            uploading: false,
            isLoading: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    registrasi = () => {
        const { nama, email, password, alamat, kabupaten } = this.state;
        const newUser = {
            nama,
            email,
            password,
            alamat,
            kabupaten,
        };

        this.props.registerUser(newUser, this.props.navigation);
    };

    render() {
        const { errors } = this.state;
        console.log('error', errors);

        return (
            <ScrollView style={styles.container}>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 50,
                    }}
                >
                    <Image
                        source={require('../images/LOGOREGIS.png')}
                        style={{ height: 50, width: 305 }}
                    />
                </View>
                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <View style={{ margin: 5 }}>
                            <TextInput
                                ref="firstinput"
                                label="Nama"
                                mode="outlined"
                                onChangeText={(nama) => this.setState({ nama })}
                                value={this.state.nama}
                                ref={(firstinput) => {
                                    this.attendee = firstinput;
                                }}
                                theme={{
                                    colors: {
                                        primary: 'blue',
                                        underlineColor: 'transparent',
                                    },
                                }}
                            />
                        </View>
                        {errors.nama && (
                            <Text style={{ color: 'red', marginLeft: 20 }}>
                                *{errors.nama}
                            </Text>
                        )}

                        <View style={{ margin: 5 }}>
                            <TextInput
                                label="Email"
                                mode="outlined"
                                onChangeText={(email) =>
                                    this.setState({ email })
                                }
                                value={this.state.email}
                                theme={{
                                    colors: {
                                        primary: 'blue',
                                        underlineColor: 'transparent',
                                    },
                                }}
                            />
                        </View>
                        {errors.email && (
                            <Text style={{ color: 'red', marginLeft: 20 }}>
                                *{errors.email}
                            </Text>
                        )}

                        <View style={{ margin: 5 }}>
                            <TextInput
                                label="Kabupaten"
                                mode="outlined"
                                onChangeText={(kabupaten) =>
                                    this.setState({ kabupaten })
                                }
                                value={this.state.kabupaten}
                                theme={{
                                    colors: {
                                        primary: 'blue',
                                        underlineColor: 'transparent',
                                    },
                                }}
                            />
                        </View>
                        {errors.kabupaten && (
                            <Text style={{ color: 'red', marginLeft: 20 }}>
                                *{errors.kabupaten}
                            </Text>
                        )}

                        <View style={{ margin: 5 }}>
                            <TextInput
                                label="Alamat"
                                mode="outlined"
                                {...this.props}
                                editable={true}
                                maxLength={200}
                                numberOfLines={4}
                                multiline={true}
                                onChangeText={(alamat) =>
                                    this.setState({ alamat })
                                }
                                value={this.state.alamat}
                                theme={{
                                    colors: {
                                        primary: 'blue',
                                        underlineColor: 'transparent',
                                    },
                                }}
                            />
                        </View>
                        {errors.alamat && (
                            <Text style={{ color: 'red', marginLeft: 20 }}>
                                *{errors.alamat}
                            </Text>
                        )}

                        <View style={{ margin: 5 }}>
                            <TextInput
                                label="Kata Sandi"
                                mode="outlined"
                                secureTextEntry={true}
                                onChangeText={(password) =>
                                    this.setState({ password })
                                }
                                value={this.state.password}
                                theme={{
                                    colors: {
                                        primary: 'blue',
                                        underlineColor: 'transparent',
                                    },
                                }}
                            />
                        </View>
                        {errors.password && (
                            <Text style={{ color: 'red', marginLeft: 20 }}>
                                *{errors.password}
                            </Text>
                        )}
                    </View>

                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            marginVertical: 50,
                        }}
                    >
                        <GradientButton
                            style={{ marginVertical: 10 }}
                            text="DAFTAR"
                            textStyle={{ fontSize: 20 }}
                            blue
                            gradientDirection="diagonal"
                            height={60}
                            width={320}
                            radius={5}
                            impact
                            impactStyle="Light"
                            onPressAction={this.registrasi}
                        />
                    </View>

                    <Footer>
                        <View
                            style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                flex: 1,
                                backgroundColor: '#ddd',
                                height: hp('13%'),
                                marginBottom: 20,
                            }}
                        >
                            <Text style={{ color: 'black', fontSize: 15 }}>
                                Sudah punya akun?
                            </Text>
                            <TouchableScale
                                onPress={() =>
                                    this.props.navigation.navigate('Login')
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
                                    Masuk disini
                                </Text>
                            </TouchableScale>
                        </View>
                    </Footer>
                </View>
                <Loading
                    ref="loading1"
                    image={require('../assets/icon.png')}
                    seasing={Loading.EasingType.ease}
                    imageSize={70}
                    size={70}
                />
            </ScrollView>
        );
    }
}

Registrasi.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

// const RegisterPageTwoWithRouter = withRouter(RegisterPageTwo);

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(Registrasi);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginBottom: 0,
        padding: 20,
        paddingBottom: 20,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    input: {
        fontSize: 16,
        height: 40,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 5,
    },
    inputAlamat: {
        fontSize: 16,
        height: 60,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 5,
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
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    LoginV: {
        flexDirection: 'row',
        marginTop: 30,
        height: 80,
        paddingLeft: 60,
        backgroundColor: '#ddd',
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
    },
});
