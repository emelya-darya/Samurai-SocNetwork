import { call, put, takeLeading } from 'redux-saga/effects'
import { GET_CAPTCHA_URL } from '../../redux/auth/constants'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { AuthAC } from '../../redux/auth/authReducer'
import { authFetchingAPI } from '../../DAL/fetchingAPI'
import { cutText } from '../assets/cutText'

const getCaptchaSagaWorker = function* () {
   yield put(ErrorsAC.setErrOnGetCaptcha(null))
   yield put(AuthAC.setIsInProgressGetCaptcha(true))
   try {
      const { url } = yield call(authFetchingAPI.getCaptcha)
      yield put(AuthAC.setCaptchaUrl(url))
   } catch (err: any) {
      yield put(ErrorsAC.setErrOnGetCaptcha(cutText(err.message, 40, 'Error on get captcha url')))
   }

   yield put(AuthAC.setIsInProgressGetCaptcha(false))
}

export const getCaptchaSagaWatcher = function* () {
   yield takeLeading(GET_CAPTCHA_URL, getCaptchaSagaWorker)
}
