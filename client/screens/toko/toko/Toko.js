import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    Share,
    Image,
    ActivityIndicator,
    Dimensions,
    StatusBar,
    FlatList,
    TouchableWithoutFeedback,
    ScrollView,
    Platform,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    EvilIcons,
    Entypo,
    FontAwesome,
    FontAwesome5,
    MaterialCommunityIcons,
    AntDesign,
} from 'react-native-vector-icons';
import TabView, { TabBar, SceneMap } from 'react-native-tab-view';
import SwipeablePanel from 'rn-swipeable-panel';
// import Coments from '../toko/Coments';
import styles from '../toko/style';
// import Keyboard from '../plugin/Keyboard';
import axios from 'axios';
import { connect } from 'react-redux';
import { apiUrl } from '../../../config';
import Animated, { Easing } from 'react-native-reanimated';
const { Value, timing } = Animated;

let screenWidth = Dimensions.get('window').width;

class Toko extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataVendor: [],
            dataSource: {},
            swipeablePanelActive: false,
        };
        (this._scroll_y = new Value(0)), (this.scroll_x = new Value(0));
    }

    componentDidMount() {
        var that = this;
        let items = Array.apply(null, Array(5)).map((v, i) => {
            return {
                id: i,
                src: 'http://placehold.it/200x200?text=' + (i + 1),
            };
        });
        that.setState({
            dataSource: items,
        });
    }

    // componentDidMount() {
    //     axios
    //         .get(`${apiUrl}/api/vendor`)
    //         .then((res) => {
    //             this.setState({
    //                 dataVendor: res.data,
    //             });
    //             //console.log('res', res.data);
    //         })
    //         .catch((err) => console.log('err', err));
    // }

    openPanel = () => {
        this.setState({ swipeablePanelActive: true });
    };

    closePanel = () => {
        this.setState({ swipeablePanelActive: false });
    };

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

    render() {
        const { dataVendor } = this.state;
        const { profile } = this.props.profile;
        randomNumber = Math.floor(Math.random() * 7);

        const _diff_clamp_scroll_y = Animated.diffClamp(this._scroll_y, 0, 50);

        const _header_height = Animated.interpolate(_diff_clamp_scroll_y, {
            inputRange: [0, 70],
            outputRange: [70, 0],
            extrapolate: 'clamp',
        });

        const _header_translate_y = Animated.interpolate(_diff_clamp_scroll_y, {
            inputRange: [0, 50],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        });

        const _header_opacity = Animated.interpolate(_diff_clamp_scroll_y, {
            inputRange: [0, 50],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        // personal card container
        const _card_width = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [100, 50],
            extrapolate: 'clamp',
        });
        const _card_height = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [170, 50],
            extrapolate: 'clamp',
        });
        const _card_position_top = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 60],
            extrapolate: 'clamp',
        });
        const _card_position_left = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [10, 0],
            extrapolate: 'clamp',
        });
        const _card_border_left_radius = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [16, 0],
            extrapolate: 'clamp',
        });

        // image container
        const _image_container_height = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [100, 40],
            extrapolate: 'clamp',
        });
        const _image_container_margin = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 4],
            extrapolate: 'clamp',
        });
        const _image_container_border_radius = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 40],
            extrapolate: 'clamp',
        });

        // cta container
        const _cta_container_padding_top = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [20, -20],
            extrapolate: 'clamp',
        });
        const _cta_container_opacity = this.scroll_x.interpolate({
            inputRange: [0, 50],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        // icon
        const _icon_scale = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0.6],
            extrapolate: 'clamp',
        });
        const _icon_position_top = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [-15, -28],
            extrapolate: 'clamp',
        });
        const _icon_position_right = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [33, -3],
            extrapolate: 'clamp',
        });

        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" translucent={true} />
                <Animated.View
                    style={[
                        styles.header,
                        {
                            height: _header_height,
                            transform: [{ translateY: _header_translate_y }],
                            opacity: _header_opacity,
                        },
                    ]}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'white',
                            top: 10,
                        }}
                    >
                        Toko
                    </Text>
                    <View style={{ ...styles.fake_icon_box, top: 10 }}>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('SearchFeed')
                            }
                        >
                            <FontAwesome5
                                name="search"
                                size={22}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <Animated.ScrollView
                    style={[styles.scroll_view, {}]}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    scrollEventThrottle={5}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: { y: this._scroll_y },
                            },
                        },
                    ])}
                >
                    {/* Story */}
                    <View style={styles.container1}>
                        <Animated.View
                            style={[
                                styles.personal_card_container,
                                {
                                    width: _card_width,
                                    height: _card_height,
                                    top: _card_position_top,
                                    left: _card_position_left,
                                    borderTopLeftRadius: _card_border_left_radius,
                                    borderBottomLeftRadius: _card_border_left_radius,
                                },
                            ]}
                        >
                            {/* Image container */}
                            <Animated.View
                                style={[
                                    styles.image_container,
                                    {
                                        height: _image_container_height,
                                        margin: _image_container_margin,
                                        borderRadius: _image_container_border_radius,
                                    },
                                ]}
                            >
                                <Image
                                    source={{
                                        uri:
                                            'https://scontent.fcgk25-1.fna.fbcdn.net/v/t31.0-8/13443200_360429417414849_3584700450972541967_o.jpg?_nc_cat=106&_nc_sid=e3f864&_nc_eui2=AeFi68PojLAphC_Bmm_wMA8EfsRlmUC-6xR-xGWZQL7rFLx6Z108HAIcoAmrAYrx4cABvG5Xb61LR9PUaaxRQutq&_nc_ohc=PWPeB5Nawt8AX9be-GP&_nc_ht=scontent.fcgk25-1.fna&oh=2c105d4fb3e91cac03c15b59f0e528cb&oe=5EF91905',
                                    }}
                                    style={styles.image}
                                />
                            </Animated.View>
                            {/* Call to action */}
                            <Animated.View style={styles.cta_container}>
                                <Animated.Text
                                    style={[
                                        styles.text,
                                        {
                                            paddingTop: _cta_container_padding_top,
                                            opacity: _cta_container_opacity,
                                        },
                                    ]}
                                >
                                    Buat Cerita{'\n'}
                                </Animated.Text>
                                {/* Icon */}
                                <Animated.View
                                    style={[
                                        styles.icon_container,
                                        {
                                            transform: [{ scale: _icon_scale }],
                                            top: _icon_position_top,
                                            right: _icon_position_right,
                                        },
                                    ]}
                                >
                                    <Icon
                                        name="plus"
                                        size={18}
                                        color="#ffffff"
                                    />
                                </Animated.View>
                            </Animated.View>
                        </Animated.View>
                        <Animated.ScrollView
                            style={styles.scroll_view}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={5}
                            onScroll={Animated.event([
                                {
                                    nativeEvent: {
                                        contentOffset: { x: this.scroll_x },
                                    },
                                },
                            ])}
                        >
                            <View style={styles.fake_card_ghost} />
                            <View style={styles.fake_card} />
                            <View style={styles.fake_card} />
                            <View style={styles.fake_card} />
                            <View style={styles.fake_card} />
                            <View style={styles.column_spacer} />
                        </Animated.ScrollView>
                    </View>
                    {/* Story */}
                    {/* Card */}
                    <View style={{ top: 15, flex: 1 }}>
                        <View
                            style={{
                                alignSelf: 'center',
                                width: screenWidth - 10,
                                borderRadius: 10,
                                alignSelf: 'center',
                                backgroundColor: '#fff',
                                padding: 10,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,

                                elevation: 3,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: 0,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri:
                                                'https://scontent.fcgk25-1.fna.fbcdn.net/v/t31.0-8/13443200_360429417414849_3584700450972541967_o.jpg?_nc_cat=106&_nc_sid=e3f864&_nc_eui2=AeFi68PojLAphC_Bmm_wMA8EfsRlmUC-6xR-xGWZQL7rFLx6Z108HAIcoAmrAYrx4cABvG5Xb61LR9PUaaxRQutq&_nc_ohc=PWPeB5Nawt8AX9be-GP&_nc_ht=scontent.fcgk25-1.fna&oh=2c105d4fb3e91cac03c15b59f0e528cb&oe=5EF91905',
                                        }}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderColor: 'blue',
                                            borderWidth: 0.5,
                                        }}
                                        borderRadius={25}
                                    />
                                    <View style={{ marginTop: 5 }}>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color: '#000',
                                                fontWeight: 'bold',

                                                marginLeft: 10,
                                                marginBottom: 5,
                                            }}
                                        >
                                            Cv. Patras Development
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: '#666',
                                                marginLeft: 10,
                                            }}
                                        >
                                            Denpasar
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <FlatList
                                data={this.state.dataSource}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'column',
                                            margin: 1,
                                            top: 10,
                                        }}
                                    >
                                        <Image
                                            style={styles.imageThumbnail}
                                            source={{ uri: item.src }}
                                        />
                                    </View>
                                )}
                                //Setting the number of column
                                numColumns={3}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 0.8,
                                    borderBottomColor: '#eee',
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginVertical: 20,
                                    }}
                                >
                                    <AntDesign
                                        name="like1"
                                        color="#323B45"
                                        style={{
                                            fontSize: 18,
                                        }}
                                    />

                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: '#666',
                                            marginLeft: 5,
                                        }}
                                    >
                                        like
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginVertical: 20,
                                        marginHorizontal: 50,
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="comment"
                                        color="#323B45"
                                        style={{
                                            fontSize: 18,
                                        }}
                                    />

                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: '#666',
                                            marginLeft: 5,
                                        }}
                                    >
                                        komentar
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginVertical: 20,
                                        marginHorizontal: 30,
                                    }}
                                >
                                    <Ionicons
                                        name="md-share"
                                        color="#323B45"
                                        style={{
                                            fontSize: 18,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: '#666',
                                            marginLeft: 5,
                                        }}
                                    >
                                        share
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Card */}
                    <Text></Text>
                </Animated.ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps)(Toko);
