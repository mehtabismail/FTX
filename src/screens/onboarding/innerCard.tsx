import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import metrics from '../../theme/Metrics';
import {Shadow} from '../../components/styles/ScreenStyle';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import BackStageSVG from '../../assets/bottomTabNavigation/wallet/backStage.svg';

export default function InnerCard(props: any) {
  const data: any = [1, 2, 3];
  return (
    <View style={styles.mainContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{paddingVertical: 10, flexDirection: 'row'}}>
          <View style={[styles.card, Shadow]}>
            <View
              style={{
                ...styles.containerInsideCard,
                ...styles.topContainerInsidecard,
              }}>
              <View style={styles.BalanceAndDetail}>
                <Text style={styles.balanceTextStyle}>Balance:</Text>
                <Text style={styles.detailTextStyle}>Details</Text>
              </View>
              <View>
                <Text style={styles.balanceAmountStyle}>
                  {'$' + props.balance}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.containerInsideCard,
              }}>
              <View style={styles.BalanceAndDetail}>
                <Text style={styles.balanceTextStyle}>History:</Text>
                <Text style={styles.detailTextStyle}>See all</Text>
              </View>
              <View
                style={{
                  ...styles.balanceAmountStyle,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.SVGContainer}>
                  <BackStageSVG />
                  <Text
                    style={{
                      ...styles.balanceTextStyle,
                      ...styles.bottomContainerTextColor,
                    }}>
                    Backstage cafe
                  </Text>
                </View>
                <Text
                  style={{
                    ...styles.bottomContainerTextColor,
                    ...styles.bottomContainerTextColor,
                  }}>
                  {props.history}
                </Text>
              </View>
            </View>
          </View>
          {/* );
          })} */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: metrics.doubleBasePadding,
    flexDirection: 'row',
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: 'white',
    height: 255,
    width: 330,
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerInsideCard: {
    height: '35%',
    width: '90%',
  },
  topContainerInsidecard: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Secondary,
  },
  BalanceAndDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceTextStyle: {
    color: Colors.Secondary,
    fontSize: Fonts.size.large,
    fontFamily: "RedHatDisplay-SemiBold",
  },
  detailTextStyle: {
    color: Colors.Primary,
    fontSize: Fonts.size.medium,
    fontFamily: 'RedHatDisplay-Medium',
  },
  balanceAmountStyle: {
    color: Colors.textColor,
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 24,
    marginTop: metrics.baseMargin,
  },
  bottomContainerTextColor: {
    color: '#3D3B44',
  },
  SVGContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
