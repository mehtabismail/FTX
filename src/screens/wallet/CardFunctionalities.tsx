import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../theme/Colors';
import InnerCard from './InnerCard';

const CardFunctionalities = (props: any) => {
  console.log(props.button);
  return (
    <View>
      <InnerCard
        heading={props?.heading}
        bodyText={props?.bodyText}
        svg={props?.svg}
        button={props?.button}
        onPress={props?.onTogglePress}
      />
    </View>
  );
};

export default CardFunctionalities;

const styles = StyleSheet.create({
  mainContainer: {
    width: 335,
    alignSelf: 'center',
  },
  container: {borderRadius: 20, backgroundColor: Colors.cardBackground},
});
