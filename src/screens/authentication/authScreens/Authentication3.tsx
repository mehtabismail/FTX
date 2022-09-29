import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import metrics from '../../../theme/Metrics';
import AuthenticationHeader from '../../../components/AuthenticationHeader';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import navigationStrings from '../../../constants/navigationStrings';
import Fonts from '../../../theme/Fonts';
import {textInputFieldNameContainer} from '../../../components/styles/TextInputStyles';
import DropDown from '../../../assets/authenticationScreen/dropDown.svg';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/Store';

const Authentication3 = ({navigation, route}: any) => {
  const propsData = route.params;
  console.log(propsData);
  const {email, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  const [countryCode, setCountryCode] = useState(92 as any);
  const [phoneNumber, setPhoneNumber]: any = useState();
  const [verification, setVerification]: any = useState();

  const onClickHandler: Function = async () => {
    // navigation.navigate(navigationStrings.LOGIN as any);
    let res: any;
    const response = await fetch(
      `${navigationStrings.BASE_URL}users/login/mfa`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: verification,
          email: email,
        }),
      },
    );

    console.log(response, '======response=============');
    if (response.status === 200) {
      res = await response.json();
      console.log(res);
      const responseAgain = await fetch(
        `${navigationStrings.BASE_URL}users/profile`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            first_name: propsData.data.firstName,
            last_name: propsData.data.lastName,
            dob: propsData.data.date,
            contact_no: `+${countryCode.toString()}${phoneNumber.toString()}`,
            address: {
              country: propsData.country,
              address_line_1: propsData.street1,
              address_line_2: propsData.street2,
              city: propsData.city,
              postal_code: propsData.postalCode,
              state: propsData.Province,
            },
          }),
        },
      );
    }
  };

  const handleChangeInput = (value: any, fieldName: string) => {
    fieldName === 'Phone Number'
      ? setPhoneNumber(value)
      : fieldName === 'Verification'
      ? setVerification(value)
      : null;
  };

  const handleCustomButton = async () => {
    let jsondata: any;
    console.log(`+${countryCode.toString()}${phoneNumber.toString()}`);
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
          contact_no: `+${countryCode.toString()}${phoneNumber.toString()}`,
        }),
      },
    );

    console.log(response, 'checking response');
    if (response.status === 200) {
      jsondata = await response.json();
      console.log(jsondata);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        {/* AUTHENTICATION-HEADER */}
        <View>
          <AuthenticationHeader
            headerText="Phone number"
            navigation={navigation}
          />
        </View>
        {/* SEND-OTP SECTION */}
        <View>
          <View style={styles.rowTextInput}>
            <View style={styles.countrySelect}>
              <Text>{`+${countryCode}`}</Text>
              <TouchableOpacity>
                <DropDown height={30} width={30} />
              </TouchableOpacity>
            </View>
            <View style={{width: '70%', marginLeft: metrics.regularMargin}}>
              <CustomTextInput
                fieldName="Phone Number"
                handleChangeInput={handleChangeInput}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <View style={{marginTop: -metrics.regularMargin}}>
            <CustomButton buttonText="Send code" onPress={handleCustomButton} />
          </View>
          <View style={styles.messageText}>
            <Text>Message and data rates may apply</Text>
          </View>
        </View>
        {/* SMS-VERIFICATION  */}
        <View style={styles.textInoutContainer}>
          <View style={styles.textFieldNameContainer}>
            <Text style={styles.smsTextStyle}>SMS verification code</Text>
          </View>
          <View style={styles.textFieldNameContainer}>
            <Text>Enter six digit code we sent to your phone number</Text>
          </View>
          <View>
            <CustomTextInput
              fieldName="Verification"
              placeholder="_ _ _ _ _ _"
              handleChangeInput={handleChangeInput}
              keyboardType="number-pad"
            />
          </View>
        </View>
      </View>
      {/* CUSTOM BUTTON */}
      <View>
        <CustomButton buttonText="Continue" onPress={onClickHandler} />
      </View>
    </SafeAreaView>
  );
};

export default Authentication3;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'space-between'},
  screenTextContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: metrics.doubleBasePadding,
  },
  textInoutContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  textFieldNameContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: metrics.regularMargin,
  },
  smsTextStyle: {
    fontSize: Fonts.size.regular,
    ffontFamily: 'RedHatDisplay-Medium',
  },
  messageText: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: metrics.baseMargin,
  },
  countrySelect: {
    height: 50,
    width: '20%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: metrics.smallPadding,
    marginLeft: '5%',
    borderWidth: 1,
  },
  rowTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
