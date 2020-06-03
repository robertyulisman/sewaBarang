import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    StatusBar,
    Image
} from "react-native";

import { Container, Content, Header, Left, Right, Icon, Item, Input, Card, CardItem } from 'native-base'

import { MaterialCommunityIcons, AntDesign, Ionicons, FontAwesome, Feather} from 'react-native-vector-icons';
import axios from 'axios';
import { connect } from 'react-redux';
import { apiUrl } from '../../../config';

// import RecommendedCardItem from '../components/RecommendedCardItem'
class Vendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
        dataVendor: [],
        swipeablePanelActive: false,
    };
  }
  componentDidMount() {
    axios
        .get(`${apiUrl}/api/vendor`)
        .then((res) => {
            this.setState({
                dataVendor: res.data,
            });
            //console.log('res', res.data);
        })
        .catch((err) => console.log('err', err));
  }
    render() {
      const { profile } = this.props.profile;
      const { dataVendor } = this.state;
        return (
            <Container>
              <StatusBar barStyle="light-content" translucent = {true} backgroundColor='transparent'/>
                <Header style={[{ backgroundColor: 'blue', height: 90, borderBottomColor: 'white' }, styles.androidHeader]}>
                    <Left style={{ flexDirection: 'row' }}>
                      <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.navigation.goBack()}>
                        <Feather name="arrow-left" size={25} style={{ color: 'white', marginRight: 15 }}/>
                        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', right: 5}}>Vendor</Text>
                      </TouchableOpacity>
                    </Left>
                    <Right>
                        <Ionicons name="ios-information-circle" size={25} style={{ color: 'white' }} />
                    </Right>
                </Header>
                <View style={{ position: 'absolute', left: 0, right: 0, top: 90, height: 70, backgroundColor: 'blue', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
                    <TouchableOpacity>
                        <View style={{ width: 100, backgroundColor: 'white', height: 50, borderRadius: 4, padding: 10 }}>

                            <Text style={{ fontSize: 12 }}>Pilih</Text>
                            <Text style={{ fontWeight: 'bold' }}>Kategori</Text>
                        </View>

                    </TouchableOpacity>

                    <View style={{ flex: 1, height: "100%", marginLeft: 5, justifyContent: 'center' }}>
                        <Item style={{ backgroundColor: 'white', paddingHorizontal: 10, borderRadius: 4 }}>
                            <Feather name="search" style={{ fontSize: 20, paddingTop: 5 }} />
                            <Input placeholder="Search" />
                        </Item>
                    </View>
                </View>

                <Content style={{ backgroundColor: '#d5d5d6', marginTop: 70 }}>
                    <View style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text>{`Halo, ${profile.nama}`}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Text>Lihat Akun Toko Mu </Text>
                            <Ionicons name="ios-arrow-forward" size={20} color={'black'} />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(Vendor);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    androidHeader: {
        ...Platform.select({
            android: {
                paddingTop: StatusBar.currentHeight,
            }
        })
    }
});