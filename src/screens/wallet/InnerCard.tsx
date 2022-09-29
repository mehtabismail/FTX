import {StyleSheet, TouchableOpacity, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
import metrics from '../../theme/Metrics';
import ToggleButton from '../../components/ToggleButton';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import navigationStrings from '../../constants/navigationStrings';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';
import {useNavigation} from '@react-navigation/native';
import { storeCardId, storeUserDetails } from '../../redux/reducers/banking/UserBankDetailSlice';

const InnerCard = (props: any) => {
  const navigation: any = useNavigation();
  const dispatch : any = useDispatch();
  const {email, render, status, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );
  const [toggle, setToggle] = useState(false);

  const onTogglePressHandler = (props: any) => {
    console.log(props, 'checking');
    setToggle(!props);
  };

  const onTerminatePressHandler = async () => {
    console.log('terminate api started');
    const response = await fetch(`${navigationStrings.BASE_URL}bank/card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({card: null}),
    });
    console.log(await response.text());
    if (response.status === 200) {
      dispatch(storeCardId(null));
      Alert.alert('Card terminated successfully!');
      setTimeout(() => {
        // NAVIGATE TO WALLET SCREEN STACK
        navigation.reset({
          index: 0,
          routes: [{name: navigationStrings.BOTTOM_TABS}],
        });
      }, 1000);
    } else {
      Alert.alert('Something went wrong!');
    }
  };

  return (
    <View
      style={{
        ...styles.innerCard,
        opacity: toggle == false && props?.button === 'Toggle' ? 0.4 : 1,
      }}>
      <View>
        <props.svg
          fill={
            toggle == false && props?.button === 'Toggle'
              ? '#C2C4CA'
              : Colors.Primary
          }
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textAndToggle}>
          <Text style={styles.headingText}>{props.heading}</Text>
          <View style={styles.bodyTextContainer}>
            <Text style={styles.bodyTextStyle}>{props.bodyText}</Text>
          </View>
        </View>
      </View>
      <View>
        {props?.button && props?.button === 'Toggle' && (
          <ToggleButton
            toggle={toggle}
            onPress={onTogglePressHandler}
            heading={props?.heading}
          />
        )}
        {props?.button && props?.button === 'Reset' && (
          <TouchableOpacity
            style={{
              // paddingHorizontal: 20,
              // paddingVertical: 10,
              width: 80,
              height: 30,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#E8EBED',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#1B40E3',
                fontWeight: '400',
                fontSize: Fonts.size.medium,
              }}>
              {props?.button}
            </Text>
          </TouchableOpacity>
        )}
        {props?.button && props?.button === 'Terminate' && (
          <TouchableOpacity
            onPress={onTerminatePressHandler}
            style={{
              width: 80,
              height: 30,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#E8EBED',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                color: '#1B40E3',
                fontWeight: '400',
                fontSize: Fonts.size.medium,
              }}>
              {props?.button}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InnerCard;

const styles = StyleSheet.create({
  innerCard: {
    marginTop: metrics.baseMargin,
    marginHorizontal: metrics.baseMargin,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    marginLeft: metrics.regularMargin,
  },
  textAndToggle: {
    justifyContent: 'space-between',
  },
  bodyTextContainer: {
    width: '70%',
    marginVertical: metrics.smallMargin,
  },
  bodyTextStyle: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: Fonts.size.medium,
    color: '#616269',
  },
  headingText: {
    color: Colors.textColor,
    fontSize: Fonts.size.medium,
    fontFamily: 'RedHatDisplay-Medium',
  },
});
