import React from "react";

import {View , ActivityIndicator , StyleSheet ,Text} from 'react-native'

class Loader extends React.Component {



render(){

return (
    <View style={styles.loadingBG}>
    <ActivityIndicator
      animating={true}
      color="black"
      size="large"
      style={{margin: 15}}
    />
    <Text allowFontScaling={false} style={styles.loadingText}>
          {this.props.loadingText} 
        </Text>
    </View>

)

}


}

const styles = StyleSheet.create({

  loadingBG : {
    justifyContent : "center",
    alignContent : "center",
    flex: 1
  },loadingText : {
justifyContent : 'center',
alignItems : 'center',
textAlign : 'center',
fontSize : 18,
fontFamily : "Poppins-Regular",
color : "#000"
  }


})

export default Loader;