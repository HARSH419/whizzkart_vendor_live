import {FORGET_PASSWORD, FORGET_PASSWORD_ERROR} from '../actions/const';
import _ from 'lodash';

const s = {status : '' , msg : '' , username : '' , register : "true"}

export default ( state =s , action) =>{

    switch(action.type){

        case FORGET_PASSWORD : 

        return {...state,...action.payload}

        case FORGET_PASSWORD_ERROR :
            
        return {...state ,register : action.payload }

        default:
            return state;

    }

}