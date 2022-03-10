import React from 'react';

import {Modal, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Field, reduxForm, reset} from 'redux-form';
import CustomTextInput from '../CustomTextInput';
import Geolocation from '@react-native-community/geolocation';
import {getProfile, UpdateAddress} from '../../actions';
import {connect} from 'react-redux';


class UpdateAddressModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: '',
      lon: '',
      address: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    // this.onRegister = this.onRegister.bind(this);
  }

  async onSubmit(values) {
    // const {Address} = values;
    // this.state.address;
    if (this.state.address != '') {
      UpdateAddress({...this.state.address},()=>{
        // this.getProfile()
        this.props.onPress()
      })
      // const trade = await RNFS.readFile(Trade.uri, 'base64');
      // const CC = await RNFS.readFile(CancelCheque.uri, 'base64');
      // const fssi = await RNFS.readFile(FSSI.uri, 'base64');
      // const gstC = await RNFS.readFile(gst.uri, 'base64');
      // const Id = await RNFS.readFile(IDproof.uri, 'base64');
      // const add = await RNFS.readFile(AddProof.uri, 'base64');

      
    }
  }

  getlocation() {
    // console.log('Condition', from === undefined);
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords);
        // setLocation({ ...position?.coords });
        // setIsLocationEnabled(true);

        // Get User Coordinates
        dispatch(
          this.setState({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }),
        );
      },
      error => {
        console.error('Code', error.code, 'Message', error.message);
      },
      {enableHighAccuracy: false, timeout: 20000},
    );
  }

  componentDidMount() {
    if (lat == '' || lon == '') {
      this.getlocation();
    }
  }
  render() {
    return (
      <Modal transparent={true} visible={this.props.isVisible}>
        <View style={style().root}>
          <View style={style().container}>
            <View style={style().imfomationContainer}>
              <Text allowFontScaling={false} style={style().infoText}>
                Update Address
              </Text>
              <CustomTextInput
                placeholder={'Address'}
                input={{
                  value: this.state.address,
                  onChange: e => {
                    this.setState({address: e});
                  },
                  // onChange: ()=> => {
                  //     this.setState({address: e});
                  //   }}
                }}
              />
            </View>
            <View style={style().buttonContainer}>
              <TouchableOpacity onPress={this.props.onPress}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    textAlign: 'right',
                    paddingHorizontal: 15,
                    fontFamily: 'Poppins-Bold',
                    color: '#E85757',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const style = () =>
  StyleSheet.create({
    root: {
      backgroundColor: '#000000aa',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      height: 160,
      width: 300,
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 15,
    },
    imfomationContainer: {
      flex: 1,
      // borderWidth : 2,
      // borderColor : 'red',
      justifyContent: 'center',
      padding: 3,
      alignItems: 'center',
    },
    buttonContainer: {
      // borderWidth : 2,
      // borderColor : 'red'
    },
    infoText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      color: '#000',
    },
  });

export default connect(null, {UpdateAddress, getProfile})(UpdateAddressModal);

// export default UpdateAddressModal;
