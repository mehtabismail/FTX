import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {mainStyle} from '../../components/styles/ScreenStyle';
import CustomTextInput from '../../components/CustomTextInput';
import LoginHeader from '../../components/LoginHeader';
import CustomButton from '../../components/CustomButton';
import {Bool} from 'reselect/es/types';
import {useDispatch, useSelector} from 'react-redux';
import {
  storeCardDetails,
  storeStep1Data,
} from '../../redux/reducers/banking/CreateNewCardSlice';
import {RootState} from '../../redux/Store';
import {configData} from '../../config/config';
import {
  useCreateCardMutation,
  useManagedCardSpendRulesMutation,
} from '../../redux/services/banking/cardDetails';
import {useGetUserBankQuery} from '../../redux/services/banking/UserBankDetails';
import navigationStrings from '../../constants/navigationStrings';
import {startLoading, stopLoading} from '../../redux/reducers/loading/Loading';

const OrderCardSteps = ({navigation}: any) => {
  const {server_url, api_key, managed_card_id, managed_card_formData} =
    configData;
  const {email, render, status, token, corporate_token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  // const [createCard, useCreatCardInfo] = useCreateCardMutation();

  const [step, setStep] = useState<String>('Step1');
  const [details, setDetails] = useState();
  const [pressed, setPressed] = useState<Boolean>(false);

  const dispatch = useDispatch();
  const {data}: any = useSelector((state: RootState) => state?.createNewCard);

  const [managedcardSpendRules, managedcardSpendRulesInfo] =
    useManagedCardSpendRulesMutation();

  const onPressContinue = (props: string) => {
    setStep(props);
  };

  const getDetails = useGetUserBankQuery(token);
  // console.log(getDetails, "checking adta");

  useEffect(() => {
    if (getDetails?.isSuccess === true && getDetails?.status === 'fulfilled') {
      // console.log(getDetails?.data, '00000000000000000000000000000000');
      setDetails(getDetails?.data);
    }
  }, []);

  interface Step1DataType {
    friendlyName: string;
    nameOnCard: string;
    cardholderMobileNumber: string;
    tag: string;
    mode: string;
  }

  const Step1 = (props: any) => {
    // console.log(props, 'props value');
    const [data, setData] = useState<Step1DataType>({
      friendlyName: '',
      nameOnCard: '',
      cardholderMobileNumber: '',
      tag: '',
      mode: '',
    });

    // ON-CHANGE FUNCTION FOR STEP1
    const handleChangeInputStep1 = (value: any, fieldName: string) => {
      setData({...data, [fieldName]: value});
    };

    const onClickHandler = () => {
      props.continue('Step2');
      dispatch(storeStep1Data(data));
    };
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <LoginHeader headerText="Card Information" screen="OrderCard" />
          <View style={styles.screenContainer}>
            <View style={{width: '100%'}}>
              <View style={{width: '90%', alignSelf: 'center'}}>
                <Text>Friendly name</Text>
              </View>
              <CustomTextInput
                // label="Friendly name"
                placeholder={props?.details?.first_name}
                fieldName="friendlyName"
                handleChangeInput={handleChangeInputStep1}
              />
              <View style={{width: '90%', alignSelf: 'center'}}>
                <Text>Name on Card</Text>
              </View>
              <CustomTextInput
                // label="Name on card"
                placeholder={props?.details?.first_name}
                fieldName="nameOnCard"
                handleChangeInput={handleChangeInputStep1}
              />
              <View style={{width: '90%', alignSelf: 'center'}}>
                <Text>Contact number</Text>
              </View>
              <CustomTextInput
                // label="Mobile number"
                placeholder={props?.details?.contact_no}
                fieldName="cardholderMobileNumber"
                handleChangeInput={handleChangeInputStep1}
              />
              {/* <CustomTextInput
                // label="Tag"
                fieldName="tag"
                handleChangeInput={handleChangeInputStep1}
              />
              <CustomTextInput
                // label="Mode"
                fieldName="mode"
                handleChangeInput={handleChangeInputStep1}
              /> */}
            </View>
            <View>
              <CustomButton buttonText="Continue" onPress={onClickHandler} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const Step2 = (props: any) => {
    const [billingAddress, setBillingAddress] = useState({
      addressLine1: '',
      addressLine2: '',
      city: '',
      postCode: '',
      state: '',
      country: '',
    });

    // ON-CHANGE FUNCTION FOR STEP2
    const handleChangeInputStep2 = (value: any, fieldName: string) => {
      setBillingAddress({...billingAddress, [fieldName]: value});
    };

    const onBack = () => {
      setStep('Step1');
    };
    const onClickHandler = async () => {
      dispatch(startLoading());
      const formData = {
        profileId: '108666483020529676',
        friendlyName: props?.details?.first_name,
        currency: 'EUR',
        nameOnCard: props?.details?.first_name,
        cardholderMobileNumber: props?.details?.contact_no,
        billingAddress: {
          addressLine1: billingAddress?.addressLine1,
          addressLine2: billingAddress?.addressLine2,
          city: billingAddress?.city,
          postCode: billingAddress?.postCode,
          state: billingAddress?.state,
          country: billingAddress?.country,
        },
        tag: 'tag',
        mode: 'PREPAID_MODE',
      };
      console.log(formData, 'complete formData');
      try {
        const response = await fetch(
          'https://sandbox.weavr.io//multi/managed_cards',
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${corporate_token}`,
              'api-key': api_key,
            },
            body: JSON.stringify(formData),
            method: 'POST',
          },
        );

        const response2 = await response.json();
        console.log(response2, 'card order response');

        response?.status !== 200 && Alert.alert('Something went wrong');
        response?.status === 401 && Alert.alert('Corporate token expired');
        if (response?.status === 200) {
          assignFlags(response2?.id);
        }
      } catch (error) {
        console.log('error in catch block', error);
      }

      // dispatch(stopLoading())
    };

    const assignFlags = async (card_id: any) => {
      try {
        const result = await managedcardSpendRules({
          card_id,
          corporate_token,
          managed_card_formData,
        });
        console.log(result, 'managedcardSpendRules checking success');
        // dispatch(stopLoading());
        assignCardId(card_id);
      } catch (error) {
        console.log('error in second catch block', error);
      }
    };

    const assignCardId = async (props: any) => {
      console.log('api started');
      try {
        const response = await fetch(`${navigationStrings.BASE_URL}bank/card`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({card: props}),
        });

        console.log(response, 'response of assign card api');
        // dispatch(stopLoading());
        if (response?.status === 200) {
          dispatch(stopLoading());
          Alert.alert('Card successfully created.');
          // NAVIGATE TO WALLET SCREEN STACK
          navigation.reset({
            index: 0,
            routes: [{name: navigationStrings.BOTTOM_TABS}],
          });
        } else {
          Alert.alert('Something went wrong!');
        }
      } catch (error) {
        console.log(error)
      }
    };

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <LoginHeader
            headerText="Billing Information"
            screen="OrderCardStep2"
            onPress={onBack}
          />
          {/* <Text>Card Information</Text> */}
          <View style={styles.screenContainer}>
            <View style={{width: '100%'}}>
              <CustomTextInput
                label="Address line 1"
                fieldName="addressLine1"
                handleChangeInput={handleChangeInputStep2}
              />
              <CustomTextInput
                label="Address line 2"
                fieldName="addressLine2"
                handleChangeInput={handleChangeInputStep2}
              />

              <View
                style={{
                  flexDirection: 'row',
                  width: '95%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{width: '50%'}}>
                  <CustomTextInput
                    label="City"
                    fieldName="city"
                    handleChangeInput={handleChangeInputStep2}
                  />
                </View>
                <View style={{width: '50%'}}>
                  <CustomTextInput
                    label="PostCode"
                    fieldName="postCode"
                    handleChangeInput={handleChangeInputStep2}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: '95%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{width: '50%'}}>
                  <CustomTextInput
                    label="State"
                    fieldName="state"
                    handleChangeInput={handleChangeInputStep2}
                  />
                </View>
                <View style={{width: '50%'}}>
                  <CustomTextInput
                    label="Country"
                    fieldName="country"
                    handleChangeInput={handleChangeInputStep2}
                  />
                </View>
              </View>
            </View>
            <View>
              <CustomButton
                buttonText="Submit"
                isLoadingButton={true}
                pressed={pressed}
                onPress={onClickHandler}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={mainStyle}>
      <View style={{flex: 1}}>
        {step === 'Step1' && (
          <Step1 continue={onPressContinue} details={details} />
        )}
        {step === 'Step2' && <Step2 data={data} details={details} />}
      </View>
    </SafeAreaView>
  );
};

export default OrderCardSteps;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
