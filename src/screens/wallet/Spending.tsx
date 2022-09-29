import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import metrics from '../../theme/Metrics';
import Colors from '../../theme/Colors';
import SpendingFilter from './SpendingFilter';
import Accounts from '../../assets/bottomTabNavigation/wallet/accounts.svg';
import Calender from '../../assets/bottomTabNavigation/wallet/calendar.svg';
import CustomCard from '../../components/CustomCard';
import CustomGraphCard from '../../components/CustomGraphCard';
import {useGetAnalyticsMutation} from '../../redux/services/analytics/Analytics';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';
import {storeAnalyticsData} from '../../redux/reducers/analytics/AnalyticSlice';
import moment from 'moment';

const data: any = [
  {body: 'Select Currency', svg: Accounts},
  {body: 'Select Date', svg: Calender},
];

const Spending = () => {
  const date = new Date();
  const [startingDate, setStartingDate] = useState<any>();
  const [endingDate, setEndingDate] = useState<any>();
  const [updatedDate, setUpdateDate] = useState<any>(false);

  const formData = {
    // starting: '2022-08-10 13:56:45.843+05',
    // ending: '2022-09-20 17:32:45.485+05',
    starting: startingDate,
    ending: endingDate,
    currency: 'trx',
  };

  // console.log(formData);

  const dispatch = useDispatch();
  const {analyticsData} = useSelector((state: RootState) => state?.analytics);
  const {token} = useSelector((state: RootState) => state?.registerProps);
  const [getAnalytics, getAnalyticsInfo] = useGetAnalyticsMutation();

  // console.log(analyticsData, "redux data");

  const getAnalyticsData = async () => {
    try {
      console.log("rendering ", formData)
      const response: any = await getAnalytics({token, formData});
      dispatch(storeAnalyticsData(response?.data[0].OrderBook));
      console.log(response?.data)
    } catch (error) {
      console.log(error + ' catch block of getAnalytics');
    }
  };

  const onFilterChange = (props: any) => {
    if (props === 'This month') {
      let test: any = new Date(date.getFullYear(), date.getMonth(), 1);
      let test2: any = new Date();
      setStartingDate(moment(test).format());
      setEndingDate(moment(test2).format());
      setUpdateDate(!updatedDate);
    }
    if (props === 'Last month') {
      let test: any = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      let test2: any = new Date(date.getFullYear(), date.getMonth(), 1);
      console.log(moment(test2).format());
      setStartingDate(moment(test).format());
      setEndingDate(moment(test2).format());
      setUpdateDate(!updatedDate);
    }
  };
  useEffect(() => {
    getAnalyticsData();
  }, [updatedDate]);
  return (
    <View>
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.headingTextStyle}>Spending</Text>
        </View>
        <View style={styles.filter}>
          {data.map((items: any, index: any) => {
            return (
              <View key={index}>
                <SpendingFilter
                  body={items?.body}
                  svg={items.svg}
                  onFilterChange={onFilterChange}
                />
              </View>
            );
          })}
        </View>
      </View>
      <View>
        <CustomGraphCard amount="1,410.51" profitLoss="+396" />
      </View>
    </View>
  );
};

export default Spending;

const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: metrics.separaterMargin,
    marginTop: metrics.doubleBaseMargin,
    marginBottom: metrics.baseMargin,
  },
  headingTextStyle: {
    color: Colors.textColor,
    fontSize: 24,
    fontStyle: 'normal',
    fontFamily: 'RedHatDisplay-Bold',
  },
  filter: {
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
  },
});
