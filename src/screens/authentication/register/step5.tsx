import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mainStyle} from '../../../components/styles/ScreenStyle';
import Language from '../../../components/Language';
import LoginHeader from '../../../components/LoginHeader';
import FTX_International from '../../../components/FTX_International';
import CustomTextInput from '../../../components/CustomTextInput';
import CheckBox from '../../../components/CheckBox';
import CustomButton from '../../../components/CustomButton';
import RegisterService from './RegisterService';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../constants/navigationStrings';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  storeEmail,
  storeToken,
  storeStatus,
  storeRender,
} from '../../../redux/reducers/register/RegisterSlice';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Colors from '../../../theme/Colors';
import ConfirmModalView from './modal';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/Store';
import {useOpenDashboardMutation} from '../../../redux/services/authentication/Authentication';
import { startLoading, stopLoading } from '../../../redux/reducers/loading/Loading';

const Step5 = ({navigation, route}: any) => {
  const data = route.params;
  console.log(data.propsData.routeData, 'datasadasdasdasdasdasdasdasdasds');

  const dispatch = useDispatch();
  const [openDashboard, useOpenDashboardInfo] = useOpenDashboardMutation();

  const CELL_COUNT = 6;
  const [pressed, setPressed] = useState(false);
  var [confirmEmail, setConfirmEmail] = useState('');
  var [password, setPassword] = useState('');
  var [confirmPassword, setConfirmPassword] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [visible, setVisible] = useState(false);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const {email, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  const onClickHandler = async () => {
    if (value === '') {
      setVisible(true);
    } else if (!data.propsData.routeData) {
      navigation.navigate(navigationStrings.STEP6 as any, {
        data,
      });
    } else {
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
      dispatch(startLoading());
      const result: any = await openDashboard(bodyData);
      console.log(result, '-------rtk openDashboard-------------');
      console.log(useOpenDashboardInfo);
      useOpenDashboardInfo?.isLoading == false
        ? dispatch(stopLoading())
        : dispatch(startLoading());

      if (
        result?.data?.status === 'sms_verified' ||
        result?.error?.data?.status === 'sms_verified'
      ) {
        dispatch(storeStatus('sms_verified'));
        dispatch(storeRender('true'));
        await AsyncStorage.setItem('status', 'sms_verified');
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('isLogin', 'true');
        navigation.reset({
          index: 0,
          routes: [
            {
              name: data?.propsData?.data?.route?.route?.params?.level
                ? navigationStrings.SOURCEOFFUND
                : navigationStrings.BOTTOM_TABS,
            },
          ],
        });
      } else {
        if (result.error.status === 'FETCH_ERROR') {
          Alert.alert('Network request failed try again!');
        } else {
          if (result?.error?.data?.error) {
            Alert.alert(result.error.data.error);
          } else {
            Alert.alert('Something went wrong!', result.error);
          }
        }
      }
    }
  };

  const success = (data: any) => {
    dispatch(storeEmail(data.email));
    dispatch(storeToken(data.token));

    !!data.token &&
      navigation.navigate(navigationStrings.AUTHENTICATION_1 as any);
  };

  return (
    <SafeAreaView style={mainStyle}>
      <View style={styles.mainView}>
        {/* Register TEXT HEADER */}
        <View>
          <LoginHeader
            headerText={
              data.propsData.routeData === 'from-wallet'
                ? 'Authentication Level 1'
                : 'Sign up'
            }
            screen="Register"
            data={data.propsData.routeData}
            screenNum="5"
            headerDescriptionText="Enter the code we have just sent you."
          />
        </View>
        <View style={{paddingHorizontal: 30, height: deviceHeight / 2.2}}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        {/* TEXT-INPUTS */}
        {/* CUSTOM LOGIN - CHECKBOX CONTAINER */}
        <View
          style={{
            // height: deviceHeight / 1.8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View>
            <CheckBox screen="Resend" />
          </View>
          {/* LOGIN BUTTON */}
          <View>
            <CustomButton
              buttonText="Complete"
              isLoadingButton={true}
              pressed={pressed}
              onPress={onClickHandler}
            />
          </View>
        </View>
        <ConfirmModalView visible={visible} setVisible={setVisible} />
        {/* CONTINUE WITHOUT LOGIN */}
        <View>{/* <BottomComponent /> */}</View>
      </View>
    </SafeAreaView>
  );
};

export default Step5;

let deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  root: {flex: 1, padding: 20},
  title: {
    textAlign: 'center',
    fontSize: 30,
    borderRadius: 50,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    backgroundColor: '#ffff',
    borderColor: '#0000',
    borderRadius: 50,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#0000',
  },
});
