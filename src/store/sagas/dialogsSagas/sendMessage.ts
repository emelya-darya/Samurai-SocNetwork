import { call, put, select, takeLeading } from 'redux-saga/effects'
import { SEND_MESSAGE } from '../../redux/dialogs/constants'
import { DialogsAC } from '../../redux/dialogs/dialogsReducer'
import { dialogsFetchingAPI } from '../../DAL/fetchingAPI'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { cutText } from '../assets/cutText'
import { GlobalStateType } from '../../redux/reduxStore'

const sendMessageSagaWorker = function* (action: ReturnType<typeof DialogsAC.sendMessage>) {
   yield put(ErrorsAC.setErrOnSendsMessageInDialogs(null))
   yield put(DialogsAC.setIsInProgressSendMessage(true))

   try {
      // throw new Error('Error on sending message')
      const { resultCode, messages } = yield call(dialogsFetchingAPI.onAddCompanion, action.userId)
      if (resultCode != 0) throw new Error(messages[0])

      const {
         resultCode: resultCode_1,
         messages: messages_1,
         data,
      } = yield call(dialogsFetchingAPI.onSendMessage, action.userId, action.message)
      if (resultCode_1 == 0) {
         // yield put(DialogsAC.addSentMessageToEnd(data.message))

         //?
         const portionSize: number = yield select((state: GlobalStateType) => state.forDialogsData.messagesListData.portionSize)
         const { items, totalCount, error } = yield call(dialogsFetchingAPI.getMessagesPortion, action.userId, 1, portionSize)

         if (!error) {
            yield put(DialogsAC.setInitialMessagesPortion(items))
            yield put(DialogsAC.setTotalMessagesCount(totalCount))
            yield put(DialogsAC.setDateNewerThan(null))
         } else throw new Error(error)
         //*?

         
      }else {
         throw new Error(messages_1[0])
      }
   } catch (err: any) {
      yield put(
         ErrorsAC.setErrOnSendsMessageInDialogs(cutText(err.response?.data?.message || err.message, 50, 'Error on sending message'))
      )
   }

   yield put(DialogsAC.setIsInProgressSendMessage(false))
}

export const sendMessageSagaWatcher = function* () {
   yield takeLeading(SEND_MESSAGE, sendMessageSagaWorker)
}
