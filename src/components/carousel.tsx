import React, {useState} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import Swiper from 'react-native-web-swiper';
import SwipperCard from '../screens/onboarding/swipperCard';
import {useRef} from 'react';

let deviceHeight = Dimensions.get('screen').height;
let deviceWidth = Dimensions.get('screen').width;

const SwiperCarousel = (props: any) => {
  const swiperRef = useRef(null);

  const [index, setIndex] = useState(0);
  let indexNum = [0, 1, 2];

  const changeIndex = (index: any) => {
    setIndex((pre): any => {
      if (pre >= 2) {
        return (pre = pre - 1);
      } else {
        return (pre = pre + 1);
      }
    });
  };
  return (
    <View style={{marginTop: 30, height: 500}}>
      <View
        style={{
          flex: 1,
          width: deviceWidth,
        }}>
        <Swiper
          from={0}
          ref={swiperRef}
          innerContainerStyle={{height: 500}}
          minDistanceForAction={0.1}
          onIndexChanged={() => changeIndex(index)}
          controlsProps={{
            dotProps: {
              badgeStyle: {width: 40, backgroundColor: '#d9dcde'},
            },
            dotsTouchable: true,
            nextTitle: '',
            PrevComponent: (props: any) => <Text>{''}</Text>,
            dotActiveStyle: {width: 40, backgroundColor: '#9EA1AC'},
          }}>
          {indexNum.map(item => {
            return (
              <SwipperCard
                item={item}
                setIndex={setIndex}
                index={index}
                swiperRef={swiperRef}
              />
            );
          })}
        </Swiper>
      </View>
    </View>
  );
};

export default SwiperCarousel;
