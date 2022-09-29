import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BankingHeader from '../banking/bankingHeader';
import AccountdetailsCard from './AccountdetailsCard';
import Card from './Card';
import Send from '../../assets/bottomTabNavigation/wallet/send.svg';
import TopUp from '../../assets/bottomTabNavigation/wallet/topUp.svg';
import Request from '../../assets/bottomTabNavigation/wallet/request.svg';
import Exchange from '../../assets/bottomTabNavigation/wallet/exchange.svg';
import navigationStrings from '../../constants/navigationStrings';
import Instructions from './Instructions';

const AccountDetail = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <BankingHeader flag="statement" headText="Account Details" />
        <ScrollView>
          <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
            <AccountdetailsCard />
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                  marginTop: 4,
                }}>
                <View style={styles.cardAdjustment}>
                  <Card
                    name="Top Up"
                    svg={TopUp}
                    moveTo={navigationStrings.TOP_UP}
                  />
                </View>
                <View style={styles.cardAdjustment}>
                  <Card
                    name="Send"
                    svg={Send}
                    moveTo={navigationStrings.SENDMONEY}
                  />
                </View>
                <View style={styles.cardAdjustment}>
                  <Card
                    name="Request"
                    svg={Request}
                    moveTo={navigationStrings.BANKTRANSFER}
                  />
                </View>
                <View>
                  <Card
                    name="Exchange"
                    svg={Exchange}
                    moveTo={navigationStrings.EXCHANGE}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 1}}>
              <Instructions />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AccountDetail;

const styles = StyleSheet.create({
  cardAdjustment: {marginRight: 5},
});
