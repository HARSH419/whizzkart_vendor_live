import React, {Component} from 'react';
import {View, Text , TouchableOpacity, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {imagedata} from '../actions'
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get('window').height;

export class CameraAndGalleryPicker extends Component {

    constructor(props){
        super(props);

        this.state={
            isVisible : true,
            imageData : null
        }
        this.Picker = this.Picker.bind(this);
    }

Picker () {

    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64 : true
      }).then(image => {
        this.setState({isVisible : false});
       // this.props.navigation.goBack();
       //   console.log(image)
    this.setState({imageData : image})
 this.props.imagedata(image);
 // this.props.imageInfo(this.state.imageData)

      });
}

cameraOpen () {

    ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64 : true
      }).then(image => {
        this.setState({imageData : image})
        this.props.imagedata(image);
      });
}

  render() {
    
    return (
      <Modal deviceHeight={deviceHeight} deviceWidth={deviceWidth} useNativeDriver={true} isVisible={this.props.isVisible} style={{marginVertical : 0 , flex : 1}}>
        <View style={{flex: 1, justifyContent : 'flex-end'}}>
          <View style={{backgroundColor: '#FFF',width : '100%', height: 250 ,borderTopLeftRadius : 30 , borderTopRightRadius : 30, justifyContent : 'center' , alignItems :'center'}}>
              <TouchableOpacity  onPress={() => this.cameraOpen()} style={{height : 50 ,marginVertical : 10, width : 200 , marginHorizontal : 10 , backgroundColor : '#E84341' , justifyContent : 'center' , alignItems : 'center' , borderRadius : 10 }}>
              <Text allowFontScaling={false} style={{fontFamily : 'Poppins-Medium' , color : '#FFF'}}>CAMERA</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.Picker()} style={{height : 50 ,marginVertical : 10, width : 200 , marginHorizontal : 10 , backgroundColor : '#E84341' , justifyContent : 'center' , alignItems : 'center' , borderRadius : 10 }}>
              <Text allowFontScaling={false} style={{fontFamily : 'Poppins-Medium' , color : '#FFF'}}>GALLERY</Text>

              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.close} style={{height : 50 ,marginVertical : 10, width : 200 , marginHorizontal : 10 , backgroundColor : '#000' , justifyContent : 'center' , alignItems : 'center' , borderRadius : 10 }}>
              <Text allowFontScaling={false} style={{fontFamily : 'Poppins-Medium' , color : '#FFF'}}>CANCEL</Text>

              </TouchableOpacity>
           
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    imagedata
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CameraAndGalleryPicker);
