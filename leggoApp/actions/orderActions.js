import { SELECT_DELIVERY_ITEM, NEW_SHIPMENT,
     UPDATE_PARCEL_PACKAGE_COUNT, CONFIRM_SHIPMENT,ADDRESS_INPUT_CHANGE,VIEW_MAP,
      REMOVE_SELECTED_ITEM , FETCH_PRICE, ORDER_CREATED_SUCCESSFULLY, SET_FILTER_CATEGORY} from "./type"
import { db } from "../firebase";
import { baseUrl } from "../constants/appUrl";
// import axios from "axios";


export const setFilterActiveLink = link => {
    return {type: SET_FILTER_CATEGORY, payload: link}
}

export const selectDeliveryPackage = (itemId) => {

    return {
        type: SELECT_DELIVERY_ITEM, payload: itemId
    }

}

export const newShipment = (shipmentDetails= {}) => {
    return {
        type: NEW_SHIPMENT,
        payload: shipmentDetails
    }
}

export const updateParcelPackagaeCount =  (type, target) => {
    return {
        type: UPDATE_PARCEL_PACKAGE_COUNT,
        payload: {type, target}
    }
}

export const confirmShipment = (pickupTimeToLocale, pickupTime, pickupInstruction = '', deliveryInstruction = '') => {
    return {
        type: CONFIRM_SHIPMENT,
        payload:{pickupTimeToLocale, pickupTime, pickupInstruction, deliveryInstruction}
    }
}

export const removeSelectedItem = id => {
    return {type: REMOVE_SELECTED_ITEM, payload: id}
}

export const procesShipment = order => {
    return (dispatch) => {
        const {shipmentDetail:{sender, extraPackaging,
            sameAsSender,
            parcelType,
            pickup,
            destination, receiver}, deliveryFee, deliveryInstruction,
            pickupInstruction, paymentType, paymentParty, selectedItems, pickupTime, pickupTimeToLocale} = order;
        const character = ['L', 'E', 'G', 'G', '0', 'A', 'P', 'P']
        const characterLength = character.length -1
        const character1 = character[Math.floor(Math.random()* characterLength )]
        const character2 = character[Math.floor(Math.random()* characterLength )]
        const character3 = character[Math.floor(Math.random() * characterLength)]
        const units = Math.floor(100 + Math.random() * 1000)
        const deliveryConfirmationCode = `${character1}${character2}${character3}${units}`
        const userDoc = db.collection(`orders`)
        userDoc.add({
            sender,
            extraPackaging,
            receiver,
            sameAsSender,
            parcelType,
            pickup,
            status:'created',
            stage: 0,
            destination, 
            selectedItems,
            pickupTime,
            senderEmail: sender.email,
            pickupInstruction,
            deliveryInstruction,
            deliveryFee,
            paymentParty,
            paymentType,
            pickupTimeToLocale,
            deliveryConfirmationCode,
            createdAt: new Date().toISOString()
        })
        .then(ref => {
            
            fetch(`${baseUrl}order/send-sms`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({receipient: sender.email, confirmationCode: deliveryConfirmationCode})
            })
            .then(res => res.json())
            .then(result => {
                console.log('document added with ref id', ref.id)
                return dispatch({type: ORDER_CREATED_SUCCESSFULLY, payload: deliveryConfirmationCode})
            })
            
        })
        .catch(err => {
            console.log(err)
            return dispatch({type: '', payload: ''})
        })
    }
    
}

export const inputChange = (text, target) => {
    return {type: ADDRESS_INPUT_CHANGE, payload: {text, target}}
}

export const calculatePrice = shipmentDetail => {
    const { destination, pickup, parcelType, itemsToShip } = shipmentDetail
    return  (dispatch) => {
        fetch(`${baseUrl}price/calculate`, {
            method: 'POST', 
            mode:'cors',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({destination, pickup, parcelType, itemsToShip})
            }
        )
        .then(res => res.json())
        .then(result => {
            return dispatch({type:FETCH_PRICE, payload:result})
        })
        .catch(err => console.log('error fetching > ', err))

        // axios.post(`${baseUrl}price/calculate`)
        //     .then(result => {
        //         console.log(result)
        //         return dispatch({type:'', payload:''})
        //     })
        //     .catch(err => console.log('error encountered', err))
    }
}

export const initiateLoading = () => {
    return {type:'', payload:''}
}

export const viewMap = (id) => {
    return { type: VIEW_MAP, payload: id}
}