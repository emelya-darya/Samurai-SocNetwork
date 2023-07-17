import { all, fork } from 'redux-saga/effects'
import { usersSagaWatcher } from './usersSagas'
import { navbarWatcher } from './friendsNavbarSagas'
import { friendsSagaWatcher } from './friendsSagas'
import { profileSagaWatcher } from './profileSagas/index'
import { authSagaWatcher } from './authSagas'

function* rootSaga() {
   yield all([fork(usersSagaWatcher), fork(navbarWatcher), fork(friendsSagaWatcher), fork(profileSagaWatcher), fork(authSagaWatcher)])
}

export { rootSaga }
