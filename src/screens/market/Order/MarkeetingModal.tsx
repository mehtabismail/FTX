import * as React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {Modal, Portal, Text, Provider} from 'react-native-paper';
import Colors from '../../../theme/Colors';
import Cross from '../../../assets/bottomTabNavigation/wallet/cross.svg';

const MarkeetingModal = ({
  visible,
  HandleVisibility,
  setOrderType,
  ModalHandler,
}: any) => {
  const hideModal = () => HandleVisibility(false);
  const containerStyle = {
    backgroundColor: Colors.background,
    // padding: 20,
    
  };
  let markeetingBtnText = [
    'Limit order',
    'Market order',
    'Stop market',
    'Stop limit',
    'Trailing stop',
    'Take profit',
    'Take profit limit',
    'TWAP',
  ];

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
          {markeetingBtnText.map((text, index) => {
            return (
              <View style={{justifyContent:'center',paddingHorizontal: index !==0 ? 20: 0}}>
                {
                  index === 0 && <TouchableOpacity onPress={()=>HandleVisibility(false)} style={styles.crossButton}><Cross /></TouchableOpacity>
                }
                <TouchableOpacity
                  
                  onPress={() => {
                    console.log(text, 'textOrderatype');
                    ModalHandler(text);
                    HandleVisibility(false);
                  }}>
                  <Text style={{paddingVertical: 20, paddingHorizontal: index === 0 ? 20: 0}}>{text}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  crossButton: {
    alignSelf: "flex-end",
    padding: 15
  }
});

export default MarkeetingModal;
