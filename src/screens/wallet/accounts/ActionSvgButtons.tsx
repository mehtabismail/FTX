import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import Send from '../../../assets/bottomTabNavigation/wallet/send.svg';
import TopUp from '../../../assets/bottomTabNavigation/wallet/topUp.svg';
import Request from '../../../assets/bottomTabNavigation/wallet/request.svg';
import navigationStrings from '../../../constants/navigationStrings';
import Exchange from '../../../assets/bottomTabNavigation/wallet/exchange.svg';

const ActionSvgButtons = (props: any) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: props?.walletBalance?.data?.length === 1 ? 20 : 0,
        }}>
        <View style={styles.cardAdjustment}>
          <Card name="Top Up" svg={TopUp} moveTo={navigationStrings.TOP_UP} />
        </View>
        <View style={styles.cardAdjustment}>
          <Card name="Send" svg={Send} moveTo={navigationStrings.SENDMONEY} />
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
  );
};

export default ActionSvgButtons;

const styles = StyleSheet.create({
  cardAdjustment: {marginRight: 5},
});
