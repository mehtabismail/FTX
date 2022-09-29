import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import metrics from '../../theme/Metrics';
import CustomButton from '../../components/CustomButton';
import {mainStyle} from '../../components/styles/ScreenStyle';
import TSRE_Card from '../../components/TSRE_Card';
import BackBtnHeader from '../../components/BackBtnHeader';
import {configData} from '../../config/config';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';
import AccountdetailsCard from '../wallet/AccountdetailsCard';
import {useToast} from 'react-native-toast-notifications';
import Clipboard from '@react-native-community/clipboard';
import {useClipboard} from '@react-native-community/clipboard';
import {storeAccountDetails} from '../../redux/reducers/banking/UserBankDetailSlice';
import {useGetAccountDetailsQuery} from '../../redux/services/banking/ManagedAccount';
import Colors from '../../theme/Colors';
import Image from '../../assets/images/copy.svg';

const TopUp = () => {
  const {server_url, api_key} = configData;
  const [topUpData, setTopUpData] = useState({});

  const {Bank}: any = useSelector(
    (state: RootState) => state?.userBankDetails?.userDetails,
  );

  const {
    beneficiaryBank,
    beneficiaryBankAddress,
    beneficiaryNameAndSurname,
    details,
    paymentReference,
  }: any = useSelector(
    (state: RootState) => state?.userBankDetails?.accountDetails,
  );

  const dispatch = useDispatch();

  const {bank_id}: any = useSelector(
    (state: RootState) => state?.userBankDetails?.bankDetails?.Bank,
  );
  const {corporate_token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  console.log(details?.iban, 'accountDetails');

  // GETTING MANAGED_ACCOUNT_IBAN
  const getAccountDetails = useGetAccountDetailsQuery<any>({
    bank_id,
    corporate_token,
  });
  console.log(getAccountDetails);

  useLayoutEffect(() => {
    if (
      getAccountDetails?.isSuccess === true &&
      getAccountDetails?.status === 'fulfilled'
    ) {
      dispatch(
        storeAccountDetails(getAccountDetails?.data?.bankAccountDetails[0]),
      );
    } else {
      if (
        getAccountDetails?.isError === true &&
        getAccountDetails?.error?.status === 401
      ) {
        Alert.alert('Corporate token expired!');
      }
    }
  }, [bank_id, getAccountDetails]);

  const [data, setString] = useClipboard();
  const [copiedText, setCopiedText] = useState('');
  const toast = useToast();
  const array = [
    {
      head1: 'Beneficiery',
      name1: !!beneficiaryBank && beneficiaryBank ? beneficiaryBank : 'xxx',
    },
    {
      head1: 'Beneficiery Bank Address',
      // name1: beneficiaryBankAddress && beneficiaryBankAddress,
      name1:
        !!beneficiaryBankAddress && beneficiaryBankAddress
          ? beneficiaryBankAddress
          : 'xxx',
    },
    {
      head1: 'Beneficiery Name and Surname',
      // name1: beneficiaryNameAndSurname && beneficiaryNameAndSurname,
      name1:
        !!beneficiaryNameAndSurname && beneficiaryNameAndSurname
          ? beneficiaryNameAndSurname
          : 'xxx',
    },
    {
      head1: 'IBAN',
      name1: !!details?.iban && details?.iban ? details?.iban : 'xxx',
    },
    {
      head1: 'BIC',
      name1: !!details?.code && details?.code ? details?.code : 'xxx',
    },
  ];

  const copyToClipBoard = (name: any) => {
    Clipboard.setString(name);
    toast.show('Copied to Clipboard', {
      type: 'warning',

      placement: 'bottom',

      duration: 2000,

      animationType: 'slide-in',
    });
  };

  // ON-PRESS TOP-UP WITH APPLE PAY
  const onClickHandler = async () => {
    console.log('Button Pressed');
  };

  return (
    <SafeAreaView style={mainStyle}>
      <View style={{flex: 1}}>
        <BackBtnHeader headingText="Top Up" />
        <View style={{width: '90%', alignSelf: 'center'}}>
          <View
            style={{
              backgroundColor: '#ffff',
              borderRadius: 20,
              marginVertical: 20,
              padding: 20,
            }}>
            {array.map(item => {
              return (
                <View style={styles.BenecardMainView}>
                  <View>
                    <Text style={styles.beneText}>{item.head1}</Text>
                    <View style={{paddingVertical: 8}}>
                      <Text style={{color: Colors.Primary, fontSize: 14}}>
                        {item?.name1}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => copyToClipBoard(item.name1)}>
                      <Image height={20} width={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
          {/* <AccountdetailsCard
            screen="TopUp"
            beneficiaryBankAddress={beneficiaryBankAddress}
            beneficiaryNameAndSurname={beneficiaryNameAndSurname}
          /> */}
        </View>
        {/* <View
          style={{
            backgroundColor: 'lightgray',
            width: '90%',
            height: '20%',
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-between',
            }}>
            <Text>beneficiaryBank: </Text>
            <Text>{beneficiaryBank}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-between',
            }}>
            <Text>beneficiaryBankAddress: </Text>
            <Text>{beneficiaryBankAddress}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-between',
            }}>
            <Text>beneficiaryNameAndSurname: </Text>
            <Text>{beneficiaryNameAndSurname}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-between',
            }}>
            <Text>beneficiaryBank: </Text>
            <Text>{beneficiaryBank}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-between',
            }}>
            <Text>beneficiaryBank: </Text>
            <Text>{beneficiaryBank}</Text>
          </View>
        </View> */}

        {/* <View style={{marginVertical: metrics.regularMargin}}>
          <TSRE_Card
            flag="Balance"
            currency="EUR"
            balance="€ 241.21"
            EUR_to_BTC={false}
          />
        </View> */}
        {/* <View>
          <TSRE_Card flag="Account" />
        </View> */}
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <CustomButton
            buttonText="Top up with Apple Pay"
            onPress={onClickHandler}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopUp;

const styles = StyleSheet.create({
  BenecardMainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
  },
  beneText: {
    fontFamily: 'RedHatDisplay-SemiBold',
    letterSpacing: 0.5,
    fontSize: 12,
  },
});
