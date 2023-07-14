import { call, put, takeLeading } from 'redux-saga/effects'
import { UPDATE_STATUS } from '../../redux/profile/constants'
import { ProfileAC } from '../../redux/profile/profileReducer'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { profileFetchingAPI } from '../../DAL/fetchingAPI'
import { cutText } from '../assets/cutText'

const updateStatusSagaWorker = function* (action: ReturnType<typeof ProfileAC.updateStatus>) {
   yield put(ProfileAC.setIsInProgressUpdateStatus(true))
   yield put(ErrorsAC.setErrOnUpdateProfileStatus(null))
   try {
      const { resultCode, messages } = yield call(profileFetchingAPI.onUpdateStatus, action.status)

      if (resultCode != 0) throw new Error(messages[0])
      yield put(ProfileAC.setStatus(action.status))
      
   } catch (err: any) {
      yield put(ErrorsAC.setErrOnUpdateProfileStatus(cutText(err.message, 30, 'Error on update status')))
   }

   yield put(ProfileAC.setIsInProgressUpdateStatus(false))
}
export const updateProfileStatusSagaWatcher = function* () {
   yield takeLeading(UPDATE_STATUS, updateStatusSagaWorker)
}
