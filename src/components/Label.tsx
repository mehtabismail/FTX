import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Label({label, isFocused}: any) {
  return (
    <Text
      style={{
        ...styles.labelStyle,
        top: !isFocused ? 10 : 0,
        fontSize: !isFocused ? 14 : 10,
        color: !isFocused ? '#aaa' : '#000',
      }}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    position: 'absolute',
    left: 15,
  },
});
