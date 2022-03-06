import { GET_ORDER, ORDER_ACCEPTED, ORDER_REJECTED } from "../actions/const";
import _ from 'lodash';

export default ( state ={} , action) =>{

    switch(action.type){

        case GET_ORDER: 
        
     
        return {...state , ..._.mapKeys(action.payload.data , 'order_id' )}
        // return action.payload.data

       case ORDER_ACCEPTED :

       return _.omit(state, action.payload);

       
       case ORDER_REJECTED :
         
       return _.omit(state, action.payload);


        default:
            return state;

    }

}