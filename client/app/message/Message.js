import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    ImageBackground,
    StatusBar,
} from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown';
import ListView from 'deprecated-react-native-listview';

const data = [
    { value: 'Upgrade' },
    { value: 'Settings' },
    { value: 'About' },
    { value: 'Sign out' },
];
const { width, height } = Dimensions.get('window');
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const conversation = [
    {
        sent: true,
        msg: 'all cool!',
    },
    {
        sent: false,
        msg: 'Hey wassup?',
    },
];

const EachMsg = (props) => {
    if (props.sent === false) {
        return (
            <View style={styles.eachMsg}>
                <Image
                    source={require('../message/images/brendan.jpg')}
                    style={styles.userPic}
                />
                <View style={styles.msgBlock}>
                    <Text style={styles.msgTxt}>{props.msg}</Text>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.rightMsg}>
            <View style={styles.rightBlock}>
                <Text style={styles.rightTxt}>{props.msg}</Text>
            </View>
            <Image
                source={require('../message/images/tobias.jpg')}
                style={styles.userPic}
            />
        </View>
    );
};

console.disableYellowBox = true;
class Message extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows(conversation),
            msg: '',
        };
        this.send = this.send.bind(this);
        this.reply = this.reply.bind(this);
    }

    reply() {
        conversation.unshift({
            sent: false,
            msg: 'React Native  is Awesome!',
        });
        this.setState({
            dataSource: ds.cloneWithRows(conversation),
        });
    }

    send() {
        if (this.state.msg.length > 0) {
            conversation.unshift({
                sent: true,
                msg: this.state.msg,
            });
            this.setState({
                dataSource: ds.cloneWithRows(conversation),
                msg: '',
            });
            setTimeout(() => {
                this.reply();
            }, 2000);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle={'light-content'}
                />
                <ImageBackground
                    source={require('../message/images/background.jpg')}
                    style={styles.image}
                >
                    <View style={styles.header}>
                        <View style={styles.left}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('Home')
                                }
                            >
                                <Icon
                                    name="arrow-back"
                                    color="#fff"
                                    size={23}
                                    style={{ paddingLeft: 10, top: 13 }}
                                />
                            </TouchableOpacity>
                            <Image
                                source={require('../message/images/brendan.jpg')}
                                style={styles.chatImage}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate({
                                        id: 'ProfileView',
                                        name: this.props.name,
                                        image: this.props.image,
                                    });
                                }}
                            >
                                <Text style={styles.chatTitle}>Brendan</Text>
                                <Text style={styles.chatTime}>Online</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.right}>
                            <Icon
                                name="videocam"
                                color="#fff"
                                size={24}
                                style={{ left: -15 }}
                            />
                            <Icon
                                name="call"
                                color="#fff"
                                size={23}
                                style={{}}
                                onPress={() =>
                                    this.props.navigation.navigate('CallScreen')
                                }
                            />
                            <Dropdown
                                data={data}
                                renderBase={() => (
                                    <Icon
                                        name="more-vert"
                                        color="#fff"
                                        size={23}
                                        style={{ left: 10 }}
                                    />
                                )}
                                rippleInsets={{
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                }}
                                containerStyle={{ width: 40, height: 40 }}
                                dropdownPosition={1}
                                itemColor="rgba(0, 0, 0, .87)"
                                pickerStyle={{
                                    width: 128,

                                    left: null,
                                    right: 0,

                                    marginRight: 8,
                                    marginTop: 24,
                                }}
                            />
                        </View>
                    </View>
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={styles.keyboard}
                    >
                        <ListView
                            enableEmptySections
                            noScroll
                            renderScrollComponent={(props) => (
                                <InvertibleScrollView {...props} inverted />
                            )}
                            dataSource={this.state.dataSource}
                            contentContainerStyle={{
                                justifyContent: 'flex-end',
                            }}
                            renderRow={(rowData) => (
                                <EachMsg
                                    {...rowData}
                                    image={this.props.image}
                                />
                            )}
                            style={{ flex: 1 }}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.input}>
                                <TextInput
                                    style={{ flex: 1 }}
                                    value={this.state.msg}
                                    onChangeText={(msg) =>
                                        this.setState({ msg })
                                    }
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => this.send()}
                                    placeholder="Type a message"
                                    returnKeyType="send"
                                />
                            </View>
                            <Icon
                                name="attach-file"
                                color="#000"
                                size={23}
                                style={{ left: -80, top: 23 }}
                            />
                            <Icon
                                name="camera-alt"
                                color="#000"
                                size={23}
                                style={{ left: -70, top: 23 }}
                            />
                            <View
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 25,
                                    backgroundColor: 'blue',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    top: 10,
                                    left: -42,
                                }}
                            >
                                <Icon
                                    name="send"
                                    color="#fff"
                                    size={25}
                                    onPress={() => this.send()}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        );
    }
}

export default Message;

const styles = StyleSheet.create({
    keyboard: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width,
        height,
    },
    header: {
        height: 85,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        top: 23,
    },
    chatTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        top: 15,
        left: 5,
    },
    chatTime: {
        color: '#fff',
        margin: 5,
        fontSize: 12,
        left: 5,
        top: 10,
    },
    chatImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        top: 13,
    },
    input: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        padding: 10,
        height: 50,
        width: width - 85,
        borderRadius: 30,
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
    eachMsg: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
    },
    rightMsg: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
        alignSelf: 'flex-end',
    },
    userPic: {
        height: 40,
        width: 40,
        margin: 5,
        borderRadius: 20,
        backgroundColor: '#f8f8f8',
    },
    msgBlock: {
        width: 220,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        padding: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
    rightBlock: {
        width: 220,
        borderRadius: 5,
        backgroundColor: 'blue',
        padding: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
    msgTxt: {
        fontSize: 15,
        color: '#555',
        fontWeight: '600',
    },
    rightTxt: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '600',
    },
});
