import {ERROR_CLOSE, ERROR_LOGIN, LOGIN} from '../actions/const';

import _ from 'lodash';

let s = { visible : false   }

export default ( state = s , action) =>{

    switch(action.type){

        case LOGIN: 

        
        return { ...state , token: action.payload.token ,user_data : action.payload.user_data } 

        case ERROR_LOGIN :

        return { visible : action.payload.visible , error : action.payload.error}

        case ERROR_CLOSE :

        return {visible : action.payload.visible}

        default:
            return state;

    }

}