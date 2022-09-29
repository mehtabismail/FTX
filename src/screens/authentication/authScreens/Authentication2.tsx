import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import metrics from '../../../theme/Metrics';
import AuthenticationHeader from '../../../components/AuthenticationHeader';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import navigationStrings from '../../../constants/navigationStrings';
import {textInputFieldNameContainer} from '../../../components/styles/TextInputStyles';

import {LogBox} from 'react-native';
LogBox.ignoreAllLogs(['Warning: ...'] as any);

// MAIN FUNCTION
const Authentication2 = ({navigation, route}: any) => {
  const [country, setCountry] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [streetAddress2, setStreetAddress2] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [province, setProvince] = useState('');

  const data: object = route.params;

  const onClickHandler: Function = () => {
    //   console.log(country, streetAddress, streetAddress2, city, postalCode, province)
    navigation.navigate(navigationStrings.AUTHENTICATION_3 as any, {
      data,
      country,
      streetAddress,
      streetAddress2,
      city,
      postalCode,
      province,
    });
  };

  const handleChangeInput = (value: string, fieldName: string) => {
    fieldName === 'Country'
      ? setCountry(value)
      : fieldName === 'Street Address'
      ? setStreetAddress(value)
      : fieldName === 'Street Address 2'
      ? setStreetAddress2(value)
      : fieldName === 'City'
      ? setCity(value)
      : fieldName === 'Postal Code'
      ? setPostalCode(value)
      : fieldName === 'Province'
      ? setProvince(value)
      : null;
  };

  //   RENEDRING UI-SCREEN
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        {/* AUTHENTICATION-HEADER */}
        <View>
          <AuthenticationHeader
            headerText="Home address"
            navigation={navigation}
          />
        </View>
        {/* CUSTOM TEXT-INPUTS */}
        <View style={styles.textInoutContainer}>
          <View style={textInputFieldNameContainer}>
            <Text>Country</Text>
          </View>
          <View>
            <CustomTextInput
              fieldName="Country"
              handleChangeInput={handleChangeInput}
              keyboardType="default"
            />
          </View>
          <View style={textInputFieldNameContainer}>
            <Text>Street Address</Text>
          </View>
          <View>
            <CustomTextInput
              fieldName="Street Address"
              handleChangeInput={handleChangeInput}
              keyboardType="default"
            />
          </View>
          <View style={textInputFieldNameContainer}>
            <Text>Street Address (Line 2)</Text>
          </View>
          <View>
            <CustomTextInput
              fieldName="Street Address 2"
              handleChangeInput={handleChangeInput}
              keyboardType="default"
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '47%', marginLeft: metrics.regularMargin}}>
              <View style={textInputFieldNameContainer}>
                <Text>City</Text>
              </View>
              <View>
                <CustomTextInput
                  fieldName="City"
                  handleChangeInput={handleChangeInput}
                  keyboardType="default"
                />
              </View>
            </View>
            <View style={{width: '47%'}}>
              <View style={textInputFieldNameContainer}>
                <Text>Postal Code</Text>
              </View>
              <View>
                <CustomTextInput
                  fieldName="Postal Code"
                  handleChangeInput={handleChangeInput}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>
          <View style={textInputFieldNameContainer}>
            <Text>State, province or region</Text>
          </View>
          <View>
            <CustomTextInput
              fieldName="Province"
              handleChangeInput={handleChangeInput}
              keyboardType="default"
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

export default Authentication2;

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
});
