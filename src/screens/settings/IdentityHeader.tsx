import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ArrowLeft from '../../assets/authenticationScreen/ArrowLeft.svg';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Shadow} from '../../components/styles/ScreenStyle';
import Colors from '../../theme/Colors';

const IdentityHeader = (props: any) => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={{width: '33%'}}>
          <TouchableOpacity
            style={[styles.backBtn, Shadow]}
            onPress={
              !!props?.onPress === false
                ? () => navigation.goBack()
                : props?.onPress
            }>
            <ArrowLeft height={15} width={15} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '34%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontFamily: 'RedHatDisplay-Bold', fontSize: 17}}>
            {props?.heading}
          </Text>
        </View>
        <View style={{width: '34%'}}></View>
      </View>
    </View>
  );
};

export default IdentityHeader;

const styles = StyleSheet.create({
  mainContainer: {},
  backBtn: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    marginVertical: 30,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
