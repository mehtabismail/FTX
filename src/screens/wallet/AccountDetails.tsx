import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../theme/Colors';

const AccountDetails = (props: any) => {
  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row', marginVertical: 15}}>
        <Text
          style={{
            color: Colors.textColor,
            fontFamily: 'RedHatDisplay-Medium',
            fontSize: 14,
          }}>
          Beneficiary :
        </Text>
        <Text>{props.beneficiary}</Text>
      </View>
      <View style={{flexDirection: 'row', marginVertical: 15}}>
        <Text
          style={{
            color: Colors.textColor,
            fontFamily: 'RedHatDisplay-Medium',
            fontSize: 14,
          }}>
          IBAN :
        </Text>
        <Text>{props.IBAN}</Text>
      </View>
      <View style={{flexDirection: 'row', marginVertical: 15}}>
        <Text
          style={{
            color: Colors.textColor,
            fontFamily: 'RedHatDisplay-Medium',
            fontSize: 14,
          }}>
          BIC :{' '}
        </Text>
        <Text
          style={{
            color: Colors.textColor,
            fontFamily: 'RedHatDisplay-Medium',
            fontSize: 14,
          }}>
          {props.bic}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({});
