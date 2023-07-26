export const URL_WS_CHAT = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'

let WSChannel = null as null | WebSocket

const createWSChannel = () => {
   WSChannel = new WebSocket(URL_WS_CHAT)
}

export { WSChannel, createWSChannel }
