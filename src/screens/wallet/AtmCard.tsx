import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomATMCard from '../../components/CustomATMCard';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Colors from '../../theme/Colors';
import {useGetCardDetailQuery} from '../../redux/services/banking/cardDetails';
import {configData} from '../../config/config';
import {useDispatch, useSelector} from 'react-redux';
import {storeManagedCardDetails} from '../../redux/reducers/banking/UserBankDetailSlice';
import { RootState } from '../../redux/Store';

export const SLIDER_WIDTH = Dimensions.get('window').width + 20;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.65);
const data = [1, 2];

const AtmCard = (props: any) => {
  const {
    server_url,
    api_key,
    managed_cards_profile_id,
  } = configData;
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const dispatch = useDispatch();

  const {Bank}: any = useSelector(
    (state: RootState) => state?.userBankDetails?.userDetails,
  );
  const {corporate_token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  // console.log(Bank, "------bank details------");

  // const cardDetails = useGetCardDetailQuery<any>(corporate_token);
  // console.log(cardDetails, "card detail to show on card")
  const [carddata, setCardData] = useState({
    mode: '',
    balances: {
      actualBalance: 0,
      availableBalance: 0,
    },
    billingAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      postCode: '',
      state: '',
    },
    cardBrand: '',
    cardLevelClassification: '',
    cardNumber: {
      value: '',
    },
    cardNumberFirstSix: '',
    cardNumberLastFour: '',
    cardholderMobileNumber: '',
    creationTimestamp: 0,
    currency: '',
    cvv: {
      value: '',
    },
    digitalWallets: {
      walletsEnabled: false,
    },
    expiryMmyy: '',
    expiryPeriodMonths: 0,
    externalHandle: '',
    friendlyName: '',
    id: '',
    nameOnCard: '',
    profileId: '',
    renewalType: '',
    startMmyy: '',
    state: {
      state: '',
    },
    tag: '',
    type: '',
  });
  // console.log(carddata?.cardNumberLastFour, 'card Details');

  const saveValue = (props: any) => {
    setCardData({...carddata, ...props});
    dispatch(storeManagedCardDetails(props));
  };

  const getCardDetails = async () => {
    console.log(Bank?.card_id, "----------------------------------------------------------------")
    const response = await fetch(
      `${server_url}/multi/managed_cards/${Bank?.card_id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${corporate_token}`,
          'api-key': api_key,
        },
        method: 'GET',
      },
    );
    console.log(response, "response checking");
    const res = await response.json();
    console.log(res, "json response checking");
    saveValue(res);
    // saveValue(res);
  };

  useEffect(() => {
    getCardDetails();
  }, [Bank]);

  const renderItem = () => {
    return (
      <View>
        <CustomATMCard
          name="Swissblock"
          cardNumber={
            carddata?.cardNumberFirstSix && carddata?.cardNumberLastFour
              ? carddata?.cardNumberFirstSix + carddata?.cardNumberLastFour
              : '**** **** **** 0524'
          }
          cardType={carddata?.cardBrand ? carddata?.cardBrand : ''}
          expireDate={carddata?.expiryMmyy ? carddata?.expiryMmyy : ''}
        />
      </View>
    );
  };
  return (
    <View style={{alignItems: 'center'}}>
      <CustomATMCard
        name="Swissblock"
        cardNumber={
          carddata?.cardNumberFirstSix && carddata?.cardNumberLastFour
            ? carddata?.cardNumberFirstSix + carddata?.cardNumberLastFour
            : '**** **** **** 0524'
        }
        cardType={carddata?.cardBrand ? carddata?.cardBrand : ''}
        expireDate={carddata?.expiryMmyy ? carddata?.expiryMmyy : ''}
      />
      {/* <Carousel
        ref={isCarousel}
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
      />
      <View style={{marginTop: -40, marginBottom: -5}}>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: Colors.Secondary,
          }}
          // tappableDots={true}
          inactiveDotStyle={{
            width: 20,
            height: 20,
            borderRadius: 10,
            // marginHorizontal: 8,
            backgroundColor: Colors.Secondary,
          }}
          inactiveDotOpacity={0.5}
          // inactiveDotScale={0.6}
        />
      </View> */}
    </View>
  );
};

export default AtmCard;

const styles = StyleSheet.create({});
