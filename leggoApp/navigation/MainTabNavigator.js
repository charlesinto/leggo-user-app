import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {  FontAwesome } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PlaceOrder from "../screens/Leggo/PlaceOrder";
import Colors from '../constants/Colors';
import AddItemScreen from '../screens/Leggo/AddItemScreen';
import NewShipment from '../screens/Leggo/NewShipment';
import ProcessPaymentScreen from "../screens/Leggo/ProcessPaymentScreen";
import OrderScreen from "../screens/Leggo/OrderScreen";

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
  ProcessPayment: ProcessPaymentScreen
}, 
config,
{
  initialRouteName: 'PlaceOrder'
})

PlaceOrderSTack.navigationOptions = {
  tabBarLabel: 'New Order',
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

PlaceOrderSTack.path = '';


const OrderStack = createStackNavigator({
  OrderScreeen: OrderScreen,
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
  HomeStack: {
    screen: PlaceOrderSTack
  },
  OrderStack,
  LinksStack,
  SettingsStack,
}, {
  initialRouteName: 'HomeStack'
});

tabNavigator.path = '';

export default tabNavigator;
