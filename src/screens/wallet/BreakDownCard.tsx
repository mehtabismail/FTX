import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SwitchableComponent from '../../components/SwitchableComponent';
import BreakDownCardList from './BreakDownCardList';
import metrics from '../../theme/Metrics';

const BreakDownCard = () => {
  const [selected, setSelected] = useState('Category');
  const handleChangeSwitchableComponent = (props: any) => {
    console.log(props, 'showing handleChange');
    setSelected(props);
  };
  return (
    <View>
      <SwitchableComponent
        touchableButtons={['Category', 'Merchant', 'Country']}
        onPress={handleChangeSwitchableComponent}
      />
      <View style={{marginTop: metrics.separaterMargin}}>
          <BreakDownCardList heading="Transfers" subHeading="11" amount="1012.10" percentage="15"/>
          <BreakDownCardList heading="Transfers" subHeading="11" amount="1012.10" percentage="15"/>
          <BreakDownCardList heading="Transfers" subHeading="11" amount="1012.10" percentage="15"/>
      </View>
    </View>
  );
};

export default BreakDownCard;

const styles = StyleSheet.create({});
