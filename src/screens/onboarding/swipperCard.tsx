import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from './Card';
import CarouselHeading from './CarouselHeading';

export default function SwipperCard({index, setIndex, item, swiperRef}: any) {
  return (
    <View>
      <View
        key={item}
        style={{
          paddingHorizontal: 10,
        }}>
        <View>
          {item == 0 && index == 0 && (
            <CarouselHeading heading1="CRYPTO" heading2="#BANKING" />
          )}
          {item == 1 && index == 1 && (
            <CarouselHeading
              heading1="GET A CARD"
              heading2="#FREE"
              heading3="FOR"
            />
          )}
          {item == 2 && index == 2 && (
            <CarouselHeading heading1="ZERO-FEE" heading2="#TRADING" />
          )}
        </View>
        <View style={styles.cardView}>
          <Card indexHandler={setIndex} swiperRef={swiperRef} index={index} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    marginTop: 10,
  },
});
