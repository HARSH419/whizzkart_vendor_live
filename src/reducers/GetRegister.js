import {GET_REGISTER} from '../actions/const';
import _ from 'lodash';

export default ( state ={} , action) =>{

    switch(action.type){

        case GET_REGISTER: 

        return action.payload

        default:
            return state;

    }

}