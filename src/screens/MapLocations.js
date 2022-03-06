import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet,TouchableOpacity} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Loader from '../components/Loader';

import { GoogleRevGeocode ,GooglePlaceCode} from '../actions'
const {height, width} = Dimensions.get('screen');
const ASPECT_RATIO = width / height;


export const FONT_POPP = {
  REGULAR : 'Poppins-Regular',
  MEDIUM : 'Poppins-Medium',
  BOLD : 'Poppins-Bold'
}

export const BORDER_TEST = {
  borderColor : 'red',
  borderWidth : 2

}

export const COLOR = {
  RED : '#E84341',
  BLACK : "#000",
  WHITE : "#FFF",
  GREY : "#CDCDCD",
  BLUE : '#588094'
}


class MapLocations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      isloading: true,
      isAddressLoad : false
    };
    this.Map = this.Map.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  componentDidMount() {
    
    this.props.GooglePlaceCode(this.props.Id, () => {
      const northeastLat = parseFloat(
        this.props.placeCode.geometry.viewport.northeast.lat,
      );
      const southwestLat = parseFloat(
        this.props.placeCode.geometry.viewport.southwest.lat,
      );
      const latDelta = northeastLat - southwestLat;
      const lngDelta = latDelta * ASPECT_RATIO;
      this.setState({
        region: {
          latitude: this.props.placeCode.geometry.location.lat,
          longitude: this.props.placeCode.geometry.location.lng,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        },
        isloading: false,
      });
    });
  }

  onChangeValue(reg) {

    this.setState({isAddressLoad : false})
    const {region} = this.state;
    this.setState({
     region: reg,
    });

    console.log(reg);

    this.props.GoogleRevGeocode(region.longitude , region.latitude , () =>{
this.setState({
  isAddressLoad : true
})
    })
  }

  Map() {
   
    return (
      <View
        style={{
          height: (60 / 100) * height,
          width: '100%',
       
        }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onChangeValue}
        />
        <View style={{top: '50%', left: '50%', position: 'absolute', marginLeft : -24 ,marginTop : -24}}>
          <Ionicons color={COLOR.BLACK} name="pin-sharp" size={40} />
        </View>
      </View>
    );
  }

  cardBox() {
    return (
      <View style={styles.RootCardContainer}>
        <Text allowFontScaling={false} 
          style={{
            fontFamily: FONT_POPP.MEDIUM,
            fontSize: 18,
            color: '#E84341',
            marginHorizontal: 20,
          }}>
          Select location
        </Text>
        <View style={{marginVertical : 10}}>
          <Text allowFontScaling={false} 
            style={{
              fontFamily: FONT_POPP.REGULAR,
              color: '#000',
              marginHorizontal: 15,
            }}>
            YOUR LOCATION
          </Text>
          <View style={{flexDirection : 'row' , marginHorizontal: 5 , marginVertical : 10}}>
              <Text allowFontScaling={false}   style={{flex : 1 ,fontFamily: FONT_POPP.REGULAR,
              color: '#000', marginLeft : 10}}>{this.state.isAddressLoad ? this.props.address[0].formatted_address : 'Loading..'}</Text>
              <TouchableOpacity onPress={this.props.change}>
              <Text allowFontScaling={false}  style={{fontFamily: FONT_POPP.MEDIUM,
              color: '#E84341',}}>change</Text>
              </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={this.props.onPress} style={{justifyContent : 'center', alignItems : 'center' , ...BORDER_TEST, height : 50, borderRadius : 10 , backgroundColor : '#E84341'}}>
            <Text allowFontScaling={false}  style={{fontFamily: FONT_POPP.MEDIUM , color :'#FFF' , fontSize : 16}}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  saveAddress(){

    // console.log(this.props.address);
    // this.props.confirmAddress(this.props.address[0] , ()=> {

    //   this.props.navigation.navigate('Home')
    // });
  }
  render() {
    return (
      <View style={{flex : 1}}>
        {this.state.isloading ? <Loader /> : this.Map()}

        {this.cardBox()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  RootCardContainer: {
    backgroundColor: '#FFF',
   height: (32 / 100) * height,
    elevation: 5,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
    width : '100%',
    position : 'absolute',
    bottom : 0
  },
});

const mapStateToProps = state => {
  return {placeCode: state.GooglePlaceCode,
  address : state.GoogleRevGeocode};
};

export default connect(mapStateToProps, {GooglePlaceCode , GoogleRevGeocode })(MapLocations);
