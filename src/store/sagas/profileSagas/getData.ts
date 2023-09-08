import { all, call, put, takeLeading } from 'redux-saga/effects'
import { profileFetchingAPI } from '../../DAL/fetchingAPI'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { ProfileAC } from '../../redux/profile/profileReducer'
import { cutText } from '../assets/cutText'
import { ProfileDataTypeOnGet } from '../../redux/storeTypes'
import { GET_PROFILE_DATA } from '../../redux/profile/constants'

const handleGetProfileMainPortionData = function* (userId: number) {
   yield put(ErrorsAC.setErrorOnGetProfile(null))

   try {
      const data: ProfileDataTypeOnGet = yield call(profileFetchingAPI.onShowProfile, userId)
      yield put(ProfileAC.setLargePortionData(data))
   } catch (err: any) {
      yield put(ErrorsAC.setErrorOnGetProfile(cutText(err.response?.data?.message || err.message, 200, 'Error on get profile data')))
   }
}

const handleGetProfileStatus = function* (userId: number) {
   yield put(ErrorsAC.setErrorOnGetProfileStatus(null))

   try {
      const status: string | null = yield call(profileFetchingAPI.onGetStatus, userId)
      yield put(ProfileAC.setStatus(status))
   } catch (err: any) {
      yield put(ErrorsAC.setErrorOnGetProfileStatus(cutText(err.response?.data?.message || err.message, 40, 'Error on get profile status')))
   }
}

const handleGetIsFollowedProfile = function* (userId: number) {
   yield put(ErrorsAC.setErrorOnGetProfileFollowStat(null))

   try {
      const followStat: boolean = yield call(profileFetchingAPI.onCheckFollowForProfile, userId)
      yield put(ProfileAC.setIsFollowed(followStat))
   } catch (err: any) {
      yield put(ErrorsAC.setErrorOnGetProfileFollowStat(cutText(err.response?.data?.message || err.message, 25, 'Error on get follow status')))
   }
}

const getProfileSagaWorker = function* (action: ReturnType<typeof ProfileAC.getProfileData>) {
   yield put(ProfileAC.setIsLoadingProfile(true))
   // зануляем ошибки
   yield put(ErrorsAC.setErrOnProfileFetchingFollowUnfollow(null))
   yield put(ErrorsAC.setErrOnUpdateProfileStatus(null))
   yield put(ErrorsAC.setErrOnUpdateProfilePhoto(null))
   yield put(ErrorsAC.setErrOnUpdateProfileMainData(null))

   yield all([call(handleGetProfileMainPortionData, action.userId), call(handleGetProfileStatus, action.userId), call(handleGetIsFollowedProfile, action.userId)])
   yield put(ProfileAC.setIsLoadingProfile(false))
}

export const getProfileDataSagaWatcher = function* () {
   yield takeLeading(GET_PROFILE_DATA, getProfileSagaWorker)
}
