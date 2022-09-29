import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import metrics from '../../../theme/Metrics';

const BottomComponent = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text>or</Text>
        <View style={styles.HorizontalLine}></View>
        <TouchableOpacity>
          <Text>Continue without loging in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomComponent;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: metrics.doubleBasePadding,
    alignItems: 'center',
  },
  container: {width: '90%', alignItems: 'center'},
  HorizontalLine: {
    borderTopWidth: 1,
    width: '100%',
    marginVertical: metrics.doubleBaseMargin,
  },
});
