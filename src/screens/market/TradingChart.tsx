import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {mainStyle} from '../../components/styles/ScreenStyle';
import Colors from '../../theme/Colors';
import Calculator from '../../assets/images/calculator.svg';
import MarkeetingButtons from './MarkeetingButtons';
import Order from './Order/Order';
import MarkeetingModal from './Order/MarkeetingModal';
import navigationStrings from '../../constants/navigationStrings';
import OrderBookTabs from './Order/OrderBookTabs';
import metrics from '../../theme/Metrics';
import {orderBookTabsData} from '../../constants/dummydata';
import OrderHistory from './Order/OrderHistory';
import OpenOrders from './Order/Open_Orders/OpenOrders';
import TrigerOrders from './Order/Trigger_Orders/trigerOrders';
import Star from '../../assets/images/star.svg';

const TradingChart = ({navigation, route}: any) => {
  console.log(route?.params?.item?.item, '-------hello order ----------------');
  const [bottomBorder, setBottomBorder] = useState('Order');
  const [visible, setVisible] = useState(false);
  const [orderType, setOrderType] = useState('Limit order');
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [filled, setFilled] = useState(false);

  const ModalHandler = (text: any) => {
    setOrderType(text);
  };
  const [orderBookTab, setOrderBookTab] = useState('Order History');
  const [orderBooktabSelected, setOrderBookTabSelected] =
    useState('Order History');

  const orderBookTabHandler = (props: string) => {
    setOrderBookTab(props);
    setOrderBookTabSelected(props);
  };
  useEffect(() => {
    console.log('rendering again');
  }, [orderCompleted]);

  return (
    <SafeAreaView style={mainStyle}>
      <View style={{flex: 1}}>
        <View
          style={{
            height: Dimensions.get('screen').height / 3,
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                paddingVertical: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 16, fontFamily: 'RedHatDisplay-Bold', color: Colors.textColor }}>{route?.params?.item?.item?.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  setFilled(!filled);
                }}>
                <Star
                  height={20}
                  width={20}
                  fill={filled ? Colors.black : 'grey'}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: Colors.textColor,
                    fontSize: 14,
                    fontFamily: 'RedHatDisplay-Medium',
                    textAlign: 'center',
                    paddingVertical: 20,
                  }}>
                  TradingView Chart is underDevelopment
                </Text>
                <ActivityIndicator size="small" color={Colors.Primary} />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            // flex: 1,
            paddingBottom: 0,
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            borderBottomColor: Colors.Gray_4,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity>
            <Calculator height={30} width={30} fill={'black'} />
          </TouchableOpacity>
          <MarkeetingButtons
            Btntext={'Order'}
            bottomBorder={bottomBorder}
            setBottomBorder={setBottomBorder}
          />
          <MarkeetingButtons
            Btntext={'Trade'}
            bottomBorder={bottomBorder}
            setBottomBorder={setBottomBorder}
          />
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View
            style={{
              flex: 1,
              padding: 20,
            }}>
            <Order
              bottomBorder={bottomBorder}
              setBottomBorder={setBottomBorder}
              visible={visible}
              HandleVisibility={setVisible}
              orderType={orderType}
              setOrderType={setOrderType}
              orderData={route?.params?.item?.item}
              orderCompleted={orderCompleted}
              setOrderCompleted={setOrderCompleted}
            />
            <View style={styles.OrderBookTabsStyle}>
              <OrderBookTabs
                data={orderBookTabsData}
                selected={orderBooktabSelected}
                onPress={orderBookTabHandler}
              />
              <View>
                {orderBookTab === 'Order History' && (
                  <OrderHistory orderCompleted={orderCompleted} />
                )}
                {orderBookTab === 'Open Orders' && (
                  <OpenOrders orderCompleted={orderCompleted} />
                )}
                {orderBookTab === 'Triger Orders' && (
                  <TrigerOrders orderCompleted={orderCompleted} />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        {/* <View style={{flex: 1}}></View> */}
        <MarkeetingModal
          visible={visible}
          HandleVisibility={setVisible}
          orderType={orderType}
          setOrderType={setOrderType}
          ModalHandler={ModalHandler}
        />
      </View>
    </SafeAreaView>
  );
};

export default TradingChart;

const styles = StyleSheet.create({
  OrderBookTabsStyle: {
    flex: 1,
    paddingVertical: metrics.basePadding,
  },
});
