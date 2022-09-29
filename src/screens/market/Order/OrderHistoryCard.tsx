import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import metrics from '../../../theme/Metrics';
import Colors from '../../../theme/Colors';
import { Shadow } from '../../../components/styles/ScreenStyle';

const OrderHistoryCard = (props: any) => {
  const [data, setData] = useState(props?.data);
  return (
    <View
      style={[{
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: Colors.cardBackground,
        paddingVertical: metrics.basePadding
      }, Shadow]}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: metrics.regularPadding,
          paddingVertical: metrics.smallPadding
        }}>
        <Text>Market:</Text>
        <Text>{data?.base_currency + '/' + data?.quote_currency}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: metrics.regularPadding,
          paddingVertical: metrics.smallPadding
        }}>
        <Text>Order Type:</Text>
        <Text>{data?.order_type}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: metrics.regularPadding,
          paddingVertical: metrics.smallPadding
        }}>
        <Text>Side type:</Text>
        <Text>{data?.side_type}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: metrics.regularPadding,
          paddingVertical: metrics.smallPadding
        }}>
        <Text>Price:</Text>
        <Text>{data?.price}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: metrics.regularPadding,
          paddingVertical: metrics.smallPadding
        }}>
        <Text>Created at:</Text>
        <Text>{data?.createdAt}</Text>
      </View>
    </View>
  );
};

export default OrderHistoryCard;

const styles = StyleSheet.create({});
