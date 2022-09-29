import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../theme/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/Store';
import SellOrder from './SellOrder';
import BuyOrder from './BuyOrder';

const Prices = (props: any) => {
  
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 13,
        }}>
        <Text
          style={{fontFamily: 'RedHatDisplay-SemiBold', textAlign: 'center'}}>
          Price
        </Text>
        <Text
          style={{fontFamily: 'RedHatDisplay-SemiBold', textAlign: 'center'}}>
          Size
        </Text>
      </View>
      <ScrollView >
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.Gray_3,
            paddingVertical: 5,
            marginVertical: 10,
          }}>
          <BuyOrder orderCompleted={props?.orderCompleted} orderData={props?.orderData} />
          <SellOrder orderCompleted={props?.orderCompleted} orderData={props?.orderData} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Prices;

const styles = StyleSheet.create({});
