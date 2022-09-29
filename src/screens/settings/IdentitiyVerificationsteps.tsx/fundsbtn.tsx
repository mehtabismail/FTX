import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ArrowDown from '../../../assets/authenticationScreen/greaterthan.svg';
import Colors from '../../../theme/Colors';
import {Icon} from '@rneui/themed';

const Fundsbtn = (props: any) => {
  console.log(props?.svg, '======');
  return (
    <View style={{paddingVertical: 10}}>
      {!!props?.svg === false && <View style={{ width: '100%', alignItems:'center', justifyContent:'center', marginBottom:10, marginTop:-10}}><Text>or</Text></View>}
      <TouchableOpacity
        onPress={() => {
          props?.onClick(props?.BtnText);
        }}
        style={{
          borderColor:
            props?.BtnText === props?.selected ? Colors.Primary : '#DCDCDC',
          borderRadius: 5,
          borderWidth: 2,
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* <props?.svg /> */}
        <View style={{flexDirection: 'row'}}>
          {props?.svg && (
            <View
              style={{
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name={props?.svg} type="font-awesome" color="black" />
            </View>
          )}
          {props?.svg ? (
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  marginLeft: 5,
                  fontFamily: 'RedHatDisplay-SemiBold',
                  letterSpacing: 0.3,
                  color:
                    props?.BtnText === props?.selected
                      ? Colors.Primary
                      : '#A2A2A2',
                }}>
                {props?.BtnText}
              </Text>
            </View>
          ) : (
            <View style={{width: '100%'}}>
              <TextInput
                onBlur={() => props?.onChangeText('')}
                style={{marginLeft: 10}}
                placeholder={props?.BtnText}
                onChangeText={text => props?.onChangeText(text)}
              />
            </View>
          )}
        </View>
        <View>{props?.svg && <ArrowDown height={15} width={15} />}</View>
      </TouchableOpacity>
    </View>
  );
};

export default Fundsbtn;

const styles = StyleSheet.create({});
