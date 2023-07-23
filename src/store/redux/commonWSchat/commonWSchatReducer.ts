import type { CommonWSChatMessageType, GetActionWInferType } from '../storeTypes'
import { ADD_MESSAGES, SET_CURRENT_MESSAGE_FIELD_VALUE } from './constants'

const initialState = {
   messages: [] as Array<CommonWSChatMessageType>,
   currentMessageFieldValue: '' as string,
}

type InitialCommonWSChatStateType = typeof initialState

export const commonWSchatReducer = function (state: InitialCommonWSChatStateType = initialState, action: AllACCommonWSchatTypes): InitialCommonWSChatStateType {
   switch (action.type) {
      case SET_CURRENT_MESSAGE_FIELD_VALUE:
         return { ...state, currentMessageFieldValue: action.value }

      case ADD_MESSAGES:
         return { ...state, messages: [...state.messages, ...action.messages] }

      default:
         return state
   }
}

export type CommonWSChatReducerType = typeof commonWSchatReducer

export const CommonWSchatAC = {
   setCurrentMesageFieldValue: (value: string) => ({ type: SET_CURRENT_MESSAGE_FIELD_VALUE, value } as const),
   addMessages: (messages: Array<CommonWSChatMessageType>) => ({ type: ADD_MESSAGES, messages } as const),
}

export type AllACCommonWSchatTypes = ReturnType<GetActionWInferType<typeof CommonWSchatAC>>
