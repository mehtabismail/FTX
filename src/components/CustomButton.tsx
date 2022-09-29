import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import metrics from '../theme/Metrics';
import Colors from '../theme/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';

const CustomButton: any = (props: any) => {
  const loading = useSelector((state: RootState) => state?.loading?.isLoading);
console.log(props?.isLoadingButton, loading)
  // console.log(!!props?.width, 'width');
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        // onPress={!!props?.pressed === false ? props?.onPress : () => {}}
        onPress={props?.onPress}
        disabled={loading ? true : false}
        style={[
          props?.flag === 'dashboard'
            ? styles.containerDashboard
            : styles.container,
          {width: !!props?.width ? props?.width : 335, height: 50},
        ]}>
        {props?.isLoadingButton && loading ? (
          <ActivityIndicator
            color="white"
            size="large"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        ) : (
          <Text
            style={
              props?.flag === 'dashboard'
                ? styles.textColorDashboard
                : styles.textColor
            }>
            {props?.buttonText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  textColor: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'RedHatDisplay-Medium',
  },
  textColorDashboard: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'RedHatDisplay-Medium',
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: metrics.regularPadding,
  },
  container: {
    // width: 335,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Primary,
    borderRadius: 20,
    paddingVertical: metrics.basePadding,
  },
  containerDashboard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderRadius: 20,
    paddingVertical: metrics.basePadding,
  },
});
