import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import UserLogin from '../assets/signinScreen/userLogin.svg';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../../theme/Fonts';
import metrics from '../../theme/Metrics';
import Colors from '../../theme/Colors';
import ArrowLeft from '../../assets/authenticationScreen/ArrowLeft.svg';
import {Shadow} from '../../components/styles/ScreenStyle';

const BankingHeader: any = ({headText, flag}: any) => {
  const navigation = useNavigation();
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
            onPress={() => navigation.goBack()}>
            <ArrowLeft height={15} width={15} />
          </TouchableOpacity>
        </View>
        {flag && flag === 'sendmoney' ? (
          <View>
            <TouchableOpacity style={styles.inviteBtn}>
              <Text
                style={{color: '#ffff', fontFamily: 'RedHatDisplay-SemiBold'}}>
                Invite a friend
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {flag && flag === 'statement' ? (
          <View>
            <TouchableOpacity style={styles.inviteBtn}>
              <Text
                style={{color: '#ffff', fontFamily: 'RedHatDisplay-SemiBold'}}>
                Statement
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <View style={styles.bankingTextView}>
        <Text style={styles.bankingText}>{headText}</Text>
        {flag && flag === 'statement' ? (
          <View>
            <TouchableOpacity>
              <Text style={styles.statText}>Share</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default BankingHeader;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  backBtn: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    marginVertical: 30,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteBtn: {
    backgroundColor: Colors.Primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
  },
  bankingTextView: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'flex-end',
  },
  bankingText: {
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 24,
    color: Colors.textColor,
  },
  statementbtn: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  statText: {
    color: Colors.Primary,
    fontFamily: 'RedHatDisplay-SemiBold',
    fontSize: 16,
  },
});
