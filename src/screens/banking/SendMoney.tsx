import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BankingHeader from './bankingHeader';
import Image from '../../assets/images/image112.svg';
import Colors from '../../theme/Colors';
import navigationStrings from '../../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';

const SendMoney = () => {
  const navigation: any = useNavigation()
  let textData = [
    {
      heading: 'Managed Account',
      description: 'Transfermoney to managed card',
    },
    {
      heading: 'Bank recipient',
      description: 'Transfermoney to any bank account',
    },
    {
      heading: 'Card recipient',
      description: 'Transfer money to any card account',
    },
    {
      heading: 'Contact',
      description: 'Add a contact using phone or email',
    },
    {
      heading: 'Invite a friend',
      description: 'Share a link to join Swissblock',
    },
  ];

  const managedAccountHandler =(props: any) => {
    props?.heading === 'Managed Account' && navigation.navigate(navigationStrings.MANAGED_ACCOUNT_TO_CARD)
  }
  return (
    <SafeAreaView>
      <View>
        <View>
          <BankingHeader headText="Send money" flag="sendmoney" />
        </View>
        <View style={{padding: 20}}>
          <View
            style={{backgroundColor: '#ffff', borderRadius: 20, padding: 20}}>
            {textData.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                   managedAccountHandler(item)
                  }}
                  style={{...styles.card}}>
                  <View
                    style={{
                      backgroundColor: '#ffff',
                      borderRadius: 10,
                      alignItems: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.05,
                      shadowRadius: 4.84,

                      elevation: 5,
                    }}>
                    <Image />
                  </View>
                  <View style={{padding: 10, alignContent: 'center'}}>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'RedHatDisplay-SemiBold',
                          fontSize: 16,
                        }}>
                        {item.heading}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'RedHatDisplay-SemiBold',
                          fontSize: 12,
                          color: Colors.Secondary,
                        }}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendMoney;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
  },
});
