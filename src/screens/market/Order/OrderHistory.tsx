import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {mainStyle, Shadow} from '../../../components/styles/ScreenStyle';
import {useOrderHistoryMutation} from '../../../redux/services/market/OrderHistory';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/Store';
import metrics from '../../../theme/Metrics';
import Colors from '../../../theme/Colors';
import OrderHistoryCard from './OrderHistoryCard';
import Dropdown from '../../../components/Dropdown';
import {
  orderTypeDropDowndata,
  sideTypeDropDowndata,
} from '../../../constants/dummydata';
import {useMarketDataQuery} from '../../../redux/services/market/SpotTrading';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

let marketDropDownData: any = [];

const OrderHistory = (props: any) => {
  const [data, setData] = useState<any>([]);
  const [market, setMarket] = useState();
  const [sideType, setSideType] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [orderType, setOrderType] = useState();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [formData, setFormData] = useState({
    end: date2?.toString(),
    start: date?.toString(),
    base: '',
    quote: '',
    side_type: '',
    order_type: '',
  });

  const {token} = useSelector((state: RootState) => state?.registerProps);

  const [orderHistory, orderHistoryInfo] = useOrderHistoryMutation();

  const getOrderHistory = async () => {
    const response: any = await orderHistory({token, formData});
    response?.data && response?.data?.length >= 1 && setData(response?.data);
    console.log(response, "hello response")
  };

  const marketData = useMarketDataQuery('');

  const updateMarketDropDownList = () => {
    marketData?.data?.map((data: any) => {
      marketDropDownData.push({
        label: data?.baseCurrency + '/' + data?.quoteCurrency,
        value: 'market',
      });
    });
  };

  const onClickHandler = (props: any) => {
    if(props?.value == 'market') {
      setFormData({
        ...formData, 
        base: props?.label?.slice(0, props?.label?.indexOf('/')).toLowerCase(),
        quote: props?.label?.slice(props?.label?.indexOf('/')+1, props?.label?.length).toLowerCase()
      })
    }
    if(props?.value == 'side') {
      setFormData({
        ...formData, 
        side_type: props?.label?.toLowerCase(),
      })
    }
    if(props?.value == 'orderType') {
      let order = props?.label?.replace(/\s+/g, '_');
      setFormData({
        ...formData, 
        order_type: order?.toLowerCase(),
      })
    }
    if(props?.value == 'date'){
      let formated = moment(props?.label).format();
      setFormData({
        ...formData, 
        [props?.set]: formated,
      })
    }
  };

  useEffect(() => {
    getOrderHistory();
  }, [formData, props?.orderCompleted]);

  useEffect(() => {
    updateMarketDropDownList();
  }, [marketData]);

  return (
    <SafeAreaView style={mainStyle}>
      <View style={{flex: 1, paddingBottom: 200}}>
        <DatePicker
          modal
          mode="date"
          open={open ? open : open2 == true && open2}
          date={open == true ? date : date2}
          onConfirm={date => {
            if (open == true) {
              setOpen(false);
              setDate(date);
              onClickHandler({label: date, value: 'date', set: 'start' })
              
            } else {
              if (open2 == true) {
                setOpen2(false);
                setDate2(date);
                onClickHandler({label: date, value: 'date', set: 'end'})
              }
            }
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View
          style={[styles.overAllContainer, {marginTop: metrics.regularMargin}]}>
          <View style={{...styles.fieldNameText}}>
            <Text style={styles.fieldNameTextStyle}>Market</Text>
          </View>
          <View style={{...styles.fieldNameText}}>
            <Text style={styles.fieldNameTextStyle}>Side</Text>
          </View>
        </View>
        <View style={styles.overAllContainer}>
          <View style={{...styles.containerStyle, alignSelf: 'flex-start'}}>
            <Dropdown
              label="Market"
              data={marketDropDownData}
              onSelect={onClickHandler}
            />
          </View>
          <View style={styles.containerStyle}>
            <Dropdown
              label="Side"
              data={sideTypeDropDowndata}
              onSelect={onClickHandler}
            />
          </View>
        </View>
        <View
          style={[styles.overAllContainer, {marginTop: metrics.regularMargin}]}>
          <View style={{...styles.fieldNameText}}>
            <Text style={styles.fieldNameTextStyle}>Start date</Text>
          </View>
          {/* <View style={{...styles.fieldNameText}}>
            <Text style={styles.fieldNameTextStyle}>End date</Text>
          </View> */}
        </View>
        <View style={styles.overAllContainer}>
          <View
            style={{
              height: 50,
              alignSelf: 'flex-start',
              width: '100%',
            }}>
            <Dropdown
              label="Order Type"
              data={orderTypeDropDowndata}
              onSelect={onClickHandler}
            />
          </View>
        </View>
        <View
          style={[styles.overAllContainer, {marginTop: metrics.regularMargin}]}>
          <View style={{...styles.fieldNameText}}>
            <Text style={styles.fieldNameTextStyle}>Start date</Text>
          </View>
          <View style={{...styles.fieldNameText}}>
            <Text style={styles.fieldNameTextStyle}>End date</Text>
          </View>
        </View>
        <View style={styles.overAllContainer}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.containerStyle}>
            <View style={[styles.container, Shadow]}>
              <Text>{date.toString().substring(0, 15)}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOpen2(true)}
            style={styles.containerStyle}>
            <View style={[styles.container, Shadow]}>
              <Text>{date2.toString().substring(0, 15)}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.orderHistoryCard}>
          {!!data && (
            <View>
              {data?.map((item: any) => {
                return <OrderHistoryCard data={item} />;
              })}
            </View>
          )}
          {data?.length == 0 && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: metrics.doubleBaseMargin,
              }}>
              <Text>No item!</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  fieldNameText: {
    width: '45%',
    justifyContent: 'center',
  },
  containerStyle: {
    // borderRadius: 10,
    // borderWidth: 1,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  fieldNameTextStyle: {
    color: Colors.textColor,
    fontFamily: 'RedHatDisplay-SemiBold',
    fontSize: 17,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: metrics.regularPadding,
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    height: 50,
    zIndex: 1,
  },
  overAllContainer: {
    justifyContent: 'space-between',
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  orderHistoryCard: {
    flex: 1,
    marginTop: metrics.baseMargin,
    borderTopColor: Colors.Secondary,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    width: '100%',
    borderWidth: 1,
  },
});
