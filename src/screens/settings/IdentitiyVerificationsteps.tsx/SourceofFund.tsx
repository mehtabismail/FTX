import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FundsBtn from './fundsbtn';
import ContinueBtn from './ContinueBtn';
import navigationStrings from '../../../constants/navigationStrings';
import IdentityHeader from '../IdentityHeader';

const SourceofFund = ({navigation}: any) => {
  const [selected, setSelected] = useState('');
  const clickHandler = () => {
    !!selected && selected !=='Others' &&
      navigation.navigate(navigationStrings.VERIFYIDENTITYSTEP2, {selected});
    !!selected === false || selected === 'Others' ? Alert.alert('Select one option!') : null;
  };
  const onPressHandler = (props: any) => {
    console.log(props);
    setSelected(props);
  };

  console.log(selected, "selection processs");
  return (
    <SafeAreaView>
      <IdentityHeader onPress={()=>navigation.goBack()} heading="Swissblock" />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          padding: 20,
          marginVertical: 40,
          backgroundColor: '#ffff',
          shadowColor: '#000000',
          shadowOpacity: 0.1,
          shadowRadius: 2,
          shadowOffset: {
            height: 1,
            width: 1,
          },
        }}>
        <Text
          style={{
            paddingBottom: 20,
            fontFamily: 'RedHatDisplay-Bold',
            color: 'black',
          }}>
          Source of your funds
        </Text>
        <Text>Select where your funds come from</Text>
        <View>
          <FundsBtn
            BtnText="Occupation"
            selected={selected}
            onClick={onPressHandler}
            svg="briefcase"
          />
        </View>
        <View>
          <FundsBtn
            BtnText="Investments"
            selected={selected}
            onClick={onPressHandler}
            svg="usd"
          />
        </View>
        <View>
          <FundsBtn
            BtnText="Inheritance"
            selected={selected}
            onClick={onPressHandler}
            svg="users"
          />
        </View>
        <View>
          <FundsBtn
            BtnText="Mining"
            selected={selected}
            onClick={onPressHandler}
            svg="diamond"
          />
        </View>
        <View>
          <FundsBtn
            BtnText="Other"
            selected={selected}
            onClick={onPressHandler}
            onChangeText={setSelected}
          />
        </View>
        <View style={{marginTop:10}}>
          <ContinueBtn BtnText="Continue" clickHandler={clickHandler} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SourceofFund;

const styles = StyleSheet.create({});
