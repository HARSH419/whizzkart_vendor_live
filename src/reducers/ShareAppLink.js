import {SHARE_APP_LINK } from "../actions/const";
import _ from 'lodash';

export default ( state ={} , action) =>{

    switch(action.type){

        case SHARE_APP_LINK: 
        
     
        return action.payload.data
      

        default:
            return state;

    }

}