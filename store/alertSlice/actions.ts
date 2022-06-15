import { Alert } from "../../ts/interfaces/alerts"

export const createAlert = (message:Alert) => ({
    type: 'CREATE_MESSAGE',
    payload: message
})

export const deleteAlert = (message:Alert) => ({
    type: 'DELETE_MESSAGE',
    payload: message
})

