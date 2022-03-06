import {MONTHLY_REPORT } from "../actions/const";
import _ from 'lodash';

export default ( state ={} , action) =>{

    switch(action.type){

        case MONTHLY_REPORT: 
        
     
        return action.payload.data 
      

        default:
            return state;

    }

}