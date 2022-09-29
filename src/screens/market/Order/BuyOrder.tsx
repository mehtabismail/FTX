import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useActiveBuyOrderQuery,
  useActiveSellOrderQuery,
} from '../../../redux/services/market/OrderBook';
import Colors from '../../../theme/Colors';
import navigationStrings from '../../../constants/navigationStrings';

const BuyOrder = (props: any) => {
  const {baseCurrency, quoteCurrency} = props?.orderData;
  const [apiData, setApiData] = useState<null | []>(null);

  // GETTING ORDERBOOK SELL_ORDER DATA API
  // const {currentData, data, isError, isLoading, isSuccess, status} =
  //   useActiveBuyOrderQuery<any>({baseCurrency, quoteCurrency});

    const updatingData = async () => {
      const response = await fetch(
        `${
          navigationStrings.BASE_URL
        }order/buy?base_currency=${baseCurrency.toLowerCase()}&&quote_currency=${quoteCurrency.toLowerCase()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
  
      if (response.status === 200) {
        const res = await response.json();
        console.log(res, "noooo")
        setApiData(res);
      }
    };
  
    useEffect(() => {
      updatingData();
    }, [props?.orderCompleted]);
  

  return (
    <View style={{borderBottomColor: Colors.Gray_3, borderBottomWidth: 1}}>
      {apiData !== null &&
        apiData?.map((item: any, index: any) => {
          console.log(item);
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'RedHatDisplay-SemiBold',
                  color: 'green',
                  fontSize: 15,
                }}>
                {item?.actual_size.slice(0, 6)}
              </Text>
              <Text
                style={{
                  fontFamily: 'RedHatDisplay-SemiBold',
                  color: 'green',
                  fontSize: 15,
                }}>
                {item?.price.slice(0, 6)}
              </Text>
            </View>
          );
        })}
    </View>
  );
};

export default BuyOrder;

const styles = StyleSheet.create({});
