import {AUTH, LOGIN, LOGOUT} from '../actions/const';

import _ from 'lodash';


export default ( state ={token : null} , action) =>{

    switch(action.type){

        case AUTH: 
        
        return { token : action.payload.token }

        case LOGOUT :

        return { token : null}

        default:
            return state;

    }

}