import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class EmptyList extends Component {
    render() {
        return (
            <View style={{flex : 1 ,marginVertical : 100, width : '100%' , justifyContent : 'center' , alignItems : 'center'}}>
               <View style={{flex : 1 , height : '100%', justifyContent : 'center' , alignItems : 'center'}}>
                   <FontAwesomeIcon icon={faFolderOpen} size={80} color={'#BCBCBE'}/>
                   <Text style={{fontFamily :  'Poppins-Bold' , color : '#BCBCBE', fontSize : 18 , }}>Empty List</Text>
               </View>
            </View>
        )
    }
}
