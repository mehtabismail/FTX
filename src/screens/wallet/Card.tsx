import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../theme/Colors';
import metrics from '../../theme/Metrics';
import {Shadow} from '../../components/styles/ScreenStyle';
import Fonts from '../../theme/Fonts';
import navigationStrings from '../../constants/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import {useFreezeCardMutation} from '../../redux/services/banking/cardDetails';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';
import {configData} from '../../config/config';
import { storeCardId } from '../../redux/reducers/banking/UserBankDetailSlice';

const Card = (props: any) => {
  const dispatch = useDispatch();
  const {server_url, api_key} = configData;
  const managedCardDetails: any = useSelector(
    (state: RootState) => state?.userBankDetails?.managedCardDetails,
  );

  // console.log(managedCardDetails, "hello managedCardDetails");
  const [cardState, setCardState] = useState(managedCardDetails?.state?.state);

  const navigation: any = useNavigation();

  const {Bank}: any = useSelector(
    (state: RootState) => state?.userBankDetails?.userDetails,
  );
  const {corporate_token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  // console.log(Bank, 'checking redux data');

  // const [freezeCard, freezeCardInfo] = useFreezeCardMutation();

  const freezManagedCard = async () => {
    console.log(managedCardDetails?.state?.state);
    if (managedCardDetails?.state?.state === 'ACTIVE') {
      const response = await fetch(
        `${server_url}/multi/managed_cards/${Bank?.card_id}/block`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'idempotency-ref': 'ref_3896',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${corporate_token}`,
            'api-key': api_key,
          },
        },
      );

      console.log(response, 'response of freeze card api ');
      if (response?.status === 204) {
        Alert.alert('Card freezed successfully!');
        // NAVIGATE TO WALLET SCREEN STACK
        navigation.reset({
          index: 0,
          routes: [{name: navigationStrings.BOTTOM_TABS}],
        });
      } else {
        Alert.alert('Something went wrong!');
      }
    } else {
      if (managedCardDetails?.state?.state === 'BLOCKED') {
        const response = await fetch(
          `${server_url}/multi/managed_cards/${Bank?.card_id}/unblock`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'idempotency-ref': 'ref_3896',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${corporate_token}`,
              'api-key': api_key,
            },
          },
        );

        console.log(response, 'response of un-freeze card api ');
        if (response?.status === 204) {
          Alert.alert('Card un-freezed successfully!');
          // NAVIGATE TO WALLET SCREEN STACK
          navigation.reset({
            index: 0,
            routes: [{name: navigationStrings.BOTTOM_TABS}],
          });
        } else {
          Alert.alert('Something went wrong!');
        }
      } else {
        if (managedCardDetails?.state?.state === 'DESTROYED') {
          Alert.alert('Card is terminated');
        }
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          props?.name === 'Freeze'
            ? freezManagedCard()
            : !!props.moveTo && (navigation.navigate(props.moveTo) as any);
        }}
        style={[styles.touchableContainer, Shadow]}>
        <props.svg />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {props?.name === 'Freeze' ? (
          <Text style={styles.textStyle}>
            {managedCardDetails?.state?.state === 'ACTIVE'
              ? 'Freeze'
              : managedCardDetails?.state?.state === 'BLOCKED' && 'unFreeze'}
          </Text>
        ) : (
          <Text style={styles.textStyle}>{props?.name}</Text>
        )}
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: metrics.smallMargin,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: Fonts.size.medium,
    color: Colors.textColor,
    fontFamily: 'RedHatDisplay-Medium',
  },
});
