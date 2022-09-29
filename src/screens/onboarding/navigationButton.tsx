import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../theme/Colors';
import metrics from '../../theme/Metrics';

const SwitchableComponent = ({indexHandler, swiperRef, index}: any) => {
  const handleChangeSwitchableComponent = (props: any) => {
    swiperRef.current.goTo(props.ind);
    indexHandler(props.ind);
  };
  let touchableButtons = ['Accounts', 'Cards', 'Analytics'];
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
                backgroundColor: index == ind ? Colors.orange : 'transparent',
              }}>
              <Text
                style={{
                  color: index == ind ? Colors.Primary : Colors.Gray_Text,
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 43,
    width: 253,
    alignSelf: 'center',
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
  rowContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  touchableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: metrics.regularPadding,
    borderRadius: 100,
  },
});
