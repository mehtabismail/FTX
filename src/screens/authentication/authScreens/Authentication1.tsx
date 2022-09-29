import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityComponent,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthenticationHeader from '../../../components/AuthenticationHeader';
import metrics from '../../../theme/Metrics';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import navigationStrings from '../../../constants/navigationStrings';
import {textInputFieldNameContainer} from '../../../components/styles/TextInputStyles';
import DropDown from '../../../assets/authenticationScreen/dropDown.svg';
import DatePicker from 'react-native-date-picker';

const Authentication1 = ({navigation}: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  console.log(date.toString().substring(0, 15), 'showing datex');
  // TEXTINPUT ONCHNAGE-EVENT
  const handleChangeInput = (value: string, fieldName: string) => {
    fieldName === 'First Name'
      ? setFirstName(value)
      : fieldName === 'Last Name'
      ? setLastName(value)
      : null;
  };

  // CUSTOM-BUTTON EVENT
  const onClickHandler: Function = () => {
    navigation.navigate(navigationStrings.AUTHENTICATION_2 as any, {
      firstName,
      lastName,
      date,
    });
    // console.log(firstName + ' ' + lastName);
  };

  // UI-SCREEN RENDERING
  return (
    <SafeAreaView style={styles.mainContainer}>
      <DatePicker
        locale="en"
        mode={'date'}
        modal
        open={showDatePicker}
        date={date}
        onConfirm={date => {
          setShowDatePicker(false);
          setDate(date);
        }}
        // onConfirm={date => {
        //   setShowDatePicker(false);
        //   setDate(moment(date).format('L') as any);
        // }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />
      <View>
        {/* AUTHENTICATION-HEADER */}
        <View>
          <AuthenticationHeader
            headerText="What's your name?"
            navigation={navigation}
          />
        </View>
        {/* SCREEN TEXT */}
        <View style={styles.screenTextContainer}>
          <Text>Verify your identity to start trading.</Text>
        </View>
        {/* CUSTOM TEXT-INPUTS */}
        <View style={styles.textInputContainer}>
          <View style={textInputFieldNameContainer}>
            <Text>First Name</Text>
          </View>
          <View>
            <CustomTextInput
              fieldName="First Name"
              handleChangeInput={handleChangeInput}
              keyboardType="default"
            />
          </View>
          <View style={textInputFieldNameContainer}>
            <Text>Last Name</Text>
          </View>
          <View>
            <CustomTextInput
              fieldName="Last Name"
              handleChangeInput={handleChangeInput}
              keyboardType="default"
            />
          </View>
          <View style={textInputFieldNameContainer}>
            <Text>Date of birth</Text>
          </View>
          <View>
            <View style={styles.dateContainer}>
              <View>
                <Text>{date.toString().substring(0, 15)}</Text>
              </View>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <DropDown />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* CUSTOM BUTTON */}
      <View>
        <CustomButton buttonText="Continue" onPress={onClickHandler} />
      </View>
    </SafeAreaView>
  );
};

export default Authentication1;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'space-between'},
  screenTextContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: metrics.doubleBasePadding,
  },
  textInputContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  dateContainer: {
    marginTop: metrics.regularMargin,
    flexDirection: 'row',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: metrics.regularPadding,
  },
});
