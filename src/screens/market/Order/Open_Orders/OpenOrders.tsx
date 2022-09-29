import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useOpenOrderQuery} from '../../../../redux/services/market/OrderHistory';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/Store';
import navigationStrings from '../../../../constants/navigationStrings';
import OpenOrdersCard from './OpenOrdersCard';

const OpenOrders = (props: any) => {
  const {token} = useSelector((state: RootState) => state?.registerProps);
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    openOrdersApiCall();
  }, [props?.orderCompleted]);

  const openOrdersApiCall = async () => {
    // const openOrders = useOpenOrderQuery(token);
    const response = await fetch(
      `${navigationStrings.BASE_URL}order/history/open`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      },
    );

    if (response.status === 200) {
      const res = await response.json();
      console.log(res);
      setApiData(res[0]?.OrderBook);
    }
  };

  return (
    <View style={{flex:1, marginTop: 10}}>
      {apiData !== null && apiData?.length >= 1 ? (
        <View>
          {apiData?.map((item: any) => (
            <OpenOrdersCard data={item} />
          ))}
        </View>
      ) : (
        <Text>No items</Text>
      )}
    </View>
  );
};

export default OpenOrders;

const styles = StyleSheet.create({});
