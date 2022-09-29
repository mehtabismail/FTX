import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackBtnHeader from '../../components/BackBtnHeader';
import metrics from '../../theme/Metrics';
import TSRE_Card from '../../components/TSRE_Card';
import CustomButton from '../../components/CustomButton';
import {mainStyle} from '../../components/styles/ScreenStyle';
import Colors from '../../theme/Colors';

const Exchange = () => {
  return (
    <SafeAreaView style={mainStyle}>
      <View style={{flex: 1}}>
        <BackBtnHeader headingText="Exchange" />
        <View style={{marginVertical: metrics.regularMargin}}>
          <TSRE_Card
            flag="Exchange"
            currency="EUR"
            balance="€241.21"
            EUR_to_BTC={false}
          />
        </View>
        <View style={{marginVertical: 12}}>
          <TSRE_Card
            flag="Exchange"
            currency="EUR"
            balance="0 BTC"
            EUR_to_BTC={true}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.textStyle}>€1 = 0.0000421412</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <CustomButton buttonText="Sell EUR for BTC" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    color: Colors.Blue_1,
    fontFamily: 'RedHatDisplay-Medium',
  },
});
