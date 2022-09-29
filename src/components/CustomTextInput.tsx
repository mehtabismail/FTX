import {
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import metrics from '../theme/Metrics';
import EyeHide from '../assets/authenticationScreen/eye-hide.svg';
import EyeShow from '../assets/authenticationScreen/eye-show.svg';
import Colors from '../theme/Colors';
import Cancel from '../assets/authenticationScreen/cancel.svg';

const CustomTextInput: any = ({
  fieldName,
  placeholder,
  screen,
  handleChangeInput,
  keyboardType,
  secureTextEntry,
  error,
  flag,
  label,
  passShowHide,
  setPassShowHide,
  value,
  removeError,
  disabled,
}: any) => {
  const [isFocused, setisFocused] = useState(false);
  const [changeError, setChangeError] = useState(false);
  const showHidePass = () => {
    setPassShowHide(!passShowHide);
  };
  const handleFocus = () => {
    screen === 'Login' || screen === 'Wire Transfer' && removeError(label);
    setisFocused(true);
  };
  const handleBlur = (e: any) => {
    setisFocused(value !== '' ? true : false);
  };

  return (
    <View style={styles.textInputContainer}>
      <View style={styles.inputView}>
        <Text
          style={{
            ...styles.labelStyle,
            top: !isFocused ? 14 : 0,
            fontFamily: 'RedHatDisplay-Medium',
            fontSize: !isFocused ? 14 : 10,
            color: Colors.Secondary,
          }}>
          {label}
        </Text>
        <TextInput
          {...label}
          onFocus={handleFocus}
          onBlur={e => handleBlur(e)}
          placeholder={placeholder}
          placeholderTextColor={Colors.Secondary}
          style={{
            width: '90%',
            // height: isFocused == true ? 70 : 50,
            fontSize: 14,
            color: '#3D3B44',
          }}
          editable={disabled && disabled === 'true' ? false : true}
          // selectTextOnFocus={disabled && disabled === 'true' ? false : true}
          keyboardType={!!keyboardType ? keyboardType : 'default'}
          secureTextEntry={!passShowHide ? secureTextEntry : false}
          onChangeText={e => handleChangeInput(e, fieldName)}
        />
        {flag && flag == 'Password-hide-show' ? (
          <TouchableOpacity onPress={showHidePass}>
            {!passShowHide ? (
              <EyeShow height={20} width={20} />
            ) : (
              <EyeHide height={20} width={20} />
            )}
          </TouchableOpacity>
        ) : null}
        {flag && flag === 'mobile-num' ? (
          <Cancel height={20} width={20} />
        ) : null}
      </View>

      {!!error && <Text style={styles.errorMessages}>{error && error}</Text>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInputContainer: {marginVertical: metrics.regularMargin},
  inputView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    borderWidth: 1,
    backgroundColor: '#ffff',
    borderColor: '#ffff',
    borderRadius: 20,
    paddingLeft: 10,
    padding: Platform.OS == 'ios' ? metrics.basePadding : null,
    alignSelf: 'center',
    marginHorizontal: metrics.separaterPadding,
    alignItems: 'center',
    paddingRight:
      Platform.OS === 'android'
        ? metrics.regularPadding
        : metrics.regularPadding,
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    padding: metrics.basePadding,
    alignSelf: 'center',
    width: 335,
    height: 50,
    borderColor: Colors.textInputBorder,
  },
  // input: {
  //   width: '90%',
  // },
  errorMessages: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'RedHatDisplay-Medium',
    marginTop: 7,
    width: '90%',
    alignSelf: 'center',
  },
  labelStyle: {
    position: 'absolute',
    left: 15,
    width: '90%',
    alignSelf: 'center',
  },
});
