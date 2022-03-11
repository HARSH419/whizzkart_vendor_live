import {ACCEPTED_ORDER_LIST } from "../actions/const";
import _ from 'lodash';

export default ( state ={} , action) =>{

    switch(action.type){

        case ACCEPTED_ORDER_LIST: 
        
     
        return {..._.mapKeys(action.payload.data?.VendorAccept , 'order_id' ),..._.mapKeys(action.payload.data?.Accepted , 'order_id' ),..._.mapKeys(action.payload.data?.Delivered , 'order_id' ),..._.mapKeys(action.payload.data?.Cancelled , 'order_id' )}
      

        default:
            return state;

    }

}