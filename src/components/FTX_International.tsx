import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ArrowRight from '../assets/signinScreen/ArrowRight.svg';
import metrics from '../theme/Metrics';
import Fonts from '../theme/Fonts';

const FTX_International = () => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.container}>
        <View style={styles.FTXStyle}>
          <Text style={styles.FTXTextStyle}>FTX International</Text>
        </View>
        <View style={styles.arrowStyle}>
          <ArrowRight />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FTX_International;

const styles = StyleSheet.create({
  mainContainer: {alignItems: 'center'},
  container: {
    width: '90%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: metrics.basePadding,
    borderRadius: 10,
    borderWidth: 1,
  },
  FTXStyle: {
    paddingHorizontal: metrics.regularPadding,
  },
  FTXTextStyle: {
    fontSize: Fonts.size.h6,
    fontFamily: "RedHatDisplay-SemiBold",
  },
  arrowStyle: {
    paddingHorizontal: metrics.regularPadding,
  },
});
