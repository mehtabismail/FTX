import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import UserLogin from '../assets/signinScreen/userLogin.svg';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../../../theme/Fonts';
import metrics from '../../../theme/Metrics';
import Colors from '../../../theme/Colors';
import navigationStrings from '../../../constants/navigationStrings';
import ArrowLeft from '../../../assets/authenticationScreen/ArrowLeft.svg';
import {Shadow} from '../../../components/styles/ScreenStyle';

const HeaderLogin: any = ({headerText1, headerText2, screen}: any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{width: '33%',paddingLeft: 20, }}>
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
          <Text style={{color: Colors.Secondary, fontSize: 14, fontFamily: 'RedHatDisplay-Medium',}}>Login</Text>
        </View>
        <Text style={{width: '33%'}}>{''}</Text>
      </View>
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.SigninText}>{headerText1}</Text>
        </View>
        <View>
          <Text style={styles.SigninText}>{headerText2}</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{color: '#9EA1AC', fontSize: 14, fontFamily: 'RedHatDisplay-Medium',}}>
          {screen === 'Login'
            ? 'Please, write your email address firstly. '
            : 'Already have an account? '}
        </Text>
      </View>
    </View>
  );
};

export default HeaderLogin;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
      marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  SigninText: {
    fontSize: 50,
    fontFamily: "RedHatDisplay-SemiBold",
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3D3B44',
  },
  SVGContainer: {
    paddingHorizontal: metrics.regularPadding,
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingVertical: metrics.basePadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 50,
    fontFamily: "RedHatDisplay-SemiBold",
    color: Colors.Primary,
  },
  backBtn: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent:"center"
  },
});
