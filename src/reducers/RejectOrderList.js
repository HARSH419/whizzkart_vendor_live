import {REJECTED_ORDER_LIST } from "../actions/const";
import _ from 'lodash';

export default ( state ={} , action) =>{

    switch(action.type){

        case REJECTED_ORDER_LIST: 
        
     
        return {...state , ..._.mapKeys(action.payload.data.VendorReject , 'order_id' )}
      

        default:
            return state;

    }

}