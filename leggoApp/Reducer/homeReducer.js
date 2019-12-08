import { HIDE_SPINNER, SHOW_SPINNER } from "../actions/type";

const INITIAL_STATE = {
    loading: false,
    color: null
}

export default (state = INITIAL_STATE, actions) => {
    switch(actions.type){
        case HIDE_SPINNER:
            return {...state, loading: false, color: null }
        case SHOW_SPINNER:
            return {...state, loading: true, color: actions.payload}
        default: 
            return {...state}
    }
}