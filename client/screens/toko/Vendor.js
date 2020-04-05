import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  Text,
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
  Alert,
  AppRegistry,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView,
  Picker,
  Modal,
  AsyncStorage

} from 'react-native';

import { TextInput } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'radio-button-react-native';
import { DatePicker } from 'react-native-datepicker';
import Loading from 'react-native-whc-loading';
import GradientButton from 'react-native-gradient-buttons';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');

class Vendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKategori: ['Kendaraan', 'Pakaian', 'Sarana'],
      dataJaminan: [{ label: 'Ktp', value: 0 }],
      formData: {
        id_kategori: '',
        id_metode_bayar: '',
        id_metode_kirim: '',
        id_user: '',
        nama_barang: '',
        harga: '',
        jml_barang: '',
        gambar_barang: '',
        deskripsi: '',
        jaminan: 0,
      },
    };
  }
  static navigationOptions = {
    title: 'Vendor',
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

  componentDidMount() {
    let data = AsyncStorage.getItem('email')
    if (data == null) {
      console.log(data)
      this.props.navigation.navigate('Login')
    } else {
      console.log('error')
    }
  }

  render() {
    const {
      id_kategori,
      id_metode_bayar,
      id_metode_kirim,
      id_user,
      nama_barang,
      harga,
      jml_barang,
      gambar_barang,
      deskripsi,
      jaminan,
    } = this.state.formData;

    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        <ScrollView showsVerticalScrollIndicator={false} containerStyle={{ alignItems: 'center' }}>
          <View style={styles.inputContainer}>
            <View style={styles.View1}>
              <Picker
                label="Nama Barang"
                mode="outlined"
                selectedValue={id_kategori}
                style={{ height: 50 }}
                onValueChange={id_kategori =>
                  this.setState(prevState => ({
                    formData: {
                      ...prevState.formData,
                      id_kategori,
                    },
                  }))
                }>
                {this.state.dataKategori.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item}
                    value={item.toLocaleLowerCase()}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.row}>
              <TextInput
                label="Nama Barang"
                mode="outlined"
                theme={{
                  colors: {
                    primary: 'blue',
                    underlineColor: 'transparent',
                  }
                }}
                onChangeText={nama_barang =>
                  this.setState(prevState => ({
                    formData: {
                      ...prevState.formData,
                      nama_barang,
                    },
                  }))
                }
                value={nama_barang}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                label="Harga"
                mode="outlined"
                theme={{
                  colors: {
                    primary: 'blue',
                    underlineColor: 'transparent',
                  }
                }}
                keyboardType="numeric"
                onChangeText={harga =>
                  this.setState(prevState => ({
                    formData: {
                      ...prevState.formData,
                      harga,
                    },
                  }))
                }
                value={harga}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                label="Jumlah Barang"
                mode="outlined"
                theme={{
                  colors: {
                    primary: 'blue',
                    underlineColor: 'transparent',
                  }
                }}
                keyboardType="numeric"
                onChangeText={jml_barang =>
                  this.setState(prevState => ({
                    formData: {
                      ...prevState.formData,
                      jml_barang,
                    },
                  }))
                }
                value={jml_barang}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Gambar</Text>
              <View>
                <Ionicons
                  name="ios-image"
                  size={25}
                  color="grey"
                  style={{ paddingLeft: 5, marginTop: 5 }}
                // onPress={this._pickImage.bind(this)}
                />
              </View>
            </View>
            <View style={styles.row}>
              <TextInput
                label="Deskripsi"
                mode="outlined"
                theme={{
                  colors: {
                    primary: 'blue',
                    underlineColor: 'transparent',
                  }
                }}
                {...this.props}
                editable={true}
                maxLength={200}
                numberOfLines={4}
                multiline={true}
                onChangeText={deskripsi =>
                  this.setState(prevState => ({
                    formData: {
                      ...prevState.formData,
                      deskripsi,
                    },
                  }))
                }
                value={deskripsi}
              />
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { marginBottom: 10 }]}>Jaminan</Text>
              <RadioForm
                radio_props={this.state.dataJaminan}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                labelStyle={{ paddingRight: 15 }}
                buttonColor={'#2196f3'}
                animation={true}
                onPress={jaminan =>
                  this.setState(prevState => ({
                    formData: {
                      ...prevState.formData,
                      jaminan,
                    },
                  }))
                }
              />
            </View>
            <Loading ref="loading" />
          </View>
        </ScrollView>
        <View style={{ alignItems: 'center' }}>
          <GradientButton
            style={{ marginVertical: 10 }}
            text="SIMPAN"
            textStyle={{ fontSize: 20 }}
            blue
            gradientDirection="diagonal"
            height={60}
            width={300}
            radius={15}
            impact
            impactStyle='Light'
            onPressAction={() => alert('Berhasil menjadi Vendor')}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  View1: {
    marginBottom: 15,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5
  },
  row: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
  },
  btnContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  textBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  textInput: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 5
  },
  inputDesc: {
    fontSize: 16,
    height: 60,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 5
  },
  inputContainer: {
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});

export default Vendor;