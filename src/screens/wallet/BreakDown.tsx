import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BreakDownCard from './BreakDownCard';
import metrics from '../../theme/Metrics';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';

const BreakDown = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.breakDownHeading}>
        <Text style={styles.headingTextStyle}>BreakDown</Text>
        <TouchableOpacity>
          <Text style={styles.touchableHeading}>Breakdown</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.breakDownCard}>
        <BreakDownCard />
      </View>
    </View>
  );
};

export default BreakDown;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: metrics.separaterMargin,
    marginVertical: metrics.doubleBaseMargin,
  },
  breakDownHeading: {
    flexDirection: 'row',
    marginBottom: metrics.baseMargin,
    justifyContent: 'space-between',
  },
  breakDownCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: metrics.separaterMargin,
  },
  headingTextStyle: {
    color: Colors.textColor,
    fontSize: 24,
    fontStyle: 'normal',
    fontFamily: 'RedHatDisplay-Bold',
  },
  touchableHeading: {
    color: Colors.Primary,
    fontSize: Fonts.size.medium,
    fontFamily: 'RedHatDisplay-Medium',
  },
});
