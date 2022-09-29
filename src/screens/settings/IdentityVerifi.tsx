import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import BankingHeader from '../banking/bankingHeader';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';
import Colors from '../../theme/Colors';
import IdentityHeader from './IdentityHeader';
import IdentityCard from './IdentityCard';
import navigationStrings from '../../constants/navigationStrings';
import {mainStyle} from '../../components/styles/ScreenStyle';

const IdentityVerification = ({navigation}: any) => {
  const {email, render, status, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );
  console.log('state=======', status);

  const onClickHandler1 = () => {
    navigation.navigate(navigationStrings.STEP2, {flag: 'from-wallet'});
  };

  const onClickHandler2 = () => {
    if (status && status === 'initial') {
      navigation.navigate(navigationStrings.STEP2, {
        flag: 'from-wallet',
        level: '2',
      });
    } else {
      navigation.navigate(navigationStrings.SOURCEOFFUND);
    }
  };
  return (
    <SafeAreaView style={mainStyle}>
      <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
        <IdentityHeader />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{
            backgroundColor: '#FCEDDF',
            paddingHorizontal: 20,
            borderRadius: 20,
            padding: 20,
          }}>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Bold',
              color: Colors.black,
              fontSize: 17,
              letterSpacing: 0.3,
            }}>
            Identity Verification ?
          </Text>
          <Text style={{fontFamily: 'RedHatDisplay-Medium'}}>
            Individual: <Text> Unverified</Text>
          </Text>
          <Text style={{fontFamily: 'RedHatDisplay-Medium'}}>
            Explore the site, but cannot deposit or trade.
          </Text>
          {status === 'initial' ? (
            <View style={{paddingVertical: 20}}>
              <IdentityCard
                status={status}
                level="Level 1"
                des1="Trading enabled"
                des2="2000 USD of daily withdrawals"
                des3="Take less than 3 minutes"
                onClickHandler={onClickHandler1}
              />
            </View>
          ) : (
            <Text>Verified by Level 1.</Text>
          )}

          <View style={{paddingVertical: 20}}>
            <IdentityCard
              status={status}
              level="Level 2"
              flag="recomended"
              des1="Unlimited crypto withdrawals"
              des2="Fiat deposits and withdrawals"
              des3="Takes less than 5 minutes"
              onClickHandler={onClickHandler2}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default IdentityVerification;

const styles = StyleSheet.create({});
