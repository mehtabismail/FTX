import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ApplePay from '../assets/bottomTabNavigation/wallet/apple_pay.svg';
import Cross from '../assets/bottomTabNavigation/wallet/cross.svg';
import DropDown from '../assets/bottomTabNavigation/wallet/dropDown.svg';
import React from 'react';
import Colors from '../theme/Colors';

const TSRE_Card = (props: any) => {
  return (
    <View>
      <View style={styles.cardContainer}>
        {props.flag === 'Balance' || props.flag === 'Exchange' ? (
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.currency}>{props.currency}</Text>
              <TouchableOpacity style={{marginLeft: 3, padding: 5}}>
                <DropDown />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 5, alignItems: 'center'}}>
              <Text style={styles.balance}>{'Balance: ' + props.balance}</Text>
            </View>
          </View>
        ) : (
          props.flag === 'Account' && (
            <View>
              <ApplePay />
            </View>
          )
        )}
        {props.flag === 'Balance' || props.flag === 'Exchange' ? (
          props?.EUR_to_BTC === true ? (
            <View>
              <Text style={styles.convertedValueText}>+0.000124</Text>
            </View>
          ) : (
            <View style={[styles.inputBtn, styles.inputContainer]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.inputValue}>{'€ '}</Text>
                <TextInput
                  placeholder="10"
                  keyboardType="numeric"
                  placeholderTextColor={Colors.Secondary}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: 'transparent',
                    height: 50,
                    width: 50,
                    color: Colors.textColor,
                    fontFamily: 'RedHatDisplay-Medium',
                    fontSize: 14,
                  }}
                />
              </View>
              <TouchableOpacity style={{paddingRight: 20}}>
                <Cross height={12} width={12} />
              </TouchableOpacity>
            </View>
          )
        ) : (
          props.flag === 'Account' && (
            <TouchableOpacity style={styles.resetBtn}>
              <View style={{marginVertical: 10}}>
                <Text style={styles.textColor}>Change</Text>
              </View>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default TSRE_Card;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetBtn: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#E8EBED',
    borderWidth: 1,
  },
  textColor: {
    color: Colors.Blue_1,
    fontFamily: 'RedHatDisplay-Medium',
    fontSize: 14,
  },
  inputValue: {
    fontSize: 14,
    fontFamily: 'RedHatDisplay-Medium',
    color: Colors.textColor,
    paddingLeft: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currency: {
    fontSize: 18,
    fontFamily: 'RedHatDisplay-Bold',
    color: Colors.textColor,
  },
  balance: {
    fontSize: 12,
    fontFamily: 'RedHatDisplay-Medium',
    color: Colors.textColor,
  },
  inputBtn: {
    width: 120,
    height: 50,
    borderRadius: 20,
    borderColor: '#E8EBED',
    borderWidth: 1,
  },
  convertedValueText: {
    color: Colors.textColor,
    fontSize: 18,
    fontFamily: 'RedHatDisplay-Bold',
  },
});
