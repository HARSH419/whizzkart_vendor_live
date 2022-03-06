import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {getOrderDetails , AcceptOrder , RejectOrder} from '../actions';
import { BASE_URL } from '../actions/const';
import Loader from '../components/Loader';
import OrderDetailComp from '../components/OrderDetail.Comp';
import { COLOR } from './PlaceSearch';


class OrderDetail extends React.Component {

constructor(props){
  super(props)

  this.state={
    isLoading : true
  }
}

  componentDidMount() {
    const {orderId} = this.props.route.params;
    this.props.getOrderDetails(orderId , () => this.setState({
      isLoading : false
    }));
  }

  containerItem(props) {
    return (
      <View style={style().ItemContainer}>
        <View>
        <Image
          style={style().itemImage}
          source={{uri : props.image}}
        />
        <Text style={{color : COLOR.BLUE ,fontFamily: 'Poppins-Bold', color: '#185574' ,textAlign : 'center', fontSize : 12}}>{props.productName}</Text>
        </View>
       
        <Text allowFontScaling={false} style={{ fontFamily: 'Poppins-Bold', color: '#185574' , textAlign : 'center', justifyContent : 'space-evenly'}}>
        {`${props.title} (${props.full})`}
        </Text>
        <Text allowFontScaling={false} style={{ fontFamily: 'Poppins-Bold', color: '#185574'}}>
          {<Text allowFontScaling={false} style={{color: '#E85555'}}>&#8377;</Text>}
          {props.price}
        </Text>
      </View>
    );
  }

  render() {

    if(this.state.isLoading){

      return <Loader/>

    }else{

    const {order} = this.props;
    const d = order?.order_date;
    const time = d.split(' ');
    const fullAdd = ` ${
      order.location?.house_no ? '' : order.location?.house_no
    } ${order.location?.area} ${order.location?.landmark} ${
      order.location?.city
    } ${order.location?.pincode}`;
    return (
      <SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
        <ScrollView style={{marginVertical: 10, height: '100%'}}>
          <OrderDetailComp
          
            OrderId={order?.order_id}
            date={time[0]}
            time={time[1]}
            payment={order.payment_method?.name}
            addressBody={fullAdd}
            addressTitle={order.location?.area}
            price={order?.total_payble_amount}
            isButton={true}
            
            accept ={()=> this.props.AcceptOrder('VendorAccept',order?.order_id ,()=>{
              this.props.navigation.navigate('Dashboard',{
                screen : 'Orders'
              }); 
            })}
            reject={() => this.props.RejectOrder('VendorReject',order?.order_id , ()=>{
              this.props.navigation.navigate('Dashboard',{
                screen : 'Orders'
              }); 
            })}
            render={order?.order_details.map(item => {
            return (
              <View key={item.id}>
                <this.containerItem title={item?.product_quantity} price={item?.price} image={BASE_URL +item?.vendor_product?.product_details?.primaryimages?.imagePath} productName={item?.vendor_product?.product_details?.name} full={order?.product_quantity_type}/>
                </View>
            )
            
            })}
          />
        </ScrollView>
      </SafeAreaView>
    );
          }
  }
}

const style = () =>
  StyleSheet.create({
    ItemContainer: {
    
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
    },
    itemImage: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
     // flex: 2,
    },
  });

const mapStateToProps = state => {
  return {order: state.GetOrderInfo};
};

export default connect(mapStateToProps, {getOrderDetails , AcceptOrder ,RejectOrder})(OrderDetail);
