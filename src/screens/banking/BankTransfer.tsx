import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BankingHeader from './bankingHeader';
import BankingTabs from './bankingTabs';
import {mainStyle, Shadow} from '../../components/styles/ScreenStyle';
import Colors from '../../theme/Colors';
import SwitchableComponent from '../../components/SwitchableComponent';
import Individuals from './individuals';
import CurrencyModal from './CurrencyModal';
import BackBtnHeader from '../../components/BackBtnHeader';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {configData} from '../../config/config';
import {validateEmptyFields} from '../../utils/formValidator';

const BankTransfer = () => {
  const {corporate_token, server_url, api_key} = configData;
  const [selected, setSelected] = React.useState(0);
  const [visible, setVisible] = useState(false);
  const [currencyType, setCurrencyType] = useState('Currency');
  const [pressed, setPressed] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    iban: '',
    bankIdentifierCode: '',
    address: '',
    bankName: '',
    bankAddress: '',
    bankCountry: '',
  });
  const errorMessages = {
    amount: 'Amount',
    name: 'Name',
    iban: 'IBAN',
    bankIdentifierCode: 'Bank identifier code',
    address: 'Address',
    bankName: 'Bank name',
    bankAddress: 'Bank address',
    bankCountry: 'Bank country name',
    // passwords: 'Password',
  };

  // ON-CHANGE FUNCTION FOR CUSTOM-TEXTINPUT
  const handleChangeInput = (value: string, fieldName: string) => {
    setFormData({...formData, [fieldName]: value});
  };

  const apiCall = async () => {
    if (containsOnlyNumbers(formData?.amount)) {
      if (containsNumbers(formData?.name) === false) {
        if (containsOnlyNumbers(formData?.bankIdentifierCode)) {
          if (containsNumbers(formData?.bankName) === false) {
            if (containsNumbers(formData?.bankCountry) === false) {
              const data = {
                profileId: '108666483065290764',
                sourceInstrument: {
                  type: 'managed_accounts',
                  id: '108804117507801100',
                },
                transferAmount: {
                  currency: 'EUR',
                  amount: formData?.amount,
                },
                tag: 'tag',
                description: 'wired transfer',
                destinationBeneficiary: {
                  name: formData?.name,
                  bankAccountDetails: {
                    iban: formData?.iban,
                    bankIdentifierCode: formData?.bankIdentifierCode,
                  },
                  address: formData?.address,
                  bankName: formData?.bankName,
                  bankAddress: formData?.bankAddress,
                  bankCountry: formData?.bankCountry,
                },
              };

              const response = await fetch(
                `${server_url}/multi/outgoing_wire_transfers`,
                {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'idempotency-ref': 'ref_3896',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${corporate_token}`,
                    'api-key': api_key,
                  },
                  body: JSON.stringify(data),
                },
              );
            } else {
              Alert.alert('Bank country name not correct');
            }
          } else {
            Alert.alert('Bank name not correct');
          }
        } else {
          Alert.alert('BIC not correct');
        }
      } else {
        Alert.alert('Name not correct');
      }
    } else {
      Alert.alert('Amount not correct');
    }
  };

  const onClickHandler = () => {
    const error = validateEmptyFields(formData, errorMessages);
    setErrors(error);
    if (Object.keys(error).length === 0) {
      apiCall();
    }
  };

  function containsOnlyNumbers(str: any) {
    return /^\d+$/.test(str);
  }

  function containsNumbers(str: any) {
    return Boolean(str.match(/\d/));
  }

  const removeError = (props: any) => {
    console.log(props, 'remove error check');
    if (props.toLowerCase() === 'name') {
      setErrors({
        ...errors,
        name: '',
      });
    }

    if (props.toLowerCase() === 'amount') {
      setErrors({
        ...errors,
        amount: '',
      });
    }

    if (props.toLowerCase() === 'iban') {
      setErrors({
        ...errors,
        iban: '',
      });
    }

    if (props.toLowerCase() === 'bank identifier code') {
      setErrors({
        ...errors,
        bankIdentifierCode: '',
      });
    }

    if (props.toLowerCase() === 'address') {
      setErrors({
        ...errors,
        address: '',
      });
    }

    if (props.toLowerCase() === 'bank name') {
      setErrors({
        ...errors,
        bankName: '',
      });
    }

    if (props.toLowerCase() === 'bank address') {
      setErrors({
        ...errors,
        bankAddress: '',
      });
    }

    if (props.toLowerCase() === 'bank country') {
      setErrors({
        ...errors,
        bankCountry: '',
      });
    }
  };

  return (
    <SafeAreaView style={mainStyle}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View>
            <BankingHeader headText="Bank transfer" />
          </View>
          <View style={[styles.bankingTabs, Shadow]}>
            <BankingTabs selected={selected} setSelected={setSelected} />
          </View>

          <View style={{flex: 1}}>
            <CustomTextInput
              fieldName="amount"
              label="Amount"
              keyboardType="number-pad"
              handleChangeInput={handleChangeInput}
              screen="Wire Transfer"
              error={errors.amount && errors.amount}
              removeError={removeError}
            />
            <CustomTextInput
              fieldName="name"
              label="Name"
              handleChangeInput={handleChangeInput}
              screen="Wire Transfer"
              error={errors.name && errors.name}
              removeError={removeError}
            />
            <CustomTextInput
              fieldName="iban"
              label="Iban"
              handleChangeInput={handleChangeInput}
              screen="Wire Transfer"
              error={errors.iban && errors.iban}
              removeError={removeError}
            />
            <CustomTextInput
              fieldName="bankIdentifierCode"
              label="Bank identifier code"
              handleChangeInput={handleChangeInput}
              screen="Wire Transfer"
              error={errors.bankIdentifierCode && errors.bankIdentifierCode}
              removeError={removeError}
            />
            <CustomTextInput
              fieldName="address"
              label="Address"
              handleChangeInput={handleChangeInput}
              screen="Wire Transfer"
              error={errors.address && errors.address}
              removeError={removeError}
            />
            <CustomTextInput
              fieldName="bankName"
              label="Bank name"
              handleChangeInput={handleChangeInput}
              screen="Wire Transfer"
              error={errors.bankName && errors.bankName}
              removeError={removeError}
            />
            <CustomTextInput
              fieldName="bankAddress"
              label="Bank address"
              handleChangeInput={handleChangeInput}
              screen="Wire Transfer"
              error={errors.bankAddress && errors.bankAddress}
              removeError={removeError}
            />
            <CustomTextInput
              fieldName="bankCountry"
              label="Bank country"
              handleChangeInput={handleChangeInput}
              screen="Wire Transfer"
              error={errors.bankCountry && errors.bankCountry}
              removeError={removeError}
            />
            <View style={{marginTop: 20}}>
              <CustomButton
                buttonText="Transfer"
                pressed={pressed}
                onPress={onClickHandler}
                removeError={removeError}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankTransfer;

let deviceWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  bankingTabs: {
    margin: 20,
  },
});

{
  /* <View>
          {selected === 0 ? (
            <View>
              <Individuals
                visible={visible}
                HandleVisibility={setVisible}
                currencyType={currencyType}
                setCurrencyType={setCurrencyType}
              />
            </View>
          ) : null}
        </View> */
}
{
  /* <View
          style={{
            position: 'absolute',
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width,
          }}>
          <CurrencyModal
            visible={visible}
            HandleVisibility={setVisible}
            currencyType={currencyType}
            setCurrencyType={setCurrencyType}
          />
        </View> */
}
