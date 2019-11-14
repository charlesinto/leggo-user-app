import { SELECT_DELIVERY_ITEM } from "./type"


export const selectDeliveryPackage = (itemId) => {

    return {
        type: SELECT_DELIVERY_ITEM, payload: itemId
    }

}