import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useRef, useState} from 'react';
import metrics from '../theme/Metrics';
import {Shadow} from './styles/ScreenStyle';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import {useNavigation} from '@react-navigation/native';
import Cofee from '../assets/bottomTabNavigation/wallet/Cofee.svg';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import navigationStrings from '../constants/navigationStrings';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import {useWalletAddressMutation} from '../redux/services/wallet/WalletDetails';
import {Button} from '@rneui/themed';
import Clipboard from '@react-native-community/clipboard';
import {useClipboard} from '@react-native-community/clipboard';
import {useToast} from 'react-native-toast-notifications';
import Image from '../assets/images/copy.svg';
import {useBtcTransactionHistoryQuery} from '../redux/services/wallet/TransactionHistory';
import TransactionHistory from '../screens/wallet/TransactionHistory';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.85);

const CustomCard = (props: any) => {
  const carouselData: any = props.data;
  const isCarousel = useRef(null);
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [isModalVisible, setModalVisible]: any = useState(false);
  const [address, setAddress] = useState<any>(null);
  const [skip, setSkip] = useState(true);

  const [dataString, setString] = useClipboard();
  const toast = useToast();

  const swiperRef = useRef(null);

  const {token} = useSelector((state: RootState) => state?.registerProps);

  const [walletAddress, walletAddressInfo] = useWalletAddressMutation();

  const getTransaction = useBtcTransactionHistoryQuery(address, {
    skip,
  });

  const getWalletAddresses = async (currency_code: any) => {
    const response: any = await walletAddress({
      currency_code,
      token,
    });
    if (response?.data?.wallet_address) {
      setAddress(response?.data?.wallet_address);
      setSkip(false);
    }
    return response?.data?.wallet_address;
  };

  const renderItem = (props: any) => {
    const navigateToAccount = () => {
      navigation.navigate(navigationStrings.ACCOUNTDETAIL as any);
    };

    const onPressHandler = () => {
      console.log('pressed');
    };

    const toggleModal: any = () => {
      setModalVisible(!isModalVisible);
    };

    const copyToClipBoard = (name: any) => {
      Clipboard.setString(name);
      toast.show('Copied to Clipboard', {
        type: 'warning',

        placement: 'bottom',

        duration: 2000,

        animationType: 'slide-in',
      });
    };

    return (
      <View style={{padding: 1, zIndex: 1}}>
        <Modal
          style={{
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          isVisible={isModalVisible}>
          <View
            style={[
              Shadow,
              {
                borderRadius: 10,
                height: 200,
                width: '90%',
                backgroundColor: Colors.cardBackground,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <View
              style={{
                width: '100%',
                height: '50%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.textColor,
                    fontSize: 14,
                    fontFamily: 'RedHatDisplay-Medium',
                  }}>
                  {address}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => copyToClipBoard(address)}
                style={{
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image height={20} width={20} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  backgroundColor: Colors.Primary,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 20,
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={[styles.card, Shadow, {zIndex: 2}]}>
          {/* TOP-CONTAINER */}
          <View
            style={{
              ...styles.containerInsideCard,
              ...styles.topContainerInsidecard,
              zIndex: 3,
            }}>
            <View
              // ref={isCarousel}
              style={{
                ...styles.BalanceAndDetail,
                marginTop: 25,
                zIndex: 4,
              }}>
              <View>
                <Text style={styles.balanceTextStyle}>Balance:</Text>
              </View>
              <TouchableOpacity
                style={{zIndex: 5}}
                onPress={() => {
                  getWalletAddresses(props?.item?.currency_code.toLowerCase());
                  setModalVisible(!isModalVisible);
                }}>
                <Text style={styles.detailTextStyle}>Details</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.balanceAmountStyle}>
                {props?.item?.balance + ' '}
                {props?.item?.currency_code.toUpperCase()}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '85%',
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(0, 0, 0, 0.05)',
            }}></View>

          {/* BOTTOM-CONTAINER */}
          <View
            style={{
              ...styles.containerInsideCard,
              // zIndex: 3,
            }}>
            <View
              style={{
                ...styles.BalanceAndDetail,
                marginBottom: metrics.smallMargin,
                zIndex: 2,
              }}>
              <Text style={styles.balanceTextStyle}>History:</Text>
              <View style={{zIndex: 3}}>
                {/* <Text style={styles.detailTextStyle}>See all</Text> */}
                <TransactionHistory currency_code={props?.item?.currency_code.toLowerCase()} />
              </View>
            </View>
            <View
              style={{
                ...styles.balanceAmountStyle,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: metrics.basePadding,
              }}>
              <View style={styles.SVGContainer}>
                <Cofee />
                <Text style={styles.backstageText}>Backstage cafe</Text>
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
      </View>
    );
  };

  const getHistory = async (currency_code: any) => {
    getWalletAddresses(currency_code);
    console.log(getTransaction, 'transaction history');
  };

  // const apiCall = async (address: string) => {
  //   console.log(address, 'checking address');
  //   const result = await fetch(
  //     `https://api-eu1.tatum.io/v3/bitcoin/transaction/address/${address}?pageSize=45`,
  //     {
  //       headers: {
  //         'x-api-key': 'f571e2a8-e666-4731-aad7-22d841d86a18_100',
  //       },
  //       method: 'GET',
  //     },
  //   );

  //   console.log(await result.json(), 'response from api');
  // };

  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Carousel
            ref={isCarousel}
            data={carouselData}
            renderItem={renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={index => setIndex(index)}
            // onPress={onPressHandler}
          />
          <View>
            <Pagination
              containerStyle={{marginTop: -10}}
              dotsLength={carouselData.length}
              activeDotIndex={index}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: Colors.Secondary,
              }}
              // tappableDots={true}
              inactiveDotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                // marginHorizontal: 8,
                backgroundColor: Colors.Secondary,
              }}
              inactiveDotOpacity={0.5}
              // inactiveDotScale={0.6}
            />
          </View>
        </View>
        {/* </TapGestureHandler> */}
      </View>
    </View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  card: {
    backgroundColor: Colors.cardBackground,
    height: 255,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerInsideCard: {
    height: '35%',
    width: '85%',
  },
  topContainerInsidecard: {
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.Secondary,
  },
  BalanceAndDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceTextStyle: {
    color: Colors.Secondary,
    fontSize: 14,
    fontFamily: 'RedHatDisplay-Medium',
  },
  detailTextStyle: {
    color: Colors.Primary,
    fontSize: Fonts.size.medium,
    fontFamily: 'RedHatDisplay-Medium',
  },
  balanceAmountStyle: {
    color: Colors.textColor,
    fontFamily: 'RedHatDisplay-SemiBold',
    fontSize: 24,
    marginTop: metrics.baseMargin,
  },
  bottomContainerTextColor: {
    color: Colors.textColor,
  },
  SVGContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backstageText: {
    color: Colors.textColor,
    fontSize: 16,
    fontFamily: 'RedHatDisplay-SemiBold',
    marginLeft: metrics.regularMargin,
  },
});
