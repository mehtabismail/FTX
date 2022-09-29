import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {mainStyle} from '../../../components/styles/ScreenStyle';
import LoginHeader from '../../../components/LoginHeader';
import Colors from '../../../theme/Colors';
import CustomButton from '../../../components/CustomButton';
import {RootState} from '../../../redux/Store';
import {useDispatch, useSelector} from 'react-redux';
import navigationStrings from '../../../constants/navigationStrings';
import {useKycLevelMutation} from '../../../redux/services/banking/cardDetails';

import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {storeStatus} from '../../../redux/reducers/register/RegisterSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startLoading, stopLoading } from '../../../redux/reducers/loading/Loading';

const KYC_ImageUpload = ({navigation, route}: any) => {
  const {sourceOfFunds, identity, currency} = route?.params;
  console.log(sourceOfFunds, identity);
  const {selectedIdentity, pictureSide} = route?.params;
  const [imageSide, setImageSide] = useState(pictureSide);
  var [loader, setLoader] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [selfieSelected, setSelfieSelected] = useState(false);
  const [imageData, setImageData] = useState<any>({});
  const [kycImages, setKycImages] = useState({});
  const [frontImage, setFrontImage] = useState<any>();
  const [backImage, setBackImage] = useState<any>();
  const [selfieImage, setSelfieImage] = useState<any>();

  console.log(typeof frontImage, 'front image type');

  const {email, render, status, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );

  const [kycLevel, kycLevelInfo] = useKycLevelMutation();
  const dispatch = useDispatch();

  const options: any = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    },
  };

  const openGallery = async () => {
    const images: any = await DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
    });

    console.log(images);

    if (imageSide === 'front' && selfieSelected === false) {
      setFrontImage(images);
    } else {
      if (imageSide === 'back' && selfieSelected === false) {
        setBackImage(images);
      }
    }
    setImageData({...imageData, uri: images.uri});
    setImageSelected(true);
  };

  const onClickHandler = () => {
    openGallery();
  };

  const frontImageClickHandler = () => {
    setImageSelected(false);
  };

  const backImageClickHandler = () => {
    if (imageSide === 'front') {
      console.log('front image selected');
      setImageSide('back');
      setImageSelected(false);
    } else {
      if (imageSide === 'back') {
        setImageSelected(true);
        setSelfieSelected(true);
      }
    }
  };

  const launchSelfieCamera = async () => {
    console.log('helllo selfie');
    const result: any = await DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
    });
    if (selfieSelected === true) {
      setSelfieImage(result);
      setImageData({...imageData, uri: result.uri});
    }
    console.log(result, '-------------shiowing data--------------------');
  };

  const submitKyc = async () => {
    dispatch(startLoading());
    var formdata: any = new FormData();
    formdata.append('file', frontImage);
    formdata.append('file', backImage);
    formdata.append('currency', currency.toLowerCase());
    formdata.append('identity_type', identity);
    formdata.append('avatar', selfieImage);
    formdata.append('source_of_income', sourceOfFunds);
    console.log(formdata._parts);

    const result = await fetch(`${navigationStrings.BASE_URL}kyc`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });
    console.log(result);
    const res = await result.text();
    if (result.status === 200) {
      dispatch(storeStatus('kyc_pending'));
      !!status && (await AsyncStorage.setItem('status', 'kyc_pending'));
    } else {
      if (result.status === 400) {
        console.log('status is 400');
      }
    }
    Alert.alert(res, 'successfully!');
    dispatch(stopLoading());
    navigation.navigate(navigationStrings.SETTINGS);
  };

  return (
    <SafeAreaView style={mainStyle}>
      {selfieSelected === false && (
        <View style={{flex: 1}}>
          {imageSelected === false && (
            <View style={{flex: 1}}>
              <LoginHeader
                headerText="Upload images"
                rightViewTesxt="Other options"
                screen="KYC_ImageUpload"
              />
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: Colors.Secondary,
                  borderRadius: 10,
                }}>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      color: Colors.textColor,
                      fontSize: 16,
                      fontFamily: 'RedHatDisplay-SemiBold',
                      textAlign: 'center',
                    }}>{`Upload ${imageSide} of selected document`}</Text>
                </View>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      color: Colors.Primary,
                      fontSize: 14,
                      fontFamily: 'RedHatDisplay-Medium',
                      textAlign: 'center',
                    }}>
                    Click choose file button to upload the image of identity
                    document.
                  </Text>
                </View>
              </View>
              <View style={{padding: 10}}>
                <CustomButton
                  buttonText="Choose File"
                  isLoadingButton={true}
                  pressed={pressed}
                  onPress={onClickHandler}
                />
              </View>
            </View>
          )}
          {imageSelected === true && (
            <View style={{flex: 1}}>
              <LoginHeader
                headerText="Review images"
                screen="KYC_ImageUpload"
              />
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: imageData?.uri}}
                  style={{width: 250, height: 250}}
                />
              </View>
              <View
                style={{
                  width: 250,
                  paddingVertical: 20,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.Primary,
                    fontSize: 14,
                    fontFamily: 'RedHatDisplay-Medium',
                    textAlign: 'center',
                  }}>
                  To avoid delays in verification, please make sure the entire
                  document is visible in the image
                </Text>
              </View>
              <CustomButton
                buttonText="Try a different image"
                onPress={frontImageClickHandler}
              />
              <CustomButton
                buttonText="Continue anyway"
                onPress={backImageClickHandler}
              />
            </View>
          )}
        </View>
      )}
      {selfieSelected === true && (
        <View style={{flex: 1}}>
          <LoginHeader headerText="Upload images" screen="KYC_ImageUpload" />

          <View
            style={{
              width: '90%',
              paddingVertical: 10,
              alignSelf: 'center',
              alignItems: 'center',
              borderColor: Colors.Secondary,
              borderWidth: 1,
              borderRadius: 10,
            }}>
            {!!selfieImage === false && (
              <View style={{width: '90%'}}>
                <Text
                  style={{
                    color: Colors.Primary,
                    fontSize: 14,
                    fontFamily: 'RedHatDisplay-Medium',
                    textAlign: 'center',
                  }}>
                  A selfie will be taken of yours to complete the verification
                </Text>
                <View style={{marginTop: 20}}>
                  <CustomButton
                    buttonText="Start Camera"
                    onPress={launchSelfieCamera}
                    width="100%"
                  />
                </View>
              </View>
            )}

            {!!selfieImage && (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: imageData?.uri}}
                  style={{width: 250, height: 250}}
                />
              </View>
            )}
          </View>
          <CustomButton
            buttonText="Submit KYC"
            isLoadingButton={true}
            pressed={pressed}
            onPress={submitKyc}
            width="80%"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default KYC_ImageUpload;

const styles = StyleSheet.create({});
