import {
  Alert,
  Dimensions,
  Keyboard,
  ScrollView,
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
import CountryPicker from 'rn-country-dropdown-picker';

import {
  storeEmail,
  storeToken,
} from '../../../redux/reducers/register/RegisterSlice';
import {validateEmptyFields} from '../../../utils/formValidator';
import isEmpty from '../../../utils/isEmpty';
const Step3 = ({navigation, route}: any) => {
  const data: object = route.params;
  const dispatch = useDispatch();

  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [province, setProvince] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [errors, setErrors]: any = useState({});

  const errorMessages = {
    country: 'Country',
    city: 'City',
    address: 'Address',
    postalCode: 'Postal Code',
    province: 'Province',
  };

  const handleChangeInput = (value: string, fieldName: string) => {
    fieldName === 'Address'
      ? setAddress(value)
      : fieldName === 'City'
      ? setCity(value)
      : fieldName === 'PostalCode'
      ? setPostalCode(value)
      : fieldName === 'Province'
      ? setProvince(value)
      : null;
  };
  console.log(route.params.route.route.params.flag);
  const onClickHandler = () => {
    Keyboard.dismiss();
    const error = validateEmptyFields(
      {
        country,
        city,
        address,
        postalCode,
        province,
      },
      errorMessages,
    );
    setErrors(error);

    if (isEmpty(error)) {
      navigation.navigate(navigationStrings.STEP4 as any, {
        data,
        country,
        address,
        city,
        countryCode,
        postalCode,
        province,
        routeData: route.params.route.route.params.flag,
      });
    }
  };

  function handleSelection(e: any) {
    console.log(e.code, 'asjkbaskdhaskjdhaskdhkj');
    setCountry(e.country);
    setCountryCode(e.code);
  }
  return (
    <ScrollView>
      <SafeAreaView style={mainStyle}>
        <View style={styles.mainView}>
          {/* Register TEXT HEADER */}
          <View>
            <LoginHeader
              headerText={
                route.params.route.route.params.flag === 'from-wallet'
                  ? 'Authentication Level 1'
                  : 'Sign up'
              }
              screen="Register"
              screenNum="3"
              headerDescriptionText="Let’s go through your address."
              data={route.params.route.route.params.flag}
            />
          </View>
          {/* TEXT-INPUTS */}
          <View style={{marginTop: 10, height: deviceHeight / 2.2}}>
            <View style={{paddingHorizontal: 20}}>
              {/* add dropdown here */}
              <View>
                <CountryPicker
                  ContainerStyle={{
                    borderRadius: 20,
                    backgroundColor: '#ffff',
                    // paddingLeft: 10,
                    marginBottom: -10,
                  }}
                  DropdownContainerStyle={{
                    borderColor: 'transparent',
                    position: 'absolute',
                    zIndex: 100,
                    backgroundColor: '#ffff',
                    top: 40,
                  }}
                  InputFieldStyle={{
                    paddingVertical: 5,
                    paddingLeft: 15,
                  }}
                  // DropdownRowStyle={styles.myDropdownRowStyle}
                  Placeholder="choose country ..."
                  // DropdownCountryTextStyle={styles.myDropdownCountryTextStyle}
                  // countryNameStyle={styles.mycountryNameStyle}
                  flagSize={24}
                  selectedItem={e => handleSelection(e as any)}
                />
                <View style={{zIndex: -1}}>
                  <Text style={styles.errorMessages}>
                    {errors.country && errors.country}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{zIndex: -1}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingLeft: 10,
                }}>
                <View style={{width: '48%'}}>
                  <CustomTextInput
                    fieldName="City"
                    label="City"
                    handleChangeInput={handleChangeInput}
                    value={city}
                    error={errors.city && errors.city}
                  />
                </View>
                <View style={{width: '49%'}}>
                  <CustomTextInput
                    fieldName="PostalCode"
                    label="Postal code"
                    keyboardType="number-pad"
                    handleChangeInput={handleChangeInput}
                    value={postalCode}
                    error={errors.postalCode && errors.postalCode}
                  />
                </View>
              </View>
              <View>
                <CustomTextInput
                  fieldName="Province"
                  label="State, Province"
                  handleChangeInput={handleChangeInput}
                  value={province}
                  error={errors.province && errors.province}
                />
              </View>
              <View>
                <CustomTextInput
                  fieldName="Address"
                  label="Address"
                  handleChangeInput={handleChangeInput}
                  value={address}
                  error={errors.address && errors.address}
                />
              </View>
            </View>
          </View>
          {/* CUSTOM LOGIN - CHECKBOX CONTAINER */}
          <View
            style={{
              // height: deviceHeight / 3.44,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
            <View>
              <CheckBox
                screen={
                  route.params.route.route.params.flag === 'from-wallet'
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
    </ScrollView>
  );
};

export default Step3;

let deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  errorMessages: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'RedHatDisplay-Medium',
    marginTop: 15,
    width: '90%',
    // alignSelf: 'center',
  },
});
