import * as React from 'react';
import {useState} from 'react';
import {
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {Modal, Portal, Text, Provider} from 'react-native-paper';
import CustomTextInput from './CustomTextInput';
import {mainStyle} from '../components/styles/ScreenStyle';
import {useForgetPassMutation} from '../redux/services/authentication/Authentication';
import Colors from '../theme/Colors';
import isEmpty from '../utils/isEmpty';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import navigationStrings from '../constants/navigationStrings';
import {validateEmptyFields} from '../utils/formValidator';

const ModalView = ({visible, HandleVisibility, setConfirmModal}: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgetPass, responseInfo] = useForgetPassMutation();
  const [errors, setErrors]: any = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const hideModal = () => {
    setErrors({
      ...errors,
      email: '',
    });
    HandleVisibility(false);
  };
  const containerStyle = {
    backgroundColor: Colors.background,
    paddingVertical: 20,
    borderRadius: 30,
  };
  const handleChangeInput = (value: string, fieldName: string) => {
    fieldName === 'Confirm Your Email' ? setEmail(value) : null;
  };
  const errorMessages = {
    email: 'Email',
  };

  const removeError = (props: any) => {
    setErrors({
      ...errors,
      email: '',
    });
  };

  const sendEmail = async () => {
    Keyboard.dismiss();
    const error = validateEmptyFields({email}, errorMessages);
    setErrors(error);
    const formState: object | any = {
      email,
    };

    if (isEmpty(error)) {
      try {
        setLoading(true);
        const result: any = await forgetPass(formState);
        // if (responseInfo.isLoading === true) {
        //   setLoading(true);
        // } else {
        //   setLoading(false);
        // }
        console.log('result=====', result);
        if (result?.data?.msg) {
          setLoading(false);
          setConfirmModal(true);
          HandleVisibility(false);
          // Alert.alert('We’ve just sent you an email to reset your password');
          navigation.navigate(navigationStrings.LOGIN as any);
        } else {
          Alert.alert(result?.error?.data?.msg);
        }
      } catch (e) {
        console.log('catch Error', e);
      }
    }
  };
  return (
    <Provider>
      <Portal>
        <Modal
          style={{paddingHorizontal: 20}}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[containerStyle]}>
          <CustomTextInput
            fieldName="Confirm Your Email"
            label="Confirm Your Email"
            // placeholder="Confirm Your Email"
            handleChangeInput={handleChangeInput}
            error={errors.email && errors.email}
            removeError={removeError}
            screen="Login"
          />
          <View style={styles.bottomButton}>
            <TouchableOpacity onPress={hideModal}>
              <View style={styles.loginButton}>
                <Text style={{color: '#3D3B44'}}>Cancel</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendEmail} style={styles.signupButton}>
              {loading === false ? (
                <Text style={{color: '#FFFF', fontSize: 14}}>
                  Send Reset Email
                </Text>
              ) : (
                <ActivityIndicator size="small" color="white" />
              )}
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  bottomButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 50,
  },
  signupButton: {
    backgroundColor: '#FF892F',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
});

export default ModalView;
