import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../theme/Colors';

const MarkeetingButtons = ({Btntext, bottomBorder, setBottomBorder}: any) => {
  const clickHandler = () => {
    setBottomBorder(Btntext);
  };
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity style={{paddingBottom: 10}} onPress={clickHandler}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'RedHatDisplay-Bold',
              color: bottomBorder === Btntext ? Colors.black : Colors.Gray_4,
            }}>
            {Btntext}
          </Text>
        </TouchableOpacity>
        {bottomBorder === Btntext ? (
          <View
            style={{
              borderBottomColor: Colors.black,
              borderBottomWidth: 5,
              width: 30,
            }}></View>
        ) : null}
      </View>
    </View>
  );
};

export default MarkeetingButtons;

const styles = StyleSheet.create({});
