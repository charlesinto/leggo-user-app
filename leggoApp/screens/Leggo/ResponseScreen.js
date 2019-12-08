import React, { Component } from 'react';
import { View, SafeAreaView, Platform } from "react-native";
import Colors from "../../constants/Colors";
import { customStyles, styles } from "../../constants/styles";
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { Button, Text } from "native-base";
import * as actions from "../../actions";
class ResponseScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          header: null,
          title: 'Response',
          headerStyle: {
            backgroundColor: Colors.headerColor,
          },
          headerTintColor: Colors.headerTintColor,
          headerTitleStyle: customStyles.headerStyle,
        };
      };
    _handleOnPress = () => {
        this.props.navigation.navigate('LandingScreen')
    }
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={{justifyContent:"center", alignItems:'center', paddingLeft: 16, paddingRight:16}}>
                    <View style={{marginTop: 40}}>
                        <Text style={{color:"#000", fontFamily:"Lato", fontSize:18}}>
                            Transaction sucessful</Text>
                    </View>
                    <View style={{marginTop: 40, marginBottom: 40}}>
                        <Ionicons
                            name={
                                Platform.OS === 'ios'
                                    ? `ios-checkmark`
                                    : 'md-checkmark'
                            }

                            size={48}
                            style={{ marginBottom: -3, color: Colors.success }}
                        />
                    </View>
                    <View style={{marginTop: 40}}>
                       {
                           this.props.confirmationCode ?
                           <Text style={{color:"#000", fontFamily:"Lato", fontSize:18}}>
                            Your order confirmation number:</Text>
                           : null
                       } 
                    </View>
                    <View style={{width:"100%",marginTop: 20,
                         justifyContent:"center", alignItems:"center", flexDirection:"row"}}>
                        {
                            this.props.confirmationCode ?
                            
                            <Text style={{color:"#000",fontWeight:"600", fontFamily:"Lato", fontSize:18}}>
                                 {this.props.confirmationCode}
                            </Text> : null
                        }
                    </View>
                    
                    <View style={{width:"100%", marginTop: 40, marginBottom: 20}}>
                        <Button full success onPress={this._handleOnPress}>
                            <Text>Continue To Home</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    const {order: {confirmationCode}} = state;
    return {
        confirmationCode
    }
}

export default connect(mapStateToProps, actions)(ResponseScreen);