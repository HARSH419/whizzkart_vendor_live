import React, { Component } from 'react'
import { Text, View  , Image, TouchableOpacity} from 'react-native'

export default class UserNotVerifed extends Component {
    render() {
        return (
            <View style={{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>
                <Image style={{height : 70 , width : 70 , marginVertical : 10}} source={require('../images/close.png')} />
                <Text style={{fontFamily : 'Poppins-Bold', color : '#000' , fontSize : 18}}> Account in Review process</Text>
            <TouchableOpacity style={{}}>
            <Text onPress={()=> this.props.navigation.navigate('LoginScreen')} style={{fontFamily : 'Poppins-Regular' , color : '#FFF' , backgroundColor : '#E84341' , padding : 10 , width : 100 , textAlign : 'center' , borderRadius : 10, marginTop : 30}}>Home</Text>
            </TouchableOpacity>
            </View>
        )
    }
}
