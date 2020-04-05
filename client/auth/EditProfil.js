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
    };

    constructor(props) {
        super(props),
            (this.state = {
                isLoading: true,
                profile: {},
            });
    }

    componentDidMount() {
        const id = this.props.auth.user._id;
        console.log('ini id', id);
        axios
            .get(`http://192.168.100.5:5000/api/user/${id}`)
            .then((res) => {
                this.setState({
                    profile: res.data,
                });
            })
            .catch((err) => console.log('error get by id', err));
    }

    simpanButton = () => {
        ToastAndroid.show('profile telah disimpan', ToastAndroid.SHORT);
        this.props.navigation.goBack();
    };

    render() {
        const { profile } = this.state;
        // if (this.state.isLoading){
        //     return(
        //       <View style={{flex:1, alignContent:"center", justifyContent:"center"}}>
        //       <View style={{alignItems: 'center', alignSelf: 'center'}}>
        //       <Image source={require('../assets/splash1.png')}
        //              style={{height: 130, width: 130}}
        //       />
        //       </View>
        //         <ActivityIndicator size='large' color='blue'/>
        //       </View>
        //     );
        //   }

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                    />
                    <GradientHeader
                        title="Akun"
                        subtitle="Have a nice day Gede'S"
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
                            >
                                {profile.nama}
                            </TextInput>
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
                            >
                                {profile.email}
                            </TextInput>
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
                            >
                                {profile.alamat}
                            </TextInput>
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

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(EditProfil);

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
