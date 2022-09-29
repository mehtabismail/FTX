import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ArrowLeft from '../assets/authenticationScreen/ArrowLeft.svg';
import {useNavigation} from '@react-navigation/native';
import {Shadow} from './styles/ScreenStyle';
import Colors from '../theme/Colors';

const BackBtnHeader = (props: any) => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', marginTop: 60, marginBottom: 30}}>
      <View style={{width: '33%', paddingLeft: 20}}>
        <TouchableOpacity
          style={[styles.backBtn, Shadow]}
          onPress={() => navigation.goBack()}>
          <ArrowLeft height={15} width={15} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '34%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: Colors.Secondary,
            fontSize: 16,
            fontFamily: 'RedHatDisplay-SemiBold',
          }}>
          {props.headingText}
        </Text>
      </View>
      <View
        style={{
          width: '33%',
          alignItems: 'center',
          justifyContent: 'center',
        }}></View>
    </View>
  );
};

export default BackBtnHeader;

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
