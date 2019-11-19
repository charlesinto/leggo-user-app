import { SELECT_DELIVERY_ITEM, NEW_SHIPMENT, UPDATE_PARCEL_PACKAGE_COUNT, CONFIRM_SHIPMENT } from "./type"


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