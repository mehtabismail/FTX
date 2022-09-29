import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../theme/Colors';

const MarketHeader = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.mktStyle}>Markets</Text>
      </View>
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default MarketHeader;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  mktStyle: {
    color: Colors.textColor,
    fontSize: 24,
    fontFamily: 'RedHatDisplay-bold',
  },
  button: {
    backgroundColor: Colors.bottomTabBackground,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'RedHatDisplay-SemiBold',
  },
});
