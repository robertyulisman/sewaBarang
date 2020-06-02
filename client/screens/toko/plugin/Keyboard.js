import React from 'react';
import { TouchableOpacity, StyleSheet, View, TextInput, Text} from 'react-native';
import KeyboardStickyView from 'react-native-keyboard-sticky-view';
import { Input } from 'native-base';

export default class KeyboardStickyViewExample extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textinputWrapper}>
          <Input
          placeholder='komentar...'
          />
        </View>
        <KeyboardStickyView
          onKeyboardShow={f => f}
          onKeyboardHide={f => f}
        >
          { (state, props) => (
            <TouchableOpacity style={styles.btn}>
              <Text style={{color: 'white'}}>Kirim</Text>
            </TouchableOpacity>
          )}
        </KeyboardStickyView>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        backgroundColor: 'blue',
        height: 40,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 5,
    },
    textinputWrapper: {
        borderRadius: 5,
        borderWidth: 1,
        width: '80%',
        height: 40,
        borderColor: 'grey'
    }
})