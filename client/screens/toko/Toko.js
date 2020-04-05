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
    TouchableNativeFeedback,
    ScrollView,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';
import { EvilIcons, Entypo, FontAwesome } from 'react-native-vector-icons';
import GradientHeader from 'expo-gradient-header';
import SwipeablePanel from 'rn-swipeable-panel';
import Coments from '../toko/Coments';
import { Content, Textarea, Form, Footer } from 'native-base';
import Keyboard from '../toko/Keyboard';

const { height, width } = Dimensions.get('screen');

class Toko extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            swipeablePanelActive: false,
        };
    }

    componentDidMount() {
        return fetch('http://192.168.100.5/api/sewabarang/index.php/vendor/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson.vendor,
                    },

                    function () {},
                );
            })
            .catch((error) => {
                //catch menangkap eror.
                console.error(error);
            });
    }

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
        randomNumber = Math.floor(Math.random() * 7);

        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                        }}
                    >
                        <Image
                            source={require('../../assets/splash1.png')}
                            style={{ height: 130, width: 130 }}
                        />
                    </View>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <GradientHeader
                    title="Toko"
                    subtitle="Have a nice day Gede'S"
                    gradientColors={['#00d2ff', '#3a7bd5']}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: '35%' }}
                >
                    <FlatList
                        style={{ width: width, marginTop: 10 }}
                        data={this.state.dataSource}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.postHolder}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            paddingLeft: 20,
                                            marginTop: 5,
                                        }}
                                    >
                                        <Image
                                            source={{ uri: item.gambar }}
                                            style={{ width: 50, height: 50 }}
                                        />
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                paddingLeft: 5,
                                                fontSize: 15,
                                                marginTop: 5,
                                            }}
                                        >
                                            {item.nama_user}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            paddingLeft: 75,
                                            flexDirection: 'row',
                                            marginTop: -25,
                                        }}
                                    >
                                        <Text style={{ fontSize: 15 }}>
                                            {item.alamat}
                                        </Text>
                                        <Text style={{ fontSize: 15 }}>
                                            , {item.nama_kabupaten}
                                        </Text>
                                        <Text style={{ fontSize: 15 }}>
                                            , {item.nama_provinsi}
                                        </Text>
                                    </View>
                                    <View style={styles.hairline}></View>

                                    <View style={{ paddingLeft: 15 }}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.props.navigation.navigate(
                                                    'Detail',
                                                    { ...item },
                                                )
                                            }
                                        >
                                            <Image
                                                source={{
                                                    uri: item.gambar_barang,
                                                }}
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ marginTop: 30 }}>
                                        <View style={styles.hairline}></View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon
                                                name="like1"
                                                size={20}
                                                color="grey"
                                                style={{
                                                    paddingLeft: 15,
                                                    marginTop: -2,
                                                }}
                                            />
                                            <Text style={{ paddingLeft: 5 }}>
                                                like
                                            </Text>

                                            <FontAwesome
                                                name="comment"
                                                size={20}
                                                color="grey"
                                                style={{ paddingLeft: 13 }}
                                            />
                                            <Text
                                                style={{ paddingLeft: 5 }}
                                                onPress={this.openPanel}
                                            >
                                                comment
                                            </Text>

                                            <Entypo
                                                name="share"
                                                size={20}
                                                color="grey"
                                                style={{ paddingLeft: 135 }}
                                            />
                                            <Text
                                                style={{ paddingLeft: 5 }}
                                                onPress={this.onShare}
                                            >
                                                share
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </ScrollView>
                <SwipeablePanel
                    fullWidth
                    isActive={this.state.swipeablePanelActive}
                    onClose={this.closePanel}
                    onPressCloseButton={this.closePanel}
                >
                    <Keyboard />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Coments />
                    </ScrollView>
                </SwipeablePanel>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf0f1',
        flex: 1,
    },
    postHolder: {
        alignSelf: 'center',
        height: 250,
        width: width,
        backgroundColor: 'white',
        marginTop: 5,
        borderBottomWidth: 10,
        borderColor: '#ddd',
    },
    iconWrap: {
        width: 20,
        alignItems: 'center',
        padding: 5,
        margin: 10.5,
    },
    postImg: {
        height: 250,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    postContent: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    postUserPic: {
        height: 45,
        width: 45,
        borderRadius: 20,
    },
    postUserName: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    alamat: {
        fontSize: 13,
        color: 'grey',
        paddingLeft: 10,
    },
    hairline: {
        backgroundColor: '#A2A2A2',
        height: 0.5,
        width: width - 23,
        marginTop: 10,
        margin: 11,
    },
    up: {
        height: 80,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'blue',
    },
});
export default Toko;
