import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/Store';
import Fonts from '../../theme/Fonts';
import {increment} from '../../redux/reducers/counter/CounterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const count: number = useSelector((state: RootState) => state.counter.value);
  console.log(count);
  return (
    <View>
      <SafeAreaView>
        <View>
          <Text>Home Screen</Text>
        </View>
        {/* TESTING REDUX-TOOLKIT FUNCTIONALITIES */}
        <View style={{alignItems: 'center', marginTop: 100}}>
          <Text style={{fontWeight: 'bold', fontSize: Fonts.size.h1}}>
            {count}
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 100}}>
          <TouchableOpacity
            onPress={() => {
              dispatch(increment());
            }}
            style={{
              backgroundColor: 'lightgray',
              padding: 20,
              width: '40%',
              alignItems: 'center',
            }}>
            <Text>Click Me</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
function state(state: any) {
  throw new Error('Function not implemented.');
}
