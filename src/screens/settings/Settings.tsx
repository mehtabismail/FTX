import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import navigationStrings from '../../constants/navigationStrings';
import IdentityVerification from './IdentityVerifi';
import SettimgButtons from '../../components/SettingButtons';
import {useDispatch} from 'react-redux';
import {removeAccountDetails} from '../../redux/reducers/banking/UserBankDetailSlice';
import { startLoading, stopLoading } from '../../redux/reducers/loading/Loading';

const Settings = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [pressed, setPressed] = useState(false);
  const onClickHandler = async () => {
    dispatch(startLoading());
    await AsyncStorage.setItem('isLogin', 'false');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('status');
    dispatch(removeAccountDetails());
    dispatch(stopLoading());
    navigation.replace(navigationStrings.ONBOARDING);
  };
  const navigationHandle = () => {
    navigation.navigate(navigationStrings.IDENTITYVERIFICATION);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <SettimgButtons
          BtnText="Identity Verification"
          navigationHandler={navigationHandle}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: Platform.OS === 'android' ? 80 : 50,
          // backgroundColor: 'red',
        }}>
        <CustomButton
          buttonText="Log out"
          isLoadingButton={true}
          onPress={onClickHandler}
        />
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
