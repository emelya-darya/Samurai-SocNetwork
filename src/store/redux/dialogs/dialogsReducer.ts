import type { AuthDataToSetType, GetActionWInferType, LogInDataToSend } from '../storeTypes'
import { IS_IN_PROGRESS_SEND_MESSAGE, SEND_MESSAGE } from './constants'

const initialState = {
   isInProgressSendMessage: false as boolean,
}

type InitialDialogsStateType = typeof initialState

export const dialogsReducer = function (state: InitialDialogsStateType = initialState, action: AllACDialogsTypes): InitialDialogsStateType {
   switch (action.type) {
      case IS_IN_PROGRESS_SEND_MESSAGE:
         return { ...state, isInProgressSendMessage: action.isInProgeress }

      default:
         return state
   }
}

export type DialogsReducerType = typeof dialogsReducer

export const DialogsAC = {
   sendMessage: (message: string, userId: number) => ({ type: SEND_MESSAGE, message, userId } as const),
   setIsInProgressSendMessage: (isInProgeress: boolean) => ({ type: IS_IN_PROGRESS_SEND_MESSAGE, isInProgeress } as const),
}

export type AllACDialogsTypes = ReturnType<GetActionWInferType<typeof DialogsAC>>
