import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MarketHeader from './MarketHeader';
import SearchInput from './Input';
import HorizontalScroll from './HorizontalScroll';
import {
  dummyCurrencyData,
  dummyHorizontalData,
} from '../../constants/dummydata';
import HorizontalCurencies from './HorizontalCurencies';
import Colors from '../../theme/Colors';
import navigationStrings from '../../constants/navigationStrings';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';
import {NavigationState, StackNavigationState} from '@react-navigation/native';
import FavouriteData from './FavouriteData';

const Market = () => {
  const [selectedHorizontal, setSelectedHorizontal] = useState(1);
  const [searchString, setSearchString] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [markedItems, setMarkedItems] = useState([]);

  console.log(isFocused, '------is focus----------');
  console.log(
    searchString,
    ' ',
    searchString.length,
    ' is length ',
    '------search string----------',
  );

  const {email, render, status, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  const onChangeHandler = (props: any) => {
    setSearchString(props);
  };

  const onChangeFocuseHandler = (props: any) => {
    setIsFocused(props);
  };

  const onClickPress = (props: any) => {
    console.log(props);
    setSelectedHorizontal(props);
  };

  const getSearchApiData = async () => {
    setSearchData([]);
    const result = await fetch(`${navigationStrings.BASE_URL}market/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: searchString,
      }),
    });
    const res = await result.json();
    setSearchData(res);
    console.log(res, '-----------------api data -----------------');
  };

  useEffect(() => {
    let time = setTimeout(() => {
      getSearchApiData();
    }, 500);
    return () => {
      clearTimeout(time);
    };
  }, [searchString]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {/* MARKET HEADER */}
          <MarketHeader />
          {/* Search Input */}
          <SearchInput
            isFocus={onChangeFocuseHandler}
            onSearch={onChangeHandler}
          />
          {/* Horizontal scroll Spot, Future */}

          <HorizontalScroll
            data={dummyHorizontalData}
            defaultSet={selectedHorizontal}
            onPress={onClickPress}
            markedItems={markedItems}
            setMarkedItems={setMarkedItems}
          />
          {/* CURRENCIES DATA COMMING FROM API */}
          {selectedHorizontal === 1 && (
            <View style={{flex: 1}}>
              <HorizontalCurencies
                onSearch={onChangeHandler}
                searchString={searchString}
                searchData={searchData.length >= 1 ? searchData : null}
                markedItems={markedItems}
                markedItemHandler={setMarkedItems}
              />
            </View>
          )}
          {selectedHorizontal === -1 && (
            <View style={{flex: 1}}>
              <FavouriteData defaultSet={setSelectedHorizontal} />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Market;

const styles = StyleSheet.create({});
