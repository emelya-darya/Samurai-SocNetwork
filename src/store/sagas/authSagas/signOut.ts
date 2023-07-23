import { call, put, takeLeading } from 'redux-saga/effects'
import { LOG_OUT } from '../../redux/auth/constants'
import { AuthAC } from '../../redux/auth/authReducer'
import { authFetchingAPI } from '../../DAL/fetchingAPI'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { cutText } from '../assets/cutText'
import { nullingAuthErrors } from './assets/nullingAuthErrors'

const signOutSagaWorker = function* () {
   yield nullingAuthErrors()
   yield put(AuthAC.setIsInProgressSignOut(true))

   try {
      const { resultCode, messages, data } = yield call(authFetchingAPI.offAuth)

      if (resultCode != 0) throw new Error(messages[0])

      yield put(AuthAC.setAuthData({ id: null, email: null, login: null }))
      yield put(AuthAC.setAvatar(null))
      yield put(AuthAC.setCaptchaUrl(null))
      yield put(AuthAC.setIsAuth(false))
   } catch (err: any) {
      yield put(ErrorsAC.setErrOnSignOut(cutText(err.message, 60, 'Error on logging out')))
   }

   yield put(AuthAC.setIsInProgressSignOut(false))
}

export const signOutSagaWatcher = function* () {
   yield takeLeading(LOG_OUT, signOutSagaWorker)
}
