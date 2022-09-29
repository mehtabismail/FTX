import {
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../theme/Colors';
import metrics from '../../../theme/Metrics';
import HeaderLogo from '../../../assets/authenticationScreen/headerLogo.svg';
import Fonts from '../../../theme/Fonts';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../constants/navigationStrings';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  storeStatus,
  storeToken,
} from '../../../redux/reducers/register/RegisterSlice';
import {useOpenDashboardMutation} from '../../../redux/services/authentication/Authentication';

export default function Step6({navigation, route}: any) {
  const {data} = route?.params;
  const [pressed, setPressed] = useState(false);
  const dispatch = useDispatch();

  const [openDashboard, useOpenDashboardInfo] = useOpenDashboardMutation();

  const deviceHeight = Dimensions.get('screen').height;

  console.log('skipped Data', route?.params?.flag);
  const {email, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );
  const onClickHandler = async () => {
    const bodyData = {
      data: {
        first_name: data?.propsData?.data?.firstName,
        last_name: data?.propsData?.data?.lastName,
        dob: data?.propsData?.data?.date,
        contact_no: data?.phoneNumber,
        address: {
          country: data?.propsData?.country,
          address_line_1: data?.propsData?.address,
          city: data?.propsData?.city,
          postal_code: data?.propsData?.postalCode,
          state: data?.propsData?.province,
        },
      },
      token,
    };
    setPressed(true);
    const result: any = await openDashboard(bodyData);
    console.log(result, '-------rtk openDashboard-------------');
    console.log(useOpenDashboardInfo);
    useOpenDashboardInfo?.isLoading == false
      ? setPressed(false)
      : setPressed(true);

    if (
      result?.data?.status === 'sms_verified'
      // ||
      // result?.error?.data?.status === 'sms_verified'
    ) {
      dispatch(storeStatus('sms_verified'));
      await AsyncStorage.setItem('status', 'sms_verified');
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('isLogin', 'true');
      navigation.reset({
        index: 0,
        routes: [{name: navigationStrings.BOTTOM_TABS}],
      });
    } else {
      if (result.error.status === 'FETCH_ERROR') {
        Alert.alert('Network request failed try again!');
      } else {
        if (result?.error?.data?.error) {
          Alert.alert(result.error.data.error);
        } else {
          Alert.alert('Something went wrong!');
        }
      }
    }
  };

  const setAsyncData = async (token: string) => {
    try {
      !!token && (await AsyncStorage.setItem('token', token));
      !!token && (await AsyncStorage.setItem('isLogin', 'true'));

      // NAVIGATE TO WALLET SCREEN STACK
      navigation.reset({
        index: 0,
        routes: [{name: navigationStrings.BOTTOM_TABS}],
      });
    } catch (e) {
      // saving error
      console.log(e, 'catch errorr while storing in Async storage');
    }
  };

  const settingToken_redux = (token: string) => {
    dispatch(storeToken(token));
    setAsyncData(token);
  };

  const navgationSteps = (token: string) => {
    settingToken_redux(token);
  };

  const directNavigate = () => {
    navgationSteps(token);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.Primary,
        height: deviceHeight,
      }}>
      <View
        style={{
          // paddingVertical: metrics.doubleBasePadding,
          paddingVertical: Platform.OS === 'ios' ? 50 : 50,
          alignItems: 'center',
        }}>
        <Text style={{color: '#ffff', fontSize: Fonts.size.h1}}>
          SwissBlock
        </Text>
        {/* <HeaderLogo /> */}
      </View>
      <View style={{alignItems: 'center', height: deviceHeight / 1.7}}>
        <Text
          style={{
            color: '#ffff',
            fontSize: Fonts.size.h2,
            width: '55%',
            textAlign: 'center',
            fontFamily: 'RedHatDisplay-SemiBold',
          }}>
          CONGRATS!
        </Text>
        <Text
          style={{
            color: '#ffff',
            fontSize: Fonts.size.h2,
            width: '60%',
            textAlign: 'center',
            fontFamily: 'RedHatDisplay-SemiBold',
          }}>
          YOU ARE ALL SET NOW!
        </Text>
      </View>
      <View
        style={{
          // height: deviceHeight / 1.8,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <CustomButton
          flag="dashboard"
          buttonText="Open Dashboard"
          onPress={
            route?.params?.flag && route?.params?.flag === 'skipped'
              ? directNavigate
              : onClickHandler
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
