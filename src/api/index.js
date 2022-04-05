import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import Toast from 'react-native-toast-message';
export const api = axios.create({
  baseURL: 'https://whizzkart.in/',
  responseType: 'json',
});

// Set the AUTH token for any request
api.interceptors.request.use(async function (config) {
  const token = await AsyncStorage.getItem('Token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  //  config.headers.Authorization = `Bearer Ugg9fsE9490nydZIFYtFQYgUBMZ0U0HlAaLvzuHZ`;
  return config;
});

// Add a response interceptor
api.interceptors.response.use(
  async function (response) {
    // const dispatch = useDispatch();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("response",response?.data?.code == 423)
    if (response?.data?.code == 423) {
      await AsyncStorage.removeItem('Token');
      RNRestart.Restart();
      Toast.show({
        type: "error",
        text1: "Please log again",
      });
      // if (response?.data?.code) {
      return Promise.reject(response?.data);
      // return Promise.reject({code: ' 423', msg: 'Unauthorized'});
    } 
    // else if (response?.data?.code && response?.data?.code !== 200) {
    //   // if (response?.data?.code) {
    //   return Promise.reject(response?.data);
    //   // return Promise.reject({code: ' 423', msg: 'Unauthorized'});
    // }
    // try {

    // dispatch(LOGOUT_STATIC())  // for static Slice
    // }
    return response;
  },
  function (error) {
    console.log('erroredrfg', error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
