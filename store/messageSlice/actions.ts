import { Message } from "../../ts/interfaces/messages"

export const createMessage = (message:Message) => ({
    type: 'CREATE_MESSAGE',
    payload: message
})

export const deleteMessage = (message:Message) => ({
    type: 'DELETE_MESSAGE',
    payload: message
})

