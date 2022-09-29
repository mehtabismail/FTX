import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Star from '../../assets/images/star.svg';
import AppThemeColors from '../../theme/AppThemeColors';
import Colors from '../../theme/Colors';
import {useSelector} from 'react-redux';

const HorizontalScroll = (props: any) => {
  const favoriteData = useSelector((store: any) => store?.market?.favoriteData);
  const [selected, setSelected] = useState(props.defaultSet);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={props?.data}
          renderItem={(item: any) => (
            <View
              style={{
                ...styles.horizontalView,
                paddingHorizontal: item.index === 0 ? 15 : 10,
              }}>
              {item?.index === 0 && (
                <View style={styles.star}>
                  {favoriteData?.length === 0 ? null : (
                    <TouchableOpacity onPress={() => props.onPress(-1)}>
                      <Star fill={Colors.black} height={20} width={20} />
                    </TouchableOpacity>
                  )}

                  {/* <TouchableOpacity
                    onPress={() => {
                      setSelected(item?.index)
                      // props.onPress(item?.index);
                    }}
                    style={{marginLeft: 15}}>
                    <Text
                      style={{
                        fontSize: item.index === selected ? 16 : 14,
                        fontFamily:
                          item.index === selected
                            ? 'RedHatDisplay-SemiBold'
                            : 'RedHatDisplay-Medium',
                        color:
                          item.index === selected 
                            ? Colors.Primary
                            : Colors.textColor,
                      }}>
                      {item.item}
                    </Text>
                  </TouchableOpacity> */}
                </View>
              )}
              {/* {item?.index !== 0 && ( */}
              <TouchableOpacity
                style={{marginLeft: item?.index === 0 ? 15 : 0}}
                onPress={() => {
                  setSelected(item?.index);
                  props.onPress(item?.index);
                }}>
                <Text
                  style={{
                    fontSize: item.index === selected ? 16 : 14,
                    fontFamily:
                      item.index === selected
                        ? 'RedHatDisplay-SemiBold'
                        : 'RedHatDisplay-Medium',
                    color:
                      item.index === selected
                        ? Colors.Primary
                        : Colors.textColor,
                  }}>
                  {item.item}
                </Text>
              </TouchableOpacity>
              {/* )} */}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HorizontalScroll;

const styles = StyleSheet.create({
  horizontalView: {
    margin: 5,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  star: {
    flexDirection: 'row',
  },
});
