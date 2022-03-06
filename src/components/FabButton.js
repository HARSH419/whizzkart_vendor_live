import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
class Fab extends React.Component {

    constructor(props){

    super(props);
    this.state = { isVisible  : true}
        

    }


  render() {
    return (
      <TouchableOpacity style={style(this.props.visible, this.props.right , this.props.bottom, this.props.backgroundColor).rootContainer} onPress={this.props.onPress}>
        <View >

        <FontAwesomeIcon icon={this.props.icon ? this.props.icon:faPlusSquare} color="#FFF"  size={20}/>

        </View>
      </TouchableOpacity>
    );
  }
}

const style = ( d , rightA , bottomA, color) =>
  StyleSheet.create({
    rootContainer: {
      width: 50,
      height: 50,
      backgroundColor: color ? color : 'red',
      borderRadius: 80,
      position: 'absolute',
      zIndex: 999,

      bottom: bottomA ? bottomA : '5%' ,
      right:  rightA ? rightA :'10%',
      justifyContent : 'center',
      alignItems : 'center',
    display : d ? 'flex' : 'none'
    }
  });

export default Fab;
