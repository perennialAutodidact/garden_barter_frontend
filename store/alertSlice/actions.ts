import { Alert } from "../../ts/interfaces/alerts"

export const createAlert = (alert:Alert) => ({
    type: 'CREATE_MESSAGE',
    payload: alert
})

export const deleteAlert = (alert:Alert) => ({
    type: 'DELETE_MESSAGE',
    payload: alert
})

