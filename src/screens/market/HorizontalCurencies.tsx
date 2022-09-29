import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../theme/Colors';
import {filterButtons} from '../../constants/dummydata';
import Star from '../../assets/bottomTabNavigation/Market/star.svg';
import {useMarketDataQuery} from '../../redux/services/market/SpotTrading';
import navigationStrings from '../../constants/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {setFavorite} from '../../redux/reducers/market/marketSlice';

const HorizontalCurencies = (props: any) => {
  const dispatch = useDispatch();
  const favoriteData = useSelector((store: any) => store?.market?.favoriteData);
  const [loading, setLoading]: any = useState(true);
  // const [selected, setSelected]: any = useState([]);
  const [markedItemId, setMarkedItemId] = useState({});
  const [filters, setFilters]: any = useState({
    USD: true,
    EUR: true,
    USDT: true,
    BTC: true,
  });
  const [data, setData]: any = useState([]);

  const navigation: any = useNavigation();

  console.log(props?.searchData?.length, Object.keys(filters).toString());
  console.log(data?.length, 'is length of array');
  // const [marketData, useInfo] = useMarketDataQuery();

  const handleFilterClick = (id: any) => {
    if (filters[id]) {
      setFilters((current: any) => {
        const copy = {...current};

        delete copy[id];

        return copy;
      });
    } else {
      setFilters({
        ...filters,

        [id]: true,
      });
    }
  };

  const apiCalling = async () => {
    setLoading(true);
    props.onSearch('');
    const response = await fetch(
      `${
        navigationStrings.BASE_URL
      }market/get/data?type=spot&filterdata=${Object.keys(filters).toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      let res = await response.json();

      setData(res);
    }
    setLoading(false);
  };

  const updateData = () => {
    // if (props?.searchData?.length >= 1) {
    setData(props?.searchData);
    // }
    if (props?.searchString.length == 0) {
      apiCalling();
    }
  };

  useEffect(() => {
    // if (data?.length === 0) {
    apiCalling();
    // }
  }, [filters]);

  useEffect(() => {
    updateData();
  }, [props?.searchData, props?.searchString]);

  const addToFavorite = (obj: any) => {
    if (favoriteData?.filter((f: any) => f.name === obj.name).length > 0) {
      dispatch(
        setFavorite(favoriteData?.filter((f: any) => f.name !== obj.name)),
      );
    } else {
      dispatch(setFavorite([...favoriteData, obj]));
    }
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <View style={styles.mainContainer}>
          {filterButtons.map((d, index) => (
            <TouchableOpacity
              style={{
                ...styles.horizontalView,
                paddingHorizontal: index === 0 ? 15 : 10,
              }}
              onPress={() => {
                handleFilterClick(d.id);
              }}>
              <Text
                style={filters[d.id] ? styles.selected : styles.notSelected}>
                {d.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row', paddingLeft: 30}}>
            <TouchableOpacity>
              <Text style={styles.textStyle}>Ticker</Text>
            </TouchableOpacity>
            <Text style={styles.textStyle}>{' / '}</Text>
            <TouchableOpacity>
              <Text style={styles.textStyle}>Volume</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Text style={styles.textStyle}>Price</Text>
            </TouchableOpacity>
            <Text style={styles.textStyle}>{' / '}</Text>
            <TouchableOpacity>
              <Text style={styles.textStyle}>Daily Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        {!!loading && loading === true ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="small" color={Colors.Primary} />
          </View>
        ) : Object.keys(filters).length === 0 && props?.searchString === '' ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'RedHatDisplay-Bold',
                color: Colors.textColor,
              }}>
              Record not found
            </Text>
          </View>
        ) : props?.searchString.length > 0 && data?.length === undefined ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'RedHatDisplay-Bold',
                color: Colors.textColor,
              }}>
              Record not found
            </Text>
          </View>
        ) : (
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={(item: any) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      navigationStrings.TRADING_CHART as any,
                      {
                        item: item,
                      },
                    )
                  }
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    marginVertical: 5,
                    paddingBottom: data?.length - 1 === item.index ? 80 : 0,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableOpacity
                        style={{marginRight: 10}}
                        onPress={() => addToFavorite(item.item)}>
                        <Star
                          height={20}
                          width={20}
                          fill={
                            favoriteData?.filter(
                              (f: any) => f.name === item?.item?.name,
                            ).length > 0
                              ? Colors.black
                              : Colors.Secondary
                          }
                        />
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
        )}
      </View>
    </View>
  );
};

export default HorizontalCurencies;

const styles = StyleSheet.create({
  horizontalView: {
    margin: 5,
    paddingVertical: 5,
    backgroundColor: Colors.bottomTabBackground,
  },
  star: {
    flexDirection: 'row',
  },
  selected: {
    fontSize: 16,
    fontFamily: 'RedHatDisplay-SemiBold',
    color: 'white',
  },
  notSelected: {
    fontSize: 14,
    fontFamily: 'RedHatDisplay-Medium',
    color: Colors.Secondary,
  },
  mainContainer: {
    flexDirection: 'row',
    borderTopColor: Colors.Secondary,
    borderTopWidth: 1,
    borderBottomColor: Colors.Secondary,
    borderBottomWidth: 1,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 14,
    color: Colors.textColor,
    fontFamily: 'RedHatDisplay-Medium',
  },
});
