import { put } from 'redux-saga/effects'
import { ErrorsAC } from '../../../redux/errors/errorsReducer'

export const nullingAuthErrors = function* () {
   yield put(ErrorsAC.setErrOnSignOut(null))
   yield put(ErrorsAC.setErrOnCheckAuth(null))
   yield put(ErrorsAC.setErrOnLogIn(null))
   yield put(ErrorsAC.setErrOnGetCaptcha(null))
}
