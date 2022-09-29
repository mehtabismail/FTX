import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderInput from './OrderInput';
import Colors from '../../../theme/Colors';

const OrderTypeForm = ({
  HandleVisibility,
  orderType,
  textInputHandler,
  price,
  orderData,
  formData,
  triggerPrice,
  triggerPriceHandler,
  limitPrice,
  limitPriceHandler
}: any) => {
  const [orderDataPrice, setOrderDataPrice] = useState(orderData);
  const placehoderVal = price?.toString();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          HandleVisibility(true);
        }}
        style={{
          backgroundColor: Colors.Gray_2,
          marginTop: 15,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <Text style={{fontFamily: 'RedHatDisplay-SemiBold', fontSize: 20}}>
          {orderType}
        </Text>
      </TouchableOpacity>
      <View style={{maxWidth: '85%'}}>
        {orderType === 'Limit order' && (
          <OrderInput
            orderData={orderDataPrice}
            orderType={orderType}
            value={formData.price}
            inputHeading="Price"
            textInputHandler={textInputHandler}
          />
        )}
        {orderType === 'Market order' && (
          <OrderInput
            orderData={orderDataPrice}
            orderType={orderType}
            value={formData.marketValue.toUpperCase()}
            inputHeading="Price"
            textInputHandler={textInputHandler}
            editable={false}
          />
        )}
        {orderType === 'Stop market' && (
          <OrderInput
            orderData={orderDataPrice}
            orderType={orderType}
            value={triggerPrice}
            inputHeading="Trigger price"
            textInputHandler={triggerPriceHandler}
          />
        )}
        {orderType === 'Stop limit' && (
          <OrderInput
            orderData={orderDataPrice}
            orderType={orderType}
            value={triggerPrice}
            inputHeading="Trigger price"
            textInputHandler={triggerPriceHandler}
          />
        )}
        {orderType === 'Stop limit' && (
          <OrderInput
            orderData={orderDataPrice}
            orderType={orderType}
            value={limitPrice}
            inputHeading="Limit price"
            textInputHandler={limitPriceHandler}
          />
        )}
        {orderType === 'Trailing stop' && (
          <OrderInput
            orderData={orderDataPrice}
            orderType={orderType}
            value={formData.price}
            inputHeading="Trail value"
            textInputHandler={textInputHandler}
          />
        )}
        {orderType === 'Take profit' && (
          <OrderInput
            orderData={orderDataPrice}
            orderType={orderType}
            value={triggerPrice}
            inputHeading="Trigger price"
            textInputHandler={triggerPriceHandler}
          />
        )}
        {orderType === 'Take profit limit' && (
          <OrderInput
            orderData={orderDataPrice}
            orderType={orderType}
            value={triggerPrice}
            inputHeading="Trigger price"
            textInputHandler={triggerPriceHandler}
          />
        )}

        {orderType === 'Take profit limit' && (
          <OrderInput
            orderData={orderDataPrice}
            orderType={orderType}
            value={limitPrice}
            inputHeading="Limit price "
            textInputHandler={limitPriceHandler}
          />
        )}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{maxWidth: '45%'}}>
          <OrderInput
            inputHeading={`Amount(${orderData.baseCurrency})`}
            flag="flagPlac"
            value={formData?.amountBtc?.toString()}
            textInputHandler={textInputHandler}
            orderType={orderType}
            editable={true}
            // placeholder={placehoderVal}
          />
        </View>
        <Text style={{paddingHorizontal: 5}}>=</Text>
        <View style={{maxWidth: '45%'}}>
          <OrderInput
            inputHeading={`Amount(${orderData.quoteCurrency})`}
            flag="flagPlac"
            value={formData?.amountUsd?.toString()}
            // placeholder={placehoderVal}
            textInputHandler={textInputHandler}
            // orderType="Market Order"
            orderType={orderType}
            editable={true}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderTypeForm;

const styles = StyleSheet.create({});
