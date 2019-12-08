import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, Image, KeyboardAvoidingView,AsyncStorage,
     TouchableWithoutFeedback } from "react-native";
import Colors from "../../constants/Colors";
import { customStyles, styles } from "../../constants/styles";
import { connect } from "react-redux";
import { Text, Form, Item, Input, Label, Icon, Button } from "native-base";
import { firebase, db } from "../../firebase";
import * as actions from "../../actions";

class SignupScreen extends Component {
    state = {error: false, errorMessage: false, email:"",
     password:'', firstName:'', lastName:'', phoneNumber:''}
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            title: 'Signup',
            headerStyle: {
            backgroundColor: Colors.headerColor,
            },
            headerTintColor: Colors.headerTintColor,
            headerTitleStyle: customStyles.headerStyle,
        };
        };
    _handleOnChangeText = (text, target) => {
        this.setState({
            [target]: text,
            error: false,
            errorMessage: ''
        })
    }
    
    _handleFormSubmit = () => {
        this.setState({
            errorMessage: '',
            error: false
        })
        const {email, password, phoneNumber, firstName, lastName} = this.state

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(email.trim() === '' && password.trim() == '' && phoneNumber.trim() === ''
            && firstName.trim() === '' && lastName.trim() === '' ){
            return this.setState({
                error: true,
                errorMessage: 'Please fill out all the fields'
            })
        }
        if( !re.test(email.trim().toLowerCase())){
            return this.setState({
                error: true,
                errorMessage:"Email address is incorrect"
            })
        }
        if(password.trim() === ''){
            return this.setState({
                error: true,
                errorMessage:"Password is required"
            })
        }
        if(firstName.trim() === ''){
            return this.setState({
                error: true,
                errorMessage:"First name is required"
            })
        }
        if(lastName.trim() === ''){
            return this.setState({
                error: true,
                errorMessage:"Last name is required"
            })
        }
        if(phoneNumber.trim() === ''){
            return this.setState({
                error: true,
                errorMessage:"Password is required"
            })
        }
        this.props.showSpinner()
        db.doc(`/users/${email}`).get().then(doc => {
            if(doc.exists){
                return this.setState({
                    error: true,
                    errorMessage:'Email Address already exists'
                }, () => this.props.hideSpinner() )
              
            }else{
                firebase.auth().createUserWithEmailAndPassword(email,password).then(account => {
                    db.doc(`/users/${email}`).set({
                        email: this.state.email,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        createdAt: new Date(),
                        uid: account.user.uid,
                        phoneNumber: this.state.phoneNumber
                    })
                    .then( async () => {
                        await AsyncStorage.setItem('user', JSON.stringify({
                            email: this.state.email,
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            phoneNumber: this.state.phoneNumber,
                            uid: account.user.uid
                        }))
                        this.props.hideSpinner()
                        return this.props.navigation.navigate('Main')
                    })
                    .catch((err) => {
                        this.props.hideSpinner()
                        this.setState({
                            error: true,
                            errorMessage: 'Some errors were encountered, please try again'
                        })
                        console.log('some errors were encountered', err)
                    })
                })
                .catch(() => {
                    this.setState({
                        error: true,
                        errorMessage: 'Some errors were encountered, please try again'
                    })
                })
            }
        })
        .catch((err) => {
            this.props.hideSpinner()
            this.setState({
                error: true,
                errorMessage: 'Some errors were encountered, please try again'
            })
            console.log('some errors were encountered', err)
        })
        
        
    }
    render() {
        return (
            <SafeAreaView style={{flex: 1, height:"100%"}}>
                
                <KeyboardAvoidingView style={{flex: 1, height:"100%"}} behavior="padding" enabled>
                <View style={{flex: 1, height:"100%"}}>
                    <View style={{flex: 1, backgroundColor: '#142037',height:"100%",
                         paddingTop: 40}}>
                            <View style={{flex: 0.25,backgroundColor: '#142037',height:"100%",
                                 width: '100%', justifyContent: 'center', alignItems:'center'}}>
                                <View>
                                    <Image source={require('../../assets/images/plainLogo.png')} style={{
                                        width: 120,
                                        height: 68
                                    }} />
                                </View>
                            </View>
                            <View style={{flex: 0.75, backgroundColor: '#fff', 
                                borderTopRightRadius: 40, borderTopLeftRadius: 40}}>
                                <ScrollView style={{flex: 1, width:"100%"}}>
                                    <View style={{width:"100%", justifyContent:"center",
                                         alignItems:"center", marginTop: 20, marginBottom: 10}}>
                                        <Text style={{fontFamily:"Lato",
                                             color:'#142037', fontSize: 18, fontWeight:"600"}}>
                                            Welcome To Leggo!!!
                                        </Text>
                                    </View>
                                    <Form style={{width: '90%', marginLeft:"auto", marginRight:"auto", marginTop:16}}>
                                    {
                                        this.state.error ? (
                                            <View style={{width:"100%", 
                                                justifyContent:"center", alignItems:"center",
                                                 marginBottom: 10}}>
                                                <Text style={{fontWeight:"500",fontFamily:"Lato",color:Colors.danger,
                                                 fontSize: 13}}>
                                                    {this.state.errorMessage}
                                                </Text>
                                            </View>
                                        ): null
                                    }
                                        <Item floatingLabel >
                                            <Icon active name="person"   size={12}/>
                                            <Label style={{fontSize: 12, fontFamily:"Lato"}}>First Name</Label>
                                            <Input onChangeText={(text) => this._handleOnChangeText(text, 'firstName')}
                                                 style={{fontSize: 14, fontFamily:"Lato"}} value={this.state.firstName}
                                                  keyboardType="default"/>
                                        </Item>
                                        <Item floatingLabel >
                                            <Icon active name="person"   size={12}/>
                                            <Label style={{fontSize: 12, fontFamily:"Lato"}}>Last Name</Label>
                                            <Input onChangeText={(text) => this._handleOnChangeText(text, 'lastName')}
                                                 style={{fontSize: 14, fontFamily:"Lato"}} value={this.state.lastName}
                                                  keyboardType="default"/>
                                        </Item>
                                        <Item floatingLabel >
                                            <Icon active name="mail"   size={12}/>
                                            <Label style={{fontSize: 12, fontFamily:"Lato"}}>Email Address</Label>
                                            <Input onChangeText={(text) => this._handleOnChangeText(text, 'email')}
                                                 style={{fontSize: 14, fontFamily:"Lato"}} value={this.state.email}
                                                  keyboardType="email-address"/>
                                        </Item>
                                        <Item floatingLabel >
                                            <Icon active name="call"   size={12}/>
                                            <Label style={{fontSize: 12, fontFamily:"Lato"}}>Phone Number</Label>
                                            <Input onChangeText={(text) => this._handleOnChangeText(text, 'phoneNumber')}
                                                 style={{fontSize: 14, fontFamily:"Lato"}} value={this.state.phoneNumber}
                                                  keyboardType="number-pad"/>
                                        </Item>
                                        <Item floatingLabel >
                                            <Icon name="lock" size={12}/>
                                            <Label style={{fontSize: 12, fontFamily:"Lato"}}>Password</Label>
                                            <Input value={this.state.password} 
                                            onChangeText={(text) => this._handleOnChangeText(text, 'password')} 
                                            style={{fontSize: 14, fontFamily:"Lato"}} keyboardType="default" secureTextEntry/>
                                        </Item>
                                        <Button onPress={this._handleFormSubmit} full style={{backgroundColor:Colors.primaryCOlor, marginTop: 20, marginBottom: 10}}>
                                            <Text style={{fontFamily:"Lato", fontSize: 13}}>
                                                Create Account
                                            </Text>
                                        </Button>
                                        <Button bordered onPress={() => this.props.navigation.goBack()} full style={{borderColor:"#142037", 
                                            marginTop: 20, marginBottom: 10}}>
                                            <Text style={{fontFamily:"Lato", fontSize: 13}}>
                                                I have an account? Login
                                            </Text>
                                        </Button>
                                    </Form>
                                </ScrollView>
                            </View>
                    </View>
                </View>
                
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, actions)(SignupScreen);