import React from 'react';
import {StyleSheet, FlatList, SafeAreaView, View ,Text , Linking} from 'react-native';
import {connect} from 'react-redux';
import ProductComponent from '../components/ProductCard';
import {GetALLProductList , getSupportdata} from '../actions';
import Fab from '../components/FabButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import EmptyList from '../components/EmptyList';

class AcceptedProduct extends React.Component {

constructor(props){
    super(props)
    this.state = {isShow : false ,
      TestImage : 'https://www.pngfind.com/pngs/m/300-3005563_free-png-chicken-fried-rice-plate-png-png.png'
    }
    this.sendWhatsApp = this.sendWhatsApp.bind(this);
}

  componentDidMount() {
    this.props.GetALLProductList();
    this.props.getSupportdata();
  }


  clickChanger(){
      const {isShow} = this.state;
    if(isShow) {

        this.setState({isShow : false})

    }else{
        this.setState({isShow : true})
    }
  }



    sendWhatsApp(){
       
        let phoneWithCountryCode = `+91${this.props.sendfile.support_mobile}`;
    
        let mobile =phoneWithCountryCode;
        if (mobile) {
            this.setState({isShow : false})
            let url = `whatsapp://send?phone=${phoneWithCountryCode}` ;
            Linking.openURL(url).then((data) => {
              console.log('WhatsApp Opened');
            }).catch(() => {
              alert('Make sure WhatsApp installed on your device');
            });
          
        } else {
          alert('Please insert mobile no');
        }
      }

      sendMail(){
        
        let mail = `${this.props.sendfile.support_email}`;
    
      
        if (mail) {
            this.setState({isShow : false})
            let url = "mailto:"+ mail;
            Linking.openURL(url).then((data) => {
              console.log('WhatsApp Opened');
            }).catch(() => {
              alert('Make sure Gmail installed on your device');
            });
          
        } else {
          alert('try again');
        }
      }
  

  render() {
    

    const {productdata} = this.props;
    const data = productdata.filter(i => i.status == 'Active');

    return (
      <SafeAreaView style={{backgroundColor: '#FFF', height: '100%'}}>
       <Fab visible={this.state.isShow} icon={faWhatsapp} backgroundColor="#51CD5E" right="10%" bottom="35%" onPress={() => this.sendWhatsApp()}/> 
       <Fab visible={this.state.isShow} icon={faEnvelope} backgroundColor="#E84340" right="10%" bottom="20%" onPress={() => this.sendMail()}/> 
         <Fab visible={true} icon={faPlus} backgroundColor="#E84340" onPress={ () => this.clickChanger()}/>

        <FlatList
        ListEmptyComponent={<EmptyList/>}
          data={data}
          keyExtractor={data.id}
          renderItem={item => {
            return (
              <ProductComponent
                title={item.item?.product_details?.name}
                status={item.item?.status}
                price={item.item?.product_price}
                imageUrl={item.item?.product_details?.primaryimages?.imagePath}
                placeholder={this.state.TestImage}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {productdata: Object.values(state.GetAllProduct),
        sendfile: state.getSupportData};
};

export default connect(mapStateToProps, {GetALLProductList , getSupportdata})(AcceptedProduct);
