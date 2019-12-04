import { SELECT_DELIVERY_ITEM, NEW_SHIPMENT, UPDATE_PARCEL_PACKAGE_COUNT, 
    CONFIRM_SHIPMENT, 
    REMOVE_SELECTED_ITEM,
    ADDRESS_INPUT_CHANGE} from "../actions/type"

const INITIAL_STATE = {
    items: [
        { itemName: 'Clothings, Shoes and Accessories', id: 1 },
        { itemName: 'Books and Documents', id: 2 },
        { itemName: 'Electronics', id: 3 },
        { itemName: 'Health and Beauty', id: 4 },
        { itemName: 'Home and Decor', id: 5 },
        { itemName: 'Pottery and Glass', id: 6 },
        { itemName: 'Musical Instruments', id: 7 }
    ],
    selectedItems: [],
    shipmentDetail: null,
    pickupTime: null,
    pickupTimeToLocale: null,
    target: '',
    value: ''
}
export default (state=INITIAL_STATE, actions) => {
    switch(actions.type){
        case SELECT_DELIVERY_ITEM:
           return selectItem(actions.payload, state)
        case NEW_SHIPMENT:
            return {...state, shipmentDetail: actions.payload}

        case UPDATE_PARCEL_PACKAGE_COUNT: 
            return updateParcels(state, actions.payload)
        case CONFIRM_SHIPMENT: 
            const {pickupTimeToLocale, pickupTime} = actions.payload
            return {...state, pickupTime, pickupTimeToLocale}
        case REMOVE_SELECTED_ITEM:
            const id = actions.payload;
            const index = state.selectedItems.findIndex(element => element.id === id)
            const copySelectedItems = state.selectedItems;
            if(index !== -1){
                copySelectedItems.splice(index, 1)
            }
            return {...state, selectedItems: [...copySelectedItems]}
        case ADDRESS_INPUT_CHANGE:
            return {...state, target: actions.payload.target, value: actions.payload.text}
        default:
            return {...state}
    }
}

updateParcels = (state, payload) => {
    const {shipmentDetail: {parcelType}} = state;
    const index = parcelType.findIndex(element => element.id === payload.target)
    let newParcels = []
    let selectedParcel = parcelType[index]
    switch(payload.type){
        case 'decrease':
            selectedParcel.count = selectedParcel.count > 1 ? selectedParcel.count - 1 : 1;
        break;
        case 'increase':
            selectedParcel.count = selectedParcel.count + 1;
        break;
        default:
            break;
    }
    newParcels = parcelType;
    newParcels.splice(index, 1)
    newParcels.push(selectedParcel)
    return {...state, shipmentDetail: {...state.shipmentDetail, parcelType: newParcels}}
}


selectItem = (item, state ) => {
        const {selectedItems} = state;
        const index = selectedItems.findIndex(({id}) => parseInt(id) === parseInt(item.id))
        let newSelectedElements = selectedItems
        if(index !== -1){
            newSelectedElements.splice(index, 1)
        }else{
            newSelectedElements.push(item)
        }
        return {...state, selectedItems: [...newSelectedElements]}
}