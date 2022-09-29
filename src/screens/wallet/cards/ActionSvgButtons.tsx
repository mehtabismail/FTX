import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import navigationStrings from '../../../constants/navigationStrings';
import metrics from '../../../theme/Metrics';
import Transactions from '../../../assets/bottomTabNavigation/wallet/transactions_light.svg';
import Freeze from '../../../assets/bottomTabNavigation/wallet/freez_light.svg';
import ShowDetails from '../../../assets/bottomTabNavigation/wallet/showDetails_light.svg';

const ActionSvgButtons = (props: any) => {
    console.log(props, "checking props")
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{marginRight: metrics.smallMargin}}>
        <Card name="Transactions" svg={Transactions} />
      </View>
      {props?.card_id && (
        <View style={{marginRight: 5}}>
          <Card name="Freeze" svg={Freeze} />
        </View>
      )}
      <View>
        <Card
          moveTo={navigationStrings.ACCOUNTDETAIL}
          name="Show Details"
          svg={ShowDetails}
        />
      </View>
    </View>
  );
};

export default ActionSvgButtons;

const styles = StyleSheet.create({});
