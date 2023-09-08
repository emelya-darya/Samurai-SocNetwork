import type { AuthDataToSetType, DialogsListItemType, GetActionWInferType, IncomingMessageType, LogInDataToSend } from '../storeTypes'
import {
   ADD_MESSAGE_TO_DELETING,
   ADD_MESSAGE_TO_SPAM,
   DELETE_MESSAGE,
   // ADD_SENT_MESSAGE_TO_END,
   GET_DIALOGS_LIST,
   GET_INITIAL_DATA_FOR_MESSAGES_PAGE,
   GET_MESSAGES_NEWER_THAN,
   GET_NEW_MESSAGES_COUNT,
   INCREASE_SCROLLED_MESSAGES_PAGE,
   INCREASE_SHOWING_DIALOGS_PORTION,
   INCREASE_VISIBLE_MESSAGES_PORTION,
   IS_IN_PROGRESS_SEND_MESSAGE,
   REMOVE_MESSAGE_FROM_DELETED_SPAM,
   RESTORE_MESSAGE,
   // RESET_MESSAGES_LIST_DATA,
   SEND_MESSAGE,
   SET_COMPANION_DATA,
   SET_DATE_NEWER_THAN,
   SET_DIALOGS_LIST,
   SET_INITIAL_MESSAGES_PORTION,
   SET_IS_IN_PROGRESS_DELETING,
   SET_IS_IN_PROGRESS_GET_MESSAGES_NEWER_THAN,
   SET_IS_IN_PROGRESS_LOADING_DIALOGS_LIST,
   SET_IS_IN_PROGRESS_RESTORE,
   SET_IS_IN_PROGRESS_SPAM,
   SET_IS_LOADING_MESSAGES_LIST_PRIMARY_DATA,
   SET_IS_LOADING_MESSAGES_PORTION,
   SET_NEW_MESSAGES_COUNT,
   SET_NEW_SCROLLED_MESSAGES_PAGE,
   SET_TOTAL_MESSAGES_COUNT,
   SPAM_MESSAGE,
   // SET_IS_LOADING_MESSAGES_LIST_PRIMARY_DATA,
} from './constants'

const initialState = {
   isInProgressSendMessage: false as boolean,
   newMessagesCount: 0 as number,

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
      isLoadingMessagesPortion: false as boolean,
      totalMessagesCount: 0 as number,

      companionData: null as DialogsListItemType | null,
      isLoadingPrimaryData: false as boolean,

      deletedMessages: [] as Array<string>,
      inProgressDeletingMessages: [] as Array<string>,

      markedAsSpamMessages: [] as Array<string>,
      inProgressMarkSpamMessages: [] as Array<string>,

      inProgressRestore: [] as Array<string>,

      dateToGetMessagesNewerThan: null as string | null,
      isInProgressGetNewerThanMessages: false as boolean,
   },
}

type InitialDialogsStateType = typeof initialState

export const dialogsReducer = function (state: InitialDialogsStateType = initialState, action: AllACDialogsTypes): InitialDialogsStateType {
   switch (action.type) {
      case IS_IN_PROGRESS_SEND_MESSAGE:
         return { ...state, isInProgressSendMessage: action.isInProgeress }

      case SET_DIALOGS_LIST:
         const firstPortionToShow = []
         for (let i = 0; i < Math.min(state.dialogsListData.portionSizeToShow, action.dialogsList.length); i++) {
            firstPortionToShow.push(action.dialogsList[i])
         }

         return {
            ...state,
            dialogsListData: { ...state.dialogsListData, items: action.dialogsList, showingItems: firstPortionToShow },
         }

      case SET_IS_IN_PROGRESS_LOADING_DIALOGS_LIST:
         return {
            ...state,
            dialogsListData: { ...state.dialogsListData, isInProgressLoadingDialogsList: action.isInProgress },
         }

      case INCREASE_SHOWING_DIALOGS_PORTION:
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

      case SET_COMPANION_DATA:
         return { ...state, messagesListData: { ...state.messagesListData, companionData: action.companionData } }

      case SET_INITIAL_MESSAGES_PORTION:
         return {
            ...state,
            messagesListData: {
               ...state.messagesListData,
               scrolledToPage: 1,
               visibleMessages: action.messagesPortion,
               deletedMessages: [],
               inProgressDeletingMessages: [],
               markedAsSpamMessages: [],
               inProgressMarkSpamMessages: [],
               inProgressRestore: [],
               dateToGetMessagesNewerThan: null,
            },
         }

      case SET_TOTAL_MESSAGES_COUNT:
         return { ...state, messagesListData: { ...state.messagesListData, totalMessagesCount: action.totalCount } }

      case SET_IS_LOADING_MESSAGES_LIST_PRIMARY_DATA:
         return { ...state, messagesListData: { ...state.messagesListData, isLoadingPrimaryData: action.isLoading } }

      case SET_NEW_SCROLLED_MESSAGES_PAGE:
         return { ...state, messagesListData: { ...state.messagesListData, scrolledToPage: action.page } }

      case INCREASE_VISIBLE_MESSAGES_PORTION:
         return {
            ...state,
            messagesListData: {
               ...state.messagesListData,
               // scrolledToPage: 1,
               visibleMessages: [...action.newMessages, ...state.messagesListData.visibleMessages],
            },
         }

      case SET_IS_LOADING_MESSAGES_PORTION:
         return { ...state, messagesListData: { ...state.messagesListData, isLoadingMessagesPortion: action.isLoading } }

      case ADD_MESSAGE_TO_DELETING:
         return {
            ...state,
            messagesListData: {
               ...state.messagesListData,
               deletedMessages: [...state.messagesListData.deletedMessages, action.messageId],
            },
         }

      case SET_IS_IN_PROGRESS_DELETING:
         let newInProgressDeletingMessages = [...state.messagesListData.inProgressDeletingMessages]

         if (action.isInProgress) newInProgressDeletingMessages.push(action.messageId)
         else newInProgressDeletingMessages = newInProgressDeletingMessages.filter(el => el !== action.messageId)

         return {
            ...state,
            messagesListData: {
               ...state.messagesListData,
               inProgressDeletingMessages: newInProgressDeletingMessages,
            },
         }

      case ADD_MESSAGE_TO_SPAM:
         return {
            ...state,
            messagesListData: {
               ...state.messagesListData,
               markedAsSpamMessages: [...state.messagesListData.markedAsSpamMessages, action.messageId],
            },
         }

      case SET_IS_IN_PROGRESS_SPAM:
         let newInProgressMarkSpamMessages = [...state.messagesListData.inProgressMarkSpamMessages]

         if (action.isInProgress) newInProgressMarkSpamMessages.push(action.messageId)
         else newInProgressMarkSpamMessages = newInProgressMarkSpamMessages.filter(el => el !== action.messageId)

         return {
            ...state,
            messagesListData: {
               ...state.messagesListData,
               inProgressMarkSpamMessages: newInProgressMarkSpamMessages,
            },
         }

      case REMOVE_MESSAGE_FROM_DELETED_SPAM:
         return {
            ...state,
            messagesListData: {
               ...state.messagesListData,
               deletedMessages: state.messagesListData.deletedMessages.filter(el => el !== action.messageId),
               markedAsSpamMessages: state.messagesListData.markedAsSpamMessages.filter(el => el !== action.messageId),
            },
         }

      case SET_IS_IN_PROGRESS_RESTORE:
         let newInProgressRestore = [...state.messagesListData.inProgressRestore]

         if (action.isInProgress) newInProgressRestore.push(action.messageId)
         else newInProgressRestore = newInProgressRestore.filter(el => el !== action.messageId)

         return {
            ...state,
            messagesListData: {
               ...state.messagesListData,
               inProgressRestore: newInProgressRestore,
            },
         }

      case SET_DATE_NEWER_THAN:
         return { ...state, messagesListData: { ...state.messagesListData, dateToGetMessagesNewerThan: action.dateNewerThan } }

      case SET_IS_IN_PROGRESS_GET_MESSAGES_NEWER_THAN:
         return { ...state, messagesListData: { ...state.messagesListData, isInProgressGetNewerThanMessages: action.isInProgress } }

      case SET_NEW_MESSAGES_COUNT:
         return { ...state, newMessagesCount: action.newMessagesCount }

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
   increaseShowingPortion: () => ({ type: INCREASE_SHOWING_DIALOGS_PORTION } as const),

   getInitialDataForMessagesPage: (userId: number) => ({ type: GET_INITIAL_DATA_FOR_MESSAGES_PAGE, userId } as const),

   setCompanionData: (companionData: DialogsListItemType | null) => ({ type: SET_COMPANION_DATA, companionData } as const),

   setInitialMessagesPortion: (messagesPortion: Array<IncomingMessageType>) =>
      ({ type: SET_INITIAL_MESSAGES_PORTION, messagesPortion } as const),

   setTotalMessagesCount: (totalCount: number) => ({ type: SET_TOTAL_MESSAGES_COUNT, totalCount } as const),

   setIsLoadingMessagesListPrimaryData: (isLoading: boolean) => ({ type: SET_IS_LOADING_MESSAGES_LIST_PRIMARY_DATA, isLoading } as const),

   increaseScrolledMessagesPage: () => ({ type: INCREASE_SCROLLED_MESSAGES_PAGE } as const),

   increaseVisibleMessagesPortion: (newMessages: Array<IncomingMessageType>) =>
      ({ type: INCREASE_VISIBLE_MESSAGES_PORTION, newMessages } as const),

   setNewScrolledPage: (page: number) => ({ type: SET_NEW_SCROLLED_MESSAGES_PAGE, page } as const),

   setIsLoadingMessagesPortion: (isLoading: boolean) => ({ type: SET_IS_LOADING_MESSAGES_PORTION, isLoading } as const),

   deleteMessage: (messageId: string) => ({ type: DELETE_MESSAGE, messageId } as const),
   addMessageToDeleting: (messageId: string) => ({ type: ADD_MESSAGE_TO_DELETING, messageId } as const),
   setIsInProgressDeleteMessage: (messageId: string, isInProgress: boolean) =>
      ({ type: SET_IS_IN_PROGRESS_DELETING, messageId, isInProgress } as const),

   markSpamMessage: (messageId: string) => ({ type: SPAM_MESSAGE, messageId } as const),
   addMessageToSpam: (messageId: string) => ({ type: ADD_MESSAGE_TO_SPAM, messageId } as const),
   setIsInProgressMarkSpam: (messageId: string, isInProgress: boolean) =>
      ({ type: SET_IS_IN_PROGRESS_SPAM, messageId, isInProgress } as const),

   restoreMessage: (messageId: string) => ({ type: RESTORE_MESSAGE, messageId } as const),
   removeMsgFromDeletedSpam: (messageId: string) => ({ type: REMOVE_MESSAGE_FROM_DELETED_SPAM, messageId } as const),
   setIsInProgressRestoreMessage: (messageId: string, isInProgress: boolean) =>
      ({ type: SET_IS_IN_PROGRESS_RESTORE, messageId, isInProgress } as const),

   getMessagesNewerThan: (dateNewerThan: string | null) => ({ type: GET_MESSAGES_NEWER_THAN, dateNewerThan } as const),
   setDateNewerThan: (dateNewerThan: string | null) => ({ type: SET_DATE_NEWER_THAN, dateNewerThan } as const),
   setIsInProgressGetMessagesNewerThan: (isInProgress: boolean) =>
      ({ type: SET_IS_IN_PROGRESS_GET_MESSAGES_NEWER_THAN, isInProgress } as const),

   getNewMessagesCount: () => ({ type: GET_NEW_MESSAGES_COUNT } as const),
   setNewMessagesCount: (newMessagesCount: number) => ({ type: SET_NEW_MESSAGES_COUNT, newMessagesCount } as const),
}

export type AllACDialogsTypes = ReturnType<GetActionWInferType<typeof DialogsAC>>
