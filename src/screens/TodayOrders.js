import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Touchable,
} from 'react-native';
import { connect } from 'react-redux';
import Orderlist from '../components/Orderlist';

import {GetOrder , AcceptOrder , RejectOrder} from '../actions';
import Loader from '../components/Loader';
import EmptyList from '../components/EmptyList';

class TodayOrder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoding: true,
      refreshing : false,
      TestImage : 'https://www.pngfind.com/pngs/m/300-3005563_free-png-chicken-fried-rice-plate-png-png.png'
    };
  }


  componentDidMount(){
   
    this.props.GetOrder(()=>{
      this.setState({isLoding: false});
    });

    setInterval(()=>{
      this.props.GetOrder(()=>{
        this.setState({isLoding: false});
      });

    },15000)
   

  }

  render() {
    // let data = [
    //   {
    //     order: '#14454',
    //     time: 'oct 12 2021',
    //     date: '12:55pm',
    //     catName: 'chiken Wings',
    //     amt: '750',
    //     payment: 'online',
    //     address1: 'Usa Ncr',
    //     address2: 'loraem ishdi hsud aygds',
    //   },
    //   {
    //     order: '#148254',
    //     date: '12:55pm',
    //     time: 'oct 12 2021',
    //     catName: 'chiken Wings',
    //     amt: '750',
    //     payment: 'cod',
    //     address1: 'delhi Ncr',
    //     address2: 'loraem ishdi hsud aygds',
    //   },
    //   {
    //     order: '#144784',
    //     date: '12:55pm',
    //     time: 'oct 12 2021',
    //     catName: 'paneer',
    //     amt: '750',
    //     payment: 'cod',
    //     address1: 'delhi Ncr',
    //     address2: 'loraem ishdi hsud aygds',
    //   },
    // ];

    const { data } = this.props;
    
    return (

     

      <SafeAreaView style={{backgroundColor: '#FFFFFF' ,flex : 1}}>
      { this.state.isLoding ? <Loader loadingText="Please wait..." /> : <FlatList
    
          data={data}
          refreshing={true}
          ListEmptyComponent={<EmptyList/>}
          style={{flexGrow: 0}}
          keyExtractor={data?.order_id}
          renderItem={item => {
            const d = item.item?.order_date;
            const time = d.split(' ');
            
            const fullAdd = ` ${item.item.location?.house_no ? '': item.item?.location?.house_no } ${item.item.location?.area} ${item.item?.location?.landmark} ${item.item.location?.city} ${item.item?.location?.pincode}`
            return (
              <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.push('ProductDetail', {orderId : item.item?.order_id})}>
                <Orderlist
                  OrderId={item?.item?.order_id}
                  Date={time[0]}
                  time={time[1]}
                  Amount={item.item?.total_payble_amount}
                  payment={item.item.payment_method?.name}
                 Name={item.item.order_details[0]?.vendor_product?.product_details?.category?.name}
                 image={item.item.order_details[0]?.vendor_product?.product_details?.primaryimages?.imagePath }
                  addressTitle={item.item.location?.area}
                  addressBody={fullAdd}
                  accept ={()=> this.props.AcceptOrder('VendorAccept',item.item?.order_id,()=>{})}
                  reject={() => this.props.RejectOrder('VendorReject',item.item?.order_id,()=>{})}
                  placeholder={this.state?.TestImage}
                />
              </TouchableOpacity>
            );
          }}
        /> }
      </SafeAreaView>
    );
  }
}

const style = () => StyleSheet.create({});

const mapStateToProps = (state) =>{

  return {data : Object.values( state.GetOrder) }
}

export default connect(mapStateToProps , {GetOrder , AcceptOrder , RejectOrder})(TodayOrder);
