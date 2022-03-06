import { combineReducers } from 'redux'
import LoginForm from './loginForm';
import Login from './Auth';
import isAuth from './isAuth';
import privacy from './privacy';
import Tnc from './TermAndCondtion';
import contactus from './contactus';
import DashboardInfo from './DashboardInfo';
import GetOrder from './GetOrder';
import RejectOrderList from './RejectOrderList';
import AcceptedOrderList from './AcceptedOrderList';
import MonthlyReport from './MonthlyReport';
import ForgetPassword from './ForgetPassword';
import VerifyOtp from './VerifyOtp';
import UpdatePassword from './UpdatePassword';
import ShareAppLink from './ShareAppLink';
import GetOrderInfo from './GetOrderInfo';
import GetAllProduct from './GetAllProduct';
import GetRegister from './GetRegister';
import GetProfile from './GetProfile';
import getGraphdata from './getGraphdata';
import getSupportData from './getSupportData';
import { reducer as formReducer} from 'redux-form';
import imageData from './imageData';
import GoogleMapsPlaces from './GoogleMapsPlaces';
import GoogleRevGeocode from './GoogleRevGeocode';
import GooglePlaceCode from './GooglePlaceCode';
export default combineReducers({
    form : formReducer,
    LoginForm ,
    Login,
    isAuth,
    privacy,
    Tnc,
    contactus,
    DashboardInfo,
    GetOrder,
    RejectOrderList,
    AcceptedOrderList,
    MonthlyReport,
    ForgetPassword,
    VerifyOtp,
    UpdatePassword,
    ShareAppLink,
    GetOrderInfo,
    GetAllProduct,
    GetRegister,
    GetProfile,
    getGraphdata,
    getSupportData,
    imageData,
    GooglePlaceCode,
    GoogleMapsPlaces,
    GoogleRevGeocode

    
    
});