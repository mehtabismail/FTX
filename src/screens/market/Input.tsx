import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input} from '@rneui/themed';
import Colors from '../../theme/Colors';
import isEmpty from '../../utils/isEmpty';
import {useDispatch, useSelector} from 'react-redux';
import navigationStrings from '../../constants/navigationStrings';
import {RootState} from '../../redux/Store';
import metrics from '../../theme/Metrics';
import {dropDownArray} from '../../constants/dummydata';
import {Shadow} from '../../components/styles/ScreenStyle';

const SearchInput = (props: any) => {
  const [searchData, setSearchData] = useState([]);
  const [searchPopUp, setSearchPopup] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [filter, setFilter] = useState('% Change');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{width: '90%', alignSelf: 'center', marginVertical: 10}}>
      <Input
        onFocus={() => {
            props.isFocus(true);
        }}
        onChangeText={(value: any) => props.onSearch(value)}
        onBlur={() => {
          props.isFocus(false);
        }}
        // leftIcon={
        //   <Image
        //     style={{
        //       width: 32,
        //       height: 32,
        //       tintColor: Colors.Secondary,
        //     }}
        //     source={require('../../assets/bottomTabNavigation/Market/search.png')}
        //   />
        // }
        placeholder="Search"
        containerStyle={{
          alignSelf: 'center',
          borderRadius: 10,
          height: 45,
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: Colors.Secondary,
        }}
        inputContainerStyle={{
          borderBottomColor: 'transparent',
          paddingHorizontal: 5,
        }}
        style={{paddingLeft: 5}}
      />
      {/* {!!searchData && isFocused === true && searchData?.length >= 1 && (
        <View style={{zIndex: 2,}}>
          <DropDownList />
        </View>
      )} */}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  dropDownStyle: {
    flex: 0,
    borderWidth: 1,
    borderColor: Colors.Gray_Placeholder,
    borderRadius: 5,
    marginTop: '1%',
    marginBottom: '2%',
    paddingHorizontal: metrics.regularPadding,
    maxHeight: 500,
    paddingBottom: metrics.basePadding,
    backgroundColor: Colors.cardBackground,
  },
  textStyle: {
    fontSize: 14,
    color: Colors.textColor,
    fontFamily: 'RedHatDisplay-Medium',
  },
});
