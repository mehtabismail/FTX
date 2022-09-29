import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../theme/Colors';
import {Modal, Portal, Provider} from 'react-native-paper';

const ConfirmModalView = ({visible, setVisible}: any) => {
  const hideModal = () => {
    setVisible(false);
  };
  const containerStyle = {
    backgroundColor: Colors.background,
    paddingVertical: 20,
    borderRadius: 10,
  };
  return (
    <Provider>
      <Portal>
        <Modal
          style={{paddingHorizontal: 20}}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[containerStyle]}>
          <View style={{padding: 20, alignItems: 'center'}}>
            <Text style={{color: Colors.black}}>Please Enter OTP First.</Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={hideModal}
              style={{
                backgroundColor: '#FF892F',
                // paddingHorizontal: 60,
                // width: 100,
                alignContent: 'center',
                alignItems: 'center',
                paddingVertical: 15,
                paddingHorizontal: 30,
                borderRadius: 50,
              }}>
              <Text style={{color: '#ffff'}}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default ConfirmModalView;

const styles = StyleSheet.create({});
