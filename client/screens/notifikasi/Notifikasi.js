import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    ImageBackground,
    Animated,
    KeyboardAvoidingView,
    RefreshControl,
    Alert,
    AppRegistry,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    ListView,
    TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { connect } from 'react-redux';

const data = [
    {
        id: 1,
        imageUrl:
            'https://serving.photos.photobox.com/5934632410fac0040b78f5bb8156550e0acbd647cc9355c99c8e07858aa294a1cbd03947.jpg',
        name: 'Sepeda Fixie',
        peminjaman: '12/08/19',
        pengembalian: '13/08/19',
        status: 'Menunggu Pembayaran',
        harga: '70.000',
    },
];

class Notifikasi extends Component {
    static navigationOptions = {
        title: 'Notifikasi',
        headerStyle: {
            backgroundColor: 'blue',
        },
        //   headerBackground: (
        //   <LinearGradient
        //     style={{flex: 1}}
        //     colors={['#00d2ff', '#3a7bd5']}
        //     start={{x: 0, y: 0}}
        //     end={{x: 1, y: 0}}
        //   />
        // ),
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render() {
        const { profile } = this.props.profile;
        return (
            <ScrollView>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle={'light-content'}
                />
                {profile.sewaItem.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.card}
                            onPress={() =>
                                this.props.navigation.navigate('Tes')
                            }
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={{ uri: item.gambarBarang }}
                                    style={{ width: 100, height: 90 }}
                                />
                                <View style={{ paddingLeft: 20 }}>
                                    <Text
                                        style={{
                                            paddingBottom: 8,
                                            fontWeight: 'bold',
                                            fontSize: 15,
                                        }}
                                    >
                                        {item.namaBarang}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingBottom: 8,
                                        }}
                                    >
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Peminjaman
                                            </Text>
                                            <Text style={{ fontSize: 12 }}>
                                                peminjaman
                                            </Text>
                                        </View>
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Pengembalian
                                            </Text>
                                            <Text style={{ fontSize: 12 }}>
                                                pengembalian
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingBottom: 8,
                                        }}
                                    >
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Durasi Sewa
                                            </Text>
                                            <Text style={{ fontSize: 12 }}>
                                                1 Hari
                                            </Text>
                                        </View>
                                        <View style={{ paddingLeft: 5 }}>
                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Biaya Sewa
                                            </Text>
                                            <Text style={{ fontSize: 12 }}>
                                                Rp.{item.harga}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            padding: 5,
                                            borderRadius: 5,
                                            borderWidth: 0.8,
                                            width: 120,
                                            borderColor: 'blue',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 10,
                                                color: 'blue',
                                            }}
                                        >
                                            status
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        );
    }

    editProfile = () => {
        this.props.navigation.navigate('EditProfile');
    };
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps)(Notifikasi);

const styles = StyleSheet.create({
    Text: {
        fontSize: 15,
        paddingLeft: 10,
        alignContent: 'center',
    },
    card: {
        backgroundColor: 'white',
        padding: 8,
        height: 160,
        borderRadius: 4,
        marginVertical: 10,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
});
