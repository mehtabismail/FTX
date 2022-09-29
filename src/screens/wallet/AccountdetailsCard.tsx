import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import Colors from '../../theme/Colors';
import Image from '../../assets/images/copy.svg';
import Clipboard from '@react-native-community/clipboard';
import {useClipboard} from '@react-native-community/clipboard';
import {useToast} from 'react-native-toast-notifications';
import {RootState} from '../../redux/Store';
import {useDispatch, useSelector} from 'react-redux';
import {useGetAccountDetailsQuery} from '../../redux/services/banking/ManagedAccount';
import {storeAccountDetails} from '../../redux/reducers/banking/UserBankDetailSlice';

const AccountdetailsCard = () => {
  const dispatch = useDispatch();

  const {bank_id}: any = useSelector(
    (state: RootState) => state?.userBankDetails?.userDetails?.Bank,
  );

  const {Bank}: any = useSelector(
    (state: RootState) => state?.userBankDetails?.userDetails,
  );

  const {corporate_token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  const {beneficiaryBank, details}: any = useSelector(
    (state: RootState) => state?.userBankDetails?.accountDetails,
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
  }, [Bank?.bank_id, getAccountDetails]);

  const [data, setString] = useClipboard();
  const [copiedText, setCopiedText] = useState('');
  const toast = useToast();
  const array = [
    {
      head1: 'Beneficiery',
      name1: !!beneficiaryBank && beneficiaryBank ? beneficiaryBank : 'xxx',
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
      animationType: 'zoom-in',
    });
  };

  return (
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
              <TouchableOpacity onPress={() => copyToClipBoard(item.name1)}>
                <Image height={20} width={20} />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default AccountdetailsCard;

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
