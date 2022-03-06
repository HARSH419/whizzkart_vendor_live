import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  AlertIOS
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/login_logout/Button.custom';
import LogoImage from '../components/login_logout/Logo.image';
import validator from 'validator';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';

import {connect} from 'react-redux';
import {
  ForgetPasswordUserName,
  ForgetPasswordErrorClose,
  VerifyOtpFp,
  IsValidOtp,
  UpdatePassword,
} from '../actions';
import ErrorModal from '../components/ErrorModal';

import {Field, reduxForm} from 'redux-form';
import CustomButtonNoIcon from '../components/CustomButtonNoIcon';

class OtpComponent extends React.Component {
  notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
      AlertIOS.alert(msg);
    }
  }

  code(props) {
    const CELL_COUNT = 4;
    const {error, touched} = props.meta;

    const isErrorVisible = () => {
      return touched && error ? (
        <Text allowFontScaling={false} style={style().errorText}>
          {error}
        </Text>
      ) : null;
    };

    return (
      <View>
        <CodeField
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          {...props}
          onChangeText={props.input.onChange}
          value={props.input.value}
          cellCount={CELL_COUNT}
          rootStyle={style().codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              allowFontScaling={false}
              key={index}
              style={[style().cell, isFocused && style().focusCell]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {isErrorVisible()}
      </View>
    );
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <SafeAreaView>
        <View style={style().container}>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}>
            <LogoImage width={170} height={170} padding={3} />
          </View>

          <View style={style().card}>
            <Text allowFontScaling={false} style={style().loginText}>
              Verification
            </Text>

            <View>
              <Field name="otp" component={this.code} />

              <TouchableOpacity
                onPress={
                  this.props.ResendOTP
                  // this.props.ForgetPasswordUserName(
                  //   this.props.usernameData.username,
                  // )
                }>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'right',
                    paddingHorizontal: 25,
                    paddingBottom: 20,
                    fontSize: 12,
                    color: '#698C9E',
                  }}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>
            {this.props.isLoading ? (
              <LoaderComp />
            ) : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <CustomButtonNoIcon
                  title="Submit"
                  color="#FFF"
                  width={200}
                  backgroundColor="#E84341"
                  onPress={handleSubmit(this.props.onPress)}
                />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      isKeyboardOpen: false,
      Otp: '',
      UserName: '',
      NewPassword: '',
      ConfirmPassword: '',
      error: '',
      typeSwitch: 1,
      isloading: false,
    };
    this.newPassword = this.newPassword.bind(this);
    this.ForgetScreen = this.ForgetScreen.bind(this);

    this.usernameSubmit = this.usernameSubmit.bind(this);
    this.saveNewPassword = this.saveNewPassword.bind(this);
  }

  forgetpasswodField(e) {
    if (validator.isEmail(e) || validator.isMobilePhone('+91' + e)) {
      this.setState({UserName: e});
      this.setState({error: ''});
    } else {
      this.setState({error: 'Enter valid email or number'});
    }
  }

  usernameSubmit(values) {
    this.setState({isloading: true});
    this.props.ForgetPasswordUserName(values.Email, () => {
      this.setState({typeSwitch: 2});

      this.setState({isloading: false});
    });
  }

  ResendOtp = async values => {
    this.setState({isLoading: true});

    // const {Mobile, otp} = values;

    // const fcm = await AsyncStorage.getItem('fcmToken');

    // console.log(values);


 
    this.props.ForgetPasswordUserName(this.props.usernameData.username ,()=>{
      this.setState({isLoading: false});
     // this.setState({Change: 2});
      this.notifyMessage('otp send successfully');
    });
  };

  notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
      AlertIOS.alert(msg);
    }
  }

  onVerify = async (values, dispatch) => {
    this.setState({isLoading: true});

    const {Mobile, otp} = values;

    console.log(this.props);

    this.setState({isloading: true});
    if (!validator.isEmpty(otp)) {
      this.props.VerifyOtpFp(this.props.usernameData.username, otp, (e) => {
        if (e.status == 200) {
          this.setState({typeSwitch: 3});
          this.setState({isloading: false});
          reset('OTP');
        } else if (e.status == 402) {
          this.notifyMessage(e.msg);
          this.setState({isLoading: false});
        } else {
          this.notifyMessage(e.msg);
          this.setState({isLoading: false});
        }
        reset('OTP');
      });
    }
    reset('OTP');
  };

  ForgetScreen() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View style={style().container}>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}>
            <LogoImage width={170} height={170} padding={3} />
          </View>

          <View style={style().card}>
            <Text allowFontScaling={false} style={style().loginText}>
              Forget Password
            </Text>

            <View>
              <Field
                placeholder="Email or Mobile"
                name="Email"
                component={CustomTextInput}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <CustomButtonNoIcon
                width={200}
                title={this.state.isloading ? 'Loading' : 'Reset'}
                color={this.state.isloading ? '#000000' : '#FFF'}
                backgroundColor={this.state.isloading ? '#F5F5F5' : '#E84341'}
                onPress={this.props.handleSubmit(this.usernameSubmit)}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  newPasswordFields(e) {
    this.setState({NewPassword: e});
  }

  confimPasswordFields(e) {
    this.setState({ConfirmPassword: e});
  }

  saveNewPassword(values) {
    if (values.Password == values.ConfirmPassword) {
      this.setState({isloading: true});
      this.setState({error: ''});
      this.props.UpdatePassword(
        this.props.usernameData.username,
        values.ConfirmPassword,
        () => {
          this.setState({typeSwitch: 1});
          this.setState({isloading: false});
          this.props.navigation.navigate('Login');
        },
      );
    } else {
      this.setState({error: 'Password not match'});
      this.setState({isloading: false});
    }
  }

  newPassword() {
    let isSecure = this.state.isSecure;
    return (
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View style={style().container}>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}>
            <LogoImage width={170} height={170} padding={3} />
          </View>

          <View style={style().card}>
            <Text allowFontScaling={false} style={style().loginText}>
              Forget Password
            </Text>

            <View>
              <Field
                placeholder="new Password"
                name="Password"
                icon={isSecure == false ? 'eye' : 'eye-off'}
                secure={isSecure}
                component={CustomTextInput}
                onPress={() => {
                  isSecure == true
                    ? this.setState({isSecure: false})
                    : this.setState({isSecure: true});
                }}
              />
              <Field
                placeholder="Confirm Password"
                name="ConfirmPassword"
                icon={isSecure == false ? 'eye' : 'eye-off'}
                secure={isSecure}
                component={CustomTextInput}
                onPress={() => {
                  isSecure == true
                    ? this.setState({isSecure: false})
                    : this.setState({isSecure: true});
                }}
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <CustomButtonNoIcon
                title={this.state.isloading ? 'Loading' : 'Save'}
                color={this.state.isloading ? '#000000' : '#FFF'}
                backgroundColor={this.state.isloading ? '#F5F5F5' : '#E84341'}
                onPress={this.props.handleSubmit(this.saveNewPassword)}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  OtpSubmit() {
    this.setState({isloading: true});
    if (!validator.isEmpty(this.state.Otp)) {
      this.props.VerifyOtpFp(
        this.props.usernameData.username,
        this.state.Otp,
        () => {
          this.setState({typeSwitch: 3});
          this.setState({isloading: false});
        },
      );
    }
  }

  // OtpComponent() {
  //   const CELL_COUNT = 4;

  //   console.log(this.state.Otp);

  //   return (
  //     <KeyboardAvoidingView enabled behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
  //       <View style={style().container}>
  //         <View
  //           style={{
  //             flex: 2,
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             paddingTop: 20,
  //           }}>
  //           <LogoImage width={170} height={170} padding={3} />
  //         </View>

  //         <View style={style().card}>
  //           <Text allowFontScaling={false} style={style().loginText}>Verification</Text>

  //           <View>
  //             <CodeField
  //               // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
  //               {...props}
  //               onChangeText={props.input.onChange}
  //       value={props.input.value}
  //               cellCount={CELL_COUNT}
  //               rootStyle={style().codeFieldRoot}
  //               keyboardType="number-pad"
  //               textContentType="oneTimeCode"
  //               renderCell={({index, symbol, isFocused}) => (
  //                 <Text allowFontScaling={false}
  //                   key={index}
  //                   style={[style().cell, isFocused && style().focusCell]}>
  //                   {symbol || (isFocused ? <Cursor /> : null)}
  //                 </Text>
  //               )}
  //             />
  //             <TouchableOpacity
  //               onPress={() =>
  //                 this.props.ForgetPasswordUserName(
  //                   this.props.usernameData.username,
  //                 )
  //               }>
  //               <Text allowFontScaling={false}
  //                 style={{
  //                   fontFamily: 'Poppins-Regular',
  //                   textAlign: 'right',
  //                   paddingHorizontal: 25,
  //                   paddingBottom: 20,
  //                   fontSize: 18,
  //                   color: '#698C9E',
  //                 }}>
  //                 Resend OTP
  //               </Text>
  //             </TouchableOpacity>
  //           </View>
  //           <View style={{alignItems : 'center' , justifyContent : 'center'}}>

  //           <CustomButton
  //             title={this.state.isloading ? 'Loading' : 'Submit'}
  //             color={this.state.isloading ? '#000000' : '#FFF'}
  //             backgroundColor={this.state.isloading ? '#F5F5F5' : '#E84341'}
  //             onPress={() => this.OtpSubmit()}
  //           />
  //           </View>

  //         </View>
  //       </View>
  //     </KeyboardAvoidingView>
  //   );
  // }

  renderPage(data) {
    switch (data) {
      case 1:
        return <this.ForgetScreen />;

      case 2:
        return (
          <OTP onPress={this.onVerify} ResendOTP={() => this.ResendOtp()} />
        );

      case 3:
        return <this.newPassword />;

      default:
        return <this.ForgetScreen />;
    }
  }

  render() {
    return (
      <View>
        <ErrorModal
          msg={this.props.usernameData.msg}
          isVisible={this.props.usernameData.register == 'true' ? false : true}
          onPress={() => {
            return this.props.ForgetPasswordErrorClose(() =>
              this.setState({isloading: false}),
            );
          }}
        />
        <ErrorModal
          msg={this.props.Otpdata.msg}
          isVisible={this.props.Otpdata.isvalid ? false : true}
          onPress={() =>
            this.props.IsValidOtp(() => {
              this.setState({isloading: false});
            })
          }
        />
        {this.renderPage(this.state.typeSwitch)}
        {/* <this.newPassword /> */}
      </View>
    );
  }
}

const style = flex =>
  StyleSheet.create({
    container: {
      paddingVertical: 10,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins-Regular',
    },
    card: {
      //paddingVertical : 15,
      height: 270,
      width: '100%',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      padding: 20,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignContent: 'center',
      display: 'flex',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    errorText: {
      fontSize: 12,
      marginHorizontal: 15,
      textAlign: 'right',
      color: 'red',
      marginBottom: 5,
      fontFamily: 'Poppins-Regular',
    },
    loginText: {
      fontSize: 15,
      fontWeight: '800',
      color: '#588094',
      width: '100%',
      fontFamily: 'Poppins-Regular',
      textAlign: 'center',
      marginBottom: 20,
    },

    root: {flex: 1, padding: 40},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20, marginHorizontal: 20, marginVertical: 30},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,

      fontSize: 24,
      borderWidth: 2,
      borderRadius: 10,
      // borderColor: '#00000030',
      color: '#000000',
      textAlign: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },
  });

const validate = values => {
  let errors = {};

  if (!values.Email) {
    errors.Email = 'Required';
  }
  //  else if (!validator.isEmail(values.Email) || !validator.isMobilePhone('+91' + Number(values.Email))) {
  //   errors.Email = 'Invalid Number or Email';
  // }

  if (!values.Name) {
    errors.Name = 'Required';
  }

  if (!values.MobileNumber) {
    errors.MobileNumber = 'Required';
  } else if (!validator.isMobilePhone('+91' + Number(values.MobileNumber))) {
    errors.MobileNumber = 'Invalid Mobile number ';
  }

  if (!values.Password) {
    errors.Password = 'Required';
  }

  if (!values.PasswordConfirm) {
    errors.PasswordConfirm = 'Required';
  }
  if (!values.Password == values.PasswordConfirm) {
    errors.PasswordConfirm = 'Password not match';
    errors.Password = 'Password not match';
  }

  if (!values.Address) {
    errors.Address = 'Required';
  }
  // else if ( Number( values.Password) < 8) {
  //   errors.Password = 'must be strong password';
  // }

  return errors;
};

const v = values => {
  let errors = {};

  const exp = new RegExp('^([0-9]{4}|[0-9]{6})$');

  if (!values.otp) {
    errors.otp = 'Required';
  } else if (!exp.test(parseInt(values.otp))) {
    errors.otp = 'Please enter OTP';
  }

  return errors;
};

const mapStateToProps = state => {
  return {usernameData: state.ForgetPassword, Otpdata: state.VerifyOtp};
};
const OTP = reduxForm({form: 'OTP', validate: v})(OtpComponent);

export default reduxForm({
  form: 'ForgetPassword',
  validate: validate,
})(
  connect(mapStateToProps, {
    ForgetPasswordUserName,
    ForgetPasswordErrorClose,
    VerifyOtpFp,
    IsValidOtp,
    UpdatePassword,
  })(ForgetPassword),
);
