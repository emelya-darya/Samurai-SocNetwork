import { all, call, debounce, fork, join, put, select, takeLeading, throttle } from 'redux-saga/effects'
import { GET_INITIAL_DATA_FOR_MESSAGES_PAGE, INCREASE_SCROLLED_MESSAGES_PAGE } from '../../redux/dialogs/constants'
import { GlobalStateType } from '../../redux/reduxStore'
import { DialogsListItemType } from '../../redux/storeTypes'
import { DialogsAC } from '../../redux/dialogs/dialogsReducer'
import { dialogsFetchingAPI } from '../../DAL/fetchingAPI'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { cutText } from '../assets/cutText'

const sagaWorkerIncreaseMessagesPortion = function* () {
   yield put(ErrorsAC.setErrOnLoadingExtraMessagesPortion(null))
   yield put(DialogsAC.setIsLoadingMessagesPortion(true))
   try {
      
      const companionData: DialogsListItemType | null = yield select(
         (state: GlobalStateType) => state.forDialogsData.messagesListData.companionData
      )
      const portionSize: number = yield select((state: GlobalStateType) => state.forDialogsData.messagesListData.portionSize)
      const currentPage: number = yield select((state: GlobalStateType) => state.forDialogsData.messagesListData.scrolledToPage)
      
      if (companionData) {
         const { items, totalCount, error } = yield call(
            dialogsFetchingAPI.getMessagesPortion,
            companionData.id,
            currentPage + 1,
            portionSize
         )
         if (!error) {
            yield put(DialogsAC.increaseVisibleMessagesPortion(items))
            yield put(DialogsAC.setNewScrolledPage(currentPage + 1))
         } else throw new Error(error)
     

      }
   } catch (err: any) {
      yield put(ErrorsAC.setErrOnLoadingExtraMessagesPortion(cutText(err.response?.data?.message || err.message, 50, 'Error on load messages portion')))
   }
   yield put(DialogsAC.setIsLoadingMessagesPortion(false))
}

export const sagaWatcherIncreaseMessagesPortion = function* () {
   //    yield takeLeading(GET_INITIAL_DATA_FOR_MESSAGES_PAGE, sagaWorkerIncreaseMessagesPortion)
   yield throttle(1500, INCREASE_SCROLLED_MESSAGES_PAGE, sagaWorkerIncreaseMessagesPortion)
}
