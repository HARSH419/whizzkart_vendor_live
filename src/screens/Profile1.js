import {thisExpression} from '@babel/types';
import {faPeopleArrows} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import {State, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {getProfile, UpdateProfileStatus} from '../actions';
import {BASE_URL} from '../actions/const';
import Loader from '../components/Loader';
import MapLocations from './MapLocations';
import PlaceSearch, { COLOR, FONT_POPP } from './PlaceSearch';


const ImageCard = props => {
  const [ImageError, setImageError] = useState(false);

  return (
    <View style={style.imageCard}>
      <Text
        allowFontScaling={false}
        style={{
          fontFamily: 'Poppins-Medium',
          textTransform: 'uppercase',
          color: '#000',
          paddingVertical: 20,
        }}>
        {props.title}
      </Text>
      <Image
        style={{width: 300, height: 300}}
        source={
          ImageError ? {uri: props.Test} : {uri: BASE_URL + '/' + props.name}
        }
        onError={() => setImageError(true)}
      />
    </View>
  );
};

class Profile1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoding: true,
      TestImage:
        'https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png?w=1200&ssl=1',
      updateModal: false,
      isPlaceModelOn: false,
      placeId: null,
      isMapModelOn: false,
      PageSelectorValue: 1,
    };
    console.log("this.state",this.state);
  }


  componentDidMount() {
    this.props.getProfile(() => {
      this.setState({isLoding: false});
    });
  }

  card(props) {
    return (
      <View style={style.CardContainer}>
        <Text allowFontScaling={false} style={style.TitleText}>
          {props.title}
        </Text>
        <Text allowFontScaling={false} style={style.BodyText}>
          {' '}
          {props.name}{' '}
        </Text>
      </View>
    );
  }

  FirstPage() {
    // let isSecure = this.state.isSecure;
    const {profile} = this.props;

    return (
      <SafeAreaView style={style.root}>
        <ScrollView>
          {this.state.isLoding ? (
            <Loader loadingText="Please wait..." />
          ) : (
            <View>
              {/* {this.ModalMap()} */}
              <Text allowFontScaling={false} style={style.profileText}>
                {' '}
                ACCOUNT SETTING{' '}
              </Text>
              <View style={style.ImageContainer}>
                {profile?.vendor?.image ? (
                  <Image
                    style={style.ProfileImage}
                    source={{uri: BASE_URL + '/' + profile?.vendor?.image}}
                  />
                ) : (
                  <Image
                    style={style.ProfileImage}
                    source={require('../images/dish.png')}
                  />
                )}
              </View>

              <View style={style.CardContainerStyle}>
                <Text allowFontScaling={false} style={style.TextCard}>
                  Name : {profile.name}{' '}
                </Text>

                <Text allowFontScaling={false} style={style.TextCard}>
                  Email : {profile.email}{' '}
                </Text>
                <Text allowFontScaling={false} style={style.TextCard}>
                  Mobile No : {profile.mobile}{' '}
                </Text>
                <Text allowFontScaling={false} style={style.TextCard}>
                  Status : {profile.status}{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      profile.status == 'Active'
                        ? 'Press Yes to InActivate YourSelf'
                        : 'Press Yes to Activate YourSelf',
                      '',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log("Don't Do Anything"),
                          style: 'cancel',
                        },

                        {
                          text: 'Yes',
                          onPress: () => {
                            this.props.UpdateProfileStatus(
                              profile.status == 'Active'
                                ? 'InActive'
                                : 'Active',
                              () => {
                                this.setState({isLoding: true});
                                this.props.getProfile(() => {
                                  this.setState({isLoding: false});
                                });
                              },
                            );
                            // Alert.alert('Product status change successfully');
                          },
                          style: 'cancel',
                        },
                      ],
                    );
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      style.TextCard,
                      {alignSelf: 'center', fontSize: 15},
                    ]}>
                    Update Status
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // this.setState({updateModal: false});
                    // this.selectMap();
                    // this.setState({isPlaceModelOn: true})
                    this.setState({
                      PageSelectorValue: 2,
                    });
                    // this.PageSelector(2)
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      style.TextCard,
                      {alignSelf: 'center', fontSize: 15},
                    ]}>
                    Update Address
                  </Text>
                </TouchableOpacity>
              </View>

              <this.card
                title="Address"
                name={
                  typeof profile?.vendor?.address == ('undefined' || 'null')
                    ? ' '
                    : profile?.vendor?.address
                }
              />
              <ImageCard
                Test={this.state.TestImage}
                title="gst certificate"
                name={
                  !profile?.vendor?.gst_certificate
                    ? this.state.TestImage
                    : profile?.vendor?.gst_certificate
                }
              />
              <ImageCard
                Test={this.state.TestImage}
                title="trade license"
                name={
                  !profile?.vendor?.trade_license
                    ? this.state.TestImage
                    : profile?.vendor?.trade_license
                }
              />
              <ImageCard
                Test={this.state.TestImage}
                title="id proof"
                name={
                  !profile?.vendor?.id_proof
                    ? this.state.TestImage
                    : profile.vendor?.id_proof
                }
              />
              <ImageCard
                Test={this.state.TestImage}
                title="fssi license"
                name={
                  !profile?.vendor?.fssi_license
                    ? this.state.TestImage
                    : profile?.vendor?.fssi_license
                }
              />
              <ImageCard
                Test={this.state.TestImage}
                title="address proof"
                name={
                  !profile?.vendor?.address_proof
                    ? this.state.TestImage
                    : profile?.vendor?.address_proof
                }
              />
            </View>
          )}
        </ScrollView>
        {/* <ErrorModal
          // msg={this.props.Otpdata.msg}
          isVisible={this.state.updateModal}
          onPress={() => this.setState({updateModal: false})}
        /> */}
      </SafeAreaView>
    );
  }

  ModalSearch() {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationInTiming={300}
        animationOut={'slideOutDown'}
        isVisible={this.state.isPlaceModelOn}
        style={{margin: 0}}>
        <PlaceSearch
          onPress={() =>
            this.setState({
              isPlaceModelOn: false,
            })
          }
          SearchCard={e =>
            this.setState({
              placeId: e,
              isPlaceModelOn: false,
              isMapModelOn: true,
            })
          }
        />
      </Modal>
    );
  }

  ModalMap() {
    return (
      <Modal isVisible={this.state.isMapModelOn} style={{margin: 0}}>
        <MapLocations
          Id={this.state.placeId}
          onPress={() => {
            console.log('enter MapLocations');
          }}
          change={() =>
            this.setState({
              isPlaceModelOn: true,
              isMapModelOn: false,
            })
          }
        />
      </Modal>
    );
  }

  PageTwo() {
    return (
      <View
        style={{
          backgroundColor: '#FFF',
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        {this.ModalSearch()}
        {this.ModalMap()}
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: '#000',
            marginVertical: 15,
            fontSize: 14,
            textTransform: 'uppercase',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Add Your store location
        </Text>
        <Image
          style={{
            height: 150,
            width: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={require('../images/map.png')}
        />

        <TouchableOpacity
          onPress={() => this.setState({isPlaceModelOn: true})}
          style={{
            backgroundColor: '#EE3840',
            width: 150,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 40,
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: '#FFF',
              marginVertical: 15,
              fontSize: 14,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  PageSelector(d) {
    switch (d) {
      case 1:
        return this.FirstPage();

      case 2:
        return this.PageTwo();

      default:
        return this.FirstPage();
    }
  }

  // selectMap() {
  //   // this.setState({isPlaceModelOn: true});
  //   setTimeout(() => {
  //     this.PageTwo();
  //   }, 2000);
  // }

  render() {
    const {profile} = this.props;

    return (
      <SafeAreaView
        style={this.state.PageSelectorValue !==1 ? {flex: 1, alignItems: 'center', backgroundColor: '#FFF'} : {}}>
        {/* <ErrorModal
          msg={this.state.error}
          isVisible={this.state.isError}
          onPress={() => this.setState({isError: false})}
        /> */}
        {/* {this.LoaderModel()} */}
        {this.PageSelector(this.state.PageSelectorValue)}
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
    color: '#000',

    textAlign: 'center',
  },
  BodyText: {
    flex: 3,
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  profileText: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 18,
  },
  ProfileImage: {
    width: 300,
    height: 300,
  },
  ImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardContainerStyle: {
    margin: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    elevation: 5,
  },
  TextCard: {
    fontFamily: 'Poppins-Medium',
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageCard: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
    elevation: 5,
  },
});

const mapStateToProps = state => {
  return {profile: state.GetProfile};
};

export default connect(mapStateToProps, {getProfile, UpdateProfileStatus})(
  Profile1,
);
