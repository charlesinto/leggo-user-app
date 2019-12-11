import React, { Component } from 'react';
import { View, Linking } from "react-native";
import { Card, Text,Toast, Button,Icon, Accordion } from "native-base";
import { styles } from "../constants/styles";
import { FontAwesome } from '@expo/vector-icons';
import Colors from "../constants/Colors";

class OrderCard extends Component {
    _getDate = () => {
        const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        return `${this.props.date.getDate()} ${MONTHS[this.props.date.getMonth()]}`
    }
    getCurrentLocation = () => {
        return 'Lekki Toll gate'
    }
    _callDriver = mobileNumber => {
        Linking.canOpenURL(`tel:${mobileNumber}`)
                          .then(supported => {
                              if(!supported){
                                return Toast.show({
                                            text: 'Some errors encounterd, could not find app',
                                            type: "error",
                                            position: "bottom"
                                        });
                              }
                              return Linking.openURL(`tel:${mobileNumber}`)
                          })
    }
    _renderContent = (item) => {
      return ( 
            <View style={{paddingBottom: 5, paddingTop: 5}}>
                <View style={{paddingLeft: 10}}>
                    <View style={styles.summaryAddressContainer}>
                        <Text style={{...styles.addressDetailText, fontWeight: '600'}}>From</Text>
                        <Text style={{...styles.addressDetailText,paddingLeft: 8, color: Colors.secondaryColor}} > 
                            on {this._getDate()}
                        </Text>
                    </View>
                    <View>
                        <Text style={{...styles.addressDetailText}}>
                            {this.props.pickup}
                        </Text>
                    </View>
                    {
                        this.props.status === 0 ? (
                            <View >
                                <Text style={{...styles.addressDetailText, fontWeight: '600'}}>Right Now</Text>
                                <Text style={{...styles.addressDetailText, color: Colors.success}}>
                                    {this.getCurrentLocation()}
                                </Text>
                            </View>
                        ) : null
                    }
                    
                    <View  style={styles.summaryAddressContainer}>
                        <View>
                            <Text style={{...styles.addressDetailText, fontWeight: '600'}}>To</Text>
                            <Text style={{...styles.addressDetailText}}>
                                {this.props.destination}
                            </Text>
                        </View>
                    </View>
                </View>
                {
                    this.props.status !== 0 ? (
                        <View style={{borderColor: '#d3d3d3',padding: 10,
                         borderWidth: 1, }}>
                            <View>
                                <Text style={styles.orderScreenPersonDetails}>Driver</Text>
                                <View style={{display: 'flex',flexDirection:'row', justifyContent:'space-between',}}>
                                    <Text style={{...styles.addressDetailText,paddingBottom: 0, fontSize: 16, marginTop: 8}}>{this.props.driver}</Text>
                                    
                                    <Button onPress={() => this._callDriver(this.props.driverNumber)}  rounded style={{backgroundColor: Colors.secondaryColor,
                                         }}>
                                        {/* <Text>Call</Text> */}
                                        <Icon name="ios-call" />
                                    </Button>
                                </View>
                            </View>
                        </View>
                    ): null

                }
                <View style={{ padding: 10}} bordered>
                    <View>
                        <Text style={styles.orderScreenPersonDetails}>Recipient</Text>
                        <Text style={{...styles.addressDetailText, fontSize: 16,paddingBottom: 0, marginTop: 8}}>
                            {this.props.recipient}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    _renderOrderStatus = () => {
        //0213052389
        let backgroundColor= null;
        switch(this.props.status){
            case 1:
            case 2:
            case 3:
                backgroundColor = Colors.success
            break;
            case 0:
                backgroundColor = Colors.warning
            break
            case 4:
                backgroundColor = Colors.secondaryColor
            break;
        }

        return (
            <View style={{...styles.orderStatus, backgroundColor}}>
                <Text style={styles.orderStatusText}>{this.renderStageToStatus()}</Text>
            </View>
            
        )
    }
    renderStageToStatus = () => {
        switch(this.props.status){
            case 0:
                return 'Pending'
            case 1:
            case 2:
            case 3:
                return 'On Way'
            case 4:
                return 'Fulfilled'
            default:
                return ;
        }
    }
    _renderHeader = (item, expanded) => {
        return (
            <View 
                style={{
                    flexDirection: "row",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center" 
                }}
            >
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.orderScreenOrderNumber}>
                        {this.props.orderNumber}
                    </Text>
                        {this._renderOrderStatus()}
                </View>
                {expanded
              ? <FontAwesome style={{ fontSize: 18 }} name="angle-up" />
              : <FontAwesome style={{ fontSize: 18 }} name="angle-down" />}
            </View>

        )
    }

    render() {
        const {orderNumber, id} = this.props
        return (
            <View>
                <Card>
                    <View>
                    <Accordion
                        dataArray={[{title: orderNumber, content: 'lore noienoineoinoienoinocnnc' }]}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                    />
                    </View>
                    <View style={{...styles.addressContainer}}>
                        <FontAwesome name="map-marker" size={26} style={{
                            color: Colors.secondaryColor
                        }} />
                        <Text style={styles.addressText}>{this.props.pickup}</Text>
                    </View>
                    <View style={{...styles.addressContainer, 
                            paddingBottom: this.props.status === 'on way' ? 0: 10}}>
                        <FontAwesome name="map-marker" size={26}
                            style={{
                                color: this.props.status === 4  ? Colors.success : Colors.danger
                            }}
                        />
                        <Text style={styles.addressText}>{this.props.destination}</Text>
                    </View>
                    {
                        this.props.status >= 1 && this.props.status < 4 ? (
                        <View style={{flexDirection:'row',display:'flex', width: '100%',
                             justifyContent:'flex-end', alignItems:'center', marginBottom: 16, paddingRight: 10}}>
                            <Button small
                                bordered  rounded iconRight 
                                style={{borderColor: Colors.secondaryColor, height: 40}}
                                onPress={() => this.props._trackOrder(id)} >
                                <Text style={styles.trackText}>track</Text>
                                <Icon name="arrow-forward" size={18} />
                            </Button>
                        </View>) : null
                    }
                    
                </Card>
            </View>
        );
    }
}

export default OrderCard;