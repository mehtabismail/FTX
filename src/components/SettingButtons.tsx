import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../theme/Colors';
import Greaterthan from '../assets/authenticationScreen/greaterthan.svg';

const SettimgButtons = ({BtnText, navigationHandler}: any) => {
  return (
    <View style={{padding: 20}}>
      <TouchableOpacity
        onPress={navigationHandler}
        style={{
          borderColor: '#DCDCDC',
          borderRadius: 20,
          borderWidth: 2,
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Text
          style={{
            fontFamily: 'RedHatDisplay-SemiBold',
            color: Colors.black,
            fontSize: 17,
            letterSpacing: 0.3,
          }}>
          {BtnText}
        </Text>
        <View>
          <Greaterthan height={15} width={15} />
        </View>
        {/* <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 4,
            width: 85,
            marginLeft: 20,
          }}
        /> */}
        {/* <View
        style={{
          height: 2,
          backgroundColor: '#DCDCDC',
        }}
      /> */}
      </TouchableOpacity>
    </View>
  );
};

export default SettimgButtons;

const styles = StyleSheet.create({});
