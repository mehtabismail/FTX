import * as React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {Modal, Portal, Text, Provider} from 'react-native-paper';
import Colors from '../../theme/Colors';

const CurrencyModal = ({visible, HandleVisibility, setCurrencyType}: any) => {
  const hideModal = () => HandleVisibility(false);
  const containerStyle = {
    backgroundColor: Colors.background,
    padding: 20,
  };
  let Currency = ['BTC', 'ETH', 'USD', 'USDT', 'POLKADOT'];

  return (
    <Provider>
      <Portal>
        <Modal
          style={{
            paddingHorizontal: 20,
          }}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[containerStyle]}>
          {Currency.map(text => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setCurrencyType(text);
                  HandleVisibility(false);
                }}>
                <Text style={{paddingVertical: 20}}>{text}</Text>
              </TouchableOpacity>
            );
          })}
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default CurrencyModal;
