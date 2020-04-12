import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Animated,
    Platform,
    BackHandler,
    FlatList,
    TouchableNativeFeedback,
    StatusBar,
    TouchableOpacity,
    Image,
    Switch,
    ScrollView,
    Alert,
    AppRegistry,
    Dimensions,
    AsyncStorage,
    ToastAndroid,
} from 'react-native';
import { CardItem, Left, Body, Right, Separator } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, ListItem, Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import GradientHeader from 'expo-gradient-header';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import axios from 'axios';
import Loading from 'react-native-whc-loading';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/authAction';
import PropTypes from 'prop-types';

const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').height;

class Profile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Akun',
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            email: [],
            isfetched: false,
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ isfetched: true }), 8000);
    }

    onLogoutClick = () => {
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
        ToastAndroid.show('anda berhasil keluar', ToastAndroid.SHORT);
    };

    static navigationOptions = {
        title: 'Akun',
        header: null,
        headerLeft: null,
    };

    render() {
        const { profile } = this.props.profile;

        const { isfetched } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <Image
                    source={require('../images/profile.png')}
                    style={{ height: '50%', width: widthScreen }}
                />

                <ScrollView style={styles.scroll}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ width: widthScreen, height: 265 }}>
                            <CardItem>
                                <Left>
                                    <Body
                                        style={{
                                            marginTop: 15,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <ShimmerPlaceholder
                                            autoRun={true}
                                            duration={2000}
                                            visible={isfetched}
                                            style={{ borderRadius: 15 }}
                                        >
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'grey',
                                                }}
                                            >
                                                Nama Lengkap
                                            </Text>
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 20,
                                                }}
                                            >
                                                {profile.nama}
                                            </Text>
                                        </ShimmerPlaceholder>
                                    </Body>
                                </Left>
                            </CardItem>
                            <View style={styles.lisitemBottom} />
                            <CardItem>
                                <Left>
                                    <Body>
                                        <ShimmerPlaceholder
                                            autoRun={true}
                                            duration={2000}
                                            visible={isfetched}
                                            style={{ borderRadius: 15 }}
                                        >
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'grey',
                                                }}
                                            >
                                                Email
                                            </Text>
                                            <Text note>{profile.email}</Text>
                                        </ShimmerPlaceholder>
                                    </Body>
                                </Left>
                            </CardItem>
                            <View style={styles.lisitemBottom} />
                            <CardItem>
                                <Left>
                                    <Body>
                                        <ShimmerPlaceholder
                                            autoRun={true}
                                            duration={2000}
                                            visible={isfetched}
                                            style={{
                                                borderRadius: 15,
                                                width: '30%',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'grey',
                                                }}
                                            >
                                                Alamat
                                            </Text>
                                            <Text note> {profile.alamat} </Text>
                                        </ShimmerPlaceholder>
                                    </Body>
                                </Left>
                                <Right>
                                    <Body>
                                        <ShimmerPlaceholder
                                            autoRun={true}
                                            duration={2000}
                                            visible={isfetched}
                                            style={{
                                                borderRadius: 15,
                                                width: '30%',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'grey',
                                                }}
                                            >
                                                Tanggal Lahir
                                            </Text>
                                            <Text note></Text>
                                        </ShimmerPlaceholder>
                                    </Body>
                                </Right>
                            </CardItem>
                            <View style={styles.lisitemBottom} />
                            <CardItem>
                                <Left>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.props.navigation.navigate(
                                                'EditProfil',
                                            )
                                        }
                                    >
                                        <View
                                            style={{
                                                width: 100,
                                                height: 30,
                                                backgroundColor: 'blue',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                alignSelf: 'center',
                                                borderRadius: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontSize: 15,
                                                }}
                                            >
                                                Edit Profil
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Left>
                                <Right>
                                    <TouchableOpacity onPress={this.getUser}>
                                        <View
                                            style={{
                                                width: 100,
                                                height: 30,
                                                backgroundColor: 'blue',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                alignSelf: 'center',
                                                borderRadius: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontSize: 15,
                                                }}
                                            >
                                                Lihat Barang
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Right>
                            </CardItem>
                        </View>
                    </View>

                    <Separator bordered>
                        <Text style={{ color: 'grey', fontWeight: 'bold' }}>
                            MORE
                        </Text>
                    </Separator>

                    <View>
                        <TouchableNativeFeedback
                            onPress={() =>
                                this.props.navigation.navigate('Tentang')
                            }
                        >
                            <ListItem
                                title="Tentang Kami"
                                containerStyle={styles.listItemContainer}
                                leftIcon={
                                    <Icon
                                        size={24}
                                        name="information-outline"
                                        type="material-community"
                                        color="blue"
                                    />
                                }
                                rightIcon={
                                    <Icon
                                        size={24}
                                        name="ios-arrow-forward"
                                        type="ionicon"
                                        color="grey"
                                    />
                                }
                            />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={() =>
                                this.props.navigation.navigate('Faq')
                            }
                        >
                            <ListItem
                                title="FAQ"
                                containerStyle={styles.listItemContainer}
                                leftIcon={
                                    <Icon
                                        size={24}
                                        name="questioncircleo"
                                        type="antdesign"
                                        color="blue"
                                    />
                                }
                                rightIcon={
                                    <Icon
                                        size={24}
                                        name="ios-arrow-forward"
                                        type="ionicon"
                                        color="grey"
                                    />
                                }
                            />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={() =>
                                this.props.navigation.navigate('Privacy')
                            }
                        >
                            <ListItem
                                title="Privacy Policy"
                                containerStyle={styles.listItemContainer}
                                leftIcon={
                                    <Icon
                                        size={24}
                                        name="shield-outline"
                                        type="material-community"
                                        color="blue"
                                    />
                                }
                                rightIcon={
                                    <Icon
                                        size={24}
                                        name="ios-arrow-forward"
                                        type="ionicon"
                                        color="grey"
                                    />
                                }
                            />
                        </TouchableNativeFeedback>
                        <View>
                            <Separator bordered />
                        </View>
                        <ListItem
                            title="Keluar"
                            containerStyle={styles.listItemContainer}
                            onPress={this.onLogoutClick}
                            leftIcon={
                                <Icon
                                    size={24}
                                    name="logout"
                                    type="simple-line-icon"
                                    color="blue"
                                />
                            }
                            rightIcon={
                                <Icon
                                    size={24}
                                    name="ios-arrow-forward"
                                    type="ionicon"
                                    color="grey"
                                />
                            }
                        />
                    </View>
                </ScrollView>
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

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile,
});

export default connect(mapStateToProps, { logoutUser })(Profile);

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#F5F5F5',
        marginTop: 120,
        zIndex: 1000,
    },
    header: {
        height: 60,
        flexDirection: 'row',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 5,
        overflow: 'hidden',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
    },
    userImage: {
        marginRight: 12,
        marginTop: 20,
    },
    listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
    },
    lisitemBottom: {
        borderBottomWidth: 1,
        borderColor: '#ECECEC',
    },
    container: {
        paddingTop: 5,
        paddingBottom: 12,
        backgroundColor: '#F4F5F4',
    },
});
