import React, { Component } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import { customStyles , styles} from "../../constants/styles";
import { Card, Text, CardItem, CheckBox,Toast, Item, Label, Input, Button } from "native-base";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Col, Row, Grid } from "react-native-easy-grid";

class ProcessPaymentScreen extends Component {

    constructor(props){
        super(props)
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.state = {
            paymentType: '',
            paymentParty: '',
        }
    }
    componentDidMount(){
        this.props.initiateLoading()
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.shipmentDetail.destination && nextProps.shipmentDetail.pickup){
            if(nextProps.orderCreated){
                nextProps.hideSpinner()
                nextProps.navigation.navigate('ResponsePage')
                return {...state}
            }
            nextProps.calculatePrice({
                destination: nextProps.shipmentDetail.destination,
                pickup: nextProps.shipmentDetail.destination,
                parcelType: nextProps.shipmentDetail.parcelType,
                itemsToShip: nextProps.shipmentDetail.selectedItems
            })

            return {...state, ...nextProps.shipmentDetail}
        }
        return null
    }
    static navigationOptions = ({navigation}) => {
        return {
            title:"Process Payment",
            headerStyle:{
                backgroundColor: Colors.headerColor
            },
            headerTintColor: Colors.headerTintColor,
            headerTitleStyle: customStyles.headerStyle
        }
    }
    
    formatAsMoney = (amount = 0) => {
       return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    handleFormSubmit = () => {
        const {pickupTimeToLocale, pickupTime, selectedItems,deliveryInstruction,
            pickupInstruction, shipmentDetail, deliveryFee} = this.props
        if(this.state.paymentType.trim() === ''){
            return Toast.show({
                text: 'Please Select Payment Type',
                type: "error",
                position: "bottom"
            })
        }
        this.props.showSpinner()
       this.props.procesShipment({
            shipmentDetail,selectedItems,
            pickupTime, pickupTimeToLocale,
            paymentType: this.state.paymentType,
            paymentParty: this.state.paymentParty,
            pickupInstruction,deliveryInstruction, deliveryFee
       })
    }
    handlePaymentTypeOnChange = value => {
        const paymentParty = value === 'pay on pickup' ? 'sender' : 'receiver';
        this.setState({
            paymentType: value,
            paymentParty
        })
    }
    handlePaymentPartyOnChange = value => {
        this.setState({
            paymentParty: value
        })
    }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={{ display: 'flex', flex: 1 }}>
                <SafeAreaView style={{ display: 'flex', flex: 1 }}>
                    <ScrollView style={{ display: 'flex', flex: 1 }}>
                        <View style={{...styles.AppContainer, ...styles.addMargin}}>
                            <Card style={styles.summaryCard}>
                                <CardItem>
                                    <View style={styles.costContainerStyle}>
                                        <Text style={styles.textLineStyle}>Shipping Cost</Text>
                                        <View style={styles.moneyConatinerStyle}>
                                            <Text style={{...styles.moneyStyle, ...styles.currencySign}}>
                                                {"\u20A6"}
                                            </Text>
                                            <Text style={{...styles.moneyStyle, }}>
                                                {this.formatAsMoney(this.props.deliveryFee)}
                                            </Text>
                                        </View>
                                    </View>
                                </CardItem>
                                <CardItem bordered>
                                    <View style={styles.costContainerStyle}>
                                        <Text style={styles.textLineStyle}>Extra Packaging</Text>
                                        <View style={styles.moneyConatinerStyle}>
                                            <Text style={{...styles.moneyStyle, ...styles.currencySign}}>
                                                {"\u20A6"}
                                            </Text>
                                            <Text style={{...styles.moneyStyle, }}>
                                                {this.formatAsMoney(this.props.extraPackaging)}
                                            </Text>
                                        </View>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <View style={styles.costContainerStyle}>
                                        <Text style={{...styles.textLineStyle, color:'#000'}}>Total Cost</Text>
                                        <View style={styles.moneyConatinerStyle}>
                                            <Text style={{...styles.moneyStyle, ...styles.currencySign}}>
                                                {"\u20A6"}
                                            </Text>
                                            <Text style={{...styles.moneyStyle, }}>
                                                {this.formatAsMoney(this.props.deliveryFee + this.props.extraPackaging)}
                                            </Text>
                                        </View>
                                    </View>
                                </CardItem>
                            </Card>
                            <Card style={{...styles.summaryCard, marginTop: 20}}>
                                <CardItem bordered>
                                    <View style={styles.costContainerStyle}>
                                        <Text style={{...styles.textLineStyle, color:'#000'}}>Select Payment Type</Text>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <View style={{...styles.moneyConatinerStyle}}>
                                        <View style={{flex: 1, flexDirection:'row'}}>
                                            <View>
                                                <CheckBox checked={this.state.paymentType === 'pay on pickup'} 
                                                onPress={ () => this.handlePaymentTypeOnChange('pay on pickup')} color={Colors.iconColor} style={{}} />
                                            </View>
                                            <View style={{marginLeft: 8}}>
                                                <Text style={{fontFamily:'Lato',color:'#000', marginLeft: 8, fontSize: 12}}>
                                                Pay On Pickup</Text>
                                            </View>
                                            
                                        </View>
                                        <View style={{flex:1 ,flexDirection:'row'}}>
                                            <View>
                                                <CheckBox checked={this.state.paymentType === 'pay on delivery'} 
                                                onPress={() => this.handlePaymentTypeOnChange('pay on delivery')} color={Colors.iconColor} style={{}} />
                                            </View>
                                            <View style={{marginLeft: 8}}>
                                                <Text style={{fontFamily:'Lato',color:'#000', marginLeft: 8, fontSize: 12}}>
                                                Pay On Delivery</Text>
                                            </View>
                                            
                                        </View>
                                    </View>
                                </CardItem>
                            </Card>
                            {/* <Card style={{...styles.summaryCard, marginTop: 20}}>
                                <CardItem bordered>
                                    <View style={styles.costContainerStyle}>
                                        <Text style={{...styles.textLineStyle, color:'#000'}}>Select Payment Party</Text>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <View style={{...styles.moneyConatinerStyle}}>
                                        <View style={{flex: 1, flexDirection:'row'}}>
                                            <View>
                                                <CheckBox checked={this.state.paymentParty === 'sender'} 
                                                onPress={ () => this.handlePaymentPartyOnChange('sender')} color={Colors.iconColor} style={{}} />
                                            </View>
                                            <View style={{marginLeft: 8}}>
                                                <Text style={{fontFamily:'Lato',color:'#000', marginLeft: 8, fontSize: 12}}>
                                                Sender</Text>
                                            </View>
                                            
                                        </View>
                                        <View style={{flex:1 ,flexDirection:'row'}}>
                                            <View>
                                                <CheckBox checked={this.state.paymentParty === 'receiver'} 
                                                onPress={() => this.handlePaymentPartyOnChange('receiver')} color={Colors.iconColor} style={{}} />
                                            </View>
                                            <View style={{marginLeft: 8}}>
                                                <Text style={{fontFamily:'Lato',color:'#000', marginLeft: 8, fontSize: 12}}>
                                                Receiver</Text>
                                            </View>
                                            
                                        </View>
                                    </View>
                                </CardItem>
                            </Card> */}
                            {/* <Card style={styles.cardInputsContainer}>
                                <Grid>
                                    <Col>
                                        <CardItem style={styles.checkoutCardInputContainer}>
                                            <Label style={styles.cardInputLabel}>Name</Label>
                                            <Item regular>
                                                <Input
                                                    placeholder="Name"
                                                    returnKeyType="next"
                                                    selectionColor={Colors.primaryCOlor}
                                                    style={styles.checkoutCardInput} keyboardType="default" />
                                            </Item>

                                        </CardItem>
                                    </Col>
                                    <Col>
                                        <CardItem style={styles.checkoutCardInputContainer}>
                                            <Label style={styles.cardInputLabel}>Surname</Label>
                                            <Item regular>
                                                <Input
                                                    returnKeyType="next"
                                                    placeholder="Surname"
                                                    selectionColor={Colors.primaryCOlor}
                                                    style={styles.checkoutCardInput} keyboardType="default" />
                                            </Item>
                                        </CardItem>
                                    </Col>
                                </Grid>
                                <Grid>
                                    <Row>
                                        <CardItem style={styles.checkoutCardInputContainer}>
                                            <Label style={styles.cardInputLabel}>Credit Card Number</Label>
                                            <Item regular>
                                                <Input
                                                    returnKeyType="next"
                                                    placeholder="XXXX XXXX XXXX XXXX"
                                                    selectionColor={Colors.primaryCOlor}
                                                    style={styles.checkoutCardInput} keyboardType="number-pad" />
                                            </Item>
                                        </CardItem>
                                    </Row>

                                </Grid>
                                <Grid>
                                    <Col >
                                        <CardItem style={styles.checkoutCardInputContainer}>
                                            <Label style={styles.cardInputLabel}>Expiry Date</Label>
                                            <Item regular>
                                                <Input
                                                    returnKeyType="next"
                                                    placeholder="MM/YY"
                                                    selectionColor={Colors.primaryCOlor}
                                                    style={styles.checkoutCardInput} keyboardType="number-pad" />
                                            </Item>
                                        </CardItem>
                                    </Col>
                                    <Col >
                                        <CardItem style={styles.checkoutCardInputContainer}>
                                            <Label style={styles.cardInputLabel}>CVC</Label>
                                            <Item regular>
                                                <Input
                                                    returnKeyType="done"
                                                    placeholder="CVC"
                                                    selectionColor={Colors.primaryCOlor}
                                                    style={styles.checkoutCardInput} keyboardType="number-pad" />
                                            </Item>
                                        </CardItem>
                                    </Col>
                                </Grid>
                                
                                
                            </Card> */}
                            <Button onPress={this.handleFormSubmit} full style={{backgroundColor: Colors.secondaryColor, marginTop: 40}}>
                                <Text>
                                    Book Order
                                </Text>
                            </Button>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => {
    const {order: {shipmentDetail, selectedItems, pickupTime,extraPackaging, deliveryFee,
         pickupTimeToLocale, deliveryInstruction, pickupInstruction, orderCreated}} = state;
    return {
        shipmentDetail,
        selectedItems,
        pickupTime, pickupTimeToLocale, deliveryFee, extraPackaging,
        deliveryInstruction, pickupInstruction,
        orderCreated
    }

}

export default connect(mapStateToProps, actions)(ProcessPaymentScreen);