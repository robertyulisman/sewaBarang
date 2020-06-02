import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    ImageBackground,
    SafeAreaView,
    Text,
    StatusBar,
    ActivityIndicator,
    TouchableHighlight,
    ToastAndroid,
    Platform,
    Dimensions,
    TouchableWithoutFeedback,
    AlertOS,
    TouchableOpacity
} from 'react-native';
import { TextInput, TextInputOutlined } from 'react-native-paper';
import { Footer } from 'native-base';
import { Ionicons, MaterialIcons, Feather} from "@expo/vector-icons";
import axios from 'axios';
import { connect } from 'react-redux';
import { apiUrl } from '../config';
import { getCurrentProfileData } from '../redux/actions/profileActions';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');
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
        tgl_lahir: '',
    };

    constructor(props) {
        super(props),
            (this.state = {
                isLoading: true,
            });
    }

    simpanButton = () => {
        const { profile } = this.props.profile;
        const { nama, email, alamat, tgl_lahir} = this.state;
        axios
            .put(`${apiUrl}/api/user/update/${profile._id}`, {
                nama,
                email,
                alamat,
                tgl_lahir,
                
            })
            .then((res) => {
                console.log('oke', res.data);
                ToastAndroid.show('Profile telah diubah', ToastAndroid.SHORT);
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
            tgl_lahir: profile.tgl_lahir,
        });
    }



    render() {
        const { profile } = this.props.profile;
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground 
                    source={{uri: 'https://imagekit.io/static/img/newPages/homepage-wave-bg.svg'}}
                    style={{height: 60, width: width}}
                >
                </ImageBackground>
                <View style={{ alignSelf: "center", top: 10}}>
                    <View style={styles.profileImage}>
                        <Image source={{uri: 'https://www.unipulse.tokyo/en/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'}} style={styles.image} resizeMode="stretch"></Image>
                    </View>
                    <TouchableOpacity style={styles.add}>
                        <Feather name="edit" size={22} color="#fff"/>
                    </TouchableOpacity>
                </View>
                
                <ScrollView showsVerticalScrollIndicator={false}>
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
                        value={this.state.tgl_lahir}
                        onChangeText={(value) =>
                            this.setState({ tgl_lahir: value })
                        }
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
            </ScrollView>
            <Footer style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', width: width, height: 80}}>
                <TouchableOpacity style={{backgroundColor: 'blue', borderRadius: 30, width: 250, height: 60, justifyContent: 'center', alignItems: 'center'}} onPress={this.simpanButton}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Simpan</Text>
                </TouchableOpacity>
            </Footer>
        </SafeAreaView>
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
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: "hidden",
        resizeMode: 'stretch'
    },
    dm: {
        backgroundColor: "blue",
        position: "absolute",
        top: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: 'rgba(0, 0, 255, 0.8)',
        position: "absolute",
        top: 10,
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
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
