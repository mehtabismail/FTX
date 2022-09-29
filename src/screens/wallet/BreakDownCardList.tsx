import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import metrics from '../../theme/Metrics';

const BreakDownCardList = (props: any) => {
  return (
    <View>
      <View style={styles.singleContainer}>
        <View>
          <Text style={styles.headingStyle}>{props.heading}</Text>
          <Text style={styles.subheadingStyle}>
            {props.subHeading + ' transactions'}
          </Text>
        </View>
        <View>
          <Text style={styles.amountStyle}>{'$' + props.amount}</Text>
          <Text style={styles.subheadingStyle}>{props.percentage + '%'}</Text>
        </View>
      </View>
    </View>
  );
};

export default BreakDownCardList;

const styles = StyleSheet.create({
  singleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: metrics.baseMargin
  },
  headingStyle: {
    color: Colors.textColor,
    fontSize: Fonts.size.large,
    fontFamily: "RedHatDisplay-SemiBold",
  },
  subheadingStyle: {
    color: Colors.textColor,
    fontSize: Fonts.size.small,
    fontFamily: 'RedHatDisplay-Medium',
    marginTop: metrics.smallMargin,
  },
  amountStyle: {
    color: Colors.textColor,
    fontSize: Fonts.size.medium,
    fontFamily: 'RedHatDisplay-Medium',
  },
});
