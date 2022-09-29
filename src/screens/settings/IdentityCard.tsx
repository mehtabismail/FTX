import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IdentityButton from './IdentityBtn';
import navigationStrings from '../../constants/navigationStrings';
import {useNavigation} from '@react-navigation/native';

const IdentityCard = ({
  level,
  des1,
  flag,
  des2,
  des3,
  status,
  onClickHandler,
}: any) => {
  return (
    <View style={{backgroundColor: '#DBA57D', borderRadius: 20, padding: 20}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontFamily: 'RedHatDisplay-Bold', fontSize: 17}}>
          {level}
        </Text>
        {flag && flag === 'recomended' ? (
          <Text
            style={{fontFamily: 'RedHatDisplay-SemiBoldItalic', fontSize: 17}}>
            Recommended
          </Text>
        ) : null}
      </View>
      <View style={{paddingVertical: 10}}>
        <Text>{des1}</Text>
        <Text>{des2}</Text>
      </View>
      <View style={{paddingVertical: 10}}>
        <Text>{des3}</Text>
      </View>
      <View>
        <IdentityButton
          buttonText={
            !!level && level === 'Level 2' && status === 'initial'
              ? 'Complete level 1'
              : 'Continue'
          }
          onPress={onClickHandler}
        />
      </View>
    </View>
  );
};

export default IdentityCard;

const styles = StyleSheet.create({});
