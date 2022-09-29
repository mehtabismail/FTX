import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Warning from '../../../assets/images/warning.svg';
import React from 'react';
import navigationStrings from '../../../constants/navigationStrings';
import {useNavigation} from '@react-navigation/native';
const WarningMsg = () => {
  const navigation: any = useNavigation();
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: '#9A7220',
        borderRadius: 10,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Warning fill={'#E8B41F'} height={20} width={20} />
        <Text
          style={{
            fontFamily: 'RedHatDisplay-Bold',
            fontSize: 20,
            paddingHorizontal: 10,
            color: '#FFFFFF',
          }}>
          Warning
        </Text>
      </View>
      <Text
        style={{
          fontFamily: 'RedHatDisplay-SemiBold',
          paddingVertical: 10,
          color: '#FFFFFF',
        }}>
        Complete Identity Verification to start trading.
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigationStrings.STEP2, {
            flag: 'from-wallet',
            level: '2',
          });
        }}
        style={{
          backgroundColor: '#F3AE18',
          paddingVertical: 10,
          borderRadius: 10,
        }}>
        <Text style={{textAlign: 'center', color: '#FFFFFF'}}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WarningMsg;

const styles = StyleSheet.create({});
