import { UPDATE_PASSWORD } from '../actions/const';
import _ from 'lodash';

const s = {status : '' , msg : '' , isvalid : true}

export default ( state ={} , action) =>{

    switch(action.type){

        case UPDATE_PASSWORD: 

        return action.payload

      
 
        default:
            return state;

    }

}