import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import SwitchableComponent from './navigationButton';
import Card from './innerCard';

let deviceHeight = Dimensions.get('screen').height;
let deviceWidth = Dimensions.get('screen').width;

export default function ExternalCard({indexHandler, swiperRef, index}: any) {
  return (
    <View style={styles.cardView}>
      <View>
        <SwitchableComponent
          indexHandler={indexHandler}
          swiperRef={swiperRef}
          index={index}
        />
      </View>
      <View>
        <Card balance="2,000.00" history="-1.84" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    width: deviceWidth - 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    height: 325,
    marginTop: 20,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
});
