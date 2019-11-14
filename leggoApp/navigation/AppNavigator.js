import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import PlaceOrderScreen from "../screens/Leggo/PlaceOrder";
import AddItemScreen from "../screens/Leggo/AddItemScreen";

const AuthStack = createStackNavigator({
  Login: Login,
  Signup: Signup,
  
}, {
  initialRouteName: 'Login'
})

const APP_STACK = createStackNavigator({
  PlaceOrder: PlaceOrderScreen,
  AddItem: AddItemScreen
}, {
  initialRouteName: 'PlaceOrder'
})

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Auth: AuthStack,
    APP: APP_STACK
  }, 
  {
    initialRouteName: 'APP'
  })
);
