import React from 'react';

import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import { CameraAndGalleryPicker } from './CameraAndGalleryPicker';



class CustomUploadButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {Name: undefined ,
    
      isVisible : false,
    
    };
    
  }

  render() {
    const name = this.state.Name;

    return (
      <View>
        <CameraAndGalleryPicker isVisible={this.state.isVisible} imagedata={(e)=> {
 this.setState({isVisible : false , Name : e.mime})
          return this.props.imagedata(e) 
         
          
          }} close={()=> this.setState({isVisible : false})}/>
      <TouchableOpacity
        style={style(this.props.backgroundColor, this.props.width).InputStyle}
  
        onPress={()=> this.setState({isVisible : true})}>
        
        <View style={style().container}>
          <Text allowFontScaling={false} style={style(this.props.fontSize).textStyle}>
            {typeof name == ('undefined' || 'null')
              ? this.props.title
              : this.state.Name}
          </Text>

          <FontAwesomeIcon
            icon={this.props.icon == null ? faUser : this.props.icon}
            style={style().icon}
            size={20}
            color="#AAAAAA"
          />
        </View>
      </TouchableOpacity>

  
      </View>
    );
  }
}

const style = (backgroundColor, width, fontsize) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      height: 45,
    },
    InputStyle: {
      fontFamily: 'Poppins-Regular',
      fontSize: 20,
      color: 'black',

      backgroundColor: '#FFFFFF',
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 40,
      marginTop: 10,
      marginVertical :15,
      marginBottom: 10,
    },
    textStyle: {
      color: '#AAAAAA',
      alignItems: 'center',
      fontFamily: 'Poppins-Regular',
      fontSize: typeof fontsize == ('undefined' || 'null') ? 12 : fontsize,

      flex: 1,
      textAlign: 'center',
    },

    icon: {
      marginLeft: 10,
      paddingRight: 10,
      alignSelf: 'center',
      alignContent: 'center',
    },
  });

export default CustomUploadButton;
