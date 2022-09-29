import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Colors from '../../../theme/Colors';
import React from 'react';
import Check from '../../../assets/images/check.svg';

const CheckBox = ({checked, setChecked, labelTxt}: any) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          borderColor: Colors.black,
          borderWidth: 0.5,
          backgroundColor: checked ? Colors.black : '#ffff',
        }}
        onPress={() => setChecked(!checked)}>
        <Check height={12} width={12} fill="#ffff" />
      </TouchableOpacity>
      <Text
        style={{
          paddingHorizontal: 10,
          fontSize: 14,
          fontFamily: 'RedHatDisplay-SemiBold',
          color: Colors.Gray_3,
        }}>
        {labelTxt}
      </Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
