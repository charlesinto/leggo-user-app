import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {  FontAwesome, Ionicons } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from "../screens/Leggo/HomeScreen";
import PlaceOrder from "../screens/Leggo/PlaceOrder";
import Colors from '../constants/Colors';
import AddItemScreen from '../screens/Leggo/AddItemScreen';
import NewShipment from '../screens/Leggo/NewShipment';
import ProcessPaymentScreen from "../screens/Leggo/ProcessPaymentScreen";
import MapScreen from "../screens/Leggo/MapScreen";
import OrderScreen from "../screens/Leggo/OrderScreen";
import ResponseScreen from "../screens/Leggo/ResponseScreen";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: PlaceOrder,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'New Order',
  tabBarIcon: ({ focused }) => (
    <FontAwesome
      focused={focused}
      size={26}
      name={
           `clipboard`
      }
      style={{
        marginBottom: -3,
        color: focused ? Colors.tabIconSelected : Colors.tabIconDefault
      }}
    />
  ),
};



HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const PlaceOrderSTack = createStackNavigator({
  PlaceOrder: PlaceOrder,
  AddItem: AddItemScreen,
  NewShipment: NewShipment,
  ProcessPayment: ProcessPaymentScreen,
  ResponsePage: ResponseScreen
}, 
config,
{
  initialRouteName: 'PlaceOrder'
})

const LandingStack = createStackNavigator({
  LandingScreen: HomeScreen
}, config,{initialRouteName: 'LandingScreen'})

PlaceOrderSTack.navigationOptions = {
  tabBarLabel: 'Ship Now',
  tabBarIcon: ({ focused }) => (
    <FontAwesome
      focused={focused}
      size={26}
      name={
           `truck`
      }
      style={{
        marginBottom: -3,
        color: focused ? Colors.tabIconSelected : Colors.tabIconDefault
      }}
    />
  ),
};

LandingStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Ionicons
      focused={focused}
      name={'ios-planet'}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
}


PlaceOrderSTack.path = '';

LandingStack.path = '';

const OrderStack = createStackNavigator({
  OrderScreeen: OrderScreen,
  MapScreen: MapScreen
}, 
config,
{
  initialRouteName: 'OrderScreeen'
})

OrderStack.navigationOptions = {
  tabBarLabel: 'Orders',
  tabBarIcon: ({ focused }) => (
    <FontAwesome
      focused={focused}
      size={26}
      name={
           `list`
      }
      style={{
        marginBottom: -3,
        color: focused ? Colors.tabIconSelected : Colors.tabIconDefault
      }}
    />
  ),
};

OrderStack.path = '';

const tabNavigator = createBottomTabNavigator({
  LandingScreen: {screen: LandingStack},
  HomeStack: {
    screen: PlaceOrderSTack
  },
  OrderStack,
}, {
  initialRouteName: 'LandingScreen'
});

tabNavigator.path = '';

export default tabNavigator;
