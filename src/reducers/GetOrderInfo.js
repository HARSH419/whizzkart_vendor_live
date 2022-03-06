import {GET_ORDER_DETAILS} from '../actions/const';
import _ from 'lodash';

const d =  {
    "id": 4,
    "user_id": 12,
    "order_id": "ORD1635313128",
    "order_date": "2021-09-27 05:46:03",
    "total_payble_amount": 100,
    "payment_mode_id": 3,
    "vendor_id": 12,
    "user_address_id": 1,
    "order_details": [
        {
            "id": 2,
            "order_id": 4,
            "product_id": 1,
            "total_price": 100,
            "discount_price": 0,
            "price": 100,
            "offer_id": 0,
            "product_quantity": 10,
            "created_at": "2021-10-27T05:38:48.000000Z",
            "updated_at": "2021-10-27T05:38:48.000000Z",
            "vendor_product": {
                "id": 1,
                "product_id": 15,
                "product_details": {
                    "id": 15,
                    "name": "Bike",
                    "category_id": 1,
                    "food_category": "Veg",
                    "subcategory_id": 1,
                    "sluge": "bike",
                    "family_id": 2,
                    "sku": "500",
                    "descreption": "Test BIke",
                    "status": "Active",
                    "created_at": "2021-10-22T06:13:12.000000Z",
                    "updated_at": "2021-10-22T06:13:12.000000Z",
                    "category": {
                        "id": 1,
                        "name": "Test6565"
                    },
                    "subcategory": {
                        "id": 1,
                        "name": "TestSubCategory"
                    },
                    "primaryimages": {
                        "id": 12,
                        "imagePath": "/uploads/Product/1634883192.jpeg",
                        "product_id": 15
                    }
                }
            }
        }
    ],
    "payment_method": {
        "id": 3,
        "name": "Online"
    },
    "location": {
        "id": 1,
        "user_id": 24,
        "pincode": "201301",
        "house_no": "555",
        "area": "PitamPura",
        "landmark": "Near MEtro Station",
        "city": "Delhi",
        "state": "Delhi",
        "address_type": "office",
        "created_at": "2021-10-25T14:03:38.000000Z",
        "updated_at": "2021-10-25T14:03:39.000000Z"
    }
}

export default ( state = {} , action) =>{

    switch(action.type){

        case GET_ORDER_DETAILS : 

        return action.payload.data

        default:
            return state;

    }

}