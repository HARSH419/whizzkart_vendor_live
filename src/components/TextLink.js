import React from "react";

import {View , Text , TouchableOpacity , StyleSheet} from 'react-native';

class TextLink extends React.Component {

    render(){
        return (
            <View style={style(this.props.justifyContent, this.props.alignItem).container}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text allowFontScaling={false} style={style(this.props.textalign ,this.props.padding , this.props.fontsize , this.props.color , this.props.textDecoration).textStyle}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>

        );
    }




}

const style = (textalign , padding , fontsize , color , alignItem , justifyContent , textDecoration) =>StyleSheet.create({

    container:{

        justifyContent: typeof justifyContent == ('undefined' || 'null' ) ? 'center' : justifyContent,
        alignItems: typeof alignItem == ('undefined' || 'null' ) ? alignItem : 'center',
   
       
    },
    
    textStyle : {
        textDecorationLine : textDecoration == true ? 'underline' : 'none',
        textAlign : typeof textalign == ('undefined' || 'null') ? 'center' :textalign,
        padding : typeof padding == ('undefined' || 'null') ? 5 : padding,
        fontSize : typeof fontsize ==('undefined' || 'null') ? 12 : fontsize,
        color : typeof color == ('undefined' || "null") ? '#000' : color,
     
        fontFamily : 'Poppins-Regular',

    }




}) 
;

export default TextLink