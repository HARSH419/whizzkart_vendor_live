import React , {useState}from 'react';

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

const ContainerItem = (props) =>{
  const [ImageError, setImageError] = useState(false);


  return (
    <View style={style().ItemContainer}>
      <View style={{alignItems : 'center' , justifyContent : 'center' }}>
      <Image
        style={style().itemImage}
        source={ImageError ? {uri : props.placeholder} :{uri: BASE_URL +"/"+props.image}}
       onError={()=> setImageError(true)}
      />

      <Text style={{color : COLOR.BLUE ,fontFamily: 'Poppins-Bold', color: '#185574' , fontSize : 12}}>{props.productName}</Text>
      </View>
      <Text allowFontScaling={false} style={{ fontFamily: 'Poppins-Bold', color: '#185574' , fontSize : 12}}>
      {props.title}
      </Text>
      <Text allowFontScaling={false} style={{ fontFamily: 'Poppins-Bold', color: '#185574',  fontSize : 12}}>
        {<Text allowFontScaling={false} style={{color: '#E85555'}}>&#8377;</Text>}
        {props.price}
      </Text>
    </View>
  );
}

class OrderDetailAR extends React.Component {
  constructor(props){
    super(props);

    this.state={
      isLoading : true,
      TestImage : 'https://www.pngfind.com/pngs/m/300-3005563_free-png-chicken-fried-rice-plate-png-png.png'
    }

  }

  // UNSAFE_componentWillMount(){
  //   const {orderId } = this.props.route.params;
  //   this.props.getOrderDetails(orderId);

  // }

  // componentDidMount() {
  //   //console.log(this.props)
  //   const {orderId } = this.props.route.params;
  //   console.log('order',orderId);
  //   this.props.getOrderDetails(orderId , () => {

  //     this.setState({ isLoading : false});

  //   });
 
  // }

 componentDidMount(){
   console.log('test');

  const {orderId } = this.props.route.params;
  console.log('order',orderId);
  this.props.getOrderDetails(orderId , () => {

    this.setState({ isLoading : false});

  });
 }

//  componentDidMount(){
   
//   const {orderId } = this.props.route.params;
//   console.log('order',orderId);
//   this.props.getOrderDetails(orderId , () => {

//     this.setState({ isLoading : false});

//   });
//  }

  render() {
    const { status } = this.props.route.params;
    
    let s = status;
    const {order} = this.props;

    let fullAdd = null ;
    let time = null;
   
    console.log(order);
   

   if(!this.state.isLoading){
      const d = order.order_date;
      time = d.split(" ");
 
   
fullAdd = ` ${order?.location?.house_no ? '' : order?.location?.house_no} ${order?.location?.area} ${order?.location?.landmark} ${ order?.location?.city} ${order?.location?.pincode}`;

  
   }
   
    
    return (


      <SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
        <ScrollView style={{marginVertical: 10, height: '100%'}}>
     { this.state.isLoading ? <Loader loadingText="Please wait ..."/>  : <OrderDetailComp
            OrderId={order.order_id}
            date={time[0]}
            time={time[1]}
            payment={order.payment_method?.name}
            addressBody={fullAdd}
            addressTitle={order.location?.area}
            price={order?.total_payble_amount}
            isButton={false}
            status={s}
            accept ={()=> this.props.AcceptOrder('Accepted',order?.order_id ,()=>{
              this.props.navigation.navigate('Dashboard',{
                screen : 'Orders'
              }); 
            })}
            reject={() => this.props.RejectOrder('Rejected',order.order_id , ()=>{
              this.props.navigation.navigate('Dashboard',{
                screen : 'Orders'
              }); 
            })}
            render={order.order_details.map(item => {
            return (
              <View key={item.id}>
                <ContainerItem title={item.product_quantity} price={item?.price} image={item?.vendor_product?.product_details?.primaryimages?.imagePath} placeholder={this.state.TestImage}  productName={item?.vendor_product?.product_details?.name}/>
                </View>
            )
            
            })}
          />  }
        </ScrollView>
      </SafeAreaView>
    );
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

export default connect(mapStateToProps, {getOrderDetails , AcceptOrder ,RejectOrder})(OrderDetailAR);
