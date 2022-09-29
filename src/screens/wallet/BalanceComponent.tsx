import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
  Alert
} from 'react-native';
import React from 'react';
import metrics from '../../theme/Metrics';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import { useDispatch } from 'react-redux';
import { storeCorporateToken } from '../../redux/reducers/register/RegisterSlice';

import { store } from '../../redux/Store';
const state = store.getState();

const BalanceComponent = ({balance}: any) => {
  const dispatch = useDispatch();
  const index =  balance !== 0 && balance?.indexOf('.');

  const getToken = async () => {
    const result = await fetch(
      `https://sandbox.weavr.io//multi/login_with_password`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          'api-key': 'NNYH23wbRVEBgg+XLT8BDA==',
        },
        body: JSON.stringify({
          email: 'ehmusman@gmail.com',
          password: {
            value: 'Optimusfox@123',
          },
        }),
      },
    );

    console.log(result);
    if(result?.status === 200){
      const res = await result.json();
      console.log(res?.token);
      dispatch(storeCorporateToken(res?.token));
    }else{
      Alert.alert('somethig went wrong!');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => getToken()}>
        <Text style={index <= 6 ? styles.balanceText : styles.balanceText2}>
          Total balance
        </Text>
      </TouchableOpacity>
      <View style={{height: 2}}></View>
      <Text style={styles.balance}>{'$ '}{balance !== 0 ? balance.slice(0, index + 3): 0}</Text>
    </View>
  );
};

export default BalanceComponent;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  balanceText: {
    color: Colors.Secondary,
    fontFamily: 'RedHatDisplay-SemiBold',
    fontSize: 16,
  },
  balanceText2: {
    color: Colors.Secondary,
    fontFamily: 'RedHatDisplay-Medium',
    fontSize: 12,
  },
  balance: {
    color: Colors.textColor,
    fontFamily: 'RedHatDisplay-SemiBold',
    fontSize: 50,
  },
});
