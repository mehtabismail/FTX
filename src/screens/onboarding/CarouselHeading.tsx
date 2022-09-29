import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Fonts from '../../theme/Fonts';

export default function CarouselHeading(props: any) {
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={styles.slide1Heading1}>{props.heading1}</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={styles.slide1Heading1}>{props.heading3}</Text>
        <Text style={styles.slide1Heading2}>{props.heading2}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide1Heading1: {
    fontSize: Fonts.size.h1,
    fontWeight: 'normal',
  },
  slide1Heading2: {
    fontSize: Fonts.size.h1,
    color: '#FF892F',
    borderWidth: 1,
    borderColor: '#FF892F',
    borderRadius: 27,
    paddingHorizontal: 10,
    // paddingVertical: ((Platform.OS as any) = 'ios' ? 10 : 1),
  },
});
