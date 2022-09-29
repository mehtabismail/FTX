import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
} from 'react-native';
import React from 'react';
import Map from '../../assets/images/Vector.svg';
import Colors from '../../theme/Colors';

const Instructions = () => {
  return (
    // <ScrollView>
    <View
      style={{
        backgroundColor: '#ffff',
        borderRadius: 20,
        padding: 20,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingVertical: 12,
        }}>
        <View>
          <Map height={20} />
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: Colors.black}}>
            Your money is held and protected by licensed banks.{' '}
            <Text style={{color: Colors.Primary}}>Learn more</Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingVertical: 12,
        }}>
        <View>
          <Map height={20} />
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: Colors.black}}>
            Use these details to receive transfers from a Euro bank account into
            your Swissblock Payments account
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingVertical: 12,
        }}>
        <View>
          <Map height={20} />
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: Colors.black}}>
            Your transfer is processed within 1 to 5 days
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingVertical: 12,
        }}>
        <View>
          <Map height={20} />
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: Colors.black}}>
            Only local transfers are accepted. For international transfers,
            please use the SWIFT details found above
          </Text>
        </View>
      </View>
    </View>
    // </ScrollView>
  );
};

export default Instructions;

const styles = StyleSheet.create({});
