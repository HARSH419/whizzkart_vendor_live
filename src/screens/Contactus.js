import {faFile, faUser} from '@fortawesome/free-regular-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import validator from 'validator';

import {
 
  View,
  StyleSheet,
ScrollView,
  TextInput,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/login_logout/Button.custom';
import { Field, reduxForm , reset  } from 'redux-form';

import {ContactusForm , sendContact} from '../actions';

class Contactus extends React.Component {

  constructor(props){
    super(props)

    this.state={
      des : ''
    }

    this.onSubmit = this.onSubmit.bind(this);

  }


onSubmit(values , dispatch){
  const {Name , Email , Mobile, Subject} = values;
  this.props.sendContact(Name,Email,Mobile,Subject,this.state.des,
    
    ()=>{

     dispatch( reset('contactForm'));
     this.setState({des : ''})
Alert.alert('Thank you' , 'your submission has been sent' ,[{
  text : 'Ok',
  onPress : () =>this.props.navigation.navigate('Home')
}])

    } );


}


  render() {
   

    return (
      <ScrollView>
      <View style={style().root}>
          <View style={style().textContainer}>
          <Field
          component={CustomTextInput}
          placeholder="Name"
          name={'Name'}
         
        />
         <Field
         component={CustomTextInput}
          placeholder="Email"
          icon={'mail'}
          name={'Email'}
      
        />
        <Field
        component={CustomTextInput}
          placeholder="Mobile"
          name={'Mobile'}
        />
        <Field
        component={CustomTextInput}
          placeholder="Subject"
          name={'Subject'}
          
          
        
        />
        <View style={style().textAreaContainer}>
        <TextInput style={style().textArea}
          placeholder="Description"
          multiline={true}
          numberOfLines={6}
          style={{color : '#000'}}
          onChangeText={(e) => this.setState({des : e})}
          defaultValue={this.state.des}
       
        
        />
      
        </View>
      
        <View style={{marginVertical : 15 , justifyContent : 'center' , alignItems : 'center'}}>
        <CustomButton title="Send" width={200} onPress={this.props.handleSubmit(this.onSubmit)}/>
        </View>
      
        
          </View>
       
      </View>
      </ScrollView>
    );
  }
}
const style = () =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer : {
        width : 300
    },textArea : {
       fontFamily : 'Poppins-Regular',
       fontSize : 16,
       
    
        width: '100%',
        textAlign :'center'

    },textAreaContainer :{
        textAlign : 'center',
        // borderColor : 'red',
        // borderWidth : 2,
        // borderRadius : 5
        backgroundColor : '#FFF',
        borderRadius : 15 ,
        padding : 5,
        justifyContent : 'center',
        alignItems : 'center',
        
    }
  });

const mapStateToProps = state => {
  return {data: state.contactus};
};
const validate = values => {
  let errors = {};

  if (!values.Email) {
    errors.Email = 'Required';
  } else if (!validator.isEmail(values.Email)) {
    errors.Email = 'Invalid email address';
  }

  if (!values.Name) {
    errors.Name = 'Required';
  }

  if (!values.Mobile) {
    errors.Mobile = 'Required';

  }else if(!validator.isMobilePhone('+91' + Number(values.Mobile))){
    errors.Mobile = 'Invalid Mobile number ';
  }

  if (!values.Password) {
    errors.Password = 'Required';
  }
  if(!values.Subject){
    errors.Subject = "Required";
  }
  

  return errors;
};
export default
reduxForm({
  form : 'contactForm', 
  validate : validate
})(

connect(mapStateToProps, {ContactusForm , sendContact})(Contactus));
