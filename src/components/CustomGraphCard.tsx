import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import metrics from '../theme/Metrics';
import Graph from '../assets/bottomTabNavigation/wallet/Graph.svg';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import isEmpty from '../utils/isEmpty';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import { month_names_short } from '../constants/dummydata';
month_names_short
const screenWidth = Dimensions.get('window').width;

const CustomGraphCard = (props: any) => {
  const [days, setDays] = useState(['1', '2', '3', '4', '5', '6']);
  const [values, setValues] = useState([20, 45, 28, 80, 99, 43]);
  const [actualSpent, setActualSpent] = useState<Number>(0);

  const data = {
    labels: days,
    datasets: [
      {
        data: values,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    // legend: ['Rainy Days'], // optional
  };

  

  const {analyticsData} = useSelector((state: RootState) => state?.analytics);
  const {token} = useSelector((state: RootState) => state?.registerProps);

  const proccessAnalyticsData = (analyticsData: any) => {
    const datesWisePrices: any = {};
    let totalSpent = 0;
    if (!isEmpty(analyticsData)) {
      analyticsData.forEach((element: any) => {
        element?.MarketTrade.forEach((element: any) => {
          if (datesWisePrices[getMonthDate(element.created_at)]) {
            datesWisePrices[getMonthDate(element.created_at)] =
              datesWisePrices[getMonthDate(element.created_at)] +
              Number(element.price);
          } else {
            datesWisePrices[getMonthDate(element.created_at)] = Number(
              element.price,
            );
          }
          totalSpent = totalSpent + Number(element.price);
        });
      });
    }

    return {totalSpent, datesWisePrices};
  };
  
  const getMonthDate = (dateObj: any) => {
    return (
      month_names_short[new Date(dateObj).getMonth() + 1] +
      '-' +
      new Date(dateObj).getDate()
    );
  };

  const updatingGraphData = (data: {
    totalSpent: Number;
    datesWisePrices: Object;
  }) => {
    let datesArray = Object.keys(data?.datesWisePrices);
    setDays(datesArray);
    let valuesArray = Object.values(data?.datesWisePrices);
    setValues(valuesArray);
    setActualSpent(data?.totalSpent);
    // setData({labels: datesArray});
    // console.log(data?.totalSpent);
  };

  useEffect(() => {
    if (analyticsData?.length > 0) {
      let data: {totalSpent: Number; datesWisePrices: Object} =
        proccessAnalyticsData(analyticsData);
      updatingGraphData(data);
    }
    // proccessAnalyticsData(analyticsData);
  }, [analyticsData]);

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.totalSpend}>Total Spend</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{`$${actualSpent.toFixed(9)}`}</Text>
            <Text style={styles.profitLoss}>{`${props.profitLoss}%`}</Text>
          </View>
          <View>
            {data !== null && (
              <LineChart
                data={data}
                width={screenWidth * 0.75}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: 'white',
                  backgroundGradientFromOpacity: 0.7,
                  backgroundGradientTo: 'white',
                  backgroundGradientToOpacity: 0.5,
                  color: (opacity = 0) => `${Colors.textColor}`,
                  strokeWidth: 2, // optional, default 3
                  // barPercentage: 0.5,
                  useShadowColorFromDataset: true, // optional

                  // backgroundColor: 'white',
                  // backgroundGradientFrom: 'transparent',
                  // backgroundGradientTo: 'transparent',
                  decimalPlaces: 3, // optional, defaults to 2dp
                  // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0)`,
                  style: {
                    borderRadius: 16,
                    paddingTop: 50,
                    backgroundColor: 'red',
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
                style={{
                  marginVertical: 20,
                  marginTop: 20,
                  borderRadius: 16,
                }}
              />
            )}
          </View>
          {/* </View> */}
          <View style={styles.actualForcast}>
            <View>
              <Text style={styles.actualForcastText}>Actual spend</Text>
              <Text
                style={{
                  ...styles.actualForcastText,
                  color: Colors.Primary,
                  marginTop: metrics.smallMargin,
                }}>{`\u2022 $${actualSpent.toFixed(9)}`}</Text>
            </View>
            <View style={{marginLeft: metrics.baseMargin}}>
              <Text style={styles.actualForcastText}>ForCast spend</Text>
              <Text
                style={{
                  ...styles.actualForcastText,
                  color: Colors.textColor,
                  marginTop: metrics.smallMargin,
                }}>{`\u2022 $210.51`}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomGraphCard;

const styles = StyleSheet.create({
  innerContainer: {
    margin: 20,
  },
  cardContainer: {
    backgroundColor: Colors.cardBackground,
    width: 335,
    borderRadius: 20,
    marginLeft: 20,
  },
  amountContainer: {flexDirection: 'row', marginVertical: metrics.baseMargin},
  amount: {
    fontSize: Fonts.size.input,
    fontFamily: 'RedHatDisplay-Bold',
    color: Colors.textColor,
  },
  totalSpend: {
    fontSize: Fonts.size.medium,
    fontFamily: 'RedHatDisplay-Medium',
    color: Colors.textColor,
  },
  profitLoss: {
    fontSize: Fonts.size.large,
    fontFamily: 'RedHatDisplay-SemiBold',
    color: 'green',
    marginLeft: metrics.baseMargin,
  },
  GraphAndText: {
    flex: 1,
    backgroundColor: 'red',
  },
  graphAmount: {
    justifyContent: 'space-between',
    marginLeft: metrics.regularMargin,
  },
  actualForcast: {flexDirection: 'row', marginVertical: metrics.baseMargin},
  actualForcastText: {
    fontSize: Fonts.size.small,
    fontFamily: 'RedHatDisplay-Medium',
    color: Colors.textColor,
  },
});
