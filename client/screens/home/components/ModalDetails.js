import React, { Component } from 'react';

import { Modal, Text, TouchableOpacity, View, Alert} from 'react-native';

const ModalDetails = ({ visible,  onRequestClose, children}) => {
	return (
		<View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={onRequestClose}>
          <View style={{marginTop: 22}}>
            {children}
          </View>
        </Modal>
      </View>
	)
}
export default ModalDetails;