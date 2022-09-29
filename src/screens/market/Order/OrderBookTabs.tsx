import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import metrics from '../../../theme/Metrics';
import Colors from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';

const OrderBookTabs = (props: any) => {
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => props?.onPress(item)}
        style={styles.horizontalTabs}>
        <Text
          style={
            item == props?.selected ? styles.selected : styles.notSelected
          }>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={props?.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default OrderBookTabs;

const styles = StyleSheet.create({
  container: {
    paddingVertical: metrics.regularPadding,
    borderTopColor: Colors.Secondary,
    borderTopWidth: 1,
    borderBottomColor: Colors.Secondary,
    borderBottomWidth: 1,
  },
  horizontalTabs: {
    marginLeft: metrics.regularMargin,
    padding: metrics.regularPadding,
    backgroundColor: Colors.bottomTabBackground,
  },
  tabTextStyle: {
    color: Colors.textColor,
    fontSize: Fonts.size.medium,
    fontFamily: 'RedHatDisplay-Medium',
  },
  selected: {
    fontSize: 16,
    fontFamily: 'RedHatDisplay-SemiBold',
    color: 'white',
  },
  notSelected: {
    fontSize: 14,
    fontFamily: 'RedHatDisplay-Medium',
    color: Colors.Secondary,
  },
});
