import { call, put, takeLeading } from 'redux-saga/effects'
import { DELETE_MESSAGE, RESTORE_MESSAGE } from '../../redux/dialogs/constants'
import { DialogsAC } from '../../redux/dialogs/dialogsReducer'
import { dialogsFetchingAPI } from '../../DAL/fetchingAPI'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { cutText } from '../assets/cutText'

const restoreMessageSagaWorker = function* (action: ReturnType<typeof DialogsAC.restoreMessage>) {
   const messageId = action.messageId

   yield put(ErrorsAC.setErrOnDeleteSpamRestoreMessage(messageId, null))
   yield put(DialogsAC.setIsInProgressRestoreMessage(messageId, true))

   try {
      const { resultCode, message } = yield call(dialogsFetchingAPI.restoreMessage, messageId)

      if (resultCode == 0) yield put(DialogsAC.removeMsgFromDeletedSpam(messageId))
      else throw new Error(message)
   } catch (err: any) {
      yield put(
         ErrorsAC.setErrOnDeleteSpamRestoreMessage(messageId, cutText(err.response?.data?.message || err.message, 30, 'Some server error'))
      )
   }
   yield put(DialogsAC.setIsInProgressRestoreMessage(messageId, false))
}

export const restoreMessageSagaWatcher = function* () {
   yield takeLeading(RESTORE_MESSAGE, restoreMessageSagaWorker)
}
