import { call, put, throttle } from 'redux-saga/effects'
import { GET_NEW_MESSAGES_COUNT } from '../../redux/dialogs/constants'
import { dialogsFetchingAPI } from '../../DAL/fetchingAPI'
import { DialogsAC } from '../../redux/dialogs/dialogsReducer'

export const getNewMessagesCountWorker = function* () {
   try {
      const count: number = yield call(dialogsFetchingAPI.getNewMessagesCount)
      yield put(DialogsAC.setNewMessagesCount(count))
   } catch (err: any) {}
}

export const getNewMessagesCountWatcher = function* () {
   yield throttle(3000, GET_NEW_MESSAGES_COUNT, getNewMessagesCountWorker)
}
