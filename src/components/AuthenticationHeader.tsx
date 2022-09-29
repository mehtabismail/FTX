import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ArrowLeft from '../assets/authenticationScreen/ArrowLeft.svg';
import metrics from '../theme/Metrics';
import Fonts from '../theme/Fonts';

const AuthenticationHeader: any = ({headerText, navigation}: any) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeft height={20} width={20} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{headerText}</Text>
      </View>
    </View>
  );
};

export default AuthenticationHeader;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    padding: metrics.basePadding,
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: metrics.regularPadding,
  },
  textStyle: {
    fontSize: Fonts.size.h6,
    fontWeight: 'bold',
  },
});
