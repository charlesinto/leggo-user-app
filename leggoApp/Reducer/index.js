import { combineReducers } from "redux";
import OrderReducer from "./orderReducer";

export default combineReducers({
    order: OrderReducer
})