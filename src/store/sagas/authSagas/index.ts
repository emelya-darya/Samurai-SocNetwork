import { all, fork } from 'redux-saga/effects'
import { checkAuthSagaWatcher } from './authMe'
import { signOutSagaWatcher } from './signOut'
import { signInSagaWatcher } from './sign_in'
import { getCaptchaSagaWatcher } from './getCaptchaUrl'

export const authSagaWatcher = function* () {
    yield all([fork(checkAuthSagaWatcher), fork(signOutSagaWatcher), fork(signInSagaWatcher), fork(getCaptchaSagaWatcher)])
}
