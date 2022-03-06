import React from 'react';

import {   Text, TouchableOpacity , StyleSheet, View} from 'react-native';

class CustomButtonNoIcon extends React.Component {
  render() {
    return <View>
    
    <TouchableOpacity disabled={this.props.disable ? true : false}
            style={style(this.props.backgroundColor , this.props.width , this.props.padding, this.props.marginHorizontal).buttonStyle}
            onPress={this.props.onPress}>
            <Text style={{color : typeof this.props.color == ("undefined"|| "null") ? '#FFFFFF' : this.props.color,
              fontFamily : 'Poppins-Regular',
              textAlign :'center',
              textAlignVertical : 'center'
            , fontSize:typeof fontsize == ("undefined" || "null") ? 12:fontsize}}>{this.props.title}</Text>
          </TouchableOpacity>
    </View>;
  }
}

const style = ( backgroundColor , width , padding , marginHorizontal) => StyleSheet.create({
    buttonStyle: {
      marginHorizontal : typeof marginHorizontal == ("undefined" || "null") ? 0: marginHorizontal,
        padding: typeof padding == ("undefined" || "null") ? 10 :padding,
        width: typeof width == ("undefined" || "null") ? 120 :width,
        borderRadius: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : typeof backgroundColor == ("undefined" || "null") ? '#E84341' :backgroundColor,
      
      },

});


export default CustomButtonNoIcon;