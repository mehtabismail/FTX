import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../theme/Colors';

const OrderButtons = ({Btntext, bottomBorder, setBottomBorder}: any) => {
  const clickHandler = () => {
    setBottomBorder(Btntext);
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          paddingBottom: 10,
          paddingHorizontal: 30,
          borderBottomColor: bottomBorder === Btntext ? 'green' : 'transparent',
          borderBottomWidth: 4,
        }}
        onPress={clickHandler}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'RedHatDisplay-Bold',
            color: bottomBorder === Btntext ? 'green' : Colors.Gray_4,
          }}>
          {Btntext}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderButtons;

const styles = StyleSheet.create({});
