import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationStrings from '../constants/navigationStrings';
import {
  Authentication1,
  Authentication2,
  Authentication3,
  Home,
  Login,
  Register,
  Splash,
  Onboarding,
  Step2,
  TopUp,
  Exchange,
  TradingChart,
  OrderNewCard,
  Verify,
  KYCImageUpload,
  ManagedAccountToCard,
  OrderHistory,
} from '../screens';
import BottomTabs from './TabNavigation';
import Step3 from '../screens/authentication/register/step3';
import Step4 from '../screens/authentication/register/step4';
import Step5 from '../screens/authentication/register/step5';
import Step6 from '../screens/authentication/register/step6';
import BankTransfer from '../screens/banking/BankTransfer';
import SendMoney from '../screens/banking/SendMoney';
import AccountDetail from '../screens/wallet/AccountDetail';
import IdentityVerification from '../screens/settings/IdentityVerifi';
import SourceofFund from '../screens/settings/IdentitiyVerificationsteps.tsx/SourceofFund';
import IdentityType from '../screens/settings/IdentitiyVerificationsteps.tsx/IdentityType';
import VerifyIdentityStep2 from '../screens/settings/IdentitiyVerificationsteps.tsx/VerifyIdentityStep2';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={navigationStrings.SPLASH}>
        {/* SPLASH SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.SPLASH}
          component={Splash}
          options={{headerShown: false}}
        />
        {/* ONBOARDING SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.ONBOARDING}
          component={Onboarding}
          options={{headerShown: false}}
        />
        {/* LOGIN SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.LOGIN}
          component={Login}
          options={{headerShown: false}}
        />
        {/* REGISTER SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.REGISTER}
          component={Register}
          options={{headerShown: false}}
        />
        {/* ONBOARDING-STEPS SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.STEP2}
          component={Step2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationStrings.STEP3}
          component={Step3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationStrings.STEP4}
          component={Step4}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationStrings.STEP5}
          component={Step5}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationStrings.STEP6}
          component={Step6}
          options={{headerShown: false}}
        />
        {/* AUTHENTICATION-1 SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.AUTHENTICATION_1}
          component={Authentication1}
          options={{headerShown: false}}
        />
        {/* AUTHENTICATION-2 SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.AUTHENTICATION_2}
          component={Authentication2}
          options={{headerShown: false}}
        />
        {/* AUTHENTICATION-3 SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.AUTHENTICATION_3}
          component={Authentication3}
          options={{headerShown: false}}
        />
        {/* SOLIDS SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.BOTTOM_TABS}
          component={BottomTabs}
          options={{headerShown: false}}
        />
        {/* ACCOUNT-DETAILS SCREEN STACK */}
        {/* <Stack.Screen
          name={navigationStrings.ACCOUNT_DETAILS}
          component={AccountDetails}
          options={{headerShown: false}}
        /> */}
        {/* TOP-UP SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.TOP_UP}
          component={TopUp}
          options={{headerShown: false}}
        />
        {/* EXCHANGE SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.EXCHANGE}
          component={Exchange}
          options={{headerShown: false}}
        />
        {/* HOME SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.HOME}
          component={Home}
          options={{headerShown: false}}
        />
        {/* BANK-TRANSFER SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.BANKTRANSFER}
          component={BankTransfer}
          options={{headerShown: false}}
        />
        {/* SEND MONEY SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.SENDMONEY}
          component={SendMoney}
          options={{headerShown: false}}
        />
        {/* ACCOUNT DETAILS SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.ACCOUNTDETAIL}
          component={AccountDetail}
          options={{headerShown: false}}
        />
        {/* KYC IDENTITY-VERIFICATION SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.IDENTITYVERIFICATION}
          component={IdentityVerification}
          options={{headerShown: false}}
        />
        {/* TRADING_CHART SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.TRADING_CHART}
          component={TradingChart}
          options={{headerShown: false}}
        />
        {/* ORDER-HISTOR SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.ORDER_HISTORY}
          component={OrderHistory}
          options={{headerShown: false}}
        />
        {/* KYC SOURCE-0F-FUNDS SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.SOURCEOFFUND}
          component={SourceofFund}
          options={{headerShown: false}}
        />
        {/* KYC IDENTITY-TYPE SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.IDENTITYTYPE}
          component={IdentityType}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationStrings.VERIFYIDENTITYSTEP2}
          component={VerifyIdentityStep2}
          options={{headerShown: false}}
        />
        {/* VERIFY SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.VERIFY}
          component={Verify}
          options={{headerShown: false}}
        />
        {/* KYC_IMAGEUPLOAD SCREEN */}
        <Stack.Screen
          name={navigationStrings.KYC_IMAGEUPLOAD}
          component={KYCImageUpload}
          options={{headerShown: false}}
        />

        {/* BANKING SCREENS */}
        <Stack.Screen
          name={navigationStrings.ODER_NEW_CARD}
          component={OrderNewCard}
          options={{headerShown: false}}
        />
        {/* TRANSFER-MANAGED-ACCOUNT-TO-CARD SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.MANAGED_ACCOUNT_TO_CARD}
          component={ManagedAccountToCard}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
