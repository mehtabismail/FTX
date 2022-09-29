import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CountryPicker from 'rn-country-dropdown-picker';
// import CountryPicker from 'rn-country-picker';

import CustomTextInput from '../../components/CustomTextInput';
import CurrencyModal from './CurrencyModal';

const Individuals = ({
  visible,
  HandleVisibility,
  currencyType,
  setCurrencyType,
}: any) => {
  const [country, setCountry] = React.useState({mCountryCode: '+91'});

  function handleSelection(e: any) {
    console.log(e);
    setCountry(e.country);
  }
  const _selectedValue = ({index}: any) => {
    setCountry({mCountryCode: index});
  };
  const handleChangeInput = (value: string, fieldName: string) => {};
  return (
    <View>
      <View style={{paddingHorizontal: 20, marginBottom: 10}}>
        <CountryPicker
          ContainerStyle={{
            borderRadius: 20,
            backgroundColor: '#ffff',
            // paddingLeft: 10,
            // marginHorizontal: 20,
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
      </View>
      <View style={{zIndex: -1}}>
        <TouchableOpacity
          style={{paddingTop: 10}}
          onPress={() => {
            HandleVisibility(true);
          }}>
          <CustomTextInput
            fieldName="Currency"
            handleChangeInput={handleChangeInput}
            label={currencyType && currencyType}
            disabled="true"
          />
        </TouchableOpacity>
        <CustomTextInput
          fieldName="IBAN"
          handleChangeInput={handleChangeInput}
          label="IBAN"
          flag="mobile-num"
        />
        <CustomTextInput
          fieldName="First and Middle Name"
          handleChangeInput={handleChangeInput}
          label="First and Middle Name"
        />
        <CustomTextInput
          fieldName="Last Name"
          handleChangeInput={handleChangeInput}
          label="Last Name"
        />
        <CustomTextInput
          fieldName="Email"
          handleChangeInput={handleChangeInput}
          label="Email"
        />
      </View>
    </View>
  );
};

export default Individuals;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleText: {
    color: '#000',
    fontSize: 25,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  pickerTitleStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // alignSelf: 'center',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  pickerStyle: {
    height: 60,
    // width: Dimensions.get('screen').width,
    marginHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
    // borderWidth: 2,
    // borderColor: '#303030',
    backgroundColor: 'white',
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: '#000',
    // textAlign: 'right',
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    // textAlign: 'right',
  },

  searchBarStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 10,
  },
});
