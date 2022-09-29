import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AtmCard from '../AtmCard';
import metrics from '../../../theme/Metrics';
import Colors from '../../../theme/Colors';
import CardFunctionalities from '../CardFunctionalities';
import {cardFunctionsData} from '../../../constants/dummydata';
import OrderCard from '../OrderCard';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/Store';
import ActionSvgButtons from './ActionSvgButtons';
import {useGetUserBankQuery} from '../../../redux/services/banking/UserBankDetails';
import {useGetUserDetailsQuery} from '../../../redux/services/banking/cardDetails';
import {
  storeUserBankDetails,
  storeUserDetails,
  storeCardId,
} from '../../../redux/reducers/banking/UserBankDetailSlice';

const Banking = () => {
  const dispatch = useDispatch();
  const {Bank}: any = useSelector(
    (state: RootState) => state?.userBankDetails?.userDetails,
  );
  const {card_id}: any = useSelector(
    (state: RootState) => state?.userBankDetails,
  );
  const {token, status}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );
  console.log(status, "checking kyc ");
  const managedCardDetails: any = useSelector(
    (state: RootState) => state?.userBankDetails?.managedCardDetails,
  );

  // GETTING USER_BANK_DETAILS DATA API
  const getUserBankDetails = useGetUserBankQuery<any>(token);

  // GETTING USER_DETAILS DATA API
  const getUserDetails = useGetUserDetailsQuery<any>(token);
  //   console.log(getUserDetails?.data, 'checking userDetails');

  useEffect(() => {
   
    if (
      getUserBankDetails?.isSuccess === true &&
      getUserBankDetails?.status === 'fulfilled'
    ) {
      dispatch(storeUserBankDetails(getUserBankDetails?.data));
    }
    if (
      getUserDetails?.isSuccess === true &&
      getUserDetails?.status === 'fulfilled'
    ) {
      dispatch(storeUserDetails(getUserDetails?.data));
      dispatch(storeCardId(getUserDetails?.data?.Bank?.card_id));
    }
  }, [getUserBankDetails?.status, getUserDetails?.status]);

  const onTogglePressHandler = (props: any) => {
    console.log(props, 'on toggle pressed');
  };

  return (
    <View>
      {status === 'kyc_verified' && (
        <View>
          <View>{card_id === null && <OrderCard />}</View>
          <View>
            {card_id !== null && (
              <View>
                <View>
                  <AtmCard />
                </View>
                <View>
                  <ActionSvgButtons card_id={Bank?.card_id} />
                </View>
                <View style={{marginTop: metrics.separaterMargin}}>
                  <View style={styles.mainContainerCard}>
                    <View style={styles.container}>
                      {cardFunctionsData.map((items: any, index: any) => {
                        return (
                          <View key={index}>
                            <CardFunctionalities
                              heading={items.heading}
                              bodyText={items.bodyText}
                              svg={items.svg}
                              button={items.button}
                              onTogglePress={onTogglePressHandler}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Banking;

const styles = StyleSheet.create({
  mainContainerCard: {
    width: '90%',
    alignSelf: 'center',
  },
  container: {borderRadius: 20, backgroundColor: Colors.cardBackground},
});
