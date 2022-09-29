import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../theme/Colors';
import metrics from '../../theme/Metrics';

const SwitchableComponent = ({selected, setSelected}: any) => {
  const handleChangeSwitchableComponent = (props: any) => {
    setSelected(props.ind);
  };
  let touchableButtons = ['Individual', 'Business'];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.rowContainer}>
        {touchableButtons.map((item, ind) => {
          return (
            <TouchableOpacity
              key={ind}
              onPress={() => handleChangeSwitchableComponent({item, ind})}
              style={{
                ...styles.touchableContainer,
                backgroundColor:
                  selected == ind ? Colors.orange : 'transparent',
              }}>
              <Text
                style={{
                  ...styles.textColor,
                  color: selected == ind ? Colors.Primary : Colors.Gray_Text,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default SwitchableComponent;
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    padding: metrics.smallPadding,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textColor: {
    fontFamily: 'RedHatDisplay-SemiBold',
    fontSize: 16,
  },
  rowContainer: {
    width: '100%',
    // height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: metrics.regularPadding,
    borderRadius: 100,
    width: '50%',
    padding: 8,
  },
});
