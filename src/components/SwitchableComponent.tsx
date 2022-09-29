import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../theme/Colors';
import metrics from '../theme/Metrics';
import {Shadow} from './styles/ScreenStyle';
import Fonts from '../theme/Fonts';

const SwitchableComponent = (props: any) => {
  // console.log(props);
  const [selected, setSelected] = useState(props?.touchableButtons[0]);
  return (
    <View style={[styles.mainContainer, Shadow]}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => {
            setSelected(props?.touchableButtons[0]);
            props.onPress(props?.touchableButtons[0]);
          }}
          style={{
            ...styles.touchableContainer,
            backgroundColor:
              selected === props?.touchableButtons[0]
                ? Colors.switchableButton
                : 'transparent',
          }}>
          <Text
            style={{
              ...styles.buttonText,
              color:
                selected === props?.touchableButtons[0]
                  ? Colors.Primary
                  : Colors.inActiveSwitchableButtonText,
            }}>
            {props?.touchableButtons[0]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected(props?.touchableButtons[1]);
            props.onPress(props?.touchableButtons[1]);
          }}
          style={{
            ...styles.touchableContainer,
            backgroundColor:
              selected === props?.touchableButtons[1]
                ? Colors.switchableButton
                : 'transparent',
          }}>
          <Text
            style={{
              ...styles.buttonText,
              color:
                selected === props?.touchableButtons[1]
                  ? Colors.Primary
                  : Colors.inActiveSwitchableButtonText,
            }}>
            {props?.touchableButtons[1]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected(props?.touchableButtons[2]),
              props.onPress(props?.touchableButtons[2]);
          }}
          style={{
            ...styles.touchableContainer,
            backgroundColor:
              selected === props?.touchableButtons[2]
                ? Colors.switchableButton
                : 'transparent',
          }}>
          <Text
            style={{
              ...styles.buttonText,
              color:
                selected === props?.touchableButtons[2]
                  ? Colors.Primary
                  : Colors.inActiveSwitchableButtonText,
            }}>
            {props?.touchableButtons[2]}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SwitchableComponent;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 253,
    alignSelf: 'center',
    borderRadius: 100,
    padding: metrics.smallPadding,
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
  buttonText: {
    fontFamily: 'RedHatDisplay-Medium',
    fontSize: 14,
  },
});
