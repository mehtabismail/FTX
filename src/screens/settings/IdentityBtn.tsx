import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import metrics from '../../theme/Metrics';
import Colors from '../../theme/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';

const IdentityButton: any = (props: any) => {
  const {email, render, status, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  return (
    <View style={styles.mainContainer}>
      {status === 'kyc_pending' ? (
        <View
          style={
            props.flag === 'dashboard'
              ? styles.containerDashboard
              : styles.container
          }>
          <Text
            style={
              props.flag === 'dashboard'
                ? styles.textColorDashboard
                : styles.textColor
            }>
            kyc_pending
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={props.onPress}
          style={[
            props.flag === 'dashboard'
              ? styles.containerDashboard
              : styles.container,
          ]}>
          <Text
            style={
              props.flag === 'dashboard'
                ? styles.textColorDashboard
                : styles.textColor
            }>
            {props.buttonText}
          </Text>
        </TouchableOpacity>
      )}
      {/* {status === 'initial' ||
        (status === 'sms_verified' && (
          
        ))} */}
    </View>
  );
};

export default IdentityButton;

const styles = StyleSheet.create({
  textColor: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'RedHatDisplay-Medium',
  },
  textColorDashboard: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'RedHatDisplay-Medium',
  },
  mainContainer: {
    paddingVertical: metrics.regularPadding,
  },
  container: {
    backgroundColor: Colors.Primary,
    borderRadius: 20,
    paddingVertical: metrics.basePadding,
  },
  containerDashboard: {
    backgroundColor: '#ffff',
    borderRadius: 20,
    paddingVertical: metrics.basePadding,
  },
});
