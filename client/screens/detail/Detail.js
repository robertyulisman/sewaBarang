import React, { Component } from 'react';
import {
    View,
    Animated,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    Share,
    Platform,
    SafeAreaView,
    TouchableHighlight,
    TouchableNativeFeedback,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { default as NumberFormat } from 'react-number-format';
import {
    Entypo,
    FontAwesome,
    AntDesign,
    MaterialIcons,
} from 'react-native-vector-icons';
import { Icon } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SwipeablePanel from 'rn-swipeable-panel';
import Keyboard from '../toko/Keyboard';
import Coments from '../toko/Coments';
import axios from 'axios';
import { connect } from 'react-redux';
import { apiUrl } from '../../config';
import { getCurrentProfileData } from '../../redux/actions/profileActions';
import PropTypes from 'prop-types';

// import Detailimage from '../components/promosi/Detailimage';

const { height, width } = Dimensions.get('screen');

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stok: 0,
            index: 0,
            activeIndex: 0,
            isfetched: false,
            Default_Rating: 0,
            Max_Rating: 5,
            routes: [
                { key: 'first', title: 'Deskripsi' },
                { key: 'second', title: 'Jaminan' },
            ],
            swipeablePanelActive: false,
            scrollPosition: new Animated.Value(0),
            showCloseButton: false,
        };
        // console.log('aaaaaaaaaaaaaaaaa', props);
        this.Star =
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
        this.Star_With_Border =
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    }
    static navigationOptions = ({ navigation, profile }) => {
        return {
            headerTransparent: true,
            headerTintColor: 'white',
            headerTitle: (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: '140%',
                    }}
                >
                    <Image
                        source={{
                            uri:
                                'https://upload.wikimedia.org/wikipedia/commons/a/a8/Ski_trail_rating_symbol_black_circle.png',
                        }}
                        style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'stretch',
                            left: '-183%',
                            tintColor: 'rgba(0,0,0,0.5)',
                        }}
                    />
                    <Image
                        source={{
                            uri:
                                'https://upload.wikimedia.org/wikipedia/commons/a/a8/Ski_trail_rating_symbol_black_circle.png',
                        }}
                        style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'stretch',
                            left: '120%',
                            tintColor: 'rgba(0,0,0,0.5)',
                        }}
                    />
                    <Image
                        source={{
                            uri:
                                'https://upload.wikimedia.org/wikipedia/commons/a/a8/Ski_trail_rating_symbol_black_circle.png',
                        }}
                        style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'stretch',
                            left: '18%',
                            tintColor: 'rgba(0,0,0,0.5)',
                        }}
                    />
                </View>
            ),
            headerRight: (
                <View style={styles.iconContainer}>
                    <Icon
                        type="fontawesome5"
                        name="store"
                        color="#fff"
                        size={25}
                        onPress={() => navigation.navigate('Toko')}
                    />
                    <Icon
                        type="font-awesome"
                        name="shopping-cart"
                        color="#fff"
                        size={24}
                        onPress={() => navigation.navigate('Cart')}
                    />
                </View>
            ),
        };
    };

    componentDidMount() {
        setTimeout(() => this.setState({ isfetched: true }), 2000);
    }

    getDataUser = () => {
        const id = this.props.auth.user._id;
        axios
            .get(`${apiUrl}/api/user/${id}`)
            .then((res) => {
                // this.setState({
                //     sewaItem: res.data.sewaItem,
                // });
                console.log('res', res.data);
            })
            .catch((err) => console.log('error get by id', err));
    };

    handleSewaButton = () => {
        const idProduct = this.props.navigation.state.params._id;
        const { profile } = this.props.profile;

        // api/sewaitem/assign/product/5e89a8f7e38855338cd10cdc/5e8f40ddfba8b705b0ed8fab

        axios
            .post(
                `${apiUrl}/api/sewaitem/assign/product/${profile._id}/${idProduct}`,
            )
            .then((res) => {
                // this.setState({
                //     profile: res.data,
                // });
                console.log('ini responya ', res.data);
                this.getDataUser();
                this.props.getCurrentProfileData(profile._id);
                this.props.navigation.navigate('Cart', {
                    onNext: () => this.refresh(),
                });
            })
            .catch((err) => console.log('error get by id', err));
        // console.log('id product', idProduct);
        // console.log('id profile', profile._id);

        // this.props.navigation.navigate('Cart');
    };

    setBackground = (data) => {
        this.setState({ imgUri: data });
    };
    UpdateRating(key) {
        this.setState({ Default_Rating: key });
    }
    stokC = (value) => {
        this.setState({
            stok: value,
        });
    };
    _renderItem({ item, index }) {
        return (
            <Image
                source={{ uri: item }}
                style={{
                    width: width,
                    height: 230,
                    resizeMode: 'stretch',
                    backgroundColor: 'rgba(232, 232, 232, 1)',
                }}
            />
        );
    }
    _renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'blue' }}
        />
    );
    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    };
    openPanel = () => {
        this.setState({ swipeablePanelActive: true, showCloseButton: true });
    };

    closePanel = () => {
        this.setState({ swipeablePanelActive: false, showCloseButton: false });
    };

    render() {
        const params = this.props.navigation.state.params;
        console.log('ini params', params);
        const { isfetched } = this.state;
        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
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
                </TouchableOpacity>,
            );
        }
        const FirstRoute = () => (
            <ShimmerPlaceHolder
                autoRun={true}
                duration={2000}
                visible={isfetched}
                style={{ borderRadius: 10, left: 10, top: 10 }}
            >
                <ScrollView
                    alwaysBounceVertical={true}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.scene}>
                        <Text style={styles.text}>{params.deskripsi}</Text>
                    </View>
                </ScrollView>
            </ShimmerPlaceHolder>
        );
        const SecondRoute = () => (
            <View style={styles.scene}>
                <Text style={styles.text}>{params.jaminan}</Text>
            </View>
        );
        const data = [params.gambarBarang];
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle={'light-content'}
                />
                <ImageBackground
                    source={require('../../assets/splashAE.png')}
                    style={{ height: '55%', width: width }}
                >
                    <View style={{ top: -22 }}>
                        <ShimmerPlaceHolder
                            autoRun={true}
                            duration={2000}
                            visible={isfetched}
                            style={{ width: width, height: 230 }}
                        >
                            <Carousel
                                ref={(c) => {
                                    this._carousel = c;
                                }}
                                data={data}
                                loop
                                autoplay
                                renderItem={this._renderItem}
                                sliderWidth={width}
                                itemWidth={width}
                                inactiveSlideOpacity={1}
                                onSnapToItem={(index) =>
                                    this.setState({ activeIndex: index })
                                }
                            />
                            <Pagination
                                dotsLength={data.length}
                                dotStyle={{ width: 25, height: 5 }}
                                inactiveDotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                }}
                                activeDotIndex={this.state.activeIndex}
                                containerStyle={{ paddingVertical: 10 }}
                                dotColor={'rgba(31, 58, 147, 1)'}
                                inactiveDotColor={'rgba(232, 232, 232, 1)'}
                            />
                        </ShimmerPlaceHolder>
                    </View>

                    {/* Body */}
                    <View
                        style={{
                            ...styles.shadow,
                            height: height,
                            width: width,
                            backgroundColor: 'white',
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            top: -30,
                        }}
                    >
                        <View
                            style={{
                                height: 5,
                                width: 70,
                                backgroundColor: '#ddd',
                                borderRadius: 15,
                                left: '42%',
                                top: '1%',
                            }}
                        />
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Content 1 */}

                            <ShimmerPlaceHolder
                                autoRun={true}
                                duration={2000}
                                visible={isfetched}
                                style={{
                                    borderRadius: 10,
                                    marginTop: 15,
                                    width: '60%',
                                    left: 3,
                                }}
                            >
                                <Text style={{ ...styles.Text1 }}>
                                    {params.namaBarang}
                                </Text>
                            </ShimmerPlaceHolder>
                            <View style={{ flexDirection: 'row' }}>
                                <ShimmerPlaceHolder
                                    autoRun={true}
                                    duration={2000}
                                    visible={isfetched}
                                    style={{
                                        borderRadius: 10,
                                        marginTop: 10,
                                        width: '45%',
                                        left: 3,
                                    }}
                                >
                                    <NumberFormat
                                        value={params.harga}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'Rp.'}
                                        renderText={(value) => (
                                            <Text style={styles.mP}>
                                                {value}/Hari
                                            </Text>
                                        )}
                                    />
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder
                                    autoRun={true}
                                    duration={2000}
                                    visible={isfetched}
                                    style={{
                                        borderRadius: 10,
                                        marginTop: 10,
                                        width: '45%',
                                        left: 10,
                                    }}
                                >
                                    <View style={styles.childView}>
                                        {React_Native_Rating_Bar}
                                        <Text style={styles.textStyle}>
                                            {this.state.Default_Rating}/
                                            {this.state.Max_Rating}
                                        </Text>
                                    </View>
                                </ShimmerPlaceHolder>
                            </View>

                            {/* Penutup Content 1 */}

                            {/* Sosial Media */}

                            <View
                                style={{
                                    backgroundColor: 'blue',
                                    width: width,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    top: 20,
                                }}
                            >
                                <ShimmerPlaceHolder
                                    autoRun={true}
                                    duration={2000}
                                    visible={isfetched}
                                    style={{ borderRadius: 10 }}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <AntDesign
                                            name="like1"
                                            size={20}
                                            color="white"
                                            style={{
                                                paddingLeft: 10,
                                                marginTop: -2,
                                            }}
                                        />
                                        <Text
                                            style={{
                                                paddingLeft: 5,
                                                color: 'white',
                                            }}
                                        >
                                            like
                                        </Text>
                                        <FontAwesome
                                            name="comment"
                                            size={20}
                                            color="white"
                                            style={{ paddingLeft: 13 }}
                                        />
                                        <Text
                                            style={{
                                                paddingLeft: 5,
                                                color: 'white',
                                            }}
                                            onPress={this.openPanel}
                                        >
                                            comment
                                        </Text>

                                        <Entypo
                                            name="share"
                                            size={20}
                                            color="white"
                                            style={{ paddingLeft: 130 }}
                                        />
                                        <Text
                                            style={{
                                                paddingLeft: 5,
                                                color: 'white',
                                            }}
                                            onPress={this.onShare}
                                        >
                                            share
                                        </Text>
                                    </View>
                                </ShimmerPlaceHolder>
                            </View>

                            {/* Penutup Sosial Media */}

                            {/* Content 2 */}

                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginVertical: 45,
                                }}
                            >
                                <ShimmerPlaceHolder
                                    autoRun={true}
                                    duration={2000}
                                    visible={isfetched}
                                    style={{
                                        borderRadius: 10,
                                        width: '30%',
                                        left: 3,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'grey',
                                            marginHorizontal: 10,
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        QTY
                                    </Text>
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder
                                    autoRun={true}
                                    duration={2000}
                                    visible={isfetched}
                                    style={{
                                        borderRadius: 10,
                                        width: '30%',
                                        left: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'grey',
                                            marginHorizontal: '37%',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        STOK
                                    </Text>
                                </ShimmerPlaceHolder>
                            </View>
                            <View style={{ flexDirection: 'row', top: -42 }}>
                                <NumericInput
                                    value={this.state.stok}
                                    onChange={(value) =>
                                        this.setState({ value })
                                    }
                                    onLimitReached={(isMax, msg) =>
                                        console.log(isMax, msg)
                                    }
                                    totalWidth={100}
                                    totalHeight={30}
                                    iconSize={24}
                                    step={1}
                                    valueType="real"
                                    rounded
                                    textColor="blue"
                                    iconStyle={{ color: 'white' }}
                                    rightButtonBackgroundColor="blue"
                                    leftButtonBackgroundColor="blue"
                                    containerStyle={{ left: 10 }}
                                />
                                <ShimmerPlaceHolder
                                    autoRun={true}
                                    duration={2000}
                                    visible={isfetched}
                                    style={{
                                        borderRadius: 10,
                                        width: '20%',
                                        left: 15,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: 'black',
                                            paddingLeft: 62,
                                        }}
                                    >
                                        {params.jml_barang}
                                    </Text>
                                </ShimmerPlaceHolder>
                                <TouchableOpacity
                                    onPress={this.handleSewaButton}
                                >
                                    <View
                                        style={{
                                            width: 80,
                                            height: 40,
                                            backgroundColor: 'blue',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            borderRadius: 5,
                                            marginHorizontal: '25%',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 15,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Sewa
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Penutup Content 2 */}

                            {/* Alamat */}
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: width,
                                    height: 90,
                                    marginVertical: -20,
                                    backgroundColor: 'blue',
                                }}
                            >
                                <View>
                                    <MaterialIcons
                                        name="location-on"
                                        size={30}
                                        color="white"
                                        onPress={() =>
                                            this.props.navigation.navigate(
                                                'Lokasi',
                                            )
                                        }
                                        style={{ marginVertical: -20 }}
                                    />
                                </View>
                                <ShimmerPlaceHolder
                                    autoRun={true}
                                    duration={2000}
                                    visible={isfetched}
                                    style={{ borderRadius: 10, top: 10 }}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 15,
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                marginVertical: 6,
                                            }}
                                        >
                                            {`${params.alamat}, Kabupaten ${params.kabupaten}, ${params.provinsi}`}
                                        </Text>
                                    </View>
                                </ShimmerPlaceHolder>
                            </View>

                            {/* Penutup Alamat */}

                            {/* TabView */}

                            <View
                                style={{
                                    width: width,
                                    height: 250,
                                    borderTopWidth: 5,
                                    borderTopColor: 'white',
                                }}
                            >
                                <TabView
                                    renderTabBar={this._renderTabBar}
                                    navigationState={this.state}
                                    renderScene={SceneMap({
                                        first: FirstRoute,
                                        second: SecondRoute,
                                    })}
                                    onIndexChange={(index) =>
                                        this.setState({ index })
                                    }
                                />
                            </View>

                            {/* Penutup TabView */}
                        </ScrollView>

                        {/* SwipeablePanel */}

                        <SwipeablePanel
                            fullWidth
                            isActive={this.state.swipeablePanelActive}
                            onClose={this.closePanel}
                            // showCloseButton={showCloseButton}
                            onPressCloseButton={this.closePanel}
                        >
                            <Keyboard />
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Coments />
                            </ScrollView>
                        </SwipeablePanel>

                        {/* Penutup SwipeablePanel */}
                    </View>
                    {/* Penutup Body */}
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

Detail.propTypes = {
    getCurrentProfileData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfileData })(Detail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        paddingLeft: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 90,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    Text1: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: '5%',
        paddingLeft: 10,
    },
    scene: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        alignItems: 'center',
        padding: 20,
    },
    mP: {
        paddingTop: 15,
        color: 'green',
        paddingRight: 5,
        width: '100%',
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 10,
    },
    StarImage: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
    textStyle: {
        fontSize: 10,
        color: '#000',
        paddingLeft: 5,
    },
    childView: {
        flexDirection: 'row',
        marginTop: 15,
        marginHorizontal: 70,
    },
});
