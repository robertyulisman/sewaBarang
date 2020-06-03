import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
            tgl_lahir: '',
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
        const {
            nama,
            email,
            password,
            alamat,
            kabupaten,
            tgl_lahir,
        } = this.state;
        const newUser = {
            nama,
            email,
            password,
            alamat,
            kabupaten,
            tgl_lahir,
        };

        this.props.registerUser(newUser, this.props.navigation);
    };

    render() {
        const { errors } = this.state;
        //console.log('error', errors);

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}>
                        Daftar & Lengkapi Form
                    </Text>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text
                            style={{
                                ...styles.text_footer,
                                fontWeight: 'bold',
                            }}
                        >
                            Nama Lengkap
                        </Text>
                        <View style={styles.action}>
                            {/* <FontAwesome 
                        name="id-card-o"
                        color="#05375a"
                        size={20}
                    /> */}
                            <TextInput
                                placeholder="Nama Lengkap"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(nama) => this.setState({ nama })}
                                value={this.state.nama}
                            />
                            {errors.nama && (
                                <Animatable.View
                                    animation="fadeInLeft"
                                    duration={500}
                                >
                                    <Text style={styles.errorMsg}>
                                        {errors.nama}
                                    </Text>
                                </Animatable.View>
                            )}
                        </View>

                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    marginTop: 35,
                                    fontWeight: 'bold',
                                },
                            ]}
                        >
                            Email
                        </Text>
                        <View style={styles.action}>
                            {/* <FontAwesome 
                            name="user-o"
                            color="#05375a"
                            size={20}
                        /> */}
                            <TextInput
                                placeholder="Email"
                                style={styles.textInput}
                                onChangeText={(email) =>
                                    this.setState({ email })
                                }
                                value={this.state.email}
                            />
                            {errors.email && (
                                <Animatable.View
                                    animation="fadeInLeft"
                                    duration={500}
                                >
                                    <Text style={styles.errorMsg}>
                                        {errors.email}
                                    </Text>
                                </Animatable.View>
                            )}
                        </View>

                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    marginTop: 35,
                                    fontWeight: 'bold',
                                },
                            ]}
                        >
                            Kabupaten
                        </Text>
                        <View style={styles.action}>
                            {/* <FontAwesome 
                            name="id-card-o"
                            color="#05375a"
                            size={20}
                        /> */}
                            <TextInput
                                placeholder="Masukan Kabupaten"
                                style={styles.textInput}
                                onChangeText={(kabupaten) =>
                                    this.setState({ kabupaten })
                                }
                                value={this.state.kabupaten}
                            />
                            {errors.kabupaten && (
                                <Animatable.View
                                    animation="fadeInLeft"
                                    duration={500}
                                >
                                    <Text style={styles.errorMsg}>
                                        {errors.kabupaten}
                                    </Text>
                                </Animatable.View>
                            )}
                        </View>

                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    marginTop: 35,
                                    fontWeight: 'bold',
                                },
                            ]}
                        >
                            Alamat
                        </Text>
                        <View style={styles.action}>
                            {/* <FontAwesome 
                            name="address-card-o"
                            color="#05375a"
                            size={20}
                        /> */}
                            <TextInput
                                placeholder="Masukan Alamat"
                                style={styles.textInput}
                                onChangeText={(alamat) =>
                                    this.setState({ alamat })
                                }
                                value={this.state.alamat}
                            />
                            {errors.alamat && (
                                <Animatable.View
                                    animation="fadeInLeft"
                                    duration={500}
                                >
                                    <Text style={styles.errorMsg}>
                                        {errors.alamat}
                                    </Text>
                                </Animatable.View>
                            )}
                        </View>

                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    marginTop: 35,
                                },
                            ]}
                        >
                            Kata Sandi
                        </Text>
                        <View style={styles.action}>
                            {/* <Feather 
                            name="lock"
                            color="#05375a"
                            size={20}
                        /> */}
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
                            <TouchableOpacity>
                                {/* <Feather 
                                name="eye-off"
                                color="grey"
                                size={20}
                            /> */}

                                {/* <Feather 
                                name="eye"
                                color="grey"
                                size={20}
                            /> */}
                            </TouchableOpacity>
                            {errors.password && (
                                <Animatable.View
                                    animation="fadeInLeft"
                                    duration={500}
                                >
                                    <Text style={styles.errorMsg}>
                                        {errors.password}
                                    </Text>
                                </Animatable.View>
                            )}
                        </View>

                        <View style={styles.textPrivate}>
                            <Text style={styles.color_textPrivate}>
                                Dengan mendaftar, Anda setuju dengan kami
                            </Text>
                            <Text
                                style={[
                                    styles.color_textPrivate,
                                    { fontWeight: 'bold' },
                                ]}
                            >
                                {' '}
                                Terms of service
                            </Text>
                            <Text style={styles.color_textPrivate}> &</Text>
                            <Text
                                style={[
                                    styles.color_textPrivate,
                                    { fontWeight: 'bold' },
                                ]}
                            >
                                {' '}
                                Privacy policy
                            </Text>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={this.registrasi}
                            >
                                <Text
                                    style={[
                                        styles.textSign,
                                        {
                                            color: '#fff',
                                        },
                                    ]}
                                >
                                    DAFTAR
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('Login')
                                }
                                style={[
                                    styles.signIni,
                                    {
                                        borderColor: 'blue',
                                        borderWidth: 1,
                                        marginTop: 15,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.textSigni,
                                        {
                                            color: 'blue',
                                        },
                                    ]}
                                >
                                    Sudah punya akun? Masuk disini
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Animatable.View>
            </View>
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
        backgroundColor: 'blue',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'blue',
    },
    signIni: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textSigni: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    textPrivate: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    color_textPrivate: {
        color: 'grey',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});
