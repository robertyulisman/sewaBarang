import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

export default class GreyButton extends Component {
    render() {
        return (
            <View style={styles.button}>
                <TouchableOpacity onPress={this._submit} style={{ backgroundColor: 'blue', paddingLeft: 20, paddingRight: 20, height: 40, width: '95%', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} >
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                        {this.props.text}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    _submit = () => {
  alert('Sewa Berhasil');
  }
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    }
})