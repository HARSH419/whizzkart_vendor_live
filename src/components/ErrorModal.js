import React from 'react';

import {Modal, Text, View, StyleSheet , TouchableOpacity,} from 'react-native';

class ErrorModal extends React.Component {



  render() {

  

    return (
      <Modal transparent={true} visible={this.props.isVisible }>
       
        <View style={style().root}>
          <View style={style().container}>
              <View style={style().imfomationContainer}>
              <Text allowFontScaling={false} style={style().infoText}>{this.props.msg}</Text> 
              </View>
              <View style={style().buttonContainer}>
            <TouchableOpacity onPress={this.props.onPress}>
<Text allowFontScaling={false} style={{fontSize :16 , textAlign : 'right' , paddingHorizontal : 15 , fontFamily : 'Poppins-Bold', color : '#E85757'}}>Close</Text>
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
    container : {
        height : 160,
        width :300,
        backgroundColor : "#FFF",
        borderRadius : 10,
        padding : 15,
      

    },
imfomationContainer : {
    flex : 1,
// borderWidth : 2,
// borderColor : 'red',
justifyContent : 'center',
padding : 3,
alignItems : 'center'
},buttonContainer : {
    // borderWidth : 2,
    // borderColor : 'red' 
},infoText :{
    fontFamily : "Poppins-Regular",
    fontSize : 16,
    color:"#000"
}
  });

export default ErrorModal;
