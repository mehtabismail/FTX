import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useWalletAddressMutation} from '../../redux/services/wallet/WalletDetails';
import {
  useBtcTransactionHistoryQuery,
  useEthTransactionHistoryQuery,
  useMaticTransactionHistoryQuery,
  useTrxTransactionHistoryQuery,
} from '../../redux/services/wallet/TransactionHistory';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';
import Modal from 'react-native-modal';
import Image from '../../assets/images/copy.svg';
import {Shadow} from '../../components/styles/ScreenStyle';
import Colors from '../../theme/Colors';
import Clipboard from '@react-native-community/clipboard';
import {useClipboard} from '@react-native-community/clipboard';
import {useToast} from 'react-native-toast-notifications';
import Fonts from '../../theme/Fonts';
import {walletsHistoryLinks} from '../../constants/dummydata';

const TransactionHistory = ({currency_code}: any) => {
  const [address, setAddress] = useState<any>(null);
  const [skip, setSkip] = useState(true);
  const [skip2, setSkip2] = useState(true);
  const [skip3, setSkip3] = useState(true);
  const [skip4, setSkip4] = useState(true);
  const [isModalVisible, setModalVisible]: any = useState(false);
  const [transactionHistoryData, setTransactionHistoryData]: any =
    useState(null);
  const [transactionHash, setTransactionHash]: any = useState(null);

  const {token} = useSelector((state: RootState) => state?.registerProps);

  const [walletAddress, walletAddressInfo] = useWalletAddressMutation();
  const getBtcTransactionHistory = useBtcTransactionHistoryQuery(address, {
    skip,
  });
  const getEthTransactionHistory = useEthTransactionHistoryQuery(address, {
    skip,
  });
  const getTrxTransactionHistory = useTrxTransactionHistoryQuery(address, {
    skip,
  });
  const getMaticTransactionHistory = useMaticTransactionHistoryQuery(address, {
    skip,
  });

  const linkinURL = (currency_code: string) => {
    if (currency_code !== 'bsc')
      return Linking.openURL(
        `${walletsHistoryLinks[currency_code]}${transactionHash}`,
      );
  };

  const getHistory = async (currency_code: any) => {
    const response: any = await walletAddress({
      currency_code,
      token,
    });
    if (response?.data?.wallet_address) {
      setAddress(response?.data?.wallet_address);
      setSkip(false);
      switch (currency_code) {
        case 'btc':
          {
            setTransactionHash(getBtcTransactionHistory?.data?.[0]?.hash);
            setModalVisible(!isModalVisible);
          }
          break;
        case 'eth':
          {
            setTransactionHash(getEthTransactionHistory?.data?.[0]?.hash);
            setModalVisible(!isModalVisible);
          }
          break;
        case 'trx':
          {
            setTransactionHash(getTrxTransactionHistory?.data?.[0]?.hash);
            setModalVisible(!isModalVisible);
          }
          break;
        case 'matic':
          {
            setTransactionHash(getMaticTransactionHistory?.data?.[0]?.hash);
            setModalVisible(!isModalVisible);
          }
          break;
        default:
          Alert.alert('BSC is under development');
      }
    }
  };
  const toggleModal: any = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <TouchableOpacity onPress={() => getHistory(currency_code)}>
      <Modal
        style={{
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        isVisible={isModalVisible}>
        <View
          style={[
            Shadow,
            {
              borderRadius: 10,
              height: 200,
              width: '90%',
              backgroundColor: Colors.cardBackground,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <View
            style={{
              width: '100%',
              height: '50%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 5,
              }}>
              <Text
                numberOfLines={5}
                style={{
                  color: Colors.textColor,
                  fontSize: 14,
                  fontFamily: 'RedHatDisplay-Medium',
                }}>
                {transactionHash}
              </Text>
            </View>
            <TouchableOpacity
              onPress={
                () => linkinURL(currency_code)
              }
              style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Colors.Primary,
                  fontSize: 14,
                  fontFamily: 'RedHatDisplay-Medium',
                }}>
                Detail
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                backgroundColor: Colors.Primary,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 20,
              }}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.seeAllText}>See all</Text>
    </TouchableOpacity>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  seeAllText: {
    color: Colors.Primary,
    fontSize: Fonts.size.medium,
    fontFamily: 'RedHatDisplay-Medium',
  },
});
