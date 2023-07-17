import { call, put, takeLeading } from 'redux-saga/effects'
import { CHECK_AUTH } from '../../redux/auth/constants'
import { AuthAC } from '../../redux/auth/authReducer'
import { authFetchingAPI } from '../../DAL/fetchingAPI'
import { AuthMeResponseDataType } from '../../redux/storeTypes'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { cutText } from '../assets/cutText'

const checkAuthSagaWorker = function* () {
   yield put(AuthAC.setIsInProgressCheckAuth(true))
   yield put(ErrorsAC.setErrOnCheckAuth(null))

   try {

      
      const response: AuthMeResponseDataType = yield call(authFetchingAPI.onCheckAuth)
      const { resultCode, messages, data } = response

      
      if (resultCode == 0) {
         yield put(AuthAC.setAuthData(data))

         const {
            photos: { small: smallPhoto },
         } = yield call(authFetchingAPI.getAvatar, data.id)

         yield put(AuthAC.setAvatar(smallPhoto))
         yield put(AuthAC.setIsAuth(true))
      }

   } catch (err: any) {
      yield put(AuthAC.setIsAuth(false))
      yield put(ErrorsAC.setErrOnCheckAuth(cutText(err.message, 25, 'Authorization check error')))
   }

   yield put(AuthAC.setIsInProgressCheckAuth(false))
}

export const checkAuthSagaWatcher = function* () {
   yield takeLeading(CHECK_AUTH, checkAuthSagaWorker)
}
