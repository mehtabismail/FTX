import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import navigationStrings from '../../constants/navigationStrings';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {mainStyle} from '../../components/styles/ScreenStyle';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  storeStatus,
  storeToken,
} from '../../redux/reducers/register/RegisterSlice';

// MAIN FUNCTION
const Splash = (): JSX.Element => {
  var [isLogin, setIsLogin]: any = useState('false');
  const dispatch = useDispatch();

  //  GETTING NAVIGATION PROP
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  // CALLING USEEFFECT()
  useEffect(() => {
    setTimeout(() => {
      getLoggedInDetails();
      // navigation.replace(navigationStrings.ONBOARDING as any);
    }, 10);
  }, []);

  const getLoggedInDetails = async () => {
    setIsLogin((isLogin = await AsyncStorage.getItem('isLogin')));
    if (isLogin == 'true') {
      let token = await AsyncStorage.getItem('token');
      let status = await AsyncStorage.getItem('status');
      dispatch(storeStatus(status));
      dispatch(storeToken(token));
      navigation.replace(navigationStrings.BOTTOM_TABS);
    } else {
      navigation.replace(navigationStrings.ONBOARDING);
    }
  };

  // SCREEN RENDERING
  return (
    <SafeAreaView style={mainStyle}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity>
          <Text>Splash Screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
