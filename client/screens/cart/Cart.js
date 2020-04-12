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
    CheckBox,
    TouchableWithoutFeedback,
    ToastAndroid,
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-date-ranges';
import { default as NumberFormat } from 'react-number-format';
import GradientHeader from 'expo-gradient-header';
import TouchableScale from 'react-native-touchable-scale';
import { Footer } from 'native-base';
import { connect } from 'react-redux';
import { apiUrl } from '../../config';
import axios from 'axios';
import { getCurrentProfileData } from '../../redux/actions/profileActions';
import PropTypes from 'prop-types';

const data = [
    {
        harga: '70.000',
    },
];

const { height, width } = Dimensions.get('window');

class Cart extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            total: 0,
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
        ToastAndroid.show(`data berhasil di update`, ToastAndroid.SHORT);
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

                ToastAndroid.show(
                    `berhasil delete ${item.namaBarang}`,
                    ToastAndroid.SHORT,
                );
            })
            .catch((err) => console.log('error get by id', err));
    };

    onSubmitLanjut = () => {
        const { startDate, endDate } = this.state;
        if (startDate === null && endDate === null) {
            alert('tanggal tidak boleh kosong');
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
            <View
                style={{ flex: 1, backgroundColor: 'rgba(232, 232, 232, 1)' }}
            >
                <StatusBar barStyle="light-content" />
                <GradientHeader
                    title="Keranjang"
                    subtitle={`Have a nice day ${profile.nama}`}
                    gradientColors={['#00d2ff', '#3a7bd5']}
                />

                <View style={{ flexDirection: 'row', marginTop: '40%' }}>
                    <CheckBox
                        value={this.state.check}
                        onChange={() => this.checkBoxtest()}
                        style={{ paddingLeft: 10 }}
                        tintColors={{ true: 'blue' }}
                    />
                    <Text style={{ fontWeight: 'bold' }}>Pilih Semua(1/1)</Text>
                </View>

                <View
                    style={{
                        backgroundColor: 'blue',
                        alignSelf: 'center',
                        width,
                        height: 40,
                    }}
                />
                <View style={{ flex: 1 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: -20 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        {sewaItem.length === 0 ? (
                            <Text
                                style={{
                                    marginTop: 100,
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                }}
                            >
                                belum ada data
                            </Text>
                        ) : (
                            sewaItem.map((item, index) => {
                                return (
                                    <View
                                        style={{
                                            marginTop: 10,
                                            backgroundColor: 'white',
                                        }}
                                    >
                                        <View style={styles.content}>
                                            <CheckBox
                                                value={this.state.check}
                                                onChange={() =>
                                                    this.checkBoxtest()
                                                }
                                            />
                                            <View
                                                style={{
                                                    flex: 1,
                                                    paddingBottom: 20,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                    }}
                                                    source={{
                                                        uri: item.gambarBarang,
                                                    }}
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    paddingBottom: 10,
                                                    flex: 3,
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        paddingBottom: 10,
                                                        fontSize: 15,
                                                    }}
                                                >
                                                    {item.namaBarang}
                                                </Text>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                    }}
                                                >
                                                    <NumberFormat
                                                        key={index}
                                                        value={item.harga}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        prefix={'Rp.'}
                                                        renderText={(value) => (
                                                            <Text
                                                                style={{
                                                                    paddingBottom: 10,
                                                                    fontWeight:
                                                                        'bold',
                                                                    fontSize: 15,
                                                                    color:
                                                                        'green',
                                                                }}
                                                            >
                                                                {value}/Hari
                                                            </Text>
                                                        )}
                                                    />

                                                    <TouchableScale
                                                        style={{
                                                            paddingLeft: 100,
                                                        }}
                                                        onPress={() =>
                                                            this.handleDelete(
                                                                item,
                                                            )
                                                        }
                                                    >
                                                        <Image
                                                            source={require('../../images/delete.png')}
                                                            style={{
                                                                height: 20,
                                                                width: 15,
                                                                resizeMode:
                                                                    'stretch',
                                                            }}
                                                        />
                                                    </TouchableScale>
                                                </View>

                                                <View>
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                'row',
                                                        }}
                                                    >
                                                        <TouchableOpacity
                                                            style={{
                                                                paddingLeft: -10,
                                                            }}
                                                        >
                                                            <Image
                                                                source={require('../../images/calendar.png')}
                                                                style={{
                                                                    height: 15,
                                                                    width: 15,
                                                                    resizeMode:
                                                                        'stretch',
                                                                }}
                                                            />
                                                        </TouchableOpacity>
                                                        <DatePicker
                                                            style={{
                                                                width: 150,
                                                                height: 30,
                                                                borderWidth: 0,
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
                                                                marginHorizontal: -145,
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
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })
                        )}
                    </ScrollView>
                </View>

                {/* <Footer style={{position: 'absolute', left: 0, right: 0, bottom: 0}}> */}
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
                {/* </Footer> */}
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
        borderBottomColor: '#95a5a6',
        borderBottomWidth: 0.5,
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
});
