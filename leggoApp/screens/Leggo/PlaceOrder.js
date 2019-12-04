import React, { Component } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView,ScrollView, 
     Platform,FlatList, TouchableWithoutFeedback,Modal, Image, ActivityIndicator } from "react-native";
import { Card, Item,CardItem, Input,Text, Label, Form, Button, CheckBox, Toast } from "native-base";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { GooglePlacesAutocomplete  } from "react-native-google-places-autocomplete";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { GOOGLE_API_KEY } from "../../keys/googleAPI";
import { customStyles, styles } from "../../constants/styles";
import * as actions from "../../actions";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import layout from "../../constants/Layout";

class PlaceOrder extends Component {
    constructor(props){
        super(props)

        this.googleRef = React.createRef()
        this.googleRef2 = React.createRef()
        this.state = {
            extraPackaging: false,
            sameAsSender: false,
            showLoader: false,
            parcelType: [],
            pickup: '',
            pickupText: '',
            destinationText: '',
            destination: '',
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
            listView1: false,
            listView2: false,
            isFormValid: false,
            currentLocation: null,
            errorLocation: null,
            errorMessage: null,
            showDeleteIcon1: false,
            showDeleteIcon2: false
        }
    }
    componentDidMount(){
        this._getLocationAsync()
    }
    _toggleModalClose = () => {
        this.setState({
            showLoader: false
        })
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.target !== ''){
            return {...state, [nextProps.target]: nextProps.value}

        }
        return null
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
            errorLocation: true
          });
        }
    
        const location = await Location.getCurrentPositionAsync({});
        const { coords: {latitude, longitude}} = location;
        this.setState({ currentLocation: { latitude, longitude } });
      };
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
      _removeItem = id => {
          this.props.removeSelectedItem(id)
      }
      renderItem = ({item}) => {
        const {itemName, id} = item;
        return ( <CardItem  bordered>
                        <View style={{ width:'100%',fontFamily:'Lato', flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',width:"100%", justifyContent:'space-between'}}>
                                <Text style={styles.selectedItemsStyle}>{itemName}</Text>
                                <TouchableWithoutFeedback onPress={() => this._removeItem(id)}>
                                    <View style={{ marginTop: 2}}>
                                        <Ionicons
                                            name={
                                                Platform.OS === 'ios'
                                                    ? `ios-remove-circle-outline`
                                                    : 'md-remove-circle-outline'
                                            }

                                            size={24}
                                            style={{ color: Colors.iconColor }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
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
        else if(this.state.pickup === ''){
            return { isValid: false, message:'Please select pickup location'}
        }
        else if(this.state.destination === ''){
            return {isValid: false, message: 'Please enter delivery destination'}
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
    _onTextChange = (text, target) => {
        // console.log('text>>>', text, 'target>>>>', target)
        // this.setState({
        //     [target]: text
        // })
    }
    _getCoordinateFromAddress = (input, description = null, place_id = null) => {
        this.setState({showLoader: true})
        if(input === 'listView1'){
            if(this.state.pickupText.trim() !== ''){
                console.log(description, place_id)
                console.log('in here')
                if(description && place_id){
                   return  fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_API_KEY}`)
                        .then(res => res.json())
                        .then(place => {
                            console.log('places', place)
                            const {result: {formatted_address, geometry}} = place;
                            this.setState({
                                pickup: {
                                    description: formatted_address,
                                    geometry
                                },
                                showLoader: false
                            }, () => console.log('pickup', this.state.pickup))
                        })
                        .catch(err => console.log('error', err))
                }
                const address = this.state.pickupText.split(' ').join('+')
                return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`)
                        .then(res => res.json())
                        .then(place => {
                            console.log('places', place)
                            const {result: {formatted_address, geometry}} = place;
                            this.setState({
                                pickup: {
                                    description: formatted_address,
                                    geometry
                                },
                                showLoader: false
                            }, () => console.log('pickup', this.state.pickup))
                        })
                        .catch(err => console.log('error', err))
            }
            
        }

       else if(input === 'listView2'){

            if(this.state.destinationText.trim() !== ''){
                console.log(description, place_id)
                console.log('in here')
                if(description && place_id){
                   return  fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_API_KEY}`)
                        .then(res => res.json())
                        .then(place => {
                            console.log('places', place)
                            const {result: {formatted_address, geometry}} = place;
                            this.setState({
                                pickup: {
                                    description: formatted_address,
                                    geometry
                                },
                                showLoader: false
                            }, () => console.log('pickup', this.state.pickup))
                        })
                        .catch(err => console.log('error', err))
                }
                const address = this.state.destinationText.split(' ').join('+')
                return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`)
                        .then(res => res.json())
                        .then(place => {
                            console.log('places', place)
                            const {result: {formatted_address, geometry}} = place;
                            this.setState({
                                pickup: {
                                    description: formatted_address,
                                    geometry
                                },
                                showLoader: false
                            }, () => console.log('pickup', this.state.pickup))
                        })
                        .catch(err => console.log('error', err))
            }
            
        }

    }
    _fetchLocationDetails = (input, value) => {
        console.log('called to search')
    }
    handleAddressDelte = searchBox => {
        switch(searchBox){
            case 'listView1':
                return this.setState({
                    listView1: false
                })
            case 'listView2':
                return this.setState({
                    listView2: false
                })
            default:
                return ;
        }
    }
    toggleDeleteIcon = (text, target) => {
        switch(target){
            case 'showDeleteIcon1':
                if(text.trim() === ''){
                    return this.setState({
                        showDeleteIcon1: false
                    })
                }
                return this.setState({
                    showDeleteIcon1: true
                })
            case 'showDeleteIcon2':
                    if(text.trim() === ''){
                        return this.setState({
                            showDeleteIcon2: false
                        })
                    }
                    return this.setState({
                        showDeleteIcon2: true
                    })
            default:
                return ;
        }
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
                                    
                                    <GooglePlacesAutocomplete
                                        placeholder="Enter Pickup Location"
                                        minLength={2}
                                        autoFocus={false}
                                        returnKeyType={'search'} 
                                        fetchDetails={true}
                                        textInputProps={{
                                            onFocus: () => this.setState({listView1: true}),
                                            onChangeText: (text) => {
                                                console.log(text) 
                                                this.props.inputChange(text, 'pickupText')
                                                // this._onTextChange(text, 'pickupText')
                                             },
                                             ref: comp => this.textInput2 = comp,
                                             onBlur:  () => this._getCoordinateFromAddress('listView1') 
                                        }}
                                        listViewDisplayed={this.state.listView1}
                                        renderDescription={row => row.description} // custom description render
                                        onPress={(data, details = null) => {
                                            console.log('pickup', data)
                                            const { description, place_id} = data
                                            this._getCoordinateFromAddress('listView1', description, place_id)
                                            this.setState({
                                                listView1: false,
                                                pickup: data
                                            })
                                        }}
                                        renderLeftButton={()  => <FontAwesome name="map-marker" size={26}
                                        style={{paddingLeft: 8, marginTop: 6, color: Colors.warning}}
                                        />}
                                        renderRightButton={()  => true ? <TouchableWithoutFeedback onPress={() => {
                                            this._getCoordinateFromAddress('listView1')
                                            console.log('input 1 value', this.textInput2.value)
                                            this.handleAddressDelte('listView1')
                                        }}>
                                            <Ionicons name="ios-close" size={18}
                                        style={{paddingLeft: 8, marginTop: 14, paddingRight: 8}}
                                        /></TouchableWithoutFeedback> : null}
                                        getDefaultValue={() => {
                                            return '';
                                        }}
                                        query={{
                                            key: GOOGLE_API_KEY,
                                            language: 'en',
                                            types: '(cities)',
                                        }}
                                        styles={{
                                            description: {
                                            fontWeight: 'bold',
                                            },
                                            predefinedPlacesDescription: {
                                            color: '#1faadb',
                                            },
                                            textInputContainer:{
                                                borderColor: '#d3d3d3',
                                                borderWidth: 1,
                                                backgroundColor: '#fff',
                                                borderBottomWidth:0,
                                                borderRadius:4,
                                                height: 40,
                                                marginLeft: 16,
                                                marginRight: 16
                                            },
                                            listView: {
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                flex: 1,
                                                elevation: 3,
                                                zIndex: 10,
                                                position:'absolute',
                                                top: 80,
                                                height: layout['window'].height,

                                                left:0,
                                                marginBottom: 20
                                            },
                                        }}
                                        currentLocation={false}
                                        currentLocationLabel="Current location"
                                        nearbyPlacesAPI="GooglePlacesSearch"
                                        GoogleReverseGeocodingQuery={{
                                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                        }}
                                        GooglePlacesSearchQuery={{
                                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                            rankby: 'distance',
                                            types: 'food',
                                        }}
                                        filterReverseGeocodingByTypes={[
                                            'locality',
                                            'administrative_area_level_3',
                                        ]}
                                        ref= {comp => this.googleRef2 = comp}
                                        predefinedPlaces={[ {
                                            description: 'Current Location',
                                            geometry:this.state.currentLocation ? {
                                                location: {
                                                    lat: this.state.currentLocation.latitude,
                                                     lng: this.state.currentLocation.longitude
                                                }

                                            } : { location: {lat: -1, lng: -1} }
                                        }, homePlace, workPlace]}
                                        debounce={200}
                                        />
                                    <GooglePlacesAutocomplete
                                        placeholder="Enter Destination"
                                        
                                        minLength={2} 
                                        autoFocus={false}
                                        returnKeyType={'done'} 
                                        listViewDisplayed={this.state.listView2} 
                                        fetchDetails={false}
                                        textInputProps={{
                                            ref: input => this.textInput1 = input,
                                            onChangeText: (text) => {
                                                console.log(text) 
                                                this.props.inputChange(text, 'destinationText')
                                             },
                                             onFocus: () => this.setState({listView2: true}),
                                             onBlur:() => this._getCoordinateFromAddress('listView2') 

                                        }}
                                        renderDescription={row => row.description}
                                        onPress={(data, details = null) => {
                                            console.log('destination', data);
                                            this._getCoordinateFromAddress('listView2', data)
                                            this.setState({
                                                listView2: false,
                                                destination: data
                                            })
                                        }}
                                        ref={(comp) => this.googleRef = comp}
                                        renderLeftButton={()  => <FontAwesome name="map-marker" size={26}
                                        style={{paddingLeft: 8, marginTop: 6, color: Colors.danger}}
                                        />}
                                        renderRightButton={()  =>   <TouchableWithoutFeedback onPress={() => {
                                            this._getCoordinateFromAddress('listView2')
                                            this.handleAddressDelte('listView2')
                                        }}>
                                            <Ionicons name="ios-close" size={18}
                                        style={{paddingLeft: 8, marginTop: 14, paddingRight: 8}}
                                        /></TouchableWithoutFeedback> }
                                        getDefaultValue={() => {
                                            return ''; 
                                        }}
                                        query={{
                                            
                                            key: GOOGLE_API_KEY, //'AIzaSyAGF8cAOPFPIKCZYqxuibF9xx5XD4JBb84',
                                            language: 'en',
                                            types: '(cities)', // default: 'geocode'
                                        }}
                                        styles={{
                                            description: {
                                            fontWeight: 'bold',
                                            },
                                            predefinedPlacesDescription: {
                                            color: '#1faadb',
                                            },
                                            textInput:{
                                                borderColor: '#fff'
                                            },
                                            textInputContainer:{
                                                borderColor: '#d3d3d3',
                                                borderWidth: 1,
                                                backgroundColor: '#fff',
                                                borderRadius:4,
                                                position:'relative',
                                                zIndex: 10,
                                                height: 40,
                                                marginRight: 16,
                                                marginLeft: 16
                                            },
                                            listView: {
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                flex: 1,
                                                elevation: 3,
                                                zIndex: 10,
                                                height: layout['window'].height
                                            }
                                        
                                        }}
                                        currentLocation={false} 
                                        currentLocationLabel="Current location"
                                        GooglePlacesSearchQuery={{
                                            rankby: 'distance',
                                        }}
                                        filterReverseGeocodingByTypes={[
                                            'locality',
                                            'administrative_area_level_3',
                                        ]} 
                                        predefinedPlaces={[{
                                            description: 'Current Location',
                                            geometry:this.state.currentLocation ? {
                                                location: {
                                                    lat: this.state.currentLocation.latitude,
                                                     lng: this.state.currentLocation.longitude
                                                }

                                            } : { location: {lat: -1, lng: -1} }
                                        }, homePlace, workPlace]}
                                        debounce={200}
                                        />
                                </View>
                            </View>
                            <View style={styles.addMargin}>
                            <Text style={styles.senderStyle}>SENDER</Text>
                            
                            <View>
                                <Card style={styles.cardContainerStyle}>
                                <View style={{flexDirection:'row'}}>
                                        <View style={{marginRight: 6, marginTop: 4}}>
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
                                        <Text style={{ ...styles.textLineStyle, ...styles.senderName, }}>{this.state.sender.fullName}</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{marginRight: 6, marginTop: 4}}>
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
                                        <Text style={{ ...styles.textLineStyle }}>{this.state.sender.email}</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{marginRight: 6, marginTop: 4}}>
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
                                        <Text style={{ ...styles.textLineStyle }}>{this.state.sender.phoneNumber}</Text>
                                    </View>
                                    
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
                                            <View style={{flexDirection:'row'}}>
                                                    <View style={{marginRight: 6, marginTop: 4}}>
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
                                                    <Text style={{ ...styles.textLineStyle, ...styles.senderName, }}>{this.state.sender.fullName}</Text>
                                                </View>
                                                <View style={{flexDirection:'row'}}>
                                                    <View style={{marginRight: 6, marginTop: 4}}>
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
                                                    <Text style={{ ...styles.textLineStyle }}>{this.state.sender.email}</Text>
                                                </View>
                                                <View style={{flexDirection:'row'}}>
                                                    <View style={{marginRight: 6, marginTop: 4}}>
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
                                                    <Text style={{ ...styles.textLineStyle }}>{this.state.sender.phoneNumber}</Text>
                                                </View>
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
                                                    <View style={{flexDirection:"row"}}>
                                                        <View style={{marginRight: 6, marginTop: 2}}>
                                                            <Ionicons
                                                                name={
                                                                    Platform.OS === 'ios'
                                                                        ? `ios-add`
                                                                        : 'md-add'
                                                                }

                                                                size={20}
                                                                style={{ color: Colors.iconColor }}
                                                            />
                                                        </View>
                                                        <Text style={{ color: '#696969',fontFamily: 'Lato', fontSize: 14}}>Add item types</Text>
                                                    </View>
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
                                    <TouchableWithoutFeedback onPress={() => this.selectParcelSize('Envelope', '../../assets/images/boxsmall.png')}>
                                        <View style={styles.parcelCardContainer} >
                                            <View 
                                                ref={component => this._envelop = component} 
                                                style={styles.parcelImageContainer}>
                                                <Image
                                                    source={require('../../assets/images/boxsmall.png')}
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
                                         onPress={() => this.selectParcelSize('Medium Box', '../../assets/images/boxmedium.png')}
                                    >
                                    <View style={styles.parcelCardContainer} >
                                        <View 
                                            ref={component => this._mediumBox = component}
                                            style={styles.parcelImageContainer}>
                                            <Image
                                                source={require('../../assets/images/boxmedium.png')}
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
                                         onPress={() => this.selectParcelSize('Big Box', '../../assets/images/boxbig.png')}
                                    >

                                    <View style={{...styles.parcelCardContainer,paddingRight:20}} >
                                        <View 
                                            ref={component => this._bigBox = component}
                                            style={styles.parcelImageContainer}>
                                            <Image
                                                source={require('../../assets/images/boxbig.png')}
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
                        </View>
                        <Modal
                            transparent={true}
                            visible={this.state.showLoader}
                            onRequestClose={() => this._toggleModalClose()}
                        >
                        <View style={{flexDirection: "row", justifyContent:"space-around", padding:10, flex: 1}}>
                            <ActivityIndicator size="large" color={Colors.primaryCOlor}/>
                        </View>
                        </Modal>
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

const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
  };
  const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
  };

// const currentLocation = {
//     description: 'Current Location',
//     geometry: { location: this.sta}
// }


const mapStateToProps = state => {
    const {order: {selectedItems, value, target}} = state;
    return {
        selectedItems,
        value,
        target
    }
}

export default connect(mapStateToProps, actions)(PlaceOrder);