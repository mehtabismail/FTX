import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import IdentityHeader from '../IdentityHeader';
import RadioBtn from './RadioBtn';
import ContinueBtn from './ContinueBtn';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../constants/navigationStrings';

const IdentityType = (props: any) => {
  console.log(
    props?.route?.params,
    '----------------------------------------------------------------',
  );
  const navigation: any = useNavigation();
  const [identity, setIdentity] = useState('Identity Card');
  const [identitySelected, setIdentitySelected] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [currencySelected, setCurrencySelected] = useState(false);

  const identityData = [
    {btnText: "Driving license"},
    {btnText: 'Identity card'},
    {btnText: 'Passport'},
  ];

  const currencyData = [{btnText: 'USD'}, {btnText: 'EUR'}, {btnText: 'GBP'}];

  const clickHandler = () => {
    navigation.navigate(navigationStrings.KYC_IMAGEUPLOAD, {
      identity:
        identity === 'Passport'
          ? 'passport'
          : identity === 'Identity Card'
          ? 'national_identity'
          : 'driving_license',
      currency: currency,
      sourceOfFunds: props?.route?.params?.sourceOfFunds,
      pictureSide: 'front',
    });
  };

  const onBack = () => {
    if (currencySelected === true) {
      setCurrencySelected(false);
      setIdentitySelected(true);
    }
    !!currencySelected === false && navigation.goBack();
  };
  return (
    <SafeAreaView>
      <View>
        <IdentityHeader onPress={onBack} heading="Swissblock" />
        <View style={{padding: 20}}>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Bold',
              fontSize: 17,
              paddingBottom: 10,
            }}>
            {currencySelected === false
              ? 'Select identification type'
              : 'Select the currency for your bank account'}
          </Text>
          {currencySelected === false &&
            identitySelected === true &&
            identityData.map((item, ind) => {
              return (
                <RadioBtn
                  btnText={item?.btnText}
                  index={ind}
                  checked={identity}
                  setChecked={setIdentity}
                />
              );
            })}
          {currencySelected === true &&
            identitySelected === false &&
            currencyData.map((item, ind) => {
              return (
                <RadioBtn
                  btnText={item?.btnText}
                  index={ind}
                  checked={currency}
                  setChecked={setCurrency}
                />
              );
            })}
        </View>
        <View style={{padding: 20}}>
          <ContinueBtn
            BtnText="Continue"
            clickHandler={
              currencySelected === true
                ? clickHandler
                : () => {
                    setCurrencySelected(true);
                    setIdentitySelected(false);
                  }
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IdentityType;

const styles = StyleSheet.create({});
