import {GET_PROFILE} from '../actions/const';
import _ from 'lodash';

export default ( state ={} , action) =>{

    switch(action.type){

        case GET_PROFILE : 

        return action.payload.data 

        default:
            return state;

    }

}