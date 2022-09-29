import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Keyboard,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {mainStyle} from '../../../components/styles/ScreenStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Language from '../../../components/Language';
import LoginHeader from '../../../components/LoginHeader';
import FTX_International from '../../../components/FTX_International';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import navigationStrings from '../../../constants/navigationStrings';
import {useLoginMutation} from '../../../redux/services/authentication/Authentication';
import {useDispatch} from 'react-redux';
import Colors from '../../../theme/Colors';
import HeaderLogin from './emailPasswordHeader';
import {Modal, Portal, Provider} from 'react-native-paper';
import ModalView from '../../../components/modal';
import ConfirmModal from '../../../components/ConfirmModal';
import {
  storeStatus,
  storeToken,
} from '../../../redux/reducers/register/RegisterSlice';
import {validateEmptyFields} from '../../../utils/formValidator';
import isEmpty from '../../../utils/isEmpty';
import {
  startLoading,
  stopLoading,
} from '../../../redux/reducers/loading/Loading';

const Login = ({navigation}: any) => {
  // USE-STATE HOOKS
  var [email, setEmail] = useState('');
  var [passwords, setPassword] = useState('');
  const [passShowHide, setPassShowHide] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const dispatch = useDispatch();
  const [login, responseInfo] = useLoginMutation();

  // ON-CHANGE FUNCTION FOR CUSTOM-TEXTINPUT
  const handleChangeInput = (value: string, fieldName: string) => {
    fieldName === 'Email'
      ? setEmail(value.toLowerCase())
      : fieldName === 'Password'
      ? setPassword(value)
      : null;
  };

  const errorMessages = {
    email: 'Email',
    passwords: 'Password',
  };

  const removeError = (props: any) => {
    console.log(
      props.toLowerCase(),
      '----------------------------------------------------------------',
    );
    if (props.toLowerCase() === 'email') {
      setErrors({
        ...errors,
        email: '',
      });
    }

    if (props.toLowerCase() === 'password') {
      setErrors({
        ...errors,
        passwords: '',
      });
    }
  };

  const setAsyncData = async (token: string, status: string) => {
    try {
      !!token && (await AsyncStorage.setItem('token', token));
      !!status && (await AsyncStorage.setItem('status', status));
      !!token && (await AsyncStorage.setItem('isLogin', 'true'));

      // NAVIGATE TO WALLET SCREEN STACK
      navigation.reset({
        index: 0,
        routes: [{name: navigationStrings.BOTTOM_TABS}],
      });
    } catch (e) {
      // saving error
      console.log(e, 'catch errorr while storing in Async storage');
    }
  };
  const API_FETCHING_Error = (result: any) => {
    if (result.error.status === 'FETCH_ERROR') {
      Alert.alert('Network request failed try again!');
    } else {
      if (result?.error?.data?.errors) {
        Alert.alert(result?.error?.data?.errors?.[0]?.message);
      } else {
        Alert.alert('Something went wrong!');
      }
    }
  };

  const settingToken_redux = (token: string, status: string) => {
    dispatch(storeToken(token));
    dispatch(storeStatus(status));
    setAsyncData(token, status);
  };

  const navgationSteps = (token: string, status: string) => {
    settingToken_redux(token, status);
  };

  // ON-PRESS FUNCTION FOR SIGNIN FUNCTIONALITY
  const onClickHandler = async () => {
    // navigation.navigate(navigationStrings.BOTTOM_TABS as any)

    Keyboard.dismiss();
    const error = validateEmptyFields({email, passwords}, errorMessages);
    setErrors(error);

    const formState: object | any = {
      email,
      passwords,
    };

    if (isEmpty(error)) {
      try {
        dispatch(startLoading());
        let email = formState.email.replace(/^\s+|\s+$/gm, '');
        const result: any = await login({
          email: email,
          password: formState.passwords,
        } as any);
        console.log(responseInfo, result, "login check");
        responseInfo?.isLoading == false
          ? dispatch(stopLoading())
          : dispatch(startLoading());
        !!result?.data?.token
          ? navgationSteps(result?.data?.token, result?.data?.status)
          : API_FETCHING_Error(result);
      } catch (error: any) {
        console.log(error, 'catch block');
        Alert.alert(error);
      }
    }
  };

  // RENDERING UI SCREEN STACK
  return (
    <SafeAreaView style={[mainStyle]}>
      <View style={styles.mainView}>
        {/* SIGN-IN TEXT HEADER */}
        <View style={{flex: 1}}>
          <HeaderLogin
            headerText1="Email"
            headerText2="Password"
            screen="Login"
          />
          {/* TEXT-INPUTS */}
          <View
            style={{
              marginTop: 10,
              // height: Dimensions.get('screen').height / 2.6,
              flex: 1,
            }}>
            <CustomTextInput
              fieldName="Email"
              label="Email"
              // placeholder="Email"
              handleChangeInput={handleChangeInput}
              error={errors.email && errors.email}
              removeError={removeError}
              screen="Login"
            />
            <CustomTextInput
              // placeholder="Password"
              label="Password"
              fieldName="Password"
              secureTextEntry={true}
              handleChangeInput={handleChangeInput}
              error={errors.passwords && errors.passwords}
              flag="Password-hide-show"
              passShowHide={passShowHide}
              setPassShowHide={setPassShowHide}
              value={passwords}
              removeError={removeError}
              screen="Login"
            />
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{marginHorizontal: 20, alignItems: 'flex-end'}}>
              <Text
                style={{
                  color: Colors.Primary,
                  fontSize: 14,
                  fontFamily: 'RedHatDisplay-Medium',
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  paddingVertical: 10,
                }}
                onPress={() =>
                  navigation.navigate(navigationStrings.REGISTER as any)
                }>
                <Text
                  style={{
                    color: '#9EA1AC',
                    fontSize: 14,
                    fontFamily: 'RedHatDisplay-Medium',
                  }}>
                  {'New to Swissblock? '}
                </Text>
                <Text
                  style={{
                    color: Colors.Primary,
                    fontSize: 14,
                    fontFamily: 'RedHatDisplay-Medium',
                  }}>
                  SignUp
                </Text>
              </TouchableOpacity>
            </View>

            {/* LOGIN BUTTON */}
            <View>
              <CustomButton
                buttonText="Login"
                isLoadingButton={true}
                pressed={pressed}
                onPress={onClickHandler}
              />
            </View>
          </View>
        </View>

        <View
          style={
            Platform.OS == 'android'
              ? {
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                }
              : Platform.OS == 'ios' &&
                {
                  // position: 'absolute',
                  // elevation: 3,
                  // height: '100%',
                  // width: '100%',
                }
          }>
          <ModalView
            visible={visible}
            HandleVisibility={setVisible}
            setConfirmModal={setConfirmModal}
          />
        </View>
        {/* <Modal */}
        <View
          style={
            Platform.OS == 'android'
              ? {
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                }
              : Platform.OS == 'ios' &&
                {
                  // position: 'absolute',
                  // elevation: 3,
                  // height: '100%',
                  // width: '100%',
                }
          }>
          <ConfirmModal
            visible={confirmModal}
            setConfirmModal={setConfirmModal}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
