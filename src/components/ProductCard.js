import React from 'react';

import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {BASE_URL} from '../actions/const';
import {connect} from 'react-redux';
import {UpdateProductStatus, GetALLProductList} from '../actions';

class ProductComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ErrorImage: false,
    };
  }

  render() {
    return (
      <>
        {this.props.status == 'Pending' ? (
          <View style={style().RootContainer}>
            <View style={style().ImageContainer}>
              <Image
                style={style().Image}
                source={
                  this.state.ErrorImage
                    ? {uri: this.props.placeholder}
                    : {uri: BASE_URL + this.props.imageUrl}
                }
                onError={() => this.setState({ErrorImage: true})}
              />
            </View>
            <View style={style().TextContainer}>
              <Text allowFontScaling={false} style={style().status}>
                {this.props.status}
              </Text>
              <Text allowFontScaling={false} style={style().title}>
                {this.props.title}
              </Text>
              {/* <Text allowFontScaling={false} style={style().dateTime}>{this.props.date}   Time {this.props.time}</Text> */}
              <Text allowFontScaling={false} style={style().price}>
                Price{' '}
                {
                  <Text
                    allowFontScaling={false}
                    style={{fontFamily: 'Poppins-Bold'}}>
                    {' '}
                    {
                      <Text allowFontScaling={false} style={{color: '#E85555'}}>
                        &#8377;
                      </Text>
                    }
                    {this.props.price}
                  </Text>
                }
              </Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                this.props.status == 'Active'
                  ? 'Press Yes to InActivate this product'
                  : 'Press Yes to Activate this product',
                  this.props?.productId?.toString(),
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log("Don't Do Anything"),
                    style: 'cancel',
                  },

                  {
                    text: 'Yes',
                    onPress: () => {
                      this.props.UpdateProductStatus(
                        this.props?.productId,
                        this.props.status == 'Active' ? 'InActive' : "Active",
                        ()=>{
                          this.props.GetALLProductList()
                        }
                      );
                      Alert.alert('Product status change successfully');
                    },
                    style: 'cancel',
                  },
                ],
              );
            }}>
            <View style={style().RootContainer}>
              <View style={style().ImageContainer}>
                <Image
                  style={style().Image}
                  source={
                    this.state.ErrorImage
                      ? {uri: this.props.placeholder}
                      : {uri: BASE_URL + this.props.imageUrl}
                  }
                  onError={() => this.setState({ErrorImage: true})}
                />
              </View>
              <View style={style().TextContainer}>
                <Text allowFontScaling={false} style={style().status}>
                  {this.props.status}
                </Text>
                <Text allowFontScaling={false} style={style().title}>
                  {this.props.title}
                </Text>
                {/* <Text allowFontScaling={false} style={style().dateTime}>{this.props.date}   Time {this.props.time}</Text> */}
                <Text allowFontScaling={false} style={style().price}>
                  Price{' '}
                  {
                    <Text
                      allowFontScaling={false}
                      style={{fontFamily: 'Poppins-Bold'}}>
                      {' '}
                      {
                        <Text
                          allowFontScaling={false}
                          style={{color: '#E85555'}}>
                          &#8377;
                        </Text>
                      }
                      {this.props.price}
                    </Text>
                  }
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  }
}

const style = () =>
  StyleSheet.create({
    RootContainer: {
      height: 120,
      marginVertical: 12,
      marginHorizontal: 10,
      borderRadius: 10,
      backgroundColor: '#FFF',
      elevation: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ImageContainer: {
      justifyContent: 'center',
      alignSelf: 'center',
      padding: 10,
      flex: 1,
    },
    TextContainer: {
      flex: 1,
    },
    Image: {
      width: 100,
      height: 100,
      margin: 5,
      resizeMode: 'contain',
    },
    status: {
      fontFamily: 'Poppins-Bold',
      textAlign: 'right',
      fontSize: 13,
      marginHorizontal: 10,
      color: '#E85555',
    },
    title: {
      fontFamily: 'Poppins-Bold',
      textAlign: 'right',
      fontSize: 13,
      marginHorizontal: 10,
      color: '#4E7C94',
    },
    dateTime: {
      fontFamily: 'Poppins-Regular',
      textAlign: 'right',
      fontSize: 14,
      marginHorizontal: 10,
      color: '#4E7C94',
    },
    price: {
      fontFamily: 'Poppins-Regular',
      textAlign: 'right',
      fontSize: 13,
      marginHorizontal: 10,
      color: '#4E7C94',
    },
  });

export default connect(null, {UpdateProductStatus,GetALLProductList})(ProductComponent);
