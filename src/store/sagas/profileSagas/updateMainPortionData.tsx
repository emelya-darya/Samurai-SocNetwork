import { call, put, takeLeading } from 'redux-saga/effects'
import { UPDATE_PROFILE_DATA, UPDATE_STATUS } from '../../redux/profile/constants'
import { ProfileAC } from '../../redux/profile/profileReducer'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { profileFetchingAPI } from '../../DAL/fetchingAPI'
import { cutText } from '../assets/cutText'

const updateProfileMainDataSagaWorker = function* (action: ReturnType<typeof ProfileAC.updateProfileData>) {
   yield put(ProfileAC.setIsInProgressUpdateProfileData(true))
   yield put(ErrorsAC.setErrOnUpdateProfileMainData(null))
   try {
      const { resultCode, messages } = yield call(profileFetchingAPI.onUpdateProfile, action.profileData)

      if (resultCode != 0) throw new Error(messages[0])
      yield put(ProfileAC.setNewProfileData(action.profileData))
   } catch (err: any) {
      yield put(ErrorsAC.setErrOnUpdateProfileMainData(cutText(err.message, 30, 'Error on updating profile data')))
   }

   yield put(ProfileAC.setIsInProgressUpdateProfileData(false))
}
export const updateProfileMainDataSagaWatcher = function* () {
   yield takeLeading(UPDATE_PROFILE_DATA, updateProfileMainDataSagaWorker)
}
