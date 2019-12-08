import React, { Component } from 'react';
import { View, ImageBackground,SafeAreaView, Text,Image,
  AsyncStorage, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { customStyles, styles } from "../../constants/styles";
import { firebase } from "../../firebase";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { Col, Row, Grid } from "react-native-easy-grid";

class HomeScreen extends Component {
    state = {
      firstName: '', lastName:''
    }
    componentDidMount(){
      firebase.auth().onAuthStateChanged(user => {
        if(!user){
          return this.props.navigation.navigate('Auth')
        }
      })
      this.getCurrentUser()
    }
    getCurrentUser = async () => {
        const account = await AsyncStorage.getItem('user')
        const user = JSON.parse(account)
        this.setState({
          firstName: user.firstName,
          lastName: user.lastName
        })
    }
    static navigationOptions = ({ navigation }) => {
        return {
          header: null,
          title: 'Home',
          headerStyle: {
            backgroundColor: Colors.headerColor,
          },
          headerTintColor: Colors.headerTintColor,
          headerTitleStyle: customStyles.headerStyle,
        };
      };
      renderUser =  () => {
        const {firstName, lastName} = this.state
        return `${firstName} ${lastName}`
      }
      _handleOnPress = action => {
        switch(action){
          case 'placeOrder':
            this.props.navigation.navigate('HomeStack')
          break;
          case 'orders':
            //this.props.setFilterActiveLink('all')
            this.props.navigation.navigate('OrderStack', {view: 'all'})
          break;
          case 'trackOrder':
             // this.props.setFilterActiveLink('on way')
            this.props.navigation.navigate('OrderStack', {otherParam:78})
          break;
          case 'contact':
          
          break;
          default:
            return;
        }
      }
    render() {
        return (
            <SafeAreaView style={styles.homeScreenContainer}>
              <View style={styles.homeScreenContainerStyle}>
                    <View style={styles.homeScreenBackgroundContainer}>
                      <ImageBackground resizeMode="cover" style={styles.homeScreenBackgroundImage}
                        source={require('../../assets/images/order_train.jpg')}>
                          <View style={styles.homeScreenGreeting}>
                            <Text style={styles.homeGreetingText}>Hello, {this.renderUser()}</Text>
                          </View>
                      </ImageBackground>
                    </View>
                    <View style={{flex: 1, marginTop: 20, marginBottom: 40,
                       width:"100%", height:"100%", paddingLeft: 16, paddingRight: 16}}>
                        <Grid>
                            <Row>
                               <Col>
                                  <View style={{borderRightWidth: StyleSheet.hairlineWidth, 
                                    width:'100%', height: '100%', borderBottomWidth: StyleSheet.hairlineWidth, borderColor:"#a9a9a9"}}>
                                        <TouchableWithoutFeedback onPress={() => this._handleOnPress('placeOrder')}>
                                          <View style={styles.homeScreenIconContainer}>
                                              <Image style={{width: 80, height: 80}} source={require('../../assets/images/wheel_barrow.png')} />
                                              <View style={{marginTop: 20}}>
                                                <Text style={{fontFamily:"Lato", color:"#000", fontSize: 18}}>Ship Now</Text>
                                              </View>
                                          </View>
                                        </TouchableWithoutFeedback>
                                  </View>
                               </Col>
                               <Col>
                               <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, width:'100%', height:'100%', borderColor:"#a9a9a9"}}>
                                    <TouchableWithoutFeedback onPress={() => this._handleOnPress('orders')}>
                                      <View style={styles.homeScreenIconContainer}>
                                            <Image style={{width: 80, height: 80}} source={require('../../assets/images/wallet.png')} />
                                            <View style={{marginTop: 20}}>
                                              <Text style={{fontFamily:"Lato", color:"#000", fontSize: 18}}>Transactions</Text>
                                            </View>
                                        </View>
                                      </TouchableWithoutFeedback>
                                </View>
                               </Col>
                            </Row>
                            <Row>
                              <Col>
                                <View style={{borderRightWidth: StyleSheet.hairlineWidth,width:'100%', height:'100%', borderColor:"#a9a9a9"}}>
                                    <TouchableWithoutFeedback onPress={() => this._handleOnPress('trackOrder')}>
                                    <View style={styles.homeScreenIconContainer}>
                                          <Image style={{width: 80, height: 80}} source={require('../../assets/images/mobile_track.png')} />
                                          <View style={{marginTop: 20}}>
                                            <Text style={{fontFamily:"Lato", color:"#000", fontSize: 18}}>Track Orders</Text>
                                          </View>
                                      </View>
                                      </TouchableWithoutFeedback>
                                </View>
                              </Col>
                              <Col>
                                <View style={{width:'100%', height:'100%',}}>
                                  <TouchableWithoutFeedback onPress={() => this._handleOnPress('contact')}>
                                    <View style={styles.homeScreenIconContainer}>
                                            <Image style={{width: 80, height: 80}} source={require('../../assets/images/contact.png')} />
                                            <View style={{marginTop: 20}}>
                                              <Text style={{fontFamily:"Lato", color:"#000", fontSize: 18}}>Contact Us</Text>
                                            </View>
                                        </View>
                                      </TouchableWithoutFeedback>
                                </View>
                              </Col>
                            </Row>
                        </Grid>
                    </View>
              </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, actions)(HomeScreen);