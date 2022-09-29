import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {mainStyle} from '../../components/styles/ScreenStyle';
import BalanceComponent from './BalanceComponent';
import SwitchableComponent from '../../components/SwitchableComponent';
import CustomCard from '../../components/CustomCard';
import metrics from '../../theme/Metrics';
import Card from './Card';
import Send from '../../assets/bottomTabNavigation/wallet/send.svg';
import TopUp from '../../assets/bottomTabNavigation/wallet/topUp.svg';
import Request from '../../assets/bottomTabNavigation/wallet/request.svg';
import Exchange from '../../assets/bottomTabNavigation/wallet/exchange.svg';
import CustomATMCard from '../../components/CustomATMCard';
import VISA from '../../assets/bottomTabNavigation/wallet/VISA.svg';
import Transactions from '../../assets/bottomTabNavigation/wallet/transactions_light.svg';
import Freeze from '../../assets/bottomTabNavigation/wallet/freez_light.svg';
import ShowDetails from '../../assets/bottomTabNavigation/wallet/showDetails_light.svg';
import Colors from '../../theme/Colors';
import CardFunctionalities from './CardFunctionalities';
import {cardFunctionsData} from '../../constants/dummydata';
import Spending from './Spending';
import BreakDown from './BreakDown';
import OrderCard from './OrderCard';
import navigationStrings from '../../constants/navigationStrings';
import {useBalanceQuery} from '../../redux/services/wallet/Balance';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';
import CustomButton from '../../components/CustomButton';
import {storeRender} from '../../redux/reducers/register/RegisterSlice';
import AtmCard from './AtmCard';
import {useGetUserBankQuery} from '../../redux/services/banking/UserBankDetails';
import {
  storeUserBankDetails,
  storeUserDetails,
} from '../../redux/reducers/banking/UserBankDetailSlice';
import {useGetUserDetailsQuery} from '../../redux/services/banking/cardDetails';
import Accounts from './accounts/Accounts';
import Banking from './cards/Banking';
import Analytics from './analytics/Analytics';

// DUMMY DATA
const cardFunctions: any = cardFunctionsData;

// MAIN FUNCTION
const Wallet = (props: any) => {
  // const managedCardDetails: any = useSelector(
  //   (state: RootState) => state?.userBankDetails?.managedCardDetails,
  // );

  // const [cardState, setCardState] = useState(managedCardDetails?.state?.state);
  // var [totalBalance, setTotalBalance] = useState(0);\
  const dispatch = useDispatch();
  const {status}: any = useSelector((state: RootState) => state?.registerProps);
  const {totalBalance}: any = useSelector((state: RootState) => state?.wallet);
  // const {cryptoWallets}: any = useSelector(
  //   (state: RootState) => state?.wallet,
  // );

  // console.log(cryptoWallets, 'cccccccccccccccccccccccccccccccccccc');

  // const {Bank}: any = useSelector(
  //   (state: RootState) => state?.userBankDetails?.userDetails,
  // );

  // const walletBalance = useBalanceQuery<any>(token, {
  //   refetchOnMountOrArgChange: true,
  // });

  // GETTING USER_BANK_DETAILS DATA API
  // const getUserBankDetails = useGetUserBankQuery<any>(token);

  // GETTING USER_DETAILS DATA API
  // const getUserDetails = useGetUserDetailsQuery<any>(token);
  // console.log(getUserDetails?.data, 'checking userDetails');

  // console.log(
  //   getUserBankDetails?.error?.data,
  //   '-------UserBankDetails-------------------',
  // );

  // console.log(
  //   walletBalance?.data?.length,
  //   '===============wallet balance============',
  // );
  // console.log(walletBalance, '===============wallet balance============');

  // const getTotalBalance = async () => {
  //   console.log("total balance updating")
  //   setTotalBalance(0);
  //   if (cryptoWallets?.data) {
  //     cryptoWallets?.data?.map(async (item: any) => {
  //       const value = await fetch(
  //         `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${item.currency_code}&tsyms=USD,EUR`,
  //       ).then(response => response.json());
  //       let symbol = item.currency_code;
  //       // console.log(value[`${symbol.toUpperCase()}`].USD, 'value from wallet');
  //       let convertValue = value[`${symbol.toUpperCase()}`].USD * item.balance;
  //       setTotalBalance(totalBalance => totalBalance + convertValue);
  //     });
  //   }
  // };

  // const getTotalBalance = async () => {
  //   console.log('total balance updating');
  //   // setTotalBalance(0);
  //   let balance = 0;
  //   console.log(balance, 'before');
  //   console.log(cryptoWallets)
  //   if (cryptoWallets?.data) {
  //     cryptoWallets?.data?.map(async (item: any) => {
  //       const value = await fetch(
  //         `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${item.currency_code}&tsyms=USD,EUR`,
  //       ).then(response => response.json());
  //       let symbol = item.currency_code;
  //       // console.log(value[`${symbol.toUpperCase()}`].USD, 'value from wallet');
  //       let convertValue = value[`${symbol.toUpperCase()}`].USD * item.balance;
  //       balance = balance + convertValue;
  //       console.log(balance, 'inside');
  //       // setTotalBalance(totalBalance => totalBalance + convertValue);
  //     });
  //   }
  //   console.log(balance, 'after');
  // };

  // useEffect(() => {
  //   getTotalBalance();
  // }, [cryptoWallets]);

  // useEffect(() => {
  //   // console.log('Screen Rendered');
  //   if (
  //     getUserBankDetails?.isSuccess === true &&
  //     getUserBankDetails?.status === 'fulfilled'
  //   ) {
  //     dispatch(storeUserBankDetails(getUserBankDetails?.data));
  //   }
  //   if (
  //     getUserDetails?.isSuccess === true &&
  //     getUserDetails?.status === 'fulfilled'
  //   ) {
  //     dispatch(storeUserDetails(getUserDetails?.data));
  //   }
  // }, [totalBalance, getUserBankDetails, getUserDetails]);

  // const BTC_Info = useConvertBTCQuery('BTC');

  const [selected, setSelected] = useState('Accounts');

  const handleChangeSwitchableComponent = (props: any) => {
    setSelected(props);
  };

  const onClickHandler = () => {
    props.navigation.navigate(navigationStrings.STEP2, {flag: 'from-wallet'});
  };

  // UI-SCREEN RENDERING
  return (
    <SafeAreaView style={mainStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {status === 'initial' ? (
          <View style={{marginTop: 60, alignSelf: 'center'}}>
            <Text style={styles.lvl1}>
              Complete level 1 authentication to proceed
            </Text>
            <View>
              <CustomButton buttonText="Click here" onPress={onClickHandler} />
            </View>
          </View>
        ) : (
          <View style={styles.mainContainer}>
            {/* Balance Header */}
            <View>
              <BalanceComponent
                balance={!!totalBalance ? totalBalance.toString() : 0}
              />
            </View>
            {/* SWITCHABLE BUTTONS */}
            <View style={styles.SwitchableComponentStyle}>
              <SwitchableComponent
                touchableButtons={['Accounts', 'Cards', 'Analytics']}
                onPress={handleChangeSwitchableComponent}
              />
            </View>
            {/* ORDER NEW CARD */}
            {/* {!!selected && selected === 'Cards' && (
              <View>{Bank?.card_id == null && <OrderCard />}</View>
            )} */}

            {/* ACCOUNTS COMPONENT */}
            {!!selected && selected === 'Accounts' && (
              <View>
                <Accounts />
              </View>
            )}
            {!!selected && selected === 'Cards' && (
              <View>
                <Banking />
              </View>
            )}
            {!!selected && selected === 'Analytics' && (
              <View>
                <Analytics />
              </View>
            )}
            {/* CARD CONATAINER */}
            {/* <View>
              {!!selected && selected === 'Accounts' ? (
                <CustomCard
                  history="-1.84"
                  data={
                    walletBalance?.status === 'fulfilled' && walletBalance?.data
                  }
                />
              ) : !!selected && selected === 'Cards' ? (
                <View>{!!Bank?.card_id && <AtmCard />}</View>
              ) : (
                selected === 'Analytics' && (
                  <View>
                    <Spending />
                    <BreakDown />
                  </View>
                )
              )}
            </View> */}
            {/* ACTION SVG BUTTONS/CARDS */}
            {/* <View>
              {!!selected && selected === 'Accounts' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: walletBalance?.data?.length === 1 ? 20 : 0,
                  }}>
                  <View style={styles.cardAdjustment}>
                    <Card
                      name="Top Up"
                      svg={TopUp}
                      moveTo={navigationStrings.TOP_UP}
                    />
                  </View>
                  <View style={styles.cardAdjustment}>
                    <Card
                      name="Send"
                      svg={Send}
                      moveTo={navigationStrings.SENDMONEY}
                    />
                  </View>
                  <View style={styles.cardAdjustment}>
                    <Card
                      name="Request"
                      svg={Request}
                      moveTo={navigationStrings.BANKTRANSFER}
                    />
                  </View>
                  <View>
                    <Card
                      name="Exchange"
                      svg={Exchange}
                      moveTo={navigationStrings.EXCHANGE}
                    />
                  </View>
                </View>
              ) : !!selected &&
                selected === 'Cards' &&
                Bank?.card_id !== null ? (
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
                  <View style={{marginRight: 5}}>
                    <Card name="Freeze" svg={Freeze} />
                  </View>
                  <View>
                    <Card
                      moveTo={navigationStrings.ACCOUNTDETAIL}
                      name="Show Details"
                      svg={ShowDetails}
                    />
                  </View>
                </View>
              ) : null}
            </View> */}
            {/* BALANCE CARD OR CARD FUNCTIONALITIES */}
            {/* {!!selected && selected === 'Cards' && Bank?.card_id && (
              <View style={{marginTop: metrics.separaterMargin}}>
                <View style={styles.mainContainerCard}>
                  <View style={styles.container}>
                    {cardFunctions.map((items: any, index: any) => {
                      return (
                        <View key={index}>
                          <CardFunctionalities
                            heading={items.heading}
                            bodyText={items.bodyText}
                            svg={items.svg}
                            button={items.button}
                            onTogglePress={onTogglePressHandler}
                          />
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            )} */}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  SwitchableComponentStyle: {
    paddingTop: 25,
  },
  mainContainer: {
    marginBottom: 150,
  },
  mainContainerCard: {
    width: '90%',
    alignSelf: 'center',
  },
  container: {borderRadius: 20, backgroundColor: Colors.cardBackground},
  cardAdjustment: {marginRight: 5},
  lvl1: {
    color: Colors.textColor,
    fontSize: 16,
    fontFamily: 'RedHatDisplay-SemiBold',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
