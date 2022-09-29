import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';
import Star from '../../assets/images/star.svg';
import Colors from '../../theme/Colors';
import {setFavorite} from '../../redux/reducers/market/marketSlice';

const FavouriteData = ({defaultSet}: any) => {
  const dispatch = useDispatch();
  const favoriteData = useSelector((store: any) => store?.market?.favoriteData);
  const navigation: any = useNavigation();
  const removeFavorite = (obj: any) => {
    dispatch(
      setFavorite(favoriteData?.filter((f: any) => f.name !== obj.name)),
    );
  };
  useEffect(() => {
    favoriteData.length === 0 && defaultSet(1);
  }, [favoriteData]);

  return (
    <SafeAreaView>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={favoriteData}
          renderItem={(item: any) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.TRADING_CHART as any, {
                  item: item,
                })
              }
              style={{
                width: '90%',
                alignSelf: 'center',
                marginVertical: 5,
                paddingBottom: favoriteData?.length - 1 === item.index ? 80 : 0,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{marginRight: 10}}
                    onPress={() => removeFavorite(item.item)}>
                    <Star height={20} width={20} fill={Colors.black} />
                  </TouchableOpacity>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Colors.textColor,
                        fontFamily: 'RedHatDisplay-SemiBold',
                      }}>
                      {item?.item?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.Secondary,
                        fontFamily: 'RedHatDisplay-Medium',
                      }}>
                      {'US$'}
                      {item.item.volumeUsd24h === null
                        ? '0'
                        : item.item.volumeUsd24h.slice(
                            0,
                            item.item.volumeUsd24h.indexOf('.') + 3,
                          )}
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.textColor,
                      fontFamily: 'RedHatDisplay-SemiBold',
                    }}>
                    {item.item.price === null
                      ? '0'
                      : item.item.price.slice(
                          0,
                          item.item.price.indexOf('.') + 3,
                        )}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'green',
                      fontFamily: 'RedHatDisplay-Medium',
                    }}>
                    {item.item.change24h === null
                      ? '0'
                      : item?.item?.change24h.slice(
                          0,
                          item.item.change24h.indexOf('.') + 3,
                        )}
                    {'%'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavouriteData;

const styles = StyleSheet.create({});
