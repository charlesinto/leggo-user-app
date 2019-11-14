import { SELECT_DELIVERY_ITEM } from "../actions/type"

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
    selectedItems: []
}
export default (state=INITIAL_STATE, actions) => {
    switch(actions.type){
        case SELECT_DELIVERY_ITEM:
           return selectItem(actions.payload, state)
        default:
            return {...state}
    }
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