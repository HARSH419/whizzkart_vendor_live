
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, StyleSheet, Image, Text, Button} from 'react-native';
import CustomButton from './login_logout/Button.custom';

class OrderDetailComp extends React.Component {
 
  // constructor(props){
  //   super(props)


  //   this.state={
  //     isLoading
  //   }
  // }

  containerItem(props){

    return(
      <View style={style().ItemContainer}>

   
        <Image
        style={style().itemImage}
        source={require('../images/dish.png')}
      />
  
  
     
      <Text allowFontScaling={false} style={{flex: 3, fontFamily : 'Poppins-Bold', color: '#185574',}}> Chicken Crispy</Text>
      <Text allowFontScaling={false} style={{flex: 1, fontFamily : 'Poppins-Bold', color: '#185574',}}>{<Text allowFontScaling={false} style={{color:"#E85555"}}>&#8377;</Text>}{props.price}125</Text>
    </View>

    )
  }


  render() {

    let data = []; 

    return (
      <View style={style().RootCard}>
        <View style={style().OrderContainer}>
          <View style={style().orderAndTime}>
            <Text allowFontScaling={false} style={style().orderText}>Order No. { <Text allowFontScaling={false} style={{color :"#E84745" , fontFamily: 'Poppins-Bold',  fontSize : 12}}>{this.props.OrderId}</Text>}</Text>
            <Text allowFontScaling={false} style={style().orderDatetext}>{this.props.date}</Text>
            <Text allowFontScaling={false} style={style().orderTimeText}>{this.props.time}</Text>
          </View>
          <View style={style().PaymentContainer}>
            <Text allowFontScaling={false} style={style().PaymentText}>Payment mode</Text>
            <Text allowFontScaling={false} style={style().PaymentTypeText}>{this.props.payment}</Text>
          </View>
        </View>

        {/* Address  */}

        <View style={style().addressContainer}>
          <FontAwesomeIcon icon={faMapMarkerAlt} color="#E84745" />
          <View style={style().AddTextContainer}>
            <Text allowFontScaling={false} style={style().textAdd}>{this.props.addressTitle}</Text>
            <Text allowFontScaling={false} style={style().textBody}>{this.props.addressBody}</Text>
          </View>
        </View>

        {/* catgory name and payment */}

        <View style={style().catName}>
          <Text allowFontScaling={false}
            style={{
              textAlign: 'right',
              flex: 2,
              marginHorizontal: 5,
              fontFamily: 'Poppins-Medium',
              fontSize: 12,
              color: '#185574',
            }}>
            quantity
          </Text>
          <Text allowFontScaling={false}
            style={{
              textAlign: 'right',
              flex: 1,
              paddingHorizontal: 5,
              fontFamily: 'Poppins-Medium',
              fontSize: 12,
              color: '#185574',
            }}>
            Amount
          </Text>
        </View>

        {/* Break Line */}
        <View
          style={{
            borderBottomColor: '#E6E6E6',
            borderBottomWidth: 2,
            marginHorizontal: 5,
            marginVertical: 5,
          }}
        />
        {/* container item */}
       
          {/* {data.map((d)=> <this.containerItem />)} */}
          {this.props.render}

        {/* TOTAL AMOUNT */}

        <View style={style().TotalAmtContainer}>
          <Text allowFontScaling={false} style={style().TotalAmtText}>Total Amount</Text>
          <Text allowFontScaling={false} style={style().TotalAmt}> {<Text allowFontScaling={false} style={{color:"#E85555" ,  fontSize: 12}}>&#8377;</Text>}{this.props.price}</Text>
        </View>


        {/* buttons */}
{ this.props.isButton ?
        <View style={style().buttonContainer}>
          <CustomButton
            width={150}
            title="Accept"
            marginHorizontal={10}
            backgroundColor="#185574"
            onPress={this.props.accept}
          />
          <CustomButton
            width={150}
            title="Reject"
            marginHorizontal={10}
            onPress={this.props.reject}
          />
        </View> : 
        <View style={style().buttonContainer}>

        <Text allowFontScaling={false} style={{fontFamily : 'Poppins-Regular' , color : '#E84745' , fontSize : 12, padding : 10}}>{this.props.status}</Text>
        
        </View>
        
        }
      </View>
    );
  }
}

const style = () =>
  StyleSheet.create({
    RootCard: {
      margin: 10,
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'column',
      padding: 5,
      backgroundColor: '#F5F5F5',
      elevation : 5
    },
    OrderContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    orderAndTime: {
      flex: 1,
    },
    PaymentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addressContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: 10,
    },
    AddTextContainer: {
      paddingHorizontal: 10,
    },
    textAdd: {
      fontFamily: 'Poppins-Bold',
      color: '#185574',
      fontSize: 12
    },
    textBody: {
      fontFamily: 'Poppins-Regular',
      color: '#185574',
      fontSize: 12
    },
    catName: {
      // borderWidth: 2,
      // borderColor: 'red',
      display: 'flex',
      flexDirection: 'row',
      fontSize: 12
    },
    ItemContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginVertical: 5,
      paddingHorizontal : 15
    },
    itemImage: {
      width: 75,
      height: 75,
      resizeMode: 'contain',
      flex: 2,
    },
    TotalAmtContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginVertical: 15,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 15,
    },
    orderText: {
      fontFamily: 'Poppins-Bold',
      color: '#2E637D',
      fontSize: 12,
    },
    orderDatetext: {
      fontFamily: 'Poppins-Medium',
      color: '#2E637D',
        fontSize: 12
    },

    orderTimeText: {
      fontFamily: 'Poppins-Medium',
      color: '#2E637D',
      fontSize: 12
      
    },
    PaymentText: {
      fontFamily: 'Poppins-Medium',
      color: '#2E637D',
      fontSize: 12
    },
    PaymentTypeText: {
      fontFamily: 'Poppins-Bold',
      color: '#E84341',
      textAlign: 'left',
      fontSize: 12
    },
    TotalAmtText: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'Poppins-Bold',
      color: '#2E637D',
      fontSize: 12
    },
    TotalAmt: {
      flex: 1,
      textAlign: 'right',
      fontFamily: 'Poppins-Bold',
      color: '#2E637D',
     
      marginHorizontal :  20,
      fontSize: 12
     
    },
  });

export default OrderDetailComp;
