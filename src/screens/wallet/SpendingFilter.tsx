import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import metrics from '../../theme/Metrics';
import Colors from '../../theme/Colors';
import {Shadow} from '../../components/styles/ScreenStyle';
import Fonts from '../../theme/Fonts';
import Dropdown from '../../components/Dropdown';
import {spending_filter_dates} from '../../constants/dummydata';

const SpendingFilter = (props: any) => {
  const onClickHandler = (data: any) => {
    props?.onFilterChange(data?.label);
  };

  return (
    <View>
      <Dropdown
        label={props?.body}
        data={spending_filter_dates}
        Svg={props.svg}
        onSelect={onClickHandler}
      />
      {/* <TouchableOpacity style={[styles.filterContainer, Shadow]}>
        <View style={styles.svgContainer}>
          <props.svg />
        </View>
        <Text style={styles.textStyle}>{props.body}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default SpendingFilter;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    marginRight: metrics.regularMargin,
    backgroundColor: Colors.cardBackground,
    paddingVertical: metrics.basePadding,
    paddingHorizontal: metrics.basePadding,
    borderRadius: 20,
  },
  svgContainer: {marginRight: metrics.regularMargin},
  textStyle: {
    color: Colors.Secondary,
    fontSize: Fonts.size.medium,
    fontFamily: 'RedHatDisplay-Medium',
  },
});
