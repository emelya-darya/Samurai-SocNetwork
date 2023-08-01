import { call, put, takeLeading } from 'redux-saga/effects'
import { GET_DIALOGS_LIST } from '../../redux/dialogs/constants'
import { dialogsFetchingAPI } from '../../DAL/fetchingAPI'
import { DialogsListItemType } from '../../redux/storeTypes'
import { DialogsAC } from '../../redux/dialogs/dialogsReducer'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { cutText } from '../assets/cutText'

const sagaWorkerGetDialogsList = function* () {
   yield put(ErrorsAC.setErrOnLoadingsDialogsList(null))
   yield put(DialogsAC.setIsInProgressLoadindDialogsList(true))

   try {
      const data: Array<DialogsListItemType> = yield call(dialogsFetchingAPI.getDialogsList)
      yield put(DialogsAC.setDialogsList(data))
   } catch (err: any) {
      yield put(ErrorsAC.setErrOnLoadingsDialogsList(cutText(err.message, 200, 'Error on loading dialogs list')))
   }
   yield put(DialogsAC.setIsInProgressLoadindDialogsList(false))
}

export const sagaWatcherGetDialogsList = function* () {
   yield takeLeading(GET_DIALOGS_LIST, sagaWorkerGetDialogsList)
}
