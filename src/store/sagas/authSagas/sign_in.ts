import { call, put, takeLeading } from 'redux-saga/effects'
import { LOG_IN } from '../../redux/auth/constants'
import { AuthAC } from '../../redux/auth/authReducer'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { nullingAuthErrors } from './assets/nullingAuthErrors'
import { authFetchingAPI } from '../../DAL/fetchingAPI'
import { cutText } from '../assets/cutText'

const singInSagaWorker = function* (action: ReturnType<typeof AuthAC.logIn>) {
   yield nullingAuthErrors()
   yield put(AuthAC.setIsInProgressSignIn(true))

   try {
      const { resultCode, messages, data } = yield call(authFetchingAPI.onAuth, action.authData)

      if (resultCode != 0 && resultCode != 10) throw new Error(messages[0])

      if (resultCode == 10) {
         yield put(AuthAC.getCaptchaUrl())
         throw new Error(messages[0])
      } else if (resultCode == 0) yield put(AuthAC.chechAuth())
   } catch (err: any) {
      yield put(ErrorsAC.setErrOnLogIn(cutText(err.message, 40, 'Error on trying to login')))
   }

   yield put(AuthAC.setIsInProgressSignIn(false))
}

export const signInSagaWatcher = function* () {
   yield takeLeading(LOG_IN, singInSagaWorker)
}
