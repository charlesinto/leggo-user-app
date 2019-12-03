import React, { Component } from 'react';
import { View,KeyboardAvoidingView, SafeAreaView, ScrollView,
     Platform, FlatList, TouchableNativeFeedback, Image } from "react-native";
import { Text, Card,CardItem,Button, Input, Item, Label, Toast } from "native-base";
import Colors from '../../constants/Colors';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { customStyles, styles } from '../../constants/styles';
import DateTimePicker from "react-native-modal-datetime-picker";

import firebase from "../../config/firebase";

class NewShipment extends Component {
    state = {
        pickupTime: '',
        showDatePicker: false,
        pickupTimeToLocale: '',
        parcelCounter: 0,
    }
    static navigationOptions = ({navigation}) => {
        return {
            title:"New Shipment",
            headerStyle:{
                backgroundColor: Colors.headerColor
            },
            headerTintColor: Colors.headerTintColor,
            headerTitleStyle: customStyles.headerStyle
        }
    }
    static getDerivedStateFromProps(nextProps, state){
        return {...state, parcelCounter: state.parcelCounter + 1}
    }
    handleSubmit = () => {
        if(this.state.pickupTimeToLocale.trim() === ''){
            Toast.show({
                text: 'Please select pickup time',
                type: "warning",
                position: "top"
            })
            return ;
        }
        this.props.confirmShipment(this.state.pickupTimeToLocale, this.state.pickupTime)
        this.props.navigation.navigate('ProcessPayment')
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
    renderParcels = ({item}) => {
        const {type, url, count, id} = item;
        if(type === "Envelope"){
            return (
                <Card>
                    <View style={styles.parcelDetailsContainer}>
                        <View style={styles.parcelDetailImage}>
                            <Image
                                style={styles.parcelImage}
                                resizeMode="cover" 
                                source={require('../../assets/images/boxsmall.png')}
                             />
                        </View>
                        <View style={styles.parcelDetailName}>
                            <Text>{type}</Text>
                        </View>
                        <View style={styles.parcelDetailCount}>
                            <View style={styles.pickerContainer}>
                                <View style={styles.pickerView}>
                                    <Button onPress={() => this.handleIncrement('decrease', id)} success style={styles.pickerButton} light>
                                        <Text>-</Text>
                                    </Button>
                                    <Text style={styles.pickerCounter}>{count}</Text>
                                    <Button onPress={() => this.handleIncrement('increase', id)} warning style={styles.pickerButton} light>
                                        <Text>+</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Card>
            )
        }
        else if(type === "Medium Box"){
            return (
                <Card>
                    <View style={styles.parcelDetailsContainer}>
                        <View style={styles.parcelDetailImage}>
                            <Image
                                style={styles.parcelImage}
                                resizeMode="cover"
                                source={require('../../assets/images/boxmedium.png')}
                            />
                        </View>
                        <View style={styles.parcelDetailName}>
                            <Text>{type}</Text>
                        </View>
                        <View style={styles.parcelDetailCount}>
                            <View style={styles.pickerContainer}>
                                <View style={styles.pickerView}>
                                    <Button onPress={() => this.handleIncrement('decrease', id)} success style={styles.pickerButton} light>
                                        <Text>-</Text>
                                    </Button>
                                    <Text style={styles.pickerCounter}>{count}</Text>
                                    <Button onPress={() => this.handleIncrement('increase', id)} warning style={styles.pickerButton} light>
                                        <Text>+</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Card>
            )
        }
        else if(type === "Big Box"){
            return (
                <Card>
                    <View style={styles.parcelDetailsContainer}>
                        <View style={styles.parcelDetailImage}>
                            <Image
                                style={styles.parcelImage}
                                resizeMode="cover"
                                source={require('../../assets/images/boxbig.png')}
                            />
                        </View>
                        <View style={styles.parcelDetailName}>
                            <Text>{type}</Text>
                        </View>
                        <View style={styles.parcelDetailCount}>
                            <View style={styles.pickerContainer}>
                                <View style={styles.pickerView}>
                                    <Button onPress={() => this.handleIncrement('decrease', id)} warning style={styles.pickerButton} light>
                                        <Text>-</Text>
                                    </Button>
                                    <Text style={styles.pickerCounter}>{count}</Text>
                                    <Button onPress={() => this.handleIncrement('increase', id)} success style={styles.pickerButton} light>
                                        <Text>+</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Card>
            )
        }
        return null;
    }
    
    handleIncrement = (type, target) => {
        
        this.props.updateParcelPackagaeCount(type, target)
    }
    renderItem = ({item}) => {
        const {itemName, id} = item;
        return (
                <Card style={{marginBottom: 10}}>
                    <CardItem>
                        <View style={{display:'flex', width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>{itemName}</Text>
                        </View>
                    </CardItem>
                </Card>)
    }
    selectDateTime = () => {
        this.setState({
            showDatePicker: true
        })
    }
    setPickUpTime = () => {
        if(this.state.pickupTimeToLocale.trim() === ''){
            return (
                
                    <View style={{display:'flex', marginTop: 6,
                        flexDirection:'row',width:"100%", justifyContent:'flex-end'}}>
                        <TouchableNativeFeedback onPress={this.selectDateTime}  >
                        <View 
                            style={{
                                display:'flex',
                                flexDirection:'row',width:"100%",
                                justifyContent: 'flex-end'
                            }}
                        >
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginRight: 6, marginTop: 4 }}>
                                        <Ionicons
                                            name={
                                                Platform.OS === 'ios'
                                                    ? `ios-time`
                                                    : 'md-time'
                                            }

                                            size={16}
                                            style={{ color: Colors.iconColor }}
                                        />
                                    </View>
                                    <Text style={styles.pickupTimeStyle}>Set pickup time</Text>
                                    <FontAwesome
                                        name="angle-right"
                                        size={26}
                                        style={{ marginBottom: -3, color: Colors.iconColor }}
                                    />
                                </View>
                            
                        </View>
                        </TouchableNativeFeedback>
                    </View>
            )
        }
        return (
            <View style={{ marginTop: 6,}}>
                <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: 6, marginTop: 4 }}>
                            <Ionicons
                                name={
                                    Platform.OS === 'ios'
                                        ? `ios-calendar`
                                        : 'md-calendar'
                                }

                                size={16}
                                style={{ color: Colors.iconColor }}
                            />
                        </View>
                        <Text style={{...styles.timeStyle}}>{this.state.pickupTimeToLocale.trim()}</Text>
                    </View>

                <TouchableNativeFeedback  onPress={this.selectDateTime}  >
                <View 
                    style={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}
                >

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: 6, marginTop: 4 }}>
                            <Ionicons
                                name={
                                    Platform.OS === 'ios'
                                        ? `ios-time`
                                        : 'md-time'
                                }

                                size={16}
                                style={{ color: Colors.iconColor }}
                            />
                        </View>
                        <Text style={styles.pickupTimeStyle}>Change pickup time</Text>
                        <FontAwesome
                            name="angle-right"
                            size={26}
                            style={{ marginBottom: -3, color: Colors.iconColor }}
                        />
                    </View>
                </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
    hideDateTimePicker = () => {
        this.setState({
            showDatePicker: false,
        })
    }
    handleDatePicked = (date) => {
        this.setState({
            pickupTime: date
        }, () => {
            this.hideDateTimePicker();
            this.convertToLocaleDate()
        })
    
    }
    convertToLocaleDate = () => {
        const DAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
        const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY',
            'AUGUST', 'SEPTEMBER','OCTOBER', 'NOVEMBER', 'DECEMBER']
        const date = new Date(this.state.pickupTime)
        const pickupDate = `
            ${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}
        `
        this.setState({
            pickupTimeToLocale: pickupDate
        })
    }
    renderView = () => {
        const { shipmentDetail: {sender, receiver, pickup, parcelType, destination, selectedItems} } = this.props;
        console.log(pickup, destination)
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={{ display: 'flex', flex: 1 }}>
                <SafeAreaView style={{ display: 'flex', flex: 1 }}>
                    <ScrollView style={{ display: 'flex', flex: 1 }}>
                        <View style={{...styles.AppContainer, ...styles.addMargin}}>
                            <View style={{ display: 'flex', width: '100%' }}>
                                <View style={{ display: 'flex', flex: 0.1 }}>

                                </View>
                                <View style={{ display: 'flex', flex: 0.9 }}>
                                    
                                    <Item style={{...styles.addressBarStyle, ...styles.customAddressBar}} regular>
                                        <Label style={styles.addressBarLabelStyle}>PICK UP</Label>
                                            <Input
                                            style={{...styles.addressInputStyle, ...styles.customAddressBarInput}}
                                            placeholder="Pickup Location"
                                            selectionColor={Colors.primaryCOlor}
                                            value={pickup ? pickup.description : ''}
                                            disabled
                                            />
                                        
                                    </Item>
                                    <Item style={{...styles.addressBarStyle, ...styles.customAddressBar}}  regular>
                                        <Label style={styles.addressBarLabelStyle}>DESTINATION</Label>
                                            <Input
                                                style={{...styles.addressInputStyle, ...styles.customAddressBarInput}}
                                                selectionColor={Colors.primaryCOlor}
                                                placeholder="Destination"
                                                value={destination ? destination.description : ''}
                                                disabled
                                            />
                                    </Item>
                                </View>
                            </View>
                            <Text style={styles.senderStyle}>SENDER</Text>
                            <Card style={styles.cardContainerStyle}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginRight: 6, marginTop: 4 }}>
                                        <Ionicons
                                            name={
                                                Platform.OS === 'ios'
                                                    ? `ios-person`
                                                    : 'md-person'
                                            }

                                            size={16}
                                            style={{ color: Colors.iconColor }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.textLineStyle, ...styles.senderName, }}>{sender.fullName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginRight: 6, marginTop: 4 }}>
                                        <Ionicons
                                            name={
                                                Platform.OS === 'ios'
                                                    ? `ios-mail`
                                                    : 'md-mail'
                                            }

                                            size={16}
                                            style={{ color: Colors.iconColor }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.textLineStyle }}>{sender.email}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginRight: 6, marginTop: 4 }}>
                                        <Ionicons
                                            name={
                                                Platform.OS === 'ios'
                                                    ? `ios-call`
                                                    : 'md-call'
                                            }

                                            size={16}
                                            style={{ color: Colors.iconColor }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.textLineStyle }}>{sender.phoneNumber}</Text>
                                </View>
                                <View>
                                    {this.setPickUpTime()}
                                </View>
                            </Card>
                            
                                <Text style={styles.senderStyle}>RECEIVER</Text>
                                <Card style={styles.cardContainerStyle}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginRight: 6, marginTop: 4 }}>
                                        <Ionicons
                                            name={
                                                Platform.OS === 'ios'
                                                    ? `ios-person`
                                                    : 'md-person'
                                            }

                                            size={16}
                                            style={{ color: Colors.iconColor }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.textLineStyle, ...styles.senderName, }}>{receiver.fullName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginRight: 6, marginTop: 4 }}>
                                        <Ionicons
                                            name={
                                                Platform.OS === 'ios'
                                                    ? `ios-mail`
                                                    : 'md-mail'
                                            }

                                            size={16}
                                            style={{ color: Colors.iconColor }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.textLineStyle }}>{receiver.email}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginRight: 6, marginTop: 4 }}>
                                        <Ionicons
                                            name={
                                                Platform.OS === 'ios'
                                                    ? `ios-call`
                                                    : 'md-call'
                                            }

                                            size={16}
                                            style={{ color: Colors.iconColor }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.textLineStyle }}>{receiver.phoneNumber}</Text>
                                </View>
                            </Card>
                                <Text style={styles.senderStyle}>ITEMS</Text>
                                <FlatList 
                                    data={selectedItems}
                                    renderItem = {this.renderItem}
                                    keyExtractor = {item => `${item.id}`}
                                    extraData={selectedItems.length}
                                />
                                <Text style={styles.senderStyle}>PARCEL DETAILS</Text>
                                <FlatList 
                                    data={parcelType}
                                    renderItem = {this.renderParcels}
                                    keyExtractor = {item => `${item.id}`}
                                    extraData={this.state.parcelCounter}
                                />
                            <DateTimePicker
                                isVisible={this.state.showDatePicker}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                                mode="datetime"
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.CABcontainer}>
                        <Button  onPress={this.handleSubmit} full style={ styles.continueButtonStyle}>
                            <Text>Continue</Text>
                        </Button>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
    render() {
        const {navigation} = this.props
        if(this.props.shipmentDetail){
            return this.renderView()
        }
        this.props.navigation.goBack();
        return null
        
    }
}

const mapStateToProps = state => {
    const {order: {shipmentDetail}} = state;
    return {
        shipmentDetail
    }
}

export default connect(mapStateToProps, actions)(NewShipment);