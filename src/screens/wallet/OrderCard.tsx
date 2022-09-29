import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import metrics from '../../theme/Metrics';
import Colors from '../../theme/Colors';
import {Shadow} from '../../components/styles/ScreenStyle';
import Fonts from '../../theme/Fonts';
import navigationStrings from '../../constants/navigationStrings';
import {useNavigation} from '@react-navigation/native';

const OrderCard = () => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigationStrings.ODER_NEW_CARD)}
      style={[styles.mainContainer, Shadow]}>
      <Text style={styles.textStyle}>Order a new card</Text>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: metrics.doubleBaseMargin,
    alignSelf: 'center',
    width: 160,
    height: 40,
    backgroundColor: Colors.orderCardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  textStyle: {
    fontSize: Fonts.size.medium,
    ffontFamily: 'RedHatDisplay-Medium',
    color: Colors.orderCardText,
  },
});
