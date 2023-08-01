import { call, put, takeLeading } from 'redux-saga/effects'
import { SEND_MESSAGE } from '../../redux/dialogs/constants'
import { DialogsAC } from '../../redux/dialogs/dialogsReducer'
import { dialogsFetchingAPI } from '../../DAL/fetchingAPI'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { cutText } from '../assets/cutText'

const sendMessageSagaWorker = function* (action: ReturnType<typeof DialogsAC.sendMessage>) {
   yield put(DialogsAC.setIsInProgressSendMessage(true))
   yield put(ErrorsAC.setErrOnSendsMessageInDialogs(null))
  

   try {

    // throw new Error('Error on sending message')
      const { resultCode, messages } = yield call(dialogsFetchingAPI.onAddCompanion, action.userId)
      if (resultCode != 0) throw new Error(messages[0])

      const { resultCode: resultCode_1, messages: messages_1, data } = yield call(dialogsFetchingAPI.onSendMessage, action.userId, action.message)
      if (resultCode_1 != 0) throw new Error(messages_1[0])


   } catch (err: any) {
      yield put(ErrorsAC.setErrOnSendsMessageInDialogs(cutText(err.message, 100, 'Error on sending message')))
   }

   yield put(DialogsAC.setIsInProgressSendMessage(false))
}

export const sendMessageSagaWatcher = function* () {
   yield takeLeading(SEND_MESSAGE, sendMessageSagaWorker)
}
