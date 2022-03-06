import {GOOGLE_SEARCH_LIST} from '../actions/const';


let s = { isDataOn : false   }

export default ( state = {} , action) =>{

    switch(action.type){

        case GOOGLE_SEARCH_LIST: 

        
        return action.payload 

      
        default:
            return state;

    }

}