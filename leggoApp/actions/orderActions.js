import { SELECT_DELIVERY_ITEM, NEW_SHIPMENT,
     UPDATE_PARCEL_PACKAGE_COUNT, CONFIRM_SHIPMENT, REMOVE_SELECTED_ITEM } from "./type"
import { db } from "../firebase";

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

export const confirmShipment = (pickupTimeToLocale, pickupTime) => {
    return {
        type: CONFIRM_SHIPMENT,
        payload:{pickupTimeToLocale, pickupTime}
    }
}

export const removeSelectedItem = id => {
    return {type: REMOVE_SELECTED_ITEM, payload: id}
}

export const procesShipment = order => {
    return (dispatch) => {
        console.log(order)
        const {shipmentDetail:{sender, extraPackaging,
            sameAsSender,
            parcelType,
            pickup,
            destination, receiver}, selectedItems, pickupTime, pickupTimeToLocale} = order;
        const userDoc = db.collection(`orders`)
        userDoc.add({
            sender,
            extraPackaging,
            receiver,
            sameAsSender,
            parcelType,
            pickup,
            destination,
            selectedItems,
            pickupTime,
            pickupTimeToLocale,
            createdAt: new Date().toISOString()
        })
        .then(ref => {
            console.log('document added with ref id', ref.id)
            return dispatch({type: '', payload: ''})
        })
        .catch(err => {
            console.log(err)
            return dispatch({type: '', payload: ''})
        })
    }
    
}