import React from 'react';

/* Adding redux here  */
import {connect} from 'react-redux';
import {isAuth} from './src/actions';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

/* importing screen page */

import FirstScreen from './src/screens/home.start';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ForgetPassword from './src/screens/ForgetPassword';

import Dashborad from './src/screens/Dashboard';
import IconComponent from './src/components/IconComponent';
import CustomHeader from './src/components/Customheader';
import TodayOrder from './src/screens/TodayOrders';

import AcceptedProduct from './src/screens/Accepted.Product';
import PendingProduct from './src/screens/Pending.Product';
import RejectedProduct from './src/screens/Rejected.Product';
import OrderDetail from './src/screens/OrderDetail';
import DrawerContent from './src/screens/DrawerContent';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import TermAndCondtion from './src/screens/TermAndCondtion';
import Contactus from './src/screens/Contactus';
import Chat from './src/screens/Chat';
import OrderRejectedProduct from './src/screens/OrderRejectedProduct';
import OrderAcceptedList from './src/screens/OrderAcceptedList';
import AllReport from './src/screens/AllReport';
import OrderDetailAR from './src/screens/OrderDetailAR';
import Profile from './src/screens/Profile';
import CameraAndGalleryPicker from './src/components/CameraAndGalleryPicker';
import UserNotVerifed from './src/screens/UserNotVerifed';
import AboutApp from './src/screens/AboutApp';
import messaging from '@react-native-firebase/messaging';
import {
  notificationListener,
  requestUserPermission,
} from './src/lib/notificationService';

/* 
creating store for dev and production

*/

// const store = createStore(reducers, {}, applyMiddleware(thunk));

/* 

comment debug version of redux or install React Native debugger and enable debug in mobile

*/

// const store = createStore(
//   reducers,
//   {},
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__(),
//   ),
// );

/* 

navigation 

*/

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

/* Class STARTS HERE */

class Route extends React.Component {
  isAuth = true;

  constructor(props) {
    super(props);
    // this.ProductBar = this.ProductBar.bind(this);
  }

  componentDidMount() {
    requestUserPermission();
    notificationListener();
  

    this.props.isAuth();
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {this.props.IsAuth != null ? (
              <Stack.Group>
                <Stack.Screen
                  name="Drawer"
                  component={DrawerBar}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ProductDetail"
                  component={OrderDetail}
                  options={{header: props => <CustomHeader {...props} />}}
                />
                <Stack.Screen
                  name="ProductDetails"
                  component={OrderDetailAR}
                  options={{header: props => <CustomHeader {...props} />}}
                />
                <Stack.Screen
                  name="All Report"
                  component={AllReport}
                  options={{header: props => <CustomHeader {...props} />}}
                />
              </Stack.Group>
            ) : (
              <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name="LoginScreen" component={LoginScreens} />
                <Stack.Screen
                  name={'T&C'}
                  component={TermAndCondtion}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name={'NotVerify'}
                  component={UserNotVerifed}
                  options={{headerShown: false}}
                />

                <Stack.Screen
                  name={'camera'}
                  component={CameraAndGalleryPicker}
                  options={{presentation: 'transparentModal'}}
                />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const DrawerBar = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="My Profile" component={Dashboard} />
      <Drawer.Screen name="Share app" component={Dashboard} />
      <Stack.Screen
        name={'AboutApp'}
        component={AboutApp}
        options={{header: props => <CustomHeader {...props} />}}
      />
      <Drawer.Screen
        name="Raise a query"
        component={Contactus}
        options={{header: props => <CustomHeader {...props} />}}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={TermAndCondtion}
        options={{header: props => <CustomHeader {...props} />}}
      />
      <Drawer.Screen
        name="Privacy policy"
        component={PrivacyPolicy}
        options={{header: props => <CustomHeader {...props} />}}
      />
      <Stack.Screen
        name="All Report"
        component={AllReport}
        options={{header: props => <CustomHeader {...props} />}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={OrderDetail}
        options={{header: props => <CustomHeader {...props} />}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={OrderDetailAR}
        options={{header: props => <CustomHeader {...props} />}}
      />
    </Drawer.Navigator>
  );
};

/* TOP TAB BAR */

const ProductBar = () => {
  return (
    <TopTab.Navigator
      initialRouteName="accepted"
      screenOptions={{
        // tabBarActiveTintColor​ : '#26607A',
        tabBarStyle: {
          fontFamily: 'Poppins-Regular',
        },
        tabBarIndicatorContainerStyle: {
          color: 'red',
          fontFamily: 'Poppins-Regular',
        },
      }}>
      <TopTab.Screen name="accepted" component={AcceptedProduct} />
      <TopTab.Screen name="Pending" component={PendingProduct} />
      <TopTab.Screen name="Rejected" component={RejectedProduct} />
    </TopTab.Navigator>
  );
};

const OrderBar = () => {
  return (
    <TopTab.Navigator
      initialRouteName="New orders"
      screenOptions={{
        // tabBarActiveTintColor​ : '#26607A',
        tabBarStyle: {
          fontFamily: 'Poppins-Regular',
        },
        tabBarIndicatorContainerStyle: {
          color: 'red',
          fontFamily: 'Poppins-Regular',
        },
      }}>
      <TopTab.Screen name="accepted" component={OrderAcceptedList} />
      <TopTab.Screen name="New orders" component={TodayOrder} />
      <TopTab.Screen name="Rejected" component={OrderRejectedProduct} />
    </TopTab.Navigator>
  );
};

const Dashboard = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{header: props => <CustomHeader {...props} />}}>
      <Tab.Screen
        name="Home"
        component={Dashborad}
        options={{
          tabBarIcon: () => (
            <IconComponent src={require('./src/images/home.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Product"
        component={ProductBar}
        options={{
          tabBarIcon: () => (
            <IconComponent src={require('./src/images/package.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderBar}
        options={{
          tabBarIcon: () => (
            <IconComponent src={require('./src/images/clipboard.png')} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <IconComponent src={require('./src/images/account.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const LoginScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="FirstScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => {
  return {IsAuth: state.isAuth.token};
};

export default connect(mapStateToProps, {isAuth})(Route);
