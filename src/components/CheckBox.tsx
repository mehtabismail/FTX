import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React, {useState} from 'react';
import metrics from '../theme/Metrics';
import Fonts from '../theme/Fonts';
import Colors from '../theme/Colors';
import RnOtpTimer from 'rn-otp-timer';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings';

const CheckBox: any = ({screen}: any) => {
  const navigation = useNavigation();
  const navigationTOLogin = () => {
    navigation.navigate(navigationStrings.LOGIN as any);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.checkBoxAndTextContainer}>
          {/* <TouchableOpacity style={styles.checkBoxContainer}></TouchableOpacity> */}

          {screen === 'Resend' ? (
            <RnOtpTimer
              minutes={0}
              seconds={15}
              resendButtonStyle={{}}
              resendButtonTextStyle={{color: Colors.Gray_4}}
              resendButtonAction={() => {
                console.log('otp resent!');
              }}
            />
          ) : (
            <View>
              {screen === 'from-wallet' ? null : (
                <Text>
                  {screen === 'Login'
                    ? 'Use Custom Login'
                    : 'Have an account?  '}
                </Text>
              )}
            </View>
          )}

          {screen === 'Register' ? (
            <TouchableOpacity onPress={navigationTOLogin}>
              <Text style={styles.forgetText}>Log in</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity>
          <Text style={styles.forgetText}>
            {screen === 'Login' ? 'Forget password' : null}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    paddingVertical: metrics.smallPadding,
  },
  container: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  checkBoxAndTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'flex-end',
  },
  checkBoxContainer: {
    borderWidth: 1,
    borderRadius: 5,
    height: 20,
    width: 20,
    marginRight: metrics.regularMargin,
  },
  forgetText: {
    fontFamily: 'RedHatDisplay-SemiBold',
    color: Colors.Primary,
  },
});
