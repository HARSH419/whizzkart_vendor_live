import {GOOGLE_REVERSE_GEOCODE} from '../actions/const';


let s = { isDataOn : false   }

export default ( state = {} , action) =>{

    switch(action.type){

        case GOOGLE_REVERSE_GEOCODE: 

        
        return action.payload 

      
        default:
            return state;

    }

}