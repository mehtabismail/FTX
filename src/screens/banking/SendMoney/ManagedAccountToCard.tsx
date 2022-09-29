import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { mainStyle } from '../../../components/styles/ScreenStyle';
import LoginHeader from '../../../components/LoginHeader';
import BackBtnHeader from '../../../components/BackBtnHeader';

const ManagedAccountToCard = () => {
  return (
    <SafeAreaView style={mainStyle}>
      <View>
       <BackBtnHeader />
      </View>
    </SafeAreaView>
  );
};

export default ManagedAccountToCard;

const styles = StyleSheet.create({});
