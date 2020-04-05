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
    FlatList,
    TouchableNativeFeedback,
    ScrollView,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';
import { EvilIcons, Entypo, FontAwesome } from 'react-native-vector-icons';

const { height, width } = Dimensions.get('window');

class Toko extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
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
        const detail = [
            {
                navigate: 'Detail',
                params: '',
            },
        ];

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
                <FlatList
                    style={{ width: '100%', marginTop: 10 }}
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
                                <View>
                                    {detail.map((data, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() =>
                                                this.props.navigation.navigate(
                                                    data.navigate,
                                                    { params: data },
                                                )
                                            }
                                        >
                                            <View style={{ paddingLeft: 15 }}>
                                                <Image
                                                    source={{
                                                        uri: item.gambar_barang,
                                                    }}
                                                    style={{
                                                        width: 80,
                                                        height: 80,
                                                    }}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    ))}
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
                                        <Text style={{ paddingLeft: 5 }}>
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
        width: 380,
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
        width: 355,
        marginTop: 10,
        paddingLeft: 100,
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
