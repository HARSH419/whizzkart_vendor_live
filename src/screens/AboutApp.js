import React, { Component } from 'react'
import {WebView } from 'react-native-webview';
import {Text, View, StyleSheet, SafeAreaView, ScrollView , Dimensions} from 'react-native';



const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default class AboutApp extends Component {
    render() {
        return (
            <SafeAreaView style={style().root}>
        <View style={{height :'100%'}}>
          <WebView style={style().webview} javaScriptEnabled={true} originWhitelist={['*']} scalesPageToFit={true} source={ {uri : 'http://whizzkart.in/about/app/vendor' || 'https://whizzkart.in/about/app/vendor'}} />
          
        </View>
      </SafeAreaView>
        )
    }
}

const style = () =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },webview :{
      height : deviceHeight,
      width : deviceWidth,
    
    }
  });
