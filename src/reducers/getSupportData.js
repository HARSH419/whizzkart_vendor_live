import {GET_SUPPORT_DATA} from '../actions/const';
import _ from 'lodash';

export default ( state ={} , action) =>{

    switch(action.type){

        case GET_SUPPORT_DATA : 

        return action.payload.data 

        default:
            return state;

    }

}