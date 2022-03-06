import React from 'react';
import {WebView } from 'react-native-webview';
import {Text, View, StyleSheet, SafeAreaView, ScrollView , Dimensions} from 'react-native';
import { connect } from 'react-redux';
import {TeamAndCondtion} from '../actions';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class TermAndCondtion extends React.Component {

    componentDidMount(){
        this.props.TeamAndCondtion();
    }


  render() {

    const str = this.props.data;

    return (
      <SafeAreaView style={style().root}>
        <View style={{height :'100%'}}>
          <WebView style={style().webview} javaScriptEnabled={true} originWhitelist={['*']} scalesPageToFit={true} source={ {uri : 'http://whizzkart.in/term-condition/app/vendor' || 'https://whizzkart.in/term-condition/app/vendor'}} />
          
        </View>
      </SafeAreaView>
    );
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

const mapStateToProps = (state) =>{

    return { data : state.Tnc}
}

export default connect(mapStateToProps, {TeamAndCondtion})( TermAndCondtion);
