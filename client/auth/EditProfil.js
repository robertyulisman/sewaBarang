import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    Text,
    StatusBar,
    ActivityIndicator,
    TouchableHighlight,
    ToastAndroid,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { TextInput, TextInputOutlined } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from 'react-native-gradient-buttons';
import GradientHeader from 'expo-gradient-header';
import axios from 'axios';
import { connect } from 'react-redux';
import { apiUrl } from '../config';
import { getCurrentProfileData } from '../redux/actions/profileActions';
import PropTypes from 'prop-types';

class EditProfil extends Component {
    static navigationOptions = {
        header: null,
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        nama: '',
        email: '',
        alamat: '',
    };

    constructor(props) {
        super(props),
            (this.state = {
                isLoading: true,
            });
    }

    simpanButton = () => {
        const { profile } = this.props.profile;
        const { nama, email, alamat } = this.state;
        axios
            .put(`${apiUrl}/api/user/update/${profile._id}`, {
                nama,
                email,
                alamat,
            })
            .then((res) => {
                console.log('oke', res.data);
                ToastAndroid.show('profile telah disimpan', ToastAndroid.SHORT);
                this.props.navigation.goBack();
                this.props.getCurrentProfileData(profile._id);
            })
            .catch((err) => console.log('err'.err));
    };

    componentDidMount() {
        const { profile } = this.props.profile;
        this.setState({
            nama: profile.nama,
            email: profile.email,
            alamat: profile.alamat,
        });
    }

    render() {
        const { profile } = this.props.profile;

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                    />
                    <GradientHeader
                        title="Akun"
                        subtitle={`Have a nice day ${profile.nama}`}
                        imageSource={require('./profile.jpg')}
                        gradientColors={['#00d2ff', '#3a7bd5']}
                    />
                    <View style={{ marginTop: 90 }}>
                        <View style={styles.field}>
                            <Text style={styles.text}>Nama Lengkap</Text>
                            <TextInput
                                mode="outlined"
                                style={styles.text}
                                theme={{
                                    colors: {
                                        primary: 'blue',
                                        underlineColor: 'transparent',
                                    },
                                }}
                                value={this.state.nama}
                                onChangeText={(value) =>
                                    this.setState({ nama: value })
                                }
                            />

                            <Text style={styles.text}>Email</Text>
                            <TextInput
                                mode="outlined"
                                style={styles.text}
                                theme={{
                                    colors: {
                                        primary: 'blue',
                                        underlineColor: 'transparent',
                                    },
                                }}
                                value={this.state.email}
                                onChangeText={(value) =>
                                    this.setState({ email: value })
                                }
                            />

                            <Text style={styles.text}>Tanggal Lahir</Text>
                            <TextInput
                                label="masukkan tanggal lahir"
                                mode="outlined"
                                style={styles.text}
                                theme={{
                                    colors: {
                                        primary: 'blue',
                                        underlineColor: 'transparent',
                                    },
                                }}
                            ></TextInput>
                            <Text style={styles.text}>Alamat</Text>
                            <TextInput
                                mode="outlined"
                                style={styles.text}
                                theme={{
                                    colors: {
                                        primary: 'blue',
                                        underlineColor: 'transparent',
                                    },
                                }}
                                value={this.state.alamat}
                                onChangeText={(value) =>
                                    this.setState({ alamat: value })
                                }
                            />
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        marginVertical: 4,
                        marginTop: -40,
                    }}
                >
                    <GradientButton
                        style={{ marginVertical: 10 }}
                        text="SIMPAN"
                        textStyle={{ fontSize: 20 }}
                        blue
                        gradientDirection="diagonal"
                        height={60}
                        width={300}
                        radius={15}
                        impact
                        impactStyle="Light"
                        onPressAction={this.simpanButton}
                    />
                </View>
            </View>
        );
    }
}

EditProfil.propTypes = {
    getCurrentProfileData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfileData })(EditProfil);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        paddingLeft: 8,
        fontWeight: 'bold',
        marginTop: 5,
    },
    field: {
        marginLeft: 8,
        marginTop: 50,
        marginBottom: 50,
        marginRight: 8,
        margin: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    buttonContainer: {
        alignSelf: 'stretch',
        margin: 30,
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
});
