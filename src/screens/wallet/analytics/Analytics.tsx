import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Spending from '../Spending';
import BreakDown from '../BreakDown';

const Analytics = () => {
  return (
    <View>
      <Spending />
      <BreakDown />
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({});
