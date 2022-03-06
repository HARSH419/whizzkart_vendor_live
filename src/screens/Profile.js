import {thisExpression} from '@babel/types';
import {faPeopleArrows} from '@fortawesome/free-solid-svg-icons';
import React , {useState} from 'react';

import {Text, View, SafeAreaView, StyleSheet, ScrollView , Image} from 'react-native';
import { State } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {getProfile} from '../actions';
import { BASE_URL } from '../actions/const';
import Loader from '../components/Loader';


const ImageCard = (props) => {
  const [ImageError, setImageError] = useState(false);

  return (
    <View style={style.imageCard}>
      <Text allowFontScaling={false} style={{fontFamily : 'Poppins-Medium' , textTransform : 'uppercase' , color : '#000' , paddingVertical : 20}}>{props.title}</Text>
<Image style={{width : 300 , height : 300}} source={ ImageError ? {uri : props.Test} :{uri: BASE_URL +"/"+props.name}} onError={() => setImageError(true)}/>
    </View>
  )
}

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoding: true,
      TestImage : 'https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png?w=1200&ssl=1'
    };
  }

  componentDidMount() {
    this.props.getProfile(() => {
      this.setState({isLoding: false});
    });

   
  }

  card(props) {
    return (
      <View style={style.CardContainer}>
        <Text allowFontScaling={false} style={style.TitleText}>{props.title}</Text>
        <Text allowFontScaling={false} style={style.BodyText}> {props.name} </Text>
       
      </View>
    );
  }
  
 

  render() {
    const {profile} = this.props;

    return (
      <SafeAreaView style={style.root}>
        <ScrollView>
        { this.state.isLoding ? <Loader loadingText="Please wait..."/> : <View>
            <Text allowFontScaling={false} style={style.profileText}> ACCOUNT SETTING </Text>
            <View style={style.ImageContainer}>
          { profile?.vendor?.image  ? <Image style={style.ProfileImage} source={{uri : BASE_URL+"/"+profile?.vendor?.image}} />:<Image style={style.ProfileImage} source={require('../images/dish.png')} /> }
            </View>
           
           <View style={style.CardContainerStyle}>
             
             <Text allowFontScaling={false} style={style.TextCard}>Name : {profile.name} </Text>

             <Text allowFontScaling={false} style={style.TextCard}>Email : {profile.email} </Text>
             <Text allowFontScaling={false} style={style.TextCard}>Mobile No : {profile.mobile} </Text>
             </View>
      
          <this.card title="Address" name={typeof profile?.vendor?.address == ('undefined'|| 'null')  ? ' ' : profile?.vendor?.address } />
        <ImageCard Test={this.state.TestImage} title="gst certificate" name={!profile?.vendor?.gst_certificate ?  this.state.TestImage : profile?.vendor?.gst_certificate } /> 
          <ImageCard Test={this.state.TestImage} title="trade license" name={!profile?.vendor?.trade_license ?  this.state.TestImage : profile?.vendor?.trade_license } />
          <ImageCard Test={this.state.TestImage} title="id proof" name={!profile?.vendor?.id_proof ?  this.state.TestImage : profile.vendor?.id_proof } />
          <ImageCard Test={this.state.TestImage} title="fssi license" name={!profile?.vendor?.fssi_license ?  this.state.TestImage : profile?.vendor?.fssi_license} />
          <ImageCard Test={this.state.TestImage} title="address proof" name={!profile?.vendor?.address_proof ?  this.state.TestImage : profile?.vendor?.address_proof } />
          </View> }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  root: {
    backgroundColor: '#FFF',
    height: '100%',
  },
  CardContainer: {
    //   borderColor : 'red',
    //   borderWidth : 2,
    margin: 7,
    minHeight: 80,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#F5F5F5',
    elevation: 5,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  TitleText: {
    flex: 1,
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Medium',
    color : '#000',

    textAlign: 'center',
  },
  BodyText: {
    flex: 3,
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Medium',
    color : '#000'
  },
  profileText : {
    fontFamily : "Poppins-Medium",
   textAlign : 'center',
   marginVertical : 15,
   fontSize : 18
  },
  ProfileImage : {
    width : 300,
    height : 300,
  },ImageContainer : {
    justifyContent : 'center',
    alignItems : 'center'
  },CardContainerStyle : {
    margin : 15,
    padding : 10,
    borderRadius : 10,
    backgroundColor: '#F5F5F5',
    elevation: 5,
  },TextCard : {
     fontFamily : "Poppins-Medium",
     color : "#000",
     paddingHorizontal : 10,
     paddingVertical : 5
  },
  imageCard : {
    justifyContent : 'center',
    alignItems : 'center',
    margin : 5,
    padding : 10,
    borderRadius : 5,
    backgroundColor: '#F5F5F5',
    elevation : 5
  }
});

const mapStateToProps = state => {
  return {profile: state.GetProfile};
};

export default connect(mapStateToProps, {getProfile})(Profile);
