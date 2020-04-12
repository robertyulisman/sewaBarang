import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    ToastAndroid,
} from 'react-native';
import { createStackNavigator } from 'react-native-navigation';
import { withNavigation } from 'react-native-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import Loading from 'react-native-whc-loading';
import { TextInput, TextInputOutlined } from 'react-native-paper';
import GradientButton from 'react-native-gradient-buttons';

const { height, width } = Dimensions.get('window');

export default class Forgot extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    });
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../images/bgLoginAE.png')}
                    style={styles.backgroundImage}
                />
                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            label="Email"
                            mode="outlined"
                            ref={(input) => {
                                this.fifthTextInput = input;
                            }}
                            onChangeText={(email) => this.setState({ email })}
                            autoCapitalize="none"
                        ></TextInput>
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
                                text="MASUK"
                                textStyle={{ fontSize: 20 }}
                                blueMarine
                                gradientDirection="diagonal"
                                height={60}
                                width={300}
                                radius={15}
                                impact
                                impactStyle="Light"
                                onPressAction={() =>
                                    ToastAndroid.show(
                                        'Cek Email',
                                        ToastAndroid.SHORT,
                                    )
                                }
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    backgroundImage: {
        width: 360,
        height: '85%',
        resizeMode: 'stretch',
    },
    content: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 280,
    },
    inputContainer: {
        margin: 20,
        marginBottom: 0,
        padding: 20,
        paddingBottom: 10,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#4e73df',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
        marginTop: 95,
    },
    input: {
        fontSize: 16,
        height: 40,
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
});
