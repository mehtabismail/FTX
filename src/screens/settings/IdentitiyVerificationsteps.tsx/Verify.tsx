import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import IdentityHeader from '../IdentityHeader';
import RadioBtn from './RadioBtn';
import ContinueBtn from './ContinueBtn';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../constants/navigationStrings';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Verify = () => {
  const navigation: any = useNavigation();
  const [checked, setChecked] = useState('Upload a file');
  var [loader, setLoader] = useState(false);

  const data = [
    {btnText: 'Take a picture with your phone'},
    {btnText: 'Take a picture with your webcam'},
    {btnText: 'Upload a file'},
  ];

  const clickHandler = () => {
    !!checked &&
      checked === 'Upload a file' &&
      navigation.navigate(navigationStrings.IDENTITYTYPE, {
        selected: 'launchImageLibrary',
      });
  };
  return (
    <SafeAreaView>
      <View>
        <IdentityHeader />
        <View style={{padding: 20}}>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Bold',
              fontSize: 17,
              paddingBottom: 10,
            }}>
            Select Identification type
          </Text>
          {data.map((item, ind) => {
            return (
              <RadioBtn
                btnText={item?.btnText}
                index={ind}
                checked={checked}
                setChecked={setChecked}
              />
            );
          })}
        </View>
        <View style={{padding: 20}}>
          <ContinueBtn BtnText="Next" clickHandler={clickHandler} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Verify;

const styles = StyleSheet.create({});
