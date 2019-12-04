import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from "../screens/Leggo/HomeScreen";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
// import PlaceOrderScreen from "../screens/Leggo/PlaceOrder";
// import AddItemScreen from "../screens/Leggo/AddItemScreen";
// import NewShipment from "../screens/Leggo/NewShipment";
const AuthStack = createStackNavigator({
  Login:  Login,
  Signup: Signup,
  
}, {
  initialRouteName: 'Login'
},
)

const HomeStack = createStackNavigator({
  Home: HomeScreen
})


// const APP_STACK = createStackNavigator({
//   // PlaceOrder: PlaceOrderScreen
//   NewShipment: NewShipment,
//   AddItem: AddItemScreen,
//   Tabs: {
//     screen: MainTabNavigator,
//     navigationOptions: {
//         header: null,
//     },
//   }
// }, {
//   initialRouteName: 'Tabs'
// }, )

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Auth: AuthStack,
    Home: HomeStack
    // APP: APP_STACK
  }, 
  {
    initialRouteName: 'Main'
  })
);
