import React from "react";

import { View ,Image , StyleSheet} from 'react-native';


class IconComponent extends React.Component {

render(){

    return <View>
        <Image style={style().image} source={this.props.src}/>
    </View>

}

}

const style = ()=> StyleSheet.create({

    image : {

        height : 30,
        width:30,
        padding : 5,
    }


});

export default IconComponent;