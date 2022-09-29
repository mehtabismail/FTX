import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Fonts from '../../theme/Fonts';
import Carousel from '../../components/carousel';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';

let deviceHeight = Dimensions.get('screen').height;
let deviceWidth = Dimensions.get('screen').width;

export default function Onboarding() {
  const {email, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.SigninText}>SwissBlock</Text>
        </View>
        <View>
          <Carousel />
        </View>
        <View
          style={{
            marginTop: 20,
            width: deviceWidth - 40,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.LOGIN as any)}>
            <Text
              style={{textAlign: 'center', marginBottom: 20, color: '#FF892F'}}>
              Skip Intro
            </Text>
          </TouchableOpacity>
          <View style={styles.bottomButton}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.LOGIN as any);
              }}>
              <View style={styles.loginButton}>
                <Text style={{color: '#3D3B44'}}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.REGISTER as any);
              }}>
              <View style={styles.signupButton}>
                <Text style={{color: '#FFFF', fontSize: 14}}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: Platform.OS === 'ios' ? 100 : 50,
    backgroundColor: 'F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SigninText: {
    fontSize: Fonts.size.h4,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
  },
  signupButton: {
    backgroundColor: '#FF892F',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
  },
});
