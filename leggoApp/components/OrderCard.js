import React, { Component } from 'react';
import { View } from "react-native";
import { Card, Text, Header, Button, CardItem, Body,Icon, Accordion,Content } from "native-base";
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
                        this.props.status === 'on way' ? (
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
                    this.props.status !== 'pending' ? (
                        <View style={{borderColor: '#d3d3d3',padding: 10,
                         borderWidth: 1, }}>
                            <View>
                                <Text style={styles.orderScreenPersonDetails}>Driver</Text>
                                <View style={{display: 'flex',flexDirection:'row', justifyContent:'space-between',}}>
                                    <Text style={{...styles.addressDetailText,paddingBottom: 0, fontSize: 16, marginTop: 8}}>{this.props.driver}</Text>
                                    
                                    <Button  rounded style={{backgroundColor: Colors.secondaryColor,
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
            case 'on way':
                backgroundColor = Colors.success
            break;
            case 'pending':
                backgroundColor = Colors.warning
            break
            case 'fulfilled':
                backgroundColor = Colors.secondaryColor
            break;
        }

        return (
            <View style={{...styles.orderStatus, backgroundColor}}>
                <Text style={styles.orderStatusText}>{this.props.status}</Text>
            </View>
            
        )
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
        const {orderNumber} = this.props
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
                                color: this.props.status === 'fulfilled' ? Colors.success : Colors.danger
                            }}
                        />
                        <Text style={styles.addressText}>{this.props.destination}</Text>
                    </View>
                    {
                        this.props.status === 'on way' ? (
                        <View style={{flexDirection:'row',display:'flex', width: '100%',
                             justifyContent:'flex-end', alignItems:'center', marginBottom: 16, paddingRight: 10}}>
                            <Button 
                                bordered  rounded iconRight 
                                style={{borderColor: Colors.secondaryColor, height: 40}}
                                onPress={() => this.props._trackOrder()} >
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