import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    ActivityIndicator,
    FlatList,
    TouchableNativeFeedback,
    StatusBar,
    Platform,
    TouchableOpacity,
    RefreshControl,
    Dimensions,
    ToastAndroid,
} from 'react-native';
import Slider from '../../components/promosi/Slider';
import Promo from './Promo';
import * as Haptics from 'expo-haptics';
import Gradient from '../../components/promosi/Gradient';
import { Header } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as NumberFormat } from 'react-number-format';
import Menu from '../menu/Menu';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import TouchableScale from 'react-native-touchable-scale';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loading from 'react-native-whc-loading';
import Slidek from '../../components/promosi/Slidek';
import { connect } from 'react-redux';
import axios from 'axios';
import { apiUrl } from '../../config';
import { getCurrentProfileData } from '../../redux/actions/profileActions';
import PropTypes from 'prop-types';
var { height, width } = Dimensions.get('window');

class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            imgUri:
                'https://serving.photos.photobox.com/835809569ba98e7d41a64799e0eb4f79cc2feef6daef0a37725a7026f5c4bbb346eb5f3d.jpg',
            imageHeight: 165,
            marginTop: -50,
            yAxis: 0,
            isfetched: false,
            refreshing: false,
            // isLoading: true,
            isVisible: false,
            Default_Rating: 0,
            Max_Rating: 5,
            produk: [],
        };

        this.Star =
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

        this.Star_With_Border =
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getData();
        this.setState({ refreshing: false });
        ToastAndroid.show(`data berhasil di update`, ToastAndroid.SHORT);
    };

    UpdateRating(key) {
        this.setState({ Default_Rating: key });
    }

    setBackground = (data) => {
        this.setState({ imgUri: data });
    };
    handleScroll = (event) => {
        // console.log(event.nativeEvent.contentOffset.y);
        const yAxis = event.nativeEvent.contentOffset.y;
        if (yAxis >= 0) {
            imageHeight = 165;
            this.setState({ imageHeight, marginTop: -50 });
        } else if (yAxis < 0) {
            imageHeight = Math.abs(yAxis) + 265;
            this.setState({ imageHeight, marginTop: yAxis - 150 });
        }
        this.setState({ yAxis });
    };

    componentDidMount() {
        this.getData();
        const id = this.props.auth.user._id;
        this.props.getCurrentProfileData(id);
    }

    getData = () => {
        axios
            .get(`${apiUrl}/api/product`)
            .then((res) => {
                this.setState({
                    produk: res.data,
                    // isLoading: false,
                });
                console.log('res', res.data);
            })
            .catch((err) => console.log('err', err));
    };

    componentWillMount() {
        setTimeout(() => this.setState({ isfetched: true }), 8000);
    }

    render() {
        const { profile } = this.props.profile;
        // console.log('profilee', profile);
        const { isfetched, produk } = this.state;
        randomNumber = Math.floor(Math.random() * 7);

        let React_Native_Rating_Bar = [];
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableScale
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}
                >
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.Default_Rating
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableScale>,
            );
        }

        return (
            <View style={{ flex: 1, width: width }}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle={
                        this.state.yAxis > 30 ? 'dark-content' : 'light-content'
                    }
                />
                <View
                    style={[
                        styles.header,
                        this.state.yAxis > 50 ? styles.shadow : null,
                        {
                            backgroundColor: `rgba(255,255,255,${
                                this.state.yAxis > 50
                                    ? 1
                                    : this.state.yAxis / 50
                            })`,
                        },
                    ]}
                >
                    <View style={{ marginTop: 30, paddingLeft: -30 }}>
                        <Image
                            source={require('../../images/LogoMobile.png')}
                            style={styles.Logom}
                        />
                    </View>
                    <TouchableNativeFeedback
                        onPress={() => this.props.navigation.navigate('Search')}
                    >
                        <View style={styles.android}>
                            <View style={{ paddingLeft: 10 }}>
                                <Ionicons
                                    name="ios-search"
                                    size={24}
                                    color="#ddd"
                                />
                            </View>

                            <View>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: '#ddd',
                                        paddingLeft: 10,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Cari Produk
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableScale
                        style={{ position: 'relative' }}
                        onPress={() =>
                            this.props.navigation.navigate('Notifikasi', {
                                hideTabBar: true,
                            })
                        }
                    >
                        <ShimmerPlaceHolder
                            autoRun={true}
                            visible={isfetched}
                            duration={2000}
                            style={{
                                height: 30,
                                width: 30,
                                borderRadius: 15,
                                top: 15,
                                left: 10,
                            }}
                        >
                            <Icon
                                name="bell"
                                size={27}
                                color={this.state.yAxis > 50 ? 'grey' : 'white'}
                                style={styles.icon}
                            />
                            {profile.sewaItem !== undefined && (
                                <View
                                    style={{
                                        marginTop: 30,
                                        top: -8,
                                        right: -8,
                                        position: 'absolute',
                                        borderRadius: 10,
                                        height: 20,
                                        width: 20,
                                        backgroundColor: 'red',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text style={{ color: 'white' }}>
                                        {profile.sewaItem.length}
                                    </Text>
                                </View>
                            )}
                        </ShimmerPlaceHolder>
                    </TouchableScale>
                    <TouchableScale
                        onPress={() =>
                            this.props.navigation.navigate('Tes', {
                                hideTabBar: true,
                            })
                        }
                    >
                        <ShimmerPlaceHolder
                            autoRun={true}
                            visible={isfetched}
                            duration={2000}
                            style={{
                                height: 30,
                                width: 30,
                                borderRadius: 15,
                                top: 15,
                                left: 15,
                            }}
                        >
                            <Icon
                                name="email"
                                size={27}
                                color={this.state.yAxis > 50 ? 'grey' : 'white'}
                                style={styles.icon}
                            />
                        </ShimmerPlaceHolder>
                    </TouchableScale>
                </View>
                <ScrollView
                    style={styles.container}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={8}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <Image
                        source={{ uri: this.state.imgUri }}
                        style={[
                            styles.imageStyle,
                            {
                                height:
                                    Platform.OS == 'ios'
                                        ? this.state.imageHeight
                                        : 150,
                                marginTop:
                                    Platform.OS == 'ios'
                                        ? this.state.marginTop
                                        : 0,
                            },
                        ]}
                        blurRadius={30}
                    />

                    <View style={{ marginTop: -80 }}>
                        <Slider imgUri={this.setBackground} />
                    </View>

                    <View>
                        <Menu />
                    </View>

                    <Slidek />

                    <View style={{ marginTop: 20 }}>
                        <Gradient />
                    </View>

                    <View style={{ marginTop: 10, flex: 1 }}>
                        <FlatList
                            style={{ width: '100%' }}
                            data={produk}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableNativeFeedback
                                        onPress={() => {
                                            this.refs.loading1.show();
                                            setTimeout(() => {
                                                this.refs.loading1.close();
                                                this.props.navigation.navigate(
                                                    'Detail',
                                                    { ...item },
                                                );
                                            }, 2000);
                                        }}
                                    >
                                        <View style={{ flex: 1, width: width }}>
                                            <View style={styles.postHorder}>
                                                <ShimmerPlaceHolder
                                                    autoRun={true}
                                                    duration={2000}
                                                    visible={isfetched}
                                                    style={{
                                                        ...styles.postImage,
                                                        borderTopLeftRadius: 5,
                                                        borderTopRightRadius: 5,
                                                    }}
                                                >
                                                    <Image
                                                        source={{
                                                            uri:
                                                                item.gambarBarang,
                                                        }}
                                                        style={styles.postImage}
                                                    ></Image>
                                                </ShimmerPlaceHolder>

                                                <ShimmerPlaceHolder
                                                    autoRun={true}
                                                    duration={2000}
                                                    visible={isfetched}
                                                    style={{
                                                        borderRadius: 10,
                                                        marginTop: 5,
                                                        left: 7,
                                                        width: '70%',
                                                    }}
                                                >
                                                    <Text
                                                        style={styles.postText}
                                                    >
                                                        {item.namaBarang}
                                                    </Text>
                                                </ShimmerPlaceHolder>

                                                <ShimmerPlaceHolder
                                                    autoRun={true}
                                                    duration={2000}
                                                    visible={isfetched}
                                                    style={{
                                                        borderRadius: 10,
                                                        marginTop: 5,
                                                        left: 7,
                                                        width: '80%',
                                                    }}
                                                >
                                                    <NumberFormat
                                                        value={item.harga}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        prefix={'Rp.'}
                                                        renderText={(value) => (
                                                            <Text
                                                                style={
                                                                    styles.price
                                                                }
                                                            >
                                                                {item.harga}/
                                                                Hari
                                                            </Text>
                                                        )}
                                                    />
                                                </ShimmerPlaceHolder>

                                                <View>
                                                    <ShimmerPlaceHolder
                                                        autoRun={true}
                                                        duration={2000}
                                                        visible={isfetched}
                                                        style={{
                                                            ...styles.childView,
                                                            borderRadius: 10,
                                                            width: '90%',
                                                        }}
                                                    >
                                                        <View
                                                            style={
                                                                styles.childView
                                                            }
                                                        >
                                                            {
                                                                React_Native_Rating_Bar
                                                            }
                                                            <Text
                                                                style={
                                                                    styles.textStyle
                                                                }
                                                            >
                                                                {
                                                                    this.state
                                                                        .Default_Rating
                                                                }
                                                                /
                                                                {
                                                                    this.state
                                                                        .Max_Rating
                                                                }
                                                            </Text>
                                                        </View>
                                                    </ShimmerPlaceHolder>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                );
                            }}
                        />
                    </View>
                </ScrollView>
                <Loading
                    ref="loading1"
                    image={require('../../assets/icon.png')}
                    seasing={Loading.EasingType.linear}
                    imageSize={70}
                    size={70}
                />
            </View>
        );
    }
}

Home.propTypes = {
    getCurrentProfileData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfileData })(Home);

const styles = StyleSheet.create({
    container: {
        marginTop:
            (Platform.OS === 'ios') | 'android'
                ? -Header.HEIGHT
                : -(Header.HEIGHT + 25),
    },
    header: {
        height:
            (Platform.OS === 'ios') | 'android'
                ? Header.HEIGHT
                : Header.HEIGHT + 25,
        zIndex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    textStyle: {
        fontSize: 10,
        color: '#000',
        paddingLeft: 5,
    },
    imageStyle: {
        borderBottomLeftRadius: 250,
        borderBottomRightRadius: 250,
        transform: [{ scaleX: 1.5 }],
        width: null,
    },
    StarImage: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
    childView: {
        flexDirection: 'row',
        marginTop: 10,
        margin: 15,
        marginHorizontal: 7,
    },
    android: {
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        elevation: 1,
        borderRadius: 5,
        height: 40,
        width: wp('55%'),
        borderColor: '#ddd',
        alignItems: 'center',
        marginTop: 30,
    },
    Logom: {
        height: 80,
        width: 80,
    },
    View1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 120,
        width: 340,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderColor: 'blue',
        marginTop: 5,
        borderRadius: 10,
        borderWidth: 0.5,
    },
    CardV: {
        borderRadius: 10,
        height: 60,
        width: 60,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        elevation: 1,
        borderColor: '#ddd',
    },
    View2: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 7,
    },
    price: {
        color: 'green',
        paddingLeft: 10,
    },
    postHorder: {
        backgroundColor: 'white',
        flex: 3,
        margin: 5,
        flexWrap: 'wrap',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#ddd',
        resizeMode: 'cover',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        width: wp('47,5%'),
    },
    postImage: {
        height: 130,
        width: wp('47,5%'),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    Viewp: {
        paddingTop: 2,
    },
    postText: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingLeft: 5,
        margin: 5,
        width: '80%',
    },
    hairline: {
        backgroundColor: '#A2A2A2',
        height: 1,
        width: 120,
        marginTop: 30,
        paddingLeft: 100,
        margin: 11,
    },
    icon: {
        position: 'relative',
        paddingLeft: 10,
        marginTop: 30,
    },
});
