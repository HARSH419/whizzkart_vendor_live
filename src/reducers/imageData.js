import {GET_IMAGE_PROFILE} from '../actions/const';


export default ( state ={} , action) =>{

    switch(action.type){

        case GET_IMAGE_PROFILE : 

        return action.payload.data 

        default:
            return state;

    }

}