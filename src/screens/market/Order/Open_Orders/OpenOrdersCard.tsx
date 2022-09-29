import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../../../theme/Colors'
import metrics from '../../../../theme/Metrics'
import { Shadow } from '../../../../components/styles/ScreenStyle'

const OpenOrdersCard = (props: any) => {
    const [data, setData] = useState(props?.data);
  return (
    <View
      style={[{
          marginVertical: 10,
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
        <Text>Actual Size: </Text>
        <Text>{data?.actual_size}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: metrics.regularPadding,
          paddingVertical: metrics.smallPadding
        }}>
        <Text>Filled: </Text>
        <Text>{data?.filled}</Text>
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
    </View>
  )
}

export default OpenOrdersCard

const styles = StyleSheet.create({})