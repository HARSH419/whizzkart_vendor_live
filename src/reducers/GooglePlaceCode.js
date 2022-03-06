import {GOOGLE_PLACE_ID} from '../actions/const';


let s = { isDataOn : false   }

export default ( state = {} , action) =>{

    switch(action.type){

        case GOOGLE_PLACE_ID: 

        
        return action.payload 

      
        default:
            return state;

    }

}