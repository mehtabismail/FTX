import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import Colors from '../../../theme/Colors';
import {CheckBox} from '@rneui/themed';

const RadioBtn = ({btnText, index, checked, setChecked}: any) => {
  console.log('first', checked);
  return (
    <View
      style={{
        padding: 10,
        borderColor: '#FCEDDF',
        borderWidth: 2,
        marginVertical: 10,
      }}>
      <View style={styles.radioBtnBlock}>
        <TouchableOpacity
          onPress={() => setChecked(btnText)}
          style={{
            height: 20,
            borderColor: checked !== btnText ? Colors.Gray_3 : 'transparent',
            borderWidth: 2,
            width: 20,
            borderRadius: 50,
            padding: 2,
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            backgroundColor:
              checked !== btnText ? 'transparent' : Colors.Primary,
          }}>
          {/* <View
              style={{
                backgroundColor: 'red',
                height: 10,
                width: 10,
                borderRadius: 50,
              }}></View> */}
        </TouchableOpacity>
        <View style={{paddingHorizontal: 15}}>
          <Text style={{color: Colors.Gray_3}}>{btnText}</Text>
        </View>
      </View>
    </View>
  );
};

export default RadioBtn;

const styles = StyleSheet.create({
  radioBtnBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBtnText: {
    color: '#233558',
    fontSize: 14,
  },
});
