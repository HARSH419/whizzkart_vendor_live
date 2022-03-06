import {CONTACT_SUBMIT} from '../actions/const';

import _ from 'lodash';


export default ( state ={token : null} , action) =>{

    switch(action.type){

        case CONTACT_SUBMIT: 
        
        return action.payload


        default:
            return state;

    }

}