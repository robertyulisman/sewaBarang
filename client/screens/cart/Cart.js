import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    Image,
    StatusBar,
    Dimensions,
    ScrollView,
    RefreshControl,
    TouchableWithoutFeedback,
    ToastAndroid,
    Platform,
    AlertIOS,
    ImageBackground
} from 'react-native';
import moment from 'moment'; 
import DatePicker from 'react-native-date-ranges';
import NumericInput from 'react-native-numeric-input';
import { CheckBox } from 'react-native-elements'
import { default as NumberFormat } from 'react-number-format';
import GradientHeader from 'expo-gradient-header';
import TouchableScale from 'react-native-touchable-scale';
import { Footer } from 'native-base';
import { connect } from 'react-redux';
import { apiUrl } from '../../config';
import axios from 'axios';
import { getCurrentProfileData } from '../../redux/actions/profileActions';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const formatNumber = num =>
  `Rp.${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;

import { scale, verticalScale } from "react-native-size-matters";

class Cart extends Component {
    static navigationOptions = ({ navigation }) => ({
        title : "Order",
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
    });

    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            total: 0,
            checked: false,
            check: false,
            showToast: false,
            modalVisible: false,
            allowPointerEvents: true,
            showContent: false,
            selected: '',
            startDate: null,
            endDate: null,
            date: new Date(),
            focus: 'startDate',
            currentDate: moment(),
            sewaItem: [],
            refreshing: false,
        };
    }

    MakeTotal = (amount) => {
        total = amount;
    };

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getDataUser();
        this.setState({ refreshing: false });
        if (Platform.OS === 'android') {
            ToastAndroid.show(`data berhasil di update`, ToastAndroid.SHORT);
        } else {
            AlertIOS.alert('data berhasil di update')
        }
    };

    checkBoxtest() {
        this.setState({
            check: !this.state.check,
        });
    }

    customButton = (onConfirm) => (
        <Button
            onPress={onConfirm}
            style={{
                container: { width: '80%', marginHorizontal: '3%' },
                text: { fontSize: 20 },
            }}
            primary
            text={'Submit'}
        />
    );

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            this.setState({
                sewaItem: nextProps.profile.profile.sewaItem,
            });
        }
    }

    componentWillMount() {
        const id = this.props.auth.user._id;
        this.props.getCurrentProfileData(id);
        this.getDataUser();
        this.getData();
    }

    getDataUser = () => {
        const { profile } = this.props.profile;
        this.setState({
            sewaItem: profile.sewaItem,
        });
    };

    getData = () => {
        const id = this.props.auth.user._id;
        axios
            .get(`${apiUrl}/api/user/${id}`)
            .then((res) => {
                this.setState({
                    sewaItem: res.data.sewaItem,
                });
            })
            .catch((err) => console.log('error get by id', err));
    };

    handleDelete = (item) => {
        const id = this.props.auth.user._id;
        const idDelete = item._id;
        axios
            .delete(`${apiUrl}/api/sewaitem/delete/product/${id}/${idDelete}`)
            .then((res) => {
                console.log('ini respon delete', res.data);
                this.getData();
                this.getDataUser();
                this.props.getCurrentProfileData(id);
                if (Platform.OS === 'android') {
                    ToastAndroid.show(
                        `berhasil hapus ${item.namaBarang}`,
                        ToastAndroid.SHORT,
                    );
                } else {
                    AlertIOS.alert(`Berhasil hapus ${item.namaBarang}`)
                }
            })
            .catch((err) => console.log('error get by id', err));
    };

    onSubmitLanjut = () => {
        const { startDate, endDate } = this.state;
        if (startDate === null && endDate === null) {
            alert('Tanggal tidak boleh kosong');
        } else {
            this.props.navigation.navigate('Pay');
        }
    };

    render() {
        const { ...rest } = this.props;
        const { profile } = this.props.profile;
        const { sewaItem, check } = this.state;
        const tombolLanjut = check === false ? 'grey' : 'blue';
        const tombolDisable = check === false ? true : false;
        console.log('sewa item', sewaItem);
        const jumlah = [];

        for (let i = 0; i < sewaItem.length; i++) {
            jumlah.push(sewaItem[i].harga);
        }

        const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;

        const total = jumlah !== [] ? jumlah.reduce(reducer, 0) : 0;

        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(232, 232, 232, 1)'}}>
                <StatusBar barStyle="light-content" />
                <View style={{flex: 1}}>
                    <CheckBox 
                        title="Pilih Semua (0/0)"
                        checkedColor="blue"
                        uncheckedColor="blue"
                        checked={this.state.check}
                        textStyle={{color:'blue'}}
                        containerStyle={{
                            width:200,
                            backgroundColor:'rgba(0,0,0,0)',
                            borderColor:'rgba(0,0,0,0)'
                        }}
                        onPress={()=> this.checkBoxtest()}
                    />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        {sewaItem.length === 0 ? (
                            <View style={{flex: 1}}>
                            <View style={{justifyContent: 'center', flex: 1, marginTop: '40%', flexDirection: 'column'}}>
                            <Image
                                source={{uri: 'https://i.imgur.com/FSXpkHU.png'}}
                                style={{...Platform.select({
                                    ios: {
                                        width: 190, 
                                        height: 190, 
                                        resizeMode: 'stretch',
                                        alignSelf: 'center'
                                    },
                                    android: {
                                        width: 200, 
                                        height: 200, 
                                        resizeMode: 'stretch',
                                        alignSelf: 'center'
                                    }
                                })
                            }}
                            />
                            <Text
                                style={{
                                    ...Platform.select({
                                ios: {
                                    marginTop: 5,
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                },
                                android: {
                                    marginTop: 5,
                                    fontWeight: 'bold',
                                    textAlign: 'center'   
                                }

                                })
                            }}
                            >
                                Wah <Text style={{fontWeight: 'bold', color: 'blue', textAlign: 'center'}}>{`${profile.nama}`}</Text> Belum Order Ya?
                            </Text>
                            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Yuk Order Sekarang!</Text>
                            </View>
                            </View>
                        ) : (
                            sewaItem.map((item, index) => {
                                return (
                                    <View style={styles.card}>
                                        <CheckBox 
                                            checkedColor="blue"
                                            uncheckedColor="blue"
                                            checked={this.state.check}
                                            textStyle={{color:'blue'}}
                                            containerStyle={{
                                                width:200,
                                                backgroundColor:'transparent',
                                                borderColor:'transparent'
                                            }}
                                            onPress={()=> this.checkBoxtest()}
                                        />
                                        <View
                                            style={{
                                            alignSelf: "flex-end",
                                            top: -20,
                                            width: screenWidth - scale(80),
                                            height: verticalScale(130),
                                            shadowColor: "#000",
                                            shadowOpacity: 0.16,
                                            borderRadius: 12,
                                            elevation: 2,
                                            shadowRadius: 4,
                                            shadowOffset: {
                                                height: 2,
                                                width: 2
                                            },
                                            backgroundColor: "#ffffff",
                                            justifyContent: "center",
                                            alignItems: "flex-start"
                                            }}
                                        >
                                            <View style={{ flexDirection: "row" }}>
                                            <Image
                                                source={{uri: item.gambarBarang}}
                                                borderRadius={23}
                                                style={{
                                                borderRadius: 23,
                                                width: verticalScale(98),
                                                height: verticalScale(98),
                                                marginLeft: -verticalScale(98 / 2),
                                                alignSelf: "center",
                                                resizeMode: 'stretch'
                                                }}
                                            />
                                            <View
                                                style={{
                                                justifyContent: "center",
                                                alignItems: "flex-start",
                                                padding: 10
                                                }}
                                            > 
                                            <Image 
                                                source={{uri: 'https://i.imgur.com/hDEMSGT.png'}}
                                                style={{
                                                height: 15,
                                                width: 15,
                                                top: -15,
                                                resizeMode:
                                                    'stretch',
                                            }}
                                            />
                                                <DatePicker
                                                style={{
                                                    width: 150,
                                                    height: 30,
                                                    borderWidth: 0,
                                                    marginTop: -30,
                                                    left: 20
                                                }}
                                                ref={(ref) =>
                                                    (this.picker = ref)
                                                }
                                                {...rest}
                                                customButton={
                                                    this
                                                        .customButton
                                                }
                                            />
                                            <DatePicker
                                                style={{
                                                    width: 150,
                                                    height: 30,
                                                    marginTop: -30,
                                                    left: 20
                                                }}
                                                customStyles={{
                                                    placeholderText: {
                                                        fontSize: 20,
                                                    },
                                                    headerStyle: {},
                                                    headerMarkTitle: {},
                                                    headerDateTitle: {},
                                                    contentInput: {},
                                                    contentText: {},
                                                }}
                                                centerAlign
                                                allowFontScaling={
                                                    false
                                                }
                                                mode={'range'}
                                            />
                                            <TouchableOpacity style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: scale(100),
                                                height: verticalScale(30),
                                                position: "absolute",
                                                top: -16,
                                                left: '90%',
                                            }} onPress={() => this.handleDelete(item,)}>
                                                <Image 
                                                source={{uri: 'https://i.imgur.com/GBQkcxc.png'}}
                                                style={{width: 15, height: 20, resizeMode: 'stretch'}}
                                                />
                                            </TouchableOpacity>
                                                <Text
                                                style={{
                                                    height: verticalScale(20),
                                                    color: "#404852",
                                                    width: 190,
                                                    fontSize: scale(12),
                                                    fontWeight: "700",
                                                    letterSpacing: -0.36,
                                                    top: 10
                                                }}
                                                >
                                                {item.namaBarang}
                                                </Text>
                                                <Text
                                                style={{
                                                    height: verticalScale(22),
                                                    color: "green",
                                                    fontSize: scale(12),
                                                    fontWeight: "bold",
                                                    letterSpacing: -0.29,
                                                    lineHeight: verticalScale(22),
                                                    top: 10
                                                }}
                                                >
                                                {formatNumber(item.harga * this.state.count)}
                                                </Text>
                                                {/* <Text
                                                style={{
                                                    height: 16,
                                                    color: "#adb3bf",
                                                    fontSize: scale(12),
                                                    fontWeight: "400",
                                                    letterSpacing: -0.29,
                                                    lineHeight: verticalScale(16),
                                                    marginTop: scale(10),
                                                    marginBottom: scale(10)
                                                }}
                                                >
                                                {this.props.subTitle}
                                                </Text> */}
                                            </View>
                                            </View>
                                            <View
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                width: scale(100),
                                                height: verticalScale(30),
                                                borderRadius: 15,
                                                backgroundColor: "#f3f5f9",
                                                position: "absolute",
                                                bottom: verticalScale(20),
                                                right: scale(16),
                                                flexDirection: "row"
                                            }}
                                            >
                                            <TouchableOpacity
                                                style={{
                                                backgroundColor: 'blue',
                                                height: verticalScale(30),
                                                width: 40,
                                                right: 5,
                                                borderBottomLeftRadius: 15,
                                                borderTopLeftRadius: 15,
                                                justifyContent: "center",
                                                alignItems: "center"
                                                }}
                                                onPress={() => {
                                                if (this.state.count > 0) {
                                                    this.setState({ count: this.state.count - 1 });
                                                }
                                                }}
                                            >
                                                <Text
                                                sstyle={{
                                                    height: verticalScale(10),
                                                    width: scale(10),
                                                    backgroundColor: '#fff'
                                                }}
                                                >
                                                -
                                                </Text>
                                            </TouchableOpacity>
                                            <Text
                                                style={{
                                                width: scale(20),
                                                color: "blue",
                                                fontSize: scale(15),
                                                fontWeight: "500",
                                                letterSpacing: -0.36,
                                                lineHeight: scale(22),
                                                textAlign: "center"
                                                }}
                                            >
                                                {this.state.count}
                                            </Text>
                                            <TouchableOpacity
                                                style={{
                                                height: verticalScale(30),
                                                width: 40,
                                                left: 5,
                                                borderBottomRightRadius: 15,
                                                borderTopRightRadius: 15,
                                                backgroundColor: 'blue',
                                                justifyContent: "center",
                                                alignItems: "center"
                                                }}
                                                onPress={() => {
                                                if (this.state.count < 20) {
                                                    this.setState({ count: this.state.count + 1 });
                                                }
                                                }}
                                            >
                                                <Text
                                                sstyle={{
                                                    height: verticalScale(10),
                                                    width: scale(10),
                                                    backgroundColor: "#fff"
                                                }}
                                                >
                                                +
                                                </Text>
                                            </TouchableOpacity>
                                            </View>
                                        </View>
                                  </View>
                                );
                            })
                        )}
                    </ScrollView>
                </View>

                
                <View style={styles.footer}>
                    <View style={{ marginTop: 10, paddingLeft: 15 }}>
                        <Text
                            style={{
                                paddingBottom: 5,
                                color: '#95a5a6',
                                fontSize: 11,
                            }}
                        >
                            SUBTOTAL ({sewaItem.length} Item)
                        </Text>
                        <NumberFormat
                            value={total}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp.'}
                            renderText={(value) => (
                                <Text
                                    style={{
                                        color: '#000',
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        paddingBottom: 5,
                                    }}
                                >
                                    {value}
                                </Text>
                            )}
                        />

                        <Text
                            style={{
                                paddingBottom: 5,
                                color: '#95a5a6',
                                fontSize: 11,
                            }}
                        >
                            Belum termasuk biaya pengiriman
                        </Text>
                    </View>
                    <View style={{ paddingLeft: 70 }}>
                        <TouchableOpacity
                            onPress={this.onSubmitLanjut}
                            disabled={tombolDisable}
                        >
                            <View
                                style={{
                                    width: 80,
                                    height: 40,
                                    backgroundColor: tombolLanjut,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 15 }}>
                                    Lanjut
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        );
    }
}

Cart.propTypes = {
    getCurrentProfileData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfileData })(Cart);

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    datePickerBox: {
        marginTop: 9,
        borderColor: '#000',
        borderWidth: 0.5,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 38,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    anda: {
        flex: 1,
        paddingLeft: 70,
        marginTop: 130,
    },
    backgroundImage: {
        width: 220,
        height: 220,
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingLeft: 100,
    },
    Textt: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 48,
    },
    Views: {
        paddingLeft: 10,
        marginTop: -100,
    },
    ket: {
        marginTop: 20,
        fontSize: 14,
    },
    footer: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        borderTopColor: '#95a5a6',
        borderTopWidth: 0.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    content: {
        borderRadius: 20,
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    card: {
        flex: 1,
        borderTopWidth: 10,
        borderColor: 'rgba(232, 232, 232, 1)',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 8,
    },
});
