import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LogoImage from '../components/login_logout/Logo.image';

class FirstScreen extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
         <LogoImage/>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text allowFontScaling={false} style={{color : '#FFFFFF' , fontSize:12,   fontFamily : 'Poppins-Regular'}}>Let's Get Start</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  buttonStyle: {
    padding: 10,
    width: 150,
    borderRadius: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : '#185574'
  },
});

export default FirstScreen;
