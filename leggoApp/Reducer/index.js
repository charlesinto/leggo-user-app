import { combineReducers } from "redux";
import OrderReducer from "./orderReducer";
import homeReducer from "./homeReducer";

export default combineReducers({
    order: OrderReducer,
    home: homeReducer
})