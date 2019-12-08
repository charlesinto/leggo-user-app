import React, { Component } from 'react';
import Colors from "../../constants/Colors";
import { customStyles, styles } from "../../constants/styles";
import { View, SafeAreaView, Image } from "react-native";
import MapView from 'react-native-maps';
import { db } from "../../firebase";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Layout from "../../constants/Layout";
import {  Button, Text, Card, CardItem } from "native-base";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from "../../keys/googleAPI";

class MapScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            destination: {},
            driverLocation: {},
            currentAddress: ''
        }
        
    }
    _getDriverCurrentLocationAddress = (latitude, longitude) => {
        return new Promise((resolve, reject) => {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`)
            .then(res => res.json())
            .then(response => {
                if(response.status === 'OK'){
                    const {results} = response;
                    const address = results[0].formatted_address;
                    return  resolve(address);
                }
                return reject(null)
            })
            .catch((err) => {
                console.log('some errors encountered', err)
                return  reject(null)
            })
        })
         
    }
    loadMap = () => {
        if(this.props.orderId.trim() !== ''){
            db.doc(`/transit/${this.props.orderId}`).onSnapshot(transit => {
                let destination = {}
                db.doc(`/orders/${this.props.orderId}`).get()
                    .then(doc => {
                        if(doc.exists){
                            destination = {
                                status: doc.data().status,
                                deliveryConfirmationCode: doc.data().deliveryConfirmationCode,
                                latitude:doc.data().destination.geometry.location.lat,
                                longitude: doc.data().destination.geometry.location.lng,
                                latitudeDelta: 0.0922 * (Layout.window.width / Layout.window.height),
                                longitudeDelta: 0.0922 * (Layout.window.height / Layout.window.width)
                            }
                        }
                        if(transit.exists){
                    
                            const driverLoc = {
                                latitude: transit.data().coords.latitude,
                                longitude: transit.data().coords.longitude,
                                speed: transit.data().coords.speed,
                                latitudeDelta: 0.0922 * (Layout.window.width / Layout.window.height)
                            }
                            this._getDriverCurrentLocationAddress(transit.data().coords.latitude,transit.data().coords.longitude)
                                .then(address => {
                                    console.log('address', address)
                                    this.setState({
                                        destination,
                                        driverLocation: driverLoc,
                                        isLoaded: true,
                                        currentAddress: address
                                    }, () => console.log('gotten details', this.state))
                                })
                                .catch(() => {
                                    this.setState({
                                        destination,
                                        driverLocation: driverLoc,
                                        isLoaded: true,
                                    }, () => console.log('gotten details', this.state))
                                })
                            
                        }
                    })
                
            })
        }
                
        
    }
    _handleBackOnPress = () => {
        this.props.navigation.goBack()
    }
    static navigationOptions = ({ navigation }) => {
        return {
          header: null,
          title: 'Map',
          headerStyle: {
            backgroundColor: Colors.headerColor,
          },
          headerTintColor: Colors.headerTintColor,
          headerTitleStyle: customStyles.headerStyle,
        };
      };
    render() {
        return (
            <SafeAreaView style={{flex: 1, width:"100%"}}>
                {
                    this.state.isLoaded ? (
                        <View style={{flex: 1,width:"100%",position:"relative", justifyContent:"center", alignItems:"center"}}>
                            <MapView style={{flex: 1, width:"100%"}}
                                region={this.state.destination}
                                zoomEnabled={true}
                            >
                                <MapView.Marker 
                                    coordinate={this.state.destination} 
                                    title="Destination"
                                />
                                <MapView.Marker 
                                    coordinate={this.state.driverLocation} 
                                    title="Driver Location"
                                    
                                >
                                    <Image source={require('../../assets/images/leggoMan.png')} 
                                        style={{width: 32, height: 32}} />
                                </MapView.Marker>
                                <MapViewDirections
                                    origin={this.state.driverLocation}
                                    destination={this.state.destination}
                                    apikey={GOOGLE_API_KEY}
                                    strokeColor={Colors.secondaryColor}
                                    strokeWidth={3}
                                />
                                {/* <MapView.Polyline
                                        coordinates={[
                                            {...this.state.destination},
                                            {...this.state.driverLocation}
                                        ]}
                                        strokeColor={Colors.warning} 
                                        strokeColors={[
                                            '#7F0000',
                                            '#00000000',
                                            '#B24112',
                                            '#E5845C',
                                            '#238C23',
                                            '#7F0000'
                                        ]}
                                        strokeWidth={6}
                                    /> */}
                            </MapView>
                            <View style={{position:"absolute", top:30, left: 20}}>
                                <Button transparent onPress={this._handleBackOnPress}>
                                    <View style={{backgroundColor:"#fff", width:40,
                                         height: 40, borderRadius: 20, alignItems:"center",
                                          display:"flex", justifyContent:"center"}}>
                                        <Ionicons
                                            name={'ios-arrow-back'}
                                            size={26}
                                        />
                                    </View>
                                    
                                </Button>
                            </View>
                            <View style={{position:"absolute", bottom:10, left: 10, width:"100%"}}>
                                <View style={{marginLeft: 10,width:"90%",padding: 10, marginRight: 16}}>
                                    <Card>
                                        <CardItem bordered>
                                            <View style={{width:"100%",justifyContent:"space-between",
                                                alignItems:"center",
                                             display:"flex", flexDirection:"row"}}>
                                                <Text style={styles.orderScreenOrderNumber}>
                                                {this.state.destination.deliveryConfirmationCode}
                                                </Text>
                                                <Text style={{...styles.orderScreenOrderNumber, fontWeight:"600"}}>
                                                    {this.state.destination.status.toUpperCase()}
                                                </Text>
                                            </View>
                                        </CardItem>
                                        <CardItem bordered>
                                            <View>
                                                <Text style=
                                                {{...styles.orderScreenOrderNumber, fontSize: 13,color:"#000",
                                                fontWeight:"600"}}>
                                                    Current Location</Text>
                                                {
                                                    this.state.currentAddress.trim() !== '' ? (
                                                        <View style={{flexDirection:"row", marginTop: 10, 
                                                            justifyContent:"space-between", alignItems:"center"}}>
                                                            <View style={{flex: 0.2}}>
                                                                <FontAwesome name="map-marker" size={26}
                                                                    style={{paddingLeft: 8, marginTop: 6, color: Colors.success}}
                                                                />
                                                            </View>
                                                            
                                                            <View style={{flex:0.8,flexDirection:"row",flexWrap:"wrap", marginLeft: 8, marginRight: 8}}>
                                                                <View style={{flex: 1, width:"100%",flexWrap:"wrap", flexDirection:"row"}}>
                                                                    <Text style={{...styles.orderScreenOrderNumber,width:220, fontSize: 11}}>
                                                                        {this.state.currentAddress}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    ) : null
                                                }
                                                
                                            </View>
                                        </CardItem>
                                    </Card>
                                </View>
                            </View>
                        </View>
                    )
                    : this.loadMap()
                }
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    const {order: {orderId}} = state;
    return { orderId}
}

export default connect(mapStateToProps, actions)(MapScreen);