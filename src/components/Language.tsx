import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LanguagSVG from '../assets/signinScreen/language.svg';
import metrics from '../theme/Metrics';
import DropDown from '../assets/signinScreen/dropDown.svg';

const Language = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity>
          <LanguagSVG height={30} width={30} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text>English</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.dropDown}>
          <DropDown />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: metrics.smallPadding,
    paddingHorizontal: metrics.regularPadding,
  },
  textContainer: {
    paddingHorizontal: metrics.regularPadding,
  },
  dropDown: {padding: metrics.smallPadding},
});
