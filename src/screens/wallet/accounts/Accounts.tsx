import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import CustomCard from '../../../components/CustomCard';
import {useBalanceQuery} from '../../../redux/services/wallet/Balance';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/Store';
import ActionSvgButtons from './ActionSvgButtons';
import {useIsFocused} from '@react-navigation/native';
import {
  storeCryptoWallets,
  storeTotalBalance,
} from '../../../redux/reducers/wallet/WalletSlice';

const Accounts = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {email, render, status, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  const walletBalance = useBalanceQuery<any>(token, {
    refetchOnMountOrArgChange: true,
  });

  const getTotalBalance = async (walletBalance: any) => {
    let balance = 0;
    if (walletBalance?.data) {
      walletBalance?.data?.map(async (item: any) => {
        const value = await fetch(
          `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${item.currency_code}&tsyms=USD,EUR`,
        ).then(response => response.json());
        let symbol = item.currency_code;
        // console.log(value[`${symbol.toUpperCase()}`].USD, 'value from wallet');
        let convertValue = value[`${symbol.toUpperCase()}`].USD * item.balance;
        balance = balance + convertValue;
        dispatch(storeTotalBalance(balance));
      });
    }
  };

  useEffect(() => {
    if (isFocused === true) {
      console.log("status changed")
      if (walletBalance.status === 'fulfilled') {
        getTotalBalance(walletBalance);
      } else {
        if (walletBalance?.error?.status === 'FETCH_ERROR') {
          Alert.alert('Network request failed try again!');
        } else {
          console.log(walletBalance);
        }
      }
    }
  }, [isFocused, walletBalance?.status]);

  return (
    <View>
      <CustomCard
        history="-1.84"
        data={walletBalance?.status === 'fulfilled' && walletBalance?.data}
      />
      <ActionSvgButtons walletBalance={walletBalance} />
    </View>
  );
};

export default Accounts;

const styles = StyleSheet.create({});
