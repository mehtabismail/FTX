import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';

const ContinueBtn = ({BtnText, clickHandler}: any) => {
  return (
    <View>
      <TouchableOpacity
        onPress={clickHandler}
        style={{
          backgroundColor: '#FCEDDF',
          borderColor: '#DCDCDC',
          borderRadius: 2,
          padding: 15,
          shadowColor: Colors.black,
          shadowOpacity: 0.5,
          shadowRadius: 2,
          shadowOffset: {
            height: 1,
            width: 1,
          },
        }}>
        <Text
          style={{
            fontFamily: 'RedHatDisplay-SemiBold',
            letterSpacing: 0.3,
            color: Colors.Primary,
            textAlign: 'center',
          }}>
          {BtnText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContinueBtn;

const styles = StyleSheet.create({});
