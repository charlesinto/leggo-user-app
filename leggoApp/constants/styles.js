import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const customStyles = {
    headerStyle: {
        fontFamily: 'Roboto',
    fontWeight: '400'
    }
    
}

export const styles = StyleSheet.create({
    addMargin: {
        marginLeft: 16,
        marginRight: 16,
    },
    AppContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        // marginLeft: 16,
        // marginRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        // backgroundColor: '#cdcdcd'
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
        color: '#8c8b8b',
        fontFamily:'Roboto'
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
        height: 100,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#F6F6F6'
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
    },
    addressInputStyle:{
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#000'
    },
    addressBarStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 8
    },
    addressBarLabelStyle:{
        fontWeight: '600', 
        fontFamily: 'Roboto',
        fontSize: 14
    },
    customAddressBarInput: {
        paddingTop: 0,
        height: 60
    },
    customAddressBar:{
        paddingTop: 4,
        height: 60
    },
    pickupTimeStyle:{
        color: '#a9a9a9',
        fontFamily: 'Roboto',
        fontSize: 14,
        paddingRight: 8,
        marginTop: 3
    },
    horizontalRule:{
        width: '100%',
        height: 1,
        backgroundColor: '#c3c3c3'
    },
    timeStyle:{
        fontFamily:'space-mono',
        fontSize: 12,
        color: '#000',
        paddingBottom: 4
    },
    parcelDetailsContainer: {
        display: 'flex',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    parcelDetailImage: {
        width: '100%', 
        height: 80,
        flex: 0.2,
        marginRight: 8,
        marginLeft: 8
    },
    parcelDetailName: {
        flex: 0.4,
        display: 'flex',
        justifyContent: 'flex-start'
    },
    parcelDetailCount: {
        flex: 0.4,
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 8,
        marginRight: 8
    },
    pickerContainer:{
        display: 'flex',
        flexDirection: 'row'
    }, 
    pickerCounter: {
        // marginTop: 6,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 6,
        paddingBottom: 6
    },
    pickerButton: {
        height: '100%'
    },
    pickerView: {
        height: 40,
        display: 'flex',
        flexDirection: 'row'
    },
    costContainerStyle: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%"
    },
    moneyConatinerStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between"
    },
    moneyStyle:{
        fontFamily: 'space-mono',
        fontSize:14,
        fontWeight: '600'
    },
    currencySign:{
        paddingRight: 8
    },
    checkoutCardInputContainer:{
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    },
    checkoutCardInput: {
        fontFamily:'Roboto',
        fontSize: 14,
        height: 40
    },
    cardInputLabel: {
        marginBottom: 8,
        color: '#000',
        fontFamily:'Roboto',
        fontSize: 12,
    },
    cardInputsContainer:{
        paddingTop: 10,
        paddingBottom: 10
    },
    orderScreenName: {
        fontFamily: 'Lato',
        fontSize: 16,
        paddingBottom: 8
    },
    orderScreenShortTitle:{
        fontFamily: 'MontserratMedium',
        fontSize: 24
    },
    orderScreenButtonPill: {
        display: 'flex',
        flexDirection:'row',
        width: '100%',
        marginTop: 32,
        marginBottom: 16
    },
    orderScreenButton: {
        borderBottomWidth: 1, 
        borderTopWidth: 1,
        flex: 1,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderScreentButtonText: {
        fontFamily: 'Roboto',
        fontSize: 12
    },
    orderScreenOrderNumber: {
        color: Colors.muted,
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
        fontSize: 13
    },
    orderStatus: {
        marginLeft: 8,
        padding: 2,
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 2
    },
    orderStatusText: {
        fontFamily: 'Roboto',
        fontSize: 11,
        color: '#fff',
        textTransform: "capitalize"
    },
    addressContainer: {
        flexDirection: 'row',
        paddingBottom: 16,
        padding: 10
    },
    addressText:{
        color: Colors.muted,
        marginLeft: 8,
        fontSize: 12,
        textTransform: 'capitalize',
        fontFamily: 'Lato',
        lineHeight: 25
    },
    trackText: {
        fontFamily: 'Roboto', 
        fontSize: 11,
        color: Colors.secondaryColor
    },
    summaryAddressContainer:{
        flexDirection: 'row',

    },
    addressDetailText: {
        color: Colors.muted,
        textTransform: 'capitalize',
        fontFamily: 'Lato',
        fontSize: 11,
        paddingBottom: 16
    },
    orderScreenPersonDetails: {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 12
    },
    homeScreenContainerStyle:{
        display:'flex', 
        height:'100%', 
        flexDirection:'column',
         width:'100%'
    },
    homeScreenBackgroundContainer:{
        flex: 0.7,
        width: '100%',
        height: '100%'
    },
    homeScreenBackgroundImage:{
        flex: 1,
        width: undefined,
        height: undefined,
        position:"relative"
    },
    homeScreenGreeting: {
        position:'absolute',
        bottom: 30,
        right: 0,
        width: '100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    homeGreetingText:{
        color: '#fff',
        fontFamily:'Lato',
        fontSize: 26
    },
    homeScreenIconContainer:{
        width: '100%', 
        height: '100%', 
        justifyContent:'center', 
        alignItems:"center"
    }
})

