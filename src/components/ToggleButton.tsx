import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../theme/Colors';
import {Shadow} from './styles/ScreenStyle';
import {
  useManagedCardRulesQuery,
  useManagedCardSpendRulesMutation,
} from '../redux/services/banking/cardDetails';
import {configData} from '../config/config';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';

const ToggleButton = (props: any) => {
  const {server_url, api_key, managed_card_formData} = configData;
  const [toggle, setToggle] = useState(props?.toggle);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState(managed_card_formData);

  const getManagedCardSpendRules = useManagedCardRulesQuery<any>();

  const {Bank}: any = useSelector(
    (state: RootState) => state?.userBankDetails?.userDetails,
  );

  const {corporate_token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  const [managedcardSpendRules, managedcardSpendRulesInfo] =
    useManagedCardSpendRulesMutation();

  const updateCardRules = async (card_id: any) => {
    if (props?.heading === 'Online transactions:') {
      setFormData({...formData, allowECommerce: !toggle});
    }
    if (props?.heading === 'Contacless payments') {
      setFormData({...formData, allowContactless: !toggle});
    }
    if (props?.heading === 'ATM withdrawals') {
      setFormData({...formData, allowAtm: !toggle});
    }
    setCount(count + 1);
    const result = await managedcardSpendRules({
      card_id,
      corporate_token,
      managed_card_formData: {...formData},
    });
    console.log(result, '-----------update cards rules-----------');
  };

  useEffect(() => {
    // !!Bank?.card_id && updateCardRules(Bank?.card_id);
    if(Bank?.card_id !== undefined){
      console.log(Bank?.card_id, "hello card id");
      updateCardRules(Bank?.card_id)
    }
    // updateCardRules();
  }, [toggle, Bank?.card_id]);

  return (
    <TouchableOpacity
      onPress={() => {
        setToggle(!toggle);
        props.onPress(toggle);
      }}
      style={[styles.mainContainer, Shadow]}>
      {toggle === false && (
        <View
          style={{...styles.rounded, ...styles.roundedContainerLeft}}></View>
      )}
      {toggle === true && (
        <View
          style={{
            ...styles.rounded,
            marginRight: 4,
            ...styles.roundedContainerRight,
          }}></View>
      )}
    </TouchableOpacity>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  mainContainer: {
    width: 40,
    height: 22,
    borderRadius: 100,
    backgroundColor: Colors.cardBackground,
    flexDirection: 'row',
  },
  rounded: {height: 14, width: 14, borderRadius: 14 / 2, marginTop: 4},
  roundedContainerLeft: {
    marginLeft: 4,
    backgroundColor: Colors.Secondary,
    opacity: 0.2,
  },
  roundedContainerRight: {
    backgroundColor: Colors.Primary,
    marginLeft: 22,
  },
});
