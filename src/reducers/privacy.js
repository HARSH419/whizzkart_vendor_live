import {PRIVACY_POLICY} from '../actions/const';

import _ from 'lodash';


export default ( state ={} , action) =>{

    switch(action.type){

        case PRIVACY_POLICY: 
        
        return action.payload.data

        default:
            return state;

    }

}