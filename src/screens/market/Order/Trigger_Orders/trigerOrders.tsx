import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useOpenOrderQuery,
  useTriggerOrderQuery,
} from '../../../../redux/services/market/OrderHistory';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/Store';
import navigationStrings from '../../../../constants/navigationStrings';
import TriggerOrdersCard from './TriggerOrdersCard';

const TrigerOrders = (props: any) => {
  const {token} = useSelector((state: RootState) => state?.registerProps);
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    triggerOrdersApiCall();
  }, [props?.orderCompleted]);

  const triggerOrdersApiCall = async () => {
    const response = await fetch(
      `${navigationStrings.BASE_URL}order/history/trigger`,
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
      console.log(res, 'empty response');
      setApiData(res[0]?.OrderBook);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginTop: 10,
      }}>
      {apiData !== null && apiData?.length >= 1 ? (
        <View>
          {apiData?.map((item: any) => (
            <TriggerOrdersCard data={item} />
          ))}
        </View>
      ) : (
        <Text>No items</Text>
      )}
    </View>
  );
};

export default TrigerOrders;

const styles = StyleSheet.create({});
