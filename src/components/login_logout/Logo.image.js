import React from "react";

import {View, Image, StyleSheet} from 'react-native';

class LogoImage extends React.Component {


    render() {

        return (
            <View>
                <Image style={
                        style(this.props.width, this.props.height).imageStyle
                    }
                    source={
                        require("../../images/logo.png")
                    }/>
            </View>

        );
    }


}


export default LogoImage;

const style = (width, height , padding) => {
   

    return StyleSheet.create({


        imageStyle: {
            width: typeof width == 'null' || 'undefined' ? 180 : width,
            height:  typeof height == 'null'||'undefined' ? 180 : height,
            padding: typeof padding == 'undefined'||'undefined' ? 10 : padding,
            resizeMode: 'contain'

        }


    })


}
