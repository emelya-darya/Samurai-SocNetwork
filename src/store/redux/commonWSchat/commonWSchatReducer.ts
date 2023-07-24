import type { CommonWSChatMessageType, GetActionWInferType } from '../storeTypes'
import {
   ADD_MESSAGES,
   CLEAR_MESSAGES,
   CLOSE_EVENT,
   CREATE_WS_CHANNEL,
   ERROR_EVENT,
   MESSAGE_EVENT,
   OPEN_EVENT,
   SET_CURRENT_MESSAGE_FIELD_VALUE,
   SET_IS_IN_PROGRESS_OPEN_WS_CHANNEL,
   SET_IS_OPEN_WS_CHANNEL,
} from './constants'

const initialState = {
   isOpenWSChannel: false as boolean,
   isInProgeressOpenWSChannel: true as boolean,
   messages: [] as Array<CommonWSChatMessageType>,
   currentMessageFieldValue: '' as string,
}

type InitialCommonWSChatStateType = typeof initialState

export const commonWSchatReducer = function (state: InitialCommonWSChatStateType = initialState, action: AllACCommonWSchatTypes): InitialCommonWSChatStateType {
   switch (action.type) {
      case SET_IS_OPEN_WS_CHANNEL:
         return { ...state, isOpenWSChannel: action.isOpen }

      case SET_IS_IN_PROGRESS_OPEN_WS_CHANNEL:
         return { ...state, isInProgeressOpenWSChannel: action.isInProgress }

      case SET_CURRENT_MESSAGE_FIELD_VALUE:
         debugger
         return { ...state, currentMessageFieldValue: action.value }

      case ADD_MESSAGES:
         return { ...state, messages: [...state.messages, ...action.messages] }

      case CLEAR_MESSAGES:
         return { ...state, messages: [] }

      default:
         return state
   }
}

export type CommonWSChatReducerType = typeof commonWSchatReducer

export const CommonWSchatAC = {
   onOpenEvent: () => ({ type: OPEN_EVENT } as const),
   onMessageEvent: (newMessages: Array<CommonWSChatMessageType>) => ({ type: MESSAGE_EVENT, newMessages } as const),
   onCloseEvent: () => ({ type: CLOSE_EVENT } as const),
   onErrorEvent: () => ({ type: ERROR_EVENT } as const),

   createWSChannel: () => ({ type: CREATE_WS_CHANNEL } as const),
   setIsOpenWSChat: (isOpen: boolean) => ({ type: SET_IS_OPEN_WS_CHANNEL, isOpen } as const),
   setIsInProgeressOpenWSChannel: (isInProgress: boolean) => ({ type: SET_IS_IN_PROGRESS_OPEN_WS_CHANNEL, isInProgress } as const),
   setCurrentMessageFieldValue: (value: string) => ({ type: SET_CURRENT_MESSAGE_FIELD_VALUE, value } as const),
   addMessages: (messages: Array<CommonWSChatMessageType>) => ({ type: ADD_MESSAGES, messages } as const),
   clearMessages: () => ({ type: CLEAR_MESSAGES } as const),
}

export type AllACCommonWSchatTypes = ReturnType<GetActionWInferType<typeof CommonWSchatAC>>
