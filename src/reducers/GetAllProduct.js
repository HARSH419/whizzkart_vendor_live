import { GET_ALL_PRODUCT } from "../actions/const";
import _ from 'lodash';

export default ( state ={} , action) =>{

    switch(action.type){

        case GET_ALL_PRODUCT: 
        
     
        return {...state , ..._.mapKeys(action.payload.data , 'product_details.id' )}
        // return action.payload.data


        default:
            return state;

    }

}