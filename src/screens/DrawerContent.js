import React from 'react';

import {View, Text, StyleSheet, Image,ScrollView} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {connect} from 'react-redux';

import Share from 'react-native-share';
import {Logout, AppLink} from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class DrawerContent extends React.Component {
  componentDidMount() {
    this.props.AppLink();
  }

  myCustomShare = async () => {



    const shareOptions = {
      message: this.props.shareLink.vendor_app_link,
      // url: files.appLogo,
      // urls: [files.image1, files.image2]
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  render() {
    return (
      <View  style={style().root}>
        <View style={style().ImageContainer}>
          <Image style={style().Image} source={require('../images/logo.png')} />
        </View>

        <ScrollView style={{height : '100%'}}>
        <View style={{marginTop: 20}}>
          <DrawerItem
            icon={() => (
              <FontAwesomeIcon icon={faHome} size={30} color="#E8AA27"/>
            )}
            labelStyle={style().MyProfile}
            label="Dashboard"
            onPress={()=> this.props.navigation.navigate('Home')}
          />
        </View>



        <View style={{marginTop: 20}}>
          <DrawerItem
            icon={() => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../images/myprofile.png')}
              />
            )}
            labelStyle={style().MyProfile}
            label="My profile"
            onPress={()=> this.props.navigation.navigate('Dashboard',{screen : 'Account'})}
          />
        </View>
        <View style={style().DrawerMargin}>
          <DrawerItem
            icon={() => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../images/share.png')}
              />
            )}
            labelStyle={style().MyProfile}
            label="Share app"
            onPress={() => this.myCustomShare()}
          />
        </View>
        <View style={style().DrawerMargin}>
          <DrawerItem
            icon={() => (
              <Image
                style={{width: 25, height: 25, padding: 3}}
                source={require('../images/call.png')}
              />
            )}
            labelStyle={style().MyProfile}
            label="Raise a query"
            onPress={() => this.props.navigation.navigate('Raise a query')}
          />
        </View>
        <View style={style().DrawerMargin}>
          <DrawerItem
            icon={() => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../images/Tc.png')}
              />
            )}
            labelStyle={style().MyProfile}
            label="Terms & Condition"
            onPress={() => this.props.navigation.navigate('Terms & Conditions')}
          />
        </View>

        <View style={style().DrawerMargin}>
          <DrawerItem
            icon={() => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../images/privacy.png')}
              />
            )}
            labelStyle={style().MyProfile}
            label="Privacy Policy"
            onPress={() => this.props.navigation.navigate('Privacy policy')}
          />
        </View>

        <View style={style().DrawerMargin}>
          <DrawerItem
            icon={() => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../images/info.png')}
              />
            )}
            labelStyle={style().MyProfile}
            label="About"
            onPress={() => this.props.navigation.navigate('AboutApp')}
          />
        </View>

        <View style={style().DrawerMargin}>
          <DrawerItem
            icon={() => (
              <Image
                style={{width: 25, height: 25}}
                source={require('../images/logout.png')}
              />
            )}
            labelStyle={style().MyProfile}
            label="Logout"
            onPress={() => this.props.Logout()}
          />
        </View>

        </ScrollView>

      </View>
    );
  }
}

const style = () =>
  StyleSheet.create({
    root: {
      backgroundColor: '#185574',
      flex: 1,
    },
    ImageContainer: {
      backgroundColor: '#FFF',
      //   borderColor : 'red',
      //   borderWidth : 2,
      justifyContent: 'center',
      height: 90,
      paddingHorizontal: 10,
      marginTop: 50,
    },
    Image: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    MyProfile: {
      color: '#FFF',
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    DrawerMargin: {
      marginTop: 15,
    },
  });

const mapStateToProps = state => {
  return {shareLink: state.ShareAppLink};
};

export default connect(mapStateToProps, {Logout, AppLink})(DrawerContent);
