import React, { Component } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView,ScrollView, 
     Platform,FlatList, TouchableWithoutFeedback, Image } from "react-native";
import { Card, Item,CardItem, Input,Text, Label, Form, Button, CheckBox, Toast } from "native-base";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { customStyles, styles } from "../../constants/styles";
import * as actions from "../../actions";

class PlaceOrder extends Component {
    state = {
        extraPackaging: false,
        sameAsSender: false,
        parcelType: [],
        pickup: '',
        destination: '',
        sender: {
            fullName: 'charles onuorah',
            phoneNumber: '07010671710',
            email: 'charles.onuorah@yahoo.com',
        },
        receiver: {
            fullName: '',
            email:'',
            phoneNumber: ''
        },
        isFormValid: false
    }
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Place Order',
          headerStyle: {
            backgroundColor: Colors.headerColor,
          },
          headerTintColor: Colors.headerTintColor,
          headerTitleStyle: customStyles.headerStyle,
        };
      };
      handleCheckBoxCheck = () => {
            this.setState({
                extraPackaging : !this.state.extraPackaging
            })
      }
      addItems = () => {
          this.props.navigation.navigate('AddItem')
      }
      renderItem = ({item}) => {
        const {itemName} = item;
        return ( <CardItem  bordered>
                        <View style={{display:'flex', width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={styles.selectedItemsStyle}>{itemName}</Text>
                        </View>
                    </CardItem>)
    }
    handeSameAsSenderCheck = () => {
        this.setState({
            sameAsSender: !this.state.sameAsSender,
            receiver: this.state.sender
        })
    }
    handleOnChange = (parent='', target='', value='') => {
        if(parent.trim() != ''){
            return this.setState({
                [parent]: {...this.state[parent], [target]: value}
            }, () => {
               this.setState({
                   isFormValid : this.validateInput().isValid,
                   message: this.validateInput().message
               }) 
            })
        }
        return this.setState({
            [target]: value
        }, () => {
            this.setState({
                isFormValid: this.validateInput().isValid,
                message: this.validateInput().message
            })
        })
        
    }
    validateInput = () => {
        let isValid = false;
        if(this.state.sender){
            const { fullName, phoneNumber, email} = this.state.sender;
            if(fullName && fullName.trim() !== '' && (email && email.trim() !== '')
                && (phoneNumber && phoneNumber.trim() !== '')){
                    isValid = true
                }else {
                    isValid = false;
                    return {isValid, message: `Please complete sender's Details`};
                }
                
        }
        if(this.state.receiver){
            const { fullName, phoneNumber, email} = this.state.receiver;
            if(fullName && fullName.trim() !== '' && (email && email.trim() !== '')
                && (phoneNumber && phoneNumber.trim() !== '')){
                    isValid = true
                }else {
                    isValid = false;
                    return {isValid, message: `Please complete receiver's details`};
                }
        }
        if(this.props.selectedItems.length > 0){
            isValid = true;
           return {isValid, message: ''};
        }
        else if(this.props.selectedItems.length == 0){
            isValid = false
            return {isValid, message: 'Please select delivery item(s)'}
        }
        if(this.state.parcelType.length > 0){
            console.log('in')
            isValid = true
            return isValid
        }else{
            console.log('here')
            isValid = false
            return {isValid, message: 'Please select parcel size'}
        }
        
        
    }
    selectParcelSize = (type, url) => {
        let newParcels = [];
        let index = null;
        switch(type){
            case 'Envelope':
                newParcels = this.state.parcelType;
                index = this.state.parcelType.findIndex(item => item.type === type)
                if(index === -1){
                    this._envelop.setNativeProps({
                        borderColor:  Colors.iconColor
                    })
                    newParcels.push({type, count: 1, url, id: Math.floor(1 + Math.random() * 1000)})
                }else{
                    this._envelop.setNativeProps({
                        borderColor:  '#c3c3c3'
                    })
                    newParcels.splice(index, 1)
                }
                this.setState({
                    parcelType: [...newParcels]
                }, () => this.setState({
                    isFormValid : this.validateInput().isValid,
                    message: this.validateInput().message
                }) )
            break;
            case 'Medium Box':
                 newParcels = this.state.parcelType;
                index = this.state.parcelType.findIndex(item => item.type === type)
                if(index === -1){
                    this._mediumBox.setNativeProps({
                        borderColor:  Colors.iconColor
                    })
                    newParcels.push({type, count: 1, url, id: Math.floor(1 + Math.random() * 1000)})
                }else{
                    this._mediumBox.setNativeProps({
                        borderColor:  '#c3c3c3'
                    })
                    newParcels.splice(index, 1)
                }
                this.setState({
                    parcelType: [...newParcels]
                }, () => this.setState({
                    isFormValid : this.validateInput().isValid,
                    message: this.validateInput().message
                }) )
            break;
            case 'Big Box':
                 newParcels = this.state.parcelType;
                index = newParcels.findIndex(item => item.type === type)
                if(index === -1){
                    this._bigBox.setNativeProps({
                        borderColor:  Colors.iconColor
                    })
                    newParcels.push({type, count: 1, url, id: Math.floor(1 + Math.random() * 1000)})
                }else{
                    this._bigBox.setNativeProps({
                        borderColor:  '#c3c3c3'
                    })
                    newParcels.splice(index, 1)
                }
                this.setState({
                    parcelType: [...newParcels]
                }, () => this.setState({
                    isFormValid : this.validateInput().isValid,
                    message: this.validateInput().message
                }) )
            break;
            default:
                break;
        }
    }
    handleSubmit = () =>{
        const {isValid, message} = this.validateInput()
        if(!isValid){
             Toast.show({
                text: message,
                type: "warning",
                position: "top"
            })
            return ;
        }
        this.props.newShipment({...this.state, selectedItems: this.props.selectedItems})
        this.props.navigation.navigate('NewShipment')
    }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={{ display: 'flex', flex: 1 }}>
                <SafeAreaView style={{ display: 'flex', flex: 1 }}>
                    <ScrollView style={{ display: 'flex', flex: 1 }}>
                        <View style={styles.AppContainer}>
                            <View style={{display: 'flex', width:'100%'}}>
                                <View style={{display:'flex', flex: 0.1}}>
                                
                                </View>
                                <View style={{display:'flex', flex: 0.9}}>
                                    <Item regular>
                                        <FontAwesome name="map-marker" size={26}
                                            style={{paddingLeft: 8}}
                                        />
                                        <Input
                                            placeholder="Pickup Location"
                                            selectionColor={Colors.primaryCOlor}
                                            value={this.state.pickup}
                                            style={styles.addressInputStyle}
                                            onChangeText={(text) => this.handleOnChange('', 'pickup', text)}
                                        />
                                    </Item>
                                    <Item regular>
                                        <FontAwesome name="map-marker" size={26} 
                                            style={{paddingLeft: 8}}
                                        />
                                        <Input 
                                            selectionColor={Colors.primaryCOlor}
                                            placeholder="Destination"
                                            value={this.state.destination}
                                            style={styles.addressInputStyle}
                                            onChangeText={(text) => this.handleOnChange('', 'destination', text)}
                                        />
                                    </Item>
                                </View>
                            </View>
                            <Text style={styles.senderStyle}>SENDER</Text>
                            
                            <View>
                                <Card style={styles.cardContainerStyle}>
                                    <Text style={{ ...styles.textLineStyle, ...styles.senderName, }}>{this.state.sender.fullName}</Text>
                                    <Text style={{ ...styles.textLineStyle }}>{this.state.sender.email}</Text>
                                    <Text style={{ ...styles.textLineStyle }}>{this.state.sender.phoneNumber}</Text>
                                    <View style={{ ...styles.iconContainerStyle }}>
                                        <Ionicons
                                            name={
                                                Platform.OS === 'ios'
                                                    ? `ios-create`
                                                    : 'md-create'
                                            }

                                            size={26}
                                            style={{ marginBottom: -3, color: Colors.iconColor }}
                                        />
                                    </View>
                                </Card>

                            </View>
                            <Text style={styles.senderStyle}>RECEIVER</Text>
                            <View style={{...styles.extraPackagingContainer, marginBottom: 8, marginTop: 6}}>
                                <View style={{ marginRight: 16 }}>
                                    <CheckBox checked={this.state.sameAsSender} onPress={this.handeSameAsSenderCheck} color={Colors.iconColor} style={{}} />
                                </View>
                                <Text style={{ paddingLeft: 8,  fontFamily: 'Roboto' }}>Same as sender</Text>
                            </View>
                            {
                                this.state.sameAsSender ?
                                (
                                    <View>
                                        <Card style={styles.cardContainerStyle}>
                                            <Text style={{ ...styles.textLineStyle, ...styles.senderName, }}>{this.state.sender.fullName}</Text>
                                            <Text style={{ ...styles.textLineStyle }}>{this.state.sender.email}</Text>
                                            <Text style={{ ...styles.textLineStyle }}>{this.state.sender.phoneNumber}</Text>
                                        </Card>

                                    </View>
                                ) : 
                                (
                                    <View>
                                        <Card style={styles.cardContainerStyle}>
                                            <Form>
                                                <Item regular>
                                                    
                                                    <Input 
                                                        placeholder="Enter Full Name"
                                                        style={styles.addressInputStyle}
                                                        value={this.state.receiver.fullName} onChangeText={(text) => this.handleOnChange('receiver','fullName', text)} selectionColor={Colors.primaryCOlor} />
                                                </Item>
                                                <Item regular>
                                                    <Input 
                                                        placeholder="Enter Phone Number"
                                                        style={styles.addressInputStyle}
                                                        value={this.state.receiver.phoneNumber}
                                                        selectionColor={Colors.primaryCOlor} onChangeText={(text) => this.handleOnChange('receiver','phoneNumber', text)} keyboardType="number-pad" />
                                                </Item>
                                                <Item regular>
                                                    <Input
                                                        placeholder="Email Address (optional)"
                                                        value={this.state.receiver.email}
                                                        style={styles.addressInputStyle}
                                                    selectionColor={Colors.primaryCOlor} onChangeText={(text) => this.handleOnChange('receiver','email', text)} keyboardType="email-address"  />
                                                </Item>
                                            </Form>
                                        </Card>
                                    </View>
                                )
                            }
                            
                            <Text style={styles.senderStyle}>ITEM DETAILS</Text>
                            <View>
                                <Card>
                                    <CardItem header  button bordered>
                                            <TouchableWithoutFeedback onPress={this.addItems} style={{display:'flex', width: '100%'}}>
                                                <View style={styles.itemHeaderStyle}>
                                                    <Text style={{ color: '#696969',}}>Add item types</Text>
                                                    <FontAwesome
                                                        name="angle-right"
            
                                                        size={26}
                                                        style={{ marginBottom: -3, color: Colors.iconColor }}

                                                    />
                                                </View>
                                            </TouchableWithoutFeedback>
                                    </CardItem>
                                    {
                                        this.props.selectedItems.length > 0 ?
                                        <View>
                                            <FlatList 
                                            data={this.props.selectedItems}
                                            renderItem = {this.renderItem}
                                            keyExtractor = {item => `${item.id}`}
                                            extraData={this.props.selectedItems.length}
                                        />
                                        </View> : null
                                    }
                                    <CardItem>
                                        
                                        <View style={styles.extraPackagingContainer}>
                                            <View style={{marginRight: 16}}>
                                                <CheckBox checked={this.state.extraPackaging} onPress={this.handleCheckBoxCheck} color={Colors.iconColor} style={{}}/>
                                            </View>
                                            
                                            <Text style={{marginLeft: 16}}>Extra Packaging</Text>
                                        </View>
                                        
                                    </CardItem>
                                </Card>
                            </View>
                            <Text style={styles.senderStyle}>PARCEL SIZE</Text>
                            <View style={{width: '100%'}}>
                                <Card>
                                    <ScrollView
                                    horizontal={true}
                                    decelerationRate={0}
                                    snapToInterval={120}
                                    snapToAlignment={"center"}
                                    style={{
                                        width: '100%',
                                        padding: 10
                                    }}
                                    
                                >
                                    <TouchableWithoutFeedback onPress={() => this.selectParcelSize('Envelope', '../../assets/images/envelop.jpg')}>
                                        <View style={styles.parcelCardContainer} >
                                            <View 
                                                ref={component => this._envelop = component} 
                                                style={styles.parcelImageContainer}>
                                                <Image
                                                    source={require('../../assets/images/envelop.jpg')}
                                                    style={styles.parcelImage}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                            <View style={styles.parcelDescription}>
                                                <Text style={styles.parcelName}>Envelope</Text>
                                                <Text style={styles.parcelDim}>54 x 42 x 32 cm</Text>
                                            </View>
                                            
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                         onPress={() => this.selectParcelSize('Medium Box', '../../assets/images/big_box.jpg')}
                                    >
                                    <View style={styles.parcelCardContainer} >
                                        <View 
                                            ref={component => this._mediumBox = component}
                                            style={styles.parcelImageContainer}>
                                            <Image
                                                source={require('../../assets/images/big_box.jpg')}
                                                style={styles.parcelImage}
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <View style={styles.parcelDescription}>
                                            <Text style={styles.parcelName}>Medium</Text>
                                            <Text style={styles.parcelDim}>29 x 6 x 33 cm</Text>
                                        </View>
                                        
                                    </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                         onPress={() => this.selectParcelSize('Big Box', '../../assets/images/big_box.jpg')}
                                    >

                                    <View style={{...styles.parcelCardContainer,paddingRight:20}} >
                                        <View 
                                            ref={component => this._bigBox = component}
                                            style={styles.parcelImageContainer}>
                                            <Image
                                                source={require('../../assets/images/big_box.jpg')}
                                                style={styles.parcelImage}
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <View style={styles.parcelDescription}>
                                            <Text style={styles.parcelName}>Big</Text>
                                            <Text style={styles.parcelDim}>29 x 6 x 33 cm</Text>
                                        </View>
                                        
                                    </View>
                                    </TouchableWithoutFeedback>
                                </ScrollView>

                                </Card>
                            </View>
                        </View>
                        
                    </ScrollView>
                    <View style={styles.CABcontainer}>
                        <Button  onPress={this.handleSubmit} full style={ styles.continueButtonStyle}>
                            <Text>Continue</Text>
                        </Button>
                    </View>
                </SafeAreaView>

            </KeyboardAvoidingView>
        );
    }
}


const mapStateToProps = state => {
    const {order: {selectedItems}} = state;
    return {
        selectedItems
    }
}

export default connect(mapStateToProps, actions)(PlaceOrder);