import { HIDE_SPINNER, SHOW_SPINNER } from "./type";

export const showSpinner = (color = null) => {
    return {type: SHOW_SPINNER, payload: color}
}

export const hideSpinner = () => {
    return { type: HIDE_SPINNER, payload: ''}
}