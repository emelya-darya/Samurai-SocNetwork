import { call, put, takeLeading } from 'redux-saga/effects'
import { UPDATE_PHOTO } from '../../redux/profile/constants'
import { ProfileAC } from '../../redux/profile/profileReducer'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { profileFetchingAPI } from '../../DAL/fetchingAPI'
import { cutText } from '../assets/cutText'
import { AuthAC } from '../../redux/auth/authReducer'

const updatePhotoSagaWorker = function* (action: ReturnType<typeof ProfileAC.updatePhoto>) {
   yield put(ProfileAC.setIsInProgressUpdatePhotos(true))
   yield put(ErrorsAC.setErrOnUpdateProfilePhoto(null))
   try {
      const { resultCode, messages, data } = yield call(profileFetchingAPI.onUploadPhotoFile, action.photoFile)

      if (resultCode != 0) throw new Error(messages[0])
      yield put(ProfileAC.setNewPhotos(data.photos))
      yield put(AuthAC.setAvatar(data.photos.small))
   } catch (err: any) {
      yield put(ErrorsAC.setErrOnUpdateProfilePhoto(cutText(err.message, 45, 'Error on update photo')))
   }

   yield put(ProfileAC.setIsInProgressUpdatePhotos(false))
}
export const updateProfilePhotoSagaWatcher = function* () {
   yield takeLeading(UPDATE_PHOTO, updatePhotoSagaWorker)
}
