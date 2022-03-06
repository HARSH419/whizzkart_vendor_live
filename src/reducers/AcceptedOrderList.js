import {ACCEPTED_ORDER_LIST } from "../actions/const";
import _ from 'lodash';

export default ( state ={} , action) =>{

    switch(action.type){

        case ACCEPTED_ORDER_LIST: 
        
     
        return {...state , ..._.mapKeys(action.payload.data.VendorAccept , 'order_id' )}
      

        default:
            return state;

    }

}