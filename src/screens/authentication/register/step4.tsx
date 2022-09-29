import {
  Alert,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState, useRef} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import Greaterthan from '../../../assets/authenticationScreen/greaterthan.svg';
import PhoneInput from 'react-native-phone-number-input';
import {
  storeEmail,
  storeToken,
} from '../../../redux/reducers/register/RegisterSlice';
import SelectDropdown from 'react-native-select-dropdown';
import {RootState} from '../../../redux/Store';
import {validateEmptyFields} from '../../../utils/formValidator';
import isEmpty from '../../../utils/isEmpty';

const Step4 = ({navigation, route}: any) => {
  const propsData = route.params;
  console.log(
    propsData,
    'propsData, navigationStrings and routeStrings  are required  formValidator',
  );

  const dispatch = useDispatch();
  const {email, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  const [code, setCode] = useState('');

  const [value, setValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInput = useRef<PhoneInput>(null);
  const [errors, setErrors]: any = useState({});

  const errorMessages = {
    phoneNumber: 'Phone Number',
  };

  const handleChangeInput = (value: string, fieldName: string) => {
    fieldName === 'PhoneNumber' ? setPhoneNumber(value) : null;
  };

  const onClickHandler = () => {
    // numberVerification();
    Keyboard.dismiss();
    const error = validateEmptyFields({phoneNumber}, errorMessages);
    setErrors(error);

    if (isEmpty(error)) {
      navigation.navigate(navigationStrings.STEP5 as any, {
        propsData,
        phoneNumber: phoneNumber.trim(),
      });
    }
  };

  const numberVerification = async () => {
    let jsondata: any;
    console.log(`+${code.toString()}${phoneNumber.toString()}`);
    const response = await fetch(
      `${navigationStrings.BASE_URL}users/mobile/verification`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          contact_no: `+${code.toString()}${phoneNumber.toString()}`,
        }),
      },
    );
    console.log(route.route, 'routeData=-=-=-=-=');
    if (response.status === 200) {
      jsondata = await response.json();
      console.log(jsondata);
      navigation.navigate(navigationStrings.STEP5 as any, {
        propsData,
        phoneNumber: `${code.toString()}${phoneNumber.toString()}`,
      });
    }
  };

  return (
    <SafeAreaView style={mainStyle}>
      <View style={styles.mainView}>
        {/* Register TEXT HEADER */}
        <View>
          <LoginHeader
            headerText={
              propsData.routeData === 'from-wallet'
                ? 'Authentication Level 1'
                : 'Sign up'
            }
            screen="Register"
            screenNum="4"
            data={propsData.routeData}
            headerDescriptionText="Please, write your phone number."
          />
        </View>
        {/* TEXT-INPUTS */}
        <View style={{marginTop: 20, height: deviceHeight / 2.2}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginHorizontal: 30,
              height: 60,
            }}>
            <PhoneInput
              ref={phoneInput}
              containerStyle={{
                borderRadius: 20,
                width: deviceWidth / 1.16,
              }}
              textContainerStyle={{
                borderRadius: 20,
                backgroundColor: '#ffff',
              }}
              textInputStyle={{
                height: 40,
                marginTop: 3.5,
                fontSize: 17,
                fontFamily: 'RedHatDisplay-SemiBold',
              }}
              defaultValue={value}
              defaultCode={propsData?.countryCode}
              layout="first"
              onChangeText={text => {
                setValue(text);
              }}
              onChangeFormattedText={text => {
                setPhoneNumber(text);
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
          </View>
          <Text style={[styles.errorMessages, {marginLeft: 20}]}>
            {errors.phoneNumber && errors.phoneNumber}
          </Text>
        </View>
        {/* CUSTOM LOGIN - CHECKBOX CONTAINER */}
        <View
          style={{
            // height: deviceHeight / 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View>
            <CheckBox
              screen={
                propsData.routeData === 'from-wallet'
                  ? 'from-wallet'
                  : 'Register'
              }
            />
          </View>
          {/* LOGIN BUTTON */}
          <View>
            <CustomButton buttonText="Continue" onPress={onClickHandler} />
          </View>
        </View>
        {/* CONTINUE WITHOUT LOGIN */}
        <View>{/* <BottomComponent /> */}</View>
      </View>
    </SafeAreaView>
  );
};

export default Step4;

let deviceHeight = Dimensions.get('screen').height;
let deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  errorMessages: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'RedHatDisplay-Medium',
    marginTop: 7,
    width: '90%',
    alignSelf: 'center',
  },
});
