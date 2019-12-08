import React, { Component} from 'react';
import { SafeAreaView, Modal,View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from "../screens/Leggo/HomeScreen";
import Login from "../screens/Leggo/LoginScreen";
import Signup from "../screens/Leggo/SignupScreen";
import Colors from '../constants/Colors';
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

const AppNavigation = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Auth: AuthStack,
    Home: HomeStack
    // APP: APP_STACK
  }, 
  {
    initialRouteName: 'Auth'
  })
);

class App extends Component{
  render(){
    return (
      <SafeAreaView style={{flex: 1, width: '100%'}}>
        <AppNavigation />
          <Modal
            transparent={true}
            animationType={'none'}
            visible={this.props.loading}
            onRequestClose={() => {console.log('close modal')}}>
            <View style={{flex: 1, width: '100%', height: '100%', alignItems:"center", justifyContent:"center"}}>
              <View>
                <ActivityIndicator size="large" 
                color={this.props.color ? this.props.color : Colors.secondaryColor}
                animating={this.props.loading} />
              </View>
            </View>
          </Modal>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  const {home: {loading, color}} = state
  return {loading, color}
}

export default connect(mapStateToProps, actions)(App);