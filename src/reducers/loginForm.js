import {LOGIN_FORM} from '../actions/const';
import _ from 'lodash';

export default ( state ={} , action) =>{

    switch(action.type){

        case LOGIN_FORM : 

        return action.payload 

        default:
            return state;

    }

}