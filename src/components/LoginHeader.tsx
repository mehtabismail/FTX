// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import Fonts from '../theme/Fonts';
// import metrics from '../theme/Metrics';
// import UserLogin from '../assets/signinScreen/userLogin.svg';
// import Colors from '../theme/Colors';
// import {useNavigation} from '@react-navigation/native';
// import navigationStrings from '../constants/navigationStrings';
// import ArrowLeft from '../assets/authenticationScreen/ArrowLeft.svg';

// const LoginHeader: any = ({
// headerText,
// screenNum,
// step2,
// headerDescriptionText,
// data,
// screen,
// onPress,
// rightViewTesxt,
// }: any) => {
//   const navigation: any = useNavigation();
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.topContainer}>
//         <View
//           style={
//             data === 'from-wallet'
//               ? styles.innerContainer2
//               : styles.innerContainer
//           }>
//           <View style={styles.backBtn}>
//             <TouchableOpacity
//               onPress={() => {
//                 screen === 'OrderCardStep2' ? onPress() : navigation.goBack();
//               }}>
//               <ArrowLeft height={15} width={15} />
//             </TouchableOpacity>
//           </View>
//           <View>
//             <Text style={styles.SigninText}>{headerText}</Text>
//           </View>
//           <View>
//             {!!screen && !!rightViewTesxt && screen === 'KYC_ImageUpload' && (
//               <Text style={{color: Colors.Primary, fontSize: 12, fontFamily: 'RedHatDisplay-Medium',}}>{rightViewTesxt}</Text>
//             )}
//           </View>
//         </View>
//         {step2 ? (
//           <View>
//             <TouchableOpacity
//               onPress={() => {
//                 step2 === 'cancel'
//                   ? navigation.goBack()
//                   : navigation.navigate(navigationStrings.STEP6 as any, {
//                       data,
//                       flag: 'skipped',
//                     });
//               }}>
//               <Text style={styles.skipText}>{step2}</Text>
//             </TouchableOpacity>
//           </View>
//         ) : null}
//       </View>

//       <View
//         style={{
//           ...styles.middleContainer,
// paddingTop:
//   screen === 'OrderCard' ||
//   screen === 'KYC_ImageUpload' ||
//   screen === 'OrderCardStep2'
//     ? 0
//     : 50,
//         }}>
//         {data === 'from-wallet' ||
//         screen === 'OrderCard' ||
//         screen === 'KYC_ImageUpload' ||
//         screen === 'OrderCardStep2' ? null : (
//           <Text style={styles.styleText}>
//             STEP {screenNum}
//             <Text style={{color: Colors.Gray_4}}>/5</Text>
//           </Text>
//         )}
//         <Text>{headerDescriptionText}</Text>
//       </View>
//     </View>
//   );
// };

// export default LoginHeader;

// const styles = StyleSheet.create({
//   mainContainer: {
//     paddingVertical: metrics.doubleBasePadding,
//   },
//   innerContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     width: '60%',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   innerContainer2: {
//     display: 'flex',
//     flexDirection: 'row',
//     width: '70%',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   topContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: metrics.mediumPadding,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   backBtn: {
//     backgroundColor: '#ffff',
//     padding: 10,
//     borderRadius: 20,
//   },
//   SigninText: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: Colors.Gray_4,
//   },
//   skipText: {
//     color: Colors.Primary,
//   },
//   styleText: {
//     fontSize: Fonts.size.h1,
//   },
//   middleContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     fontSize: 50,
//     fontFamily: 'RedHatDisplay-SemiBold',
//     justifyContent: 'center',
//     color: '#3D3B44',
//   },
//   SVGContainer: {
//     paddingHorizontal: metrics.regularPadding,
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     paddingVertical: metrics.basePadding,
//     // backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   registerText: {
//     fontSize: 50,
//     fontFamily: 'RedHatDisplay-SemiBold',
//     color: Colors.Primary,
//   },
// });

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Fonts from '../theme/Fonts';
import metrics from '../theme/Metrics';
import UserLogin from '../assets/signinScreen/userLogin.svg';
import Colors from '../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings';
import ArrowLeft from '../assets/authenticationScreen/ArrowLeft.svg';

const LoginHeader: any = ({
  headerText,
  screenNum,
  step2,
  headerDescriptionText,
  data,
  screen,
  onPress,
  rightViewTesxt,
}: any) => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View
          style={
            data === 'from-wallet'
              ? styles.innerContainer2
              : styles.innerContainer
          }>
          <View style={styles.backBtn}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft height={15} width={15} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.SigninText}>{headerText}</Text>
          </View>
        </View>
        {step2 ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                step2 === 'cancel'
                  ? navigation.goBack()
                  : navigation.navigate(navigationStrings.STEP6 as any, {
                      data,
                      flag: 'skipped',
                    });
              }}>
              <Text style={styles.skipText}>{step2}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      <View
        style={{
          ...styles.middleContainer,
          paddingTop:
            screen === 'OrderCard' ||
            screen === 'KYC_ImageUpload' ||
            screen === 'OrderCardStep2'
              ? 0
              : 50,
        }}>
        {data === 'from-wallet' ||
        screen === 'OrderCard' ||
        screen === 'KYC_ImageUpload' ||
        screen === 'OrderCardStep2' ? null : (
          <Text style={styles.styleText}>
            STEP {screenNum}
            <Text style={{color: Colors.Gray_4}}>/5</Text>
          </Text>
        )}
        <Text>{headerDescriptionText}</Text>
      </View>
    </View>
  );
};

export default LoginHeader;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: metrics.doubleBasePadding,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer2: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    paddingHorizontal: metrics.mediumPadding,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 20,
  },
  SigninText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.Gray_4,
  },
  skipText: {
    color: Colors.Primary,
  },
  styleText: {
    fontSize: Fonts.size.h1,
  },
  middleContainer: {
    paddingTop: 50,
    display: 'flex',
    alignItems: 'center',
    fontSize: 50,
    fontFamily: 'RedHatDisplay-SemiBold',
    justifyContent: 'center',
    color: '#3D3B44',
  },
  SVGContainer: {
    paddingHorizontal: metrics.regularPadding,
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingVertical: metrics.basePadding,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 50,
    fontFamily: 'RedHatDisplay-SemiBold',
    color: Colors.Primary,
  },
});
