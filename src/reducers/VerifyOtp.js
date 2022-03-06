import {IS_VALID_OTP, VERIFY_OTP_FP} from '../actions/const';
import _ from 'lodash';

const s = {status : '' , msg : '' , isvalid : true}

export default ( state =s , action) =>{

    switch(action.type){

        case VERIFY_OTP_FP: 

        return {...state, ...action.payload}

        case IS_VALID_OTP :

        return {...state , isvalid : action.payload}

 
        default:
            return state;

    }

}