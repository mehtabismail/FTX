import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import metrics from '../theme/Metrics';
import Fonts from '../theme/Fonts';
import LinearGradient from 'react-native-linear-gradient';

const CustomATMCard = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['#F3832E', '#616269']}
        // start={{x: 0, y: 0}}
        // end={{x: 1, y: 0}}
        style={{
          ...styles.cardContainer,
          // marginHorizontal: props.id === 1 ? metrics.doubleBasePadding : null,
        }}>
        <View style={styles.swissContainer}>
          <Text style={styles.swissTextContainer}>{props.name}</Text>
        </View>
        <View>
          <View style={{padding: metrics.basePadding}}>
            <Text style={{color: 'white', fontSize: Fonts.size.input}}>
              {props.cardNumber}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: metrics.basePadding,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: metrics.regularMargin,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: Fonts.size.small}}>
                  Valid Thru
                </Text>
                  <Text style={{color: 'white', fontSize: Fonts.size.input}}>
                    {props?.expireDate.slice(0, 2) +
                      '/' +
                      props?.expireDate.slice(2, 4)}
                  </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingLeft: metrics.regularPadding,
                }}>
                <Text style={{color: 'white', fontSize: Fonts.size.small}}>
                  CVV
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: Fonts.size.input,
                    fontFamily: 'RedHatDisplay-Medium',
                  }}>
                  ***
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              {/* <props.cardType /> */}
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'RedHatDisplay-Medium',
                }}>
                {props?.cardType}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default CustomATMCard;

const styles = StyleSheet.create({
  mainContainer: {paddingVertical: metrics.doubleBasePadding},
  cardContainer: {
    width: 256,
    height: 162,
    borderRadius: 10,

    justifyContent: 'space-between',
  },
  swissContainer: {
    paddingHorizontal: metrics.basePadding,
    paddingTop: metrics.basePadding,
  },
  swissTextContainer: {
    color: 'white',
    fontSize: Fonts.size.h5,
    fontFamily: 'RedHatDisplay-Bold',
  },
});
