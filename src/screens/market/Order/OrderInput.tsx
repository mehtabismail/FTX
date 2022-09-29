import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';

const OrderInput = (props: any) => {
  return (
    <View style={{paddingVertical: 15}}>
      <Text
        numberOfLines={1}
        style={{
          color: Colors.black,
          fontFamily: 'RedHatDisplay-SemiBold',
          fontSize: 13,
        }}>
        {props?.inputHeading}
      </Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{
              height: 40,
              borderBottomWidth: 1,
              width: '100%',
              borderColor: 'gray',
              justifyContent:'center'
            }}>
          <TextInput
            
            onChangeText={e =>
              props?.textInputHandler(e, props.inputHeading, props?.orderType)
            }
            editable={
              props.editable === false && props.orderType === 'Market order'
                ? false
                : true
            }
            value={
              props?.value
            }
            placeholderTextColor={Colors.black}
          />
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            height: 40,
            borderColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {!props?.flag ? (
            <Text style={{color: Colors.Gray_4}}>USD</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default OrderInput;

const styles = StyleSheet.create({});
