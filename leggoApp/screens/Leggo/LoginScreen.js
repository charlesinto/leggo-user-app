import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, Image, KeyboardAvoidingView, 
    TouchableWithoutFeedback, AsyncStorage } from "react-native";
import Colors from "../../constants/Colors";
import { customStyles, styles } from "../../constants/styles";
import { connect } from "react-redux";
import { Text, Form, Item, Input, Label, Icon, Button } from "native-base";
import { firebase, db } from "../../firebase";
import * as actions from "../../actions";

class LoginScreen extends Component {
    state = {email: '', password:'', error: false, errorMessage: ''}
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            title: 'Loin',
            headerStyle: {
            backgroundColor: Colors.headerColor,
            },
            headerTintColor: Colors.headerTintColor,
            headerTitleStyle: customStyles.headerStyle,
        };
        };
    componentDidMount(){
        this.getCurrentUserEmail()
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate('Main')
            }
        })
    }
    getCurrentUserEmail = async () => {
        const email = await AsyncStorage.getItem('email')
        if(typeof email !== 'undefined'){
            this.setState({
                email
            })
        }
    }
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
        const {email, password} = this.state

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(email.trim() === '' && password.trim() == ''){
            return this.setState({
                error: true,
                errorMessage: 'Email and Password is required'
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
        this.props.showSpinner('#fff')
        firebase.auth().signInWithEmailAndPassword(email, password).then(account => {
            this.props.hideSpinner()
            db.doc(`/users/${account.user.email}`).get()
                .then( async (doc) => {
                    if(doc.exists){
                        await AsyncStorage.setItem('user', JSON.stringify({
                            email: doc.data().email,
                            firstName: doc.data().firstName,
                            lastName: doc.data().lastName,
                            phoneNumber: doc.data().phoneNumber,
                            uid: account.user.uid
                        }))
                        await AsyncStorage.setItem('email', doc.data().email)
                        this.props.hideSpinner()
                        return this.props.navigation.navigate('Home')
                    }else{
                        this.props.hideSpinner()
                       return  this.setState({
                            error: true,
                            errorMessage: 'Some errors were encountered, please try again'
                        })
                    }
                })
                .catch(error => {
                    this.props.hideSpinner()
                    this.setState({
                        error: true,
                        errorMessage: 'Some errors were encountered, please try again'
                    })
                    console.log('error', error)
                })
        })
        .catch(error => {
            this.props.hideSpinner()
            console.log('error code', error.code)
            console.log('error message', error.message)
            this.setState({errorMessage: 'Invalid credentials', error: true})
        })
        
    }
    _handleNavigation = screen => {
        this.props.navigation.navigate(screen)
    }
    render() {
        return (
            <SafeAreaView style={{flex: 1, height:"100%"}}>
                
                <KeyboardAvoidingView style={{flex: 1, height:"100%"}} behavior="padding" enabled>
                <View style={{flex: 1, height:"100%"}}>
                    <View style={{flex: 1, backgroundColor: '#142037',height:"100%",
                         paddingTop: 40}}>
                            <View style={{flex: 0.52,backgroundColor: '#142037',height:"100%",
                                 width: '100%', justifyContent: 'center', alignItems:'center'}}>
                                <View>
                                    <Image source={require('../../assets/images/plainLogo.png')} style={{
                                        width: 120,
                                        height: 68
                                    }} />
                                </View>
                            </View>
                            <View style={{flex: 0.48, backgroundColor: '#fff', 
                                borderTopRightRadius: 40, borderTopLeftRadius: 40}}>
                                <ScrollView style={{flex: 1, width:"100%"}}>
                                    
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
                                            <Icon active name="mail"   size={12}/>
                                            <Label style={{fontSize: 12, fontFamily:"Lato"}}>Email address</Label>
                                            <Input onChangeText={(text) => this._handleOnChangeText(text, 'email')}
                                                 style={{fontSize: 14, fontFamily:"Lato"}} value={this.state.email}
                                                  keyboardType="email-address"/>
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
                                                Login
                                            </Text>
                                        </Button>
                                    </Form>
                                    <View style={{width:"100%",marginTop:10,marginBottom:10,
                                     justifyContent:"center", alignItems:"center"}}>
                                        <TouchableWithoutFeedback onPress={() => this._handleNavigation('Signup')}>
                                            <Text style={{fontFamily:"Lato", fontSize:14, fontWeight: "600"}}>
                                                Are you new to Leggo? Create Account
                                            </Text>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={{width:"100%",marginTop:10,marginBottom:16,
                                     justifyContent:"center", alignItems:"center"}}>
                                        <TouchableWithoutFeedback onPress={() => this._handleNavigation('RecoverAccount')}>
                                            <Text style={{fontFamily:"Lato", fontSize:13, color:Colors.secondaryColor}}>
                                                Forgot Password? Recover Password
                                            </Text>
                                        </TouchableWithoutFeedback>
                                    </View>
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

export default connect(mapStateToProps, actions)(LoginScreen);