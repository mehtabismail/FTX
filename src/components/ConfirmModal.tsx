import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Modal, Portal, Text, Provider} from 'react-native-paper';
import Colors from '../theme/Colors';

const ConfirmModal = ({visible, setConfirmModal}: any) => {
  console.log(visible);
  const hideModal = () => setConfirmModal(false);
  const containerStyle = {
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 20,

    // height: 600,
  };

  return (
    <Provider>
      <Portal>
        <Modal
          style={{paddingHorizontal: 20}}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[containerStyle]}>
          <Text
            style={{
              textAlign: 'center',
              color: Colors.textColor,
              fontFamily: 'RedHatDisplay-Medium',
            }}>
            We’ve just sent you an email to reset your password.
          </Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  signupButton: {
    backgroundColor: '#FF892F',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 20,
  },
});

export default ConfirmModal;
