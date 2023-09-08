import { call, put, takeLeading } from 'redux-saga/effects'
import { DELETE_MESSAGE } from '../../redux/dialogs/constants'
import { DialogsAC } from '../../redux/dialogs/dialogsReducer'
import { dialogsFetchingAPI } from '../../DAL/fetchingAPI'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { cutText } from '../assets/cutText'

const deleteMessageSagaWorker = function* (action: ReturnType<typeof DialogsAC.deleteMessage>) {
   const messageId = action.messageId

   yield put(ErrorsAC.setErrOnDeleteSpamRestoreMessage(messageId, null))
   yield put(DialogsAC.setIsInProgressDeleteMessage(messageId, true))

   try {
      const { resultCode, message } = yield call(dialogsFetchingAPI.deleteMessage, messageId)
      if (resultCode == 0) {
         yield put(DialogsAC.addMessageToDeleting(messageId))
      } else throw new Error(message)
   } catch (err: any) {
      yield put(
         ErrorsAC.setErrOnDeleteSpamRestoreMessage(messageId, cutText(err.response?.data?.message || err.message, 30, 'Some server error'))
      )
   }
   yield put(DialogsAC.setIsInProgressDeleteMessage(messageId, false))
}

export const deleteMessageSagaWatcher = function* () {
   yield takeLeading(DELETE_MESSAGE, deleteMessageSagaWorker)
}
