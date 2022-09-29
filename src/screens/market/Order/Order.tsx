import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import OrderButtons from './OrderButton';
import Colors from '../../../theme/Colors';
import Prices from './Prices';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/Store';
import CreateBuyOrder from './CreateBuyOrder';

const Order = ({
  Btntext,
  HandleVisibility,
  orderType,
  orderData,
  setOrderType,
  orderCompleted,
  setOrderCompleted
}: any) => {
  const {email, render, status, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );
  const [bottomBorder, setBottomBorder] = useState('Buy');
  const [checked, setChecked] = useState(false);
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <View
        style={{
          width: Dimensions.get('screen').width / 1.85,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderBottomColor: Colors.Gray_4,
            borderBottomWidth: 1,
          }}>
          <OrderButtons
            Btntext="Buy"
            bottomBorder={bottomBorder}
            setBottomBorder={setBottomBorder}
          />
          <OrderButtons
            Btntext="Sell"
            bottomBorder={bottomBorder}
            setBottomBorder={setBottomBorder}
          />
        </View>
        {bottomBorder === 'Buy' && (
          <CreateBuyOrder
            Btntext={Btntext}
            HandleVisibility={HandleVisibility}
            orderType={orderType}
            checked={checked}
            setChecked={setChecked}
            btnText="Buy"
            setOrderType={setOrderType}
            price={orderData?.price}
            orderData={orderData}
            orderCompleted={orderCompleted}
            setOrderCompleted={setOrderCompleted}
          />
        )}
        {bottomBorder === 'Sell' && (
          <CreateBuyOrder
            Btntext={Btntext}
            HandleVisibility={HandleVisibility}
            orderType={orderType}
            checked={checked}
            setChecked={setChecked}
            btnText="Sell"
            price={orderData?.price}
            orderData={orderData}
            orderCompleted={orderCompleted}
            setOrderCompleted={setOrderCompleted}
          />
        )}
      </View>
      <View
        style={{
          width: Dimensions.get('screen').width / 2.5,
        }}>
        <Prices orderCompleted={orderCompleted} orderData={orderData} />
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({});
