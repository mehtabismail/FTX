import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mainStyle} from '../../../components/styles/ScreenStyle';
import Language from '../../../components/Language';
import LoginHeader from '../../../components/LoginHeader';
import DropDown from '../../../assets/authenticationScreen/dropDown.svg';
import FTX_International from '../../../components/FTX_International';
import CustomTextInput from '../../../components/CustomTextInput';
import CheckBox from '../../../components/CheckBox';
import CustomButton from '../../../components/CustomButton';
import RegisterService from './RegisterService';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../constants/navigationStrings';
import {useDispatch} from 'react-redux';
import metrics from '../../../theme/Metrics';

import {
  storeEmail,
  storeToken,
} from '../../../redux/reducers/register/RegisterSlice';
import DatePicker from 'react-native-date-picker';
import {validateEmptyFields} from '../../../utils/formValidator';
import isEmpty from '../../../utils/isEmpty';
import Colors from '../../../theme/Colors';
import moment from 'moment';

const Step1 = (route: any) => {
  console.log(route.params, 'checking test');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [passShowHide, setPassShowHide] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate]: any = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors]: any = useState({});
  const [ageValid, setAgeValid] = useState(true);

  const errorMessages = {
    firstName: 'First Name',
    lastName: 'Last Name',
  };

  console.log('route', route?.route?.params?.flag);
  const handleChangeInput = (value: string, fieldName: string) => {
    fieldName === 'First Name'
      ? setFirstName(value)
      : fieldName === 'Last Name'
      ? setLastName(value)
      : null;
  };

  const removeError = (props: any) => {
    console.log(props);
  };
  useEffect(() => {
    let newDate = new Date();
    var time = (date.getTime() - newDate.getTime()) / 1000;
    var year = Math.abs(Math.round(time / (60 * 60 * 24) / 365.25));
    if (year < 18) {
      setAgeValid(false);
    } else {
      setAgeValid(true);
    }
  }, [date]);

  const onClickHandler: Function = (flag: any) => {
    Keyboard.dismiss();
    const error = validateEmptyFields({firstName, lastName}, errorMessages);
    setErrors(error);

    if (isEmpty(error)) {
      if (!!firstName === true && !!lastName === true && !!ageValid === true) {
        navigation.navigate(
          'Step3' as never,
          {date, firstName, lastName, route} as never,
        );
      } else {
        Alert.alert(
          'You must be 18 years old to open a Swissblock App account.',
        );
      }
    }
  };

  return (
    <SafeAreaView style={mainStyle}>
      <ScrollView>
        <DatePicker
          locale="en"
          mode={'date'}
          modal
          open={showDatePicker}
          date={date && date}
          maximumDate={new Date()}
          onConfirm={date => {
            console.log('date picker', date);
            setShowDatePicker(false);
            setDate(date);
          }}
          onCancel={() => {
            setShowDatePicker(false);
          }}
        />
        <View style={styles.mainView}>
          {/* Register TEXT HEADER */}
          <View>
            <LoginHeader
              headerText={
                route?.route?.params?.flag === 'from-wallet'
                  ? 'Authentication Level 1'
                  : 'Sign up'
              }
              step2={
                route?.route?.params?.flag === 'from-wallet' ? 'Cancel' : 'Skip'
              }
              screen="Register"
              screenNum="2"
              headerDescriptionText="Tell us your user information."
              data={route?.route?.params?.flag}
            />
          </View>
          {/* TEXT-INPUTS */}
          <View style={{marginTop: 10, height: deviceHeight / 2.2}}>
            <CustomTextInput
              fieldName="First Name"
              label="First name"
              handleChangeInput={handleChangeInput}
              value={firstName}
              error={errors.firstName && errors.firstName}
              removeError={removeError}
            />
            <CustomTextInput
              fieldName="Last Name"
              label="Last name"
              handleChangeInput={handleChangeInput}
              value={lastName}
              error={errors.lastName && errors.lastName}
              removeError={removeError}
            />
            {/* <View style={{display: 'flex', flexDirection: 'row'}}> */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View style={{padding: 20, paddingTop: 10}}>
                <View
                  style={{
                    padding: 15,
                    backgroundColor: '#ffff',
                    borderRadius: 30,
                  }}>
                  <View style={{marginBottom: 1}}>
                    <Text style={{color: Colors.Secondary}}>Date of Birth</Text>
                  </View>
                  <Text style={{color: Colors.textColor}}>
                    {moment(date).format("DD/MM/YYYY")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* </View> */}
          </View>
          {/* CUSTOM LOGIN - CHECKBOX CONTAINER */}
          <View
            style={{
              // height: deviceHeight / 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
            <View>
              <CheckBox
                screen={
                  route?.route?.params?.flag === 'from-wallet'
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Step1;

let deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  dateContainer: {
    marginTop: metrics.regularMargin,
    flexDirection: 'row',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: metrics.regularPadding,
  },
  labelStyle: {
    position: 'absolute',
    left: 15,
    width: '90%',
    alignSelf: 'center',
  },
  textInputContainer: {marginVertical: metrics.regularMargin},
  inputView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    borderWidth: 1,
    backgroundColor: '#ffff',
    borderColor: '#ffff',
    borderRadius: 20,
    paddingLeft: 10,
    padding: Platform.OS == 'ios' ? metrics.basePadding : null,
    alignSelf: 'center',
    marginHorizontal: metrics.separaterPadding,
    alignItems: 'center',
    paddingRight:
      Platform.OS === 'android'
        ? metrics.regularPadding
        : metrics.regularPadding,
  },
});
