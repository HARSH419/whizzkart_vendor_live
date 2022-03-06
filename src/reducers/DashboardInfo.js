import {DASHBOARD_INFO} from '../actions/const';

import _ from 'lodash';

const d = {
    today: {
        total_earning: 0,
        total_order: 0,
        current_today_order_growth:0,
        current_today_earning_growth:0
    },
    monthly: {
        total_earning: 0,
        total_order: 0,
        current_month_earning_growth:0,
        current_month_order_growth:0
    }
}

export default ( state =d , action) =>{

    switch(action.type){

        case DASHBOARD_INFO: 
        
        return action.payload.data

       

        default:
            return state;

    }

}