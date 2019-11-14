import React, { Component } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView,ScrollView, 
    StyleSheet, Platform,FlatList, TouchableWithoutFeedback, Image } from "react-native";
import { Card, Item,CardItem, Input,Text, Label, Form, Button, CheckBox } from "native-base";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { customStyles } from "../../constants/styles";
import * as actions from "../../actions";

class PlaceOrder extends Component {
    state = {
        extraPackaging: false,
        parcelType: [],
        receiver: {
            fullName: '',
            phoneNumber: '',
            email: '',
        },
        sender: {
            fullName: '',
            email:'',
            phoneNumber: ''
        }
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
    handleOnChange = (parent='', target='', value='') => {
        if(parent.trim() != ''){
            this.setState({
                [parent]: {...this.state[parent], [target]: value}
            })
        }
    }
    selectParcelSize = type => {
        let newParcels = [];
        let index = null;
        switch(type){
            case 'envelop':
                newParcels = this.state.parcelType;
                index = this.state.parcelType.findIndex(item => item.type === type)
                if(index === -1){
                    this._envelop.setNativeProps({
                        borderColor:  Colors.iconColor
                    })
                    newParcels.push({type, count: 1})
                }else{
                    this._envelop.setNativeProps({
                        borderColor:  '#c3c3c3'
                    })
                    newParcels.splice(index, 1)
                }
                this.setState({
                    parcelType: [...newParcels]
                })
            break;
            case 'mediumBox':
                 newParcels = this.state.parcelType;
                index = this.state.parcelType.findIndex(item => item.type === type)
                if(index === -1){
                    this._mediumBox.setNativeProps({
                        borderColor:  Colors.iconColor
                    })
                    newParcels.push({type, count: 1})
                }else{
                    this._mediumBox.setNativeProps({
                        borderColor:  '#c3c3c3'
                    })
                    newParcels.splice(index, 1)
                }
                this.setState({
                    parcelType: [...newParcels]
                })
            break;
            case 'bigBox':
                 newParcels = this.state.parcelType;
                index = newParcels.findIndex(item => item.type === type)
                if(index === -1){
                    this._bigBox.setNativeProps({
                        borderColor:  Colors.iconColor
                    })
                    newParcels.push({type, count: 1})
                }else{
                    this._bigBox.setNativeProps({
                        borderColor:  '#c3c3c3'
                    })
                    newParcels.splice(index, 1)
                }
                this.setState({
                    parcelType: [...newParcels]
                })
            break;
            default:
                break;
        }
    }
    handleSubmit = () =>{
        console.log(this.state)
    }
    render() {
        return (
            
            <KeyboardAvoidingView behavior="padding" enabled style={{ display: 'flex', flex: 1 }}>
                <SafeAreaView style={{ display: 'flex', flex: 1 }}>
                    <ScrollView style={{ display: 'flex', flex: 1 }}>
                        <View style={styles.AppContainer}>
                            <Text style={styles.senderStyle}>SENDER</Text>
                            <View>
                                <Card style={styles.cardContainerStyle}>
                                    <Text style={{ ...styles.textLineStyle, ...styles.senderName, }}>Onuorah Charles</Text>
                                    <Text style={{ ...styles.textLineStyle }}>charles.onuorah@yahoo.com</Text>
                                    <Text style={{ ...styles.textLineStyle }}>07010671710</Text>
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
                            <View>
                                <Card style={styles.cardContainerStyle}>
                                    <Form>
                                        <Item stackedLabel>
                                            <Label>Full Name</Label>
                                            <Input value={this.state.receiver.fullName} onChangeText={(text) => this.handleOnChange('receiver','fullName', text)} selectionColor={Colors.primaryCOlor} />
                                        </Item>
                                        <Item stackedLabel>
                                            <Label>Phone Number</Label>
                                            <Input 
                                                value={this.state.receiver.phoneNumber}
                                                selectionColor={Colors.primaryCOlor} onChangeText={(text) => this.handleOnChange('receiver','phoneNumber', text)} keyboardType="number-pad" />
                                        </Item>
                                        <Item stackedLabel>
                                            <Label>Email Address (Optional)</Label>
                                            <Input
                                                value={this.state.receiver.email}
                                             selectionColor={Colors.primaryCOlor} onChangeText={(text) => this.handleOnChange('receiver','email', text)} keyboardType="email-address"  />
                                        </Item>
                                    </Form>
                                </Card>
                            </View>
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
                                    <TouchableWithoutFeedback onPress={() => this.selectParcelSize('envelop')}>
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
                                                <Text style={styles.parcelName}>Envelop</Text>
                                                <Text style={styles.parcelDim}>54 x 42 x 32 cm</Text>
                                            </View>
                                            
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                         onPress={() => this.selectParcelSize('mediumBox')}
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
                                         onPress={() => this.selectParcelSize('bigBox')}
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
                        <Button onPress={this.handleSubmit} full style={styles.continueButtonStyle}>
                            <Text>Continue</Text>
                        </Button>
                    </View>
                </SafeAreaView>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    AppContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginLeft: 16,
        marginRight: 16
    },
    logoContainer: {
        width: '100%',
    },
    mainContainer: {
        flex: 0.6
    },
    senderStyle: {
        color:'#8c8b8b',
        padding: 10,
        paddingLeft: 0,
        fontSize: 12,
        fontFamily:'Roboto'
    },
    cardContainerStyle: {
        padding: 16
    },
    senderName: {
        fontWeight: '600',
        fontSize: 16,
        color: '#000'
    },
    textLineStyle: {
        marginBottom: 8,
        color: '#8c8b8b'
    },
    iconContainerStyle: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    CABcontainer: {
        position:"relative",

    },
    continueButtonStyle: {
        backgroundColor: Colors.secondaryColor
    },
    itemHeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    extraPackagingContainer: {
        display: "flex",
        flexDirection: 'row',

    },
    selectedItemsStyle:{
        fontFamily: 'Roboto',
        fontSize: 12
    },
    parcelCardContainer: {
        width: 120,
        marginLeft: 10
    },
    parcelImageContainer: {
        width:'100%', 
        height: 120,
        borderWidth: 4,
        borderRadius: 4,
        borderColor: '#c3c3c3'
    },
    parcelImage:{
        width: undefined, 
        height:undefined, 
        flex: 1
    },
    parcelName: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: '600'
    },
    parcelDim: {
        fontFamily: 'space-mono',
        fontSize: 10,
        color: '#8c8b8b'
    },
    parcelDescription: {
        paddingTop: 8,
        paddingBottom: 8
    }
})

const mapStateToProps = state => {
    const {order: {selectedItems}} = state;
    return {
        selectedItems
    }
}

export default connect(mapStateToProps, actions)(PlaceOrder);