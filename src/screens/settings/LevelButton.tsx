import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../theme/Colors';

const LevelButton = ({text}: any) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.Primary,
          padding: 10,
          borderRadius: 20,
          alignItems: 'center',
        }}>
        <Text style={{color: '#ffff'}}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LevelButton;

const styles = StyleSheet.create({});
