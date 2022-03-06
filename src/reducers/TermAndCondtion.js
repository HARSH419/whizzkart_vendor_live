import {TERM_AND_CONDATION} from '../actions/const';

import _ from 'lodash';


export default ( state ={} , action) =>{

    switch(action.type){

        case TERM_AND_CONDATION: 
        
        return action.payload.data

        default:
            return state;

    }

}