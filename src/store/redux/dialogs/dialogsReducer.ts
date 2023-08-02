import type { AuthDataToSetType, DialogsListItemType, GetActionWInferType, IncomingMessageType, LogInDataToSend } from '../storeTypes'
import { GET_DIALOGS_LIST, INCREASE_SHOWING_PORTION, IS_IN_PROGRESS_SEND_MESSAGE, SEND_MESSAGE, SET_DIALOGS_LIST, SET_IS_IN_PROGRESS_LOADING_DIALOGS_LIST } from './constants'

const initialState = {
   isInProgressSendMessage: false as boolean,

   dialogsListData: {
      items: [] as Array<DialogsListItemType>,
      isInProgressLoadingDialogsList: false,
      portionSizeToShow: 20,
      showingItems: [] as Array<DialogsListItemType>,
   },

   messagesListData: {
      portionSize: 15 as number,
      scrolledToPage: 1 as number,
      visibleMessages: [] as Array<IncomingMessageType>,
      isLoadingMessagePortion: false as boolean,
   },
}

type InitialDialogsStateType = typeof initialState

export const dialogsReducer = function (state: InitialDialogsStateType = initialState, action: AllACDialogsTypes): InitialDialogsStateType {
   switch (action.type) {
      case IS_IN_PROGRESS_SEND_MESSAGE:
         return { ...state, isInProgressSendMessage: action.isInProgeress }

      case SET_DIALOGS_LIST:
         const firstPortionToShow = []
         for (let i = 0; i < state.dialogsListData.portionSizeToShow; i++) {
            firstPortionToShow.push(action.dialogsList[i])
         }
         return { ...state, dialogsListData: { ...state.dialogsListData, items: action.dialogsList, showingItems: firstPortionToShow } }

      case SET_IS_IN_PROGRESS_LOADING_DIALOGS_LIST:
         return { ...state, dialogsListData: { ...state.dialogsListData, isInProgressLoadingDialogsList: action.isInProgress } }

      case INCREASE_SHOWING_PORTION:
         const currShowingItemsLng = state.dialogsListData.showingItems.length
         const portionSize = state.dialogsListData.portionSizeToShow
         const totalLng = state.dialogsListData.items.length

         if (currShowingItemsLng >= totalLng) return state

         const newPortion = [...state.dialogsListData.showingItems]
         const topLimiter = Math.min(currShowingItemsLng + portionSize, totalLng)
         for (let i = currShowingItemsLng; i < topLimiter; i++) {
            newPortion.push(state.dialogsListData.items[i])
         }

         return { ...state, dialogsListData: { ...state.dialogsListData, showingItems: newPortion } }

      default:
         return state
   }
}

export type DialogsReducerType = typeof dialogsReducer

export const DialogsAC = {
   sendMessage: (message: string, userId: number) => ({ type: SEND_MESSAGE, message, userId } as const),
   setIsInProgressSendMessage: (isInProgeress: boolean) => ({ type: IS_IN_PROGRESS_SEND_MESSAGE, isInProgeress } as const),

   getDialogsList: () => ({ type: GET_DIALOGS_LIST } as const),
   setDialogsList: (dialogsList: Array<DialogsListItemType>) => ({ type: SET_DIALOGS_LIST, dialogsList } as const),
   setIsInProgressLoadindDialogsList: (isInProgress: boolean) => ({ type: SET_IS_IN_PROGRESS_LOADING_DIALOGS_LIST, isInProgress } as const),
   increaseShowingPortion: () => ({ type: INCREASE_SHOWING_PORTION } as const),
}

export type AllACDialogsTypes = ReturnType<GetActionWInferType<typeof DialogsAC>>
