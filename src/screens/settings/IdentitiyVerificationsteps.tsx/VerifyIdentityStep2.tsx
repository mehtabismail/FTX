import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ContinueBtn from './ContinueBtn';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../../theme/Colors';
import navigationStrings from '../../../constants/navigationStrings';
import IdentityHeader from '../IdentityHeader';

const VerifyIdentityStep2 = (props: any) => {
  console.log(props?.route?.params?.selected, 'checking');
  const navigation: any = useNavigation();
  const onClickHandler = () => {
    navigation.navigate(navigationStrings.IDENTITYTYPE, {
      selected: 'launchImageLibrary',
      sourceOfFunds: props?.route?.params?.selected,
    });
  };
  return (
    <SafeAreaView>
      {/* <IdentityHeader /> */}
      <IdentityHeader onPress={()=>navigation.goBack()} heading="Swissblock" />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          padding: 20,
          borderRadius: 5,
          marginVertical: 40,
          backgroundColor: '#ffff',
          shadowColor: '#000000',
          shadowOpacity: 0.1,
          shadowRadius: 2,
          shadowOffset: {
            height: 1,
            width: 1,
          },
        }}>
        <Text
          style={{
            paddingVertical: 20,
            fontFamily: 'RedHatDisplay-Bold',
            color: 'black',
          }}>
          Verify your Identity
        </Text>
        <Text style={{color: Colors.black}}>
          We need a proof of your identity to proceed. Select options for your
          verification on the next screen.
        </Text>
        <View
          style={{
            paddingTop: 20,
          }}>
          <ContinueBtn BtnText="Continue" clickHandler={onClickHandler} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyIdentityStep2;

const styles = StyleSheet.create({});
