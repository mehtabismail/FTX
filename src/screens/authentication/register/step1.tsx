import {
  Alert,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mainStyle} from '../../../components/styles/ScreenStyle';
import Language from '../../../components/Language';
import LoginHeader from '../../../components/LoginHeader';
import FTX_International from '../../../components/FTX_International';
import CustomTextInput from '../../../components/CustomTextInput';
import CheckBox from '../../../components/CheckBox';
import CustomButton from '../../../components/CustomButton';
import RegisterService from './RegisterService';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../constants/navigationStrings';
import {useDispatch} from 'react-redux';
import {
  storeEmail,
  storeStatus,
  storeToken,
} from '../../../redux/reducers/register/RegisterSlice';
import {useRegisterMutation} from '../../../redux/services/authentication/Authentication';
import {validateEmptyFields} from '../../../utils/formValidator';
import isEmpty from '../../../utils/isEmpty';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startLoading, stopLoading } from '../../../redux/reducers/loading/Loading';

const Step1 = ({navigation}: any) => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();

  const [register, registerInfo] = useRegisterMutation();
  console.log(registerInfo, 'info about sign up ');

  const [passShowHide, setPassShowHide] = useState(false);
  var [email, setEmail] = useState('');
  var [confirmEmail, setConfirmEmail] = useState('');
  var [password, setPassword] = useState('');
  var [confirmPassword, setConfirmPassword] = useState('');
  const [isFocused, setisFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [errors, setErrors]: any = useState({});

  const handleChangeInput = (value: string, fieldName: string) => {
    fieldName === 'Email'
      ? setEmail(value)
      : fieldName === 'Confirm Email'
      ? setConfirmEmail(value)
      : fieldName === 'Password'
      ? setPassword(value)
      : fieldName === 'Confirm Password'
      ? setConfirmPassword(value)
      : null;
  };

  const errorMessages = {
    email: 'Email',
    password: 'Password',
  };
  const storeDataToRedux: Function = async (token: any) => {
    try {
      dispatch(storeToken(token));
      dispatch(storeStatus('initial'));

      !!token && (await AsyncStorage.setItem('status', 'initial'));

      // Navigate to Step 2
      navigation.navigate(navigationStrings.STEP2 as any, {
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = async () => {
    Keyboard.dismiss();
    
    const error = validateEmptyFields({email, password}, errorMessages);
    setErrors(error);

    const formState: any = {
      email: email.trim(),
      password: password,
    };

    const API_FETCHING_Error = (result: any) => {
      console.log(registerInfo);
      if (result.error.status === 'FETCH_ERROR') {
        Alert.alert('Network request failed try again!');
      } else {
        if (result?.error?.data?.errors) {
          Alert.alert(result?.error?.data?.errors?.[0]?.message);
        } else {
          Alert.alert('Something went wrong!');
        }
      }

      // console.log(result.data.e);
    };

    if (isEmpty(error)) {
      try {
        dispatch(startLoading());  
        const result: any = await register(formState);
        console.log(result?.error?.data);
        registerInfo?.isLoading == false ? dispatch(stopLoading()) : dispatch(startLoading());
        !!result?.data?.token
          ? storeDataToRedux(result?.data?.token)
          : API_FETCHING_Error(result);
      } catch (e) {
        console.log('catch error', e);
      }
    }
  };

  const success = (data: any) => {
    dispatch(storeEmail(data.email));
    dispatch(storeToken(data.token));

    !!data.token &&
      navigation.navigate(navigationStrings.AUTHENTICATION_1 as any);
  };

  return (
    <SafeAreaView style={mainStyle}>
      <View style={styles.mainView}>
        {/* Register TEXT HEADER */}
        <View>
          <LoginHeader
            headerText="Sign up"
            screen="Register"
            screenNum="1"
            headerDescriptionText="Tell us your email and create password."
          />
        </View>
        {/* TEXT-INPUTS */}
        <View style={{marginTop: 10, height: deviceHeight / 2.2}}>
          <CustomTextInput
            fieldName="Email"
            label="Email"
            handleChangeInput={handleChangeInput}
            value={email}
            error={errors.email && errors.email}
          />
          <CustomTextInput
            fieldName="Password"
            label="Password"
            secureTextEntry={true}
            flag="Password-hide-show"
            handleChangeInput={handleChangeInput}
            passShowHide={passShowHide}
            setPassShowHide={setPassShowHide}
            value={password}
            error={errors.password && errors.password}
          />
        </View>
        {/* CUSTOM LOGIN - CHECKBOX CONTAINER */}
        <View
          style={{
            // height: deviceHeight / 2.3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View>
            <CheckBox screen="Register" />
          </View>
          {/* LOGIN BUTTON */}
          <View>
            <CustomButton buttonText="Continue" isLoadingButton={true} pressed={pressed} onPress={onClickHandler} />
          </View>
        </View>
        {/* CONTINUE WITHOUT LOGIN */}
        <View>{/* <BottomComponent /> */}</View>
      </View>
    </SafeAreaView>
  );
};

export default Step1;

let deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
