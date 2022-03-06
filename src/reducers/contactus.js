import {CONTACT_FORM} from '../actions/const';
import _ from 'lodash';

export default ( state ={} , action) =>{

    switch(action.type){

        case CONTACT_FORM : 

        return action.payload 

        default:
            return state;

    }

}