import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import LogoImage from '../components/login_logout/Logo.image';

import CustomTextInput from '../components/CustomTextInput';
import {connect} from 'react-redux';
import TextLink from '../components/TextLink';
import ErrorModal from '../components/ErrorModal';
import {Field, reduxForm} from 'redux-form';
import CustomButtonNoIcon from '../components/CustomButtonNoIcon';
import validator from 'validator';
import Loader from '../components/Loader';
import {Auth} from '../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {LoginForm , Auth , ErrorClose} from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      isKeyboardOpen: false,
      isLoading: false,
      isVisible: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.keybordOpen();
    this.keybordClose();
  }

  keybordOpen() {
    Keyboard.addListener('keyboardDidShow', () =>
      this.setState({isKeyboardOpen: true}),
    );
  }

  keybordClose() {
    Keyboard.addListener('keyboardDidHide', () =>
      this.setState({isKeyboardOpen: false}),
    );
  }

  //Login

 async onSubmit(values) {
    const {Email, Password} = values;
    this.setState({isLoading: true});

    const fcm = await AsyncStorage.getItem('fcmToken')
    this.props.Auth(Email, Password,fcm , e => {
      this.setState({isLoading: false});
      console.log(e);
      if (e.code == 423) {
        Alert.alert('Error ', e.error);
      } else if (e.code == 407) {
        this.props.navigation.navigate('NotVerify');
      }
    });
  }

  render() {
    let isSecure = this.state.isSecure;
  //  let k = this.state.isKeyboardOpen;

    return (
      <KeyboardAvoidingView enabled behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View style={style().container}>
          {/* <ErrorModal  msg={this.props.isError.error} isVisible={this.props.isError.visible} onPress={()=> this.props.ErrorClose()} /> */}
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}>
             <LogoImage width={170} height={170} padding={3} />
          </View>


          <View  style={style().card}>
            <Text style={style().loginText}>Login</Text>
            <View>
              <Field
                placeholder="Email or Mobile"
                name="Email"
                component={CustomTextInput}
              />
              <Field
                placeholder="Password"
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

              <TextLink
                fontSize={12}
                text="Forgot Password?"
                textalign={'right'}
                padding={10}
                alignItem={'flex-end'}
                onPress={() => this.props.navigation.navigate('ForgetPassword')}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10,
                marginVertical: 5,
              }}>
              {this.state.isLoading ? (
                <Loader />
              ) : (
                <CustomButtonNoIcon
                  width={180}
                  title={'Sign in'}
                  onPress={this.props.handleSubmit(this.onSubmit)}
                />
              )}
            </View>

            <View style={style().RegisterLinkContainer}>
              <Text style={style().donthaveaccount}>
                Don't have an account?
              </Text>
              <TextLink
                fontSize={12}
                text="Register"
                color="#ECBB60"
                padding={0}
                onPress={() => this.props.navigation.navigate('Register')}
              />
            </View>
          </View>
          
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const style = flex =>
  StyleSheet.create({
    container: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins-Regular',
    },
    card: {
      
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
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    loginText: {
      fontSize: 15,
      fontWeight: '800',
      color: '#588094',
      width: '100%',
      fontFamily: 'Poppins-Medium',
      textAlign: 'center',
      marginBottom: 20,
    },
    RegisterLinkContainer: {
      display: 'flex',
      flexDirection: 'row',

      justifyContent: 'center',
    },
    donthaveaccount: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'row',
      margin: 5,
      fontSize: 12,
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth: 2,
      // borderColor : 'red',
      fontFamily: 'Poppins-Regular',
      color: '#000',
    },
  });

const validate = values => {
  let errors = {};

  if (!values.Email) {
    errors.Email = 'Required';
  } else if (!validator.isEmail(values.Email)) {
    errors.Email = 'Invalid email address';
  }

  if (!values.Password) {
    errors.Password = 'Required';
  }

  // else if ( Number( values.Password) < 8) {
  //   errors.Password = 'must be strong password';
  // }

  return errors;
};

const mapStateToProps = state => {
  return {loginInput: state.LoginForm, isError: state.Login};
};

export default reduxForm({
  form: 'Login',
  validate: validate,
})(connect(mapStateToProps, {Auth})(Login));
