import { all, fork } from 'redux-saga/effects'
import { usersSagaWatcher } from './usersSagas'
import { navbarWatcher } from './friendsNavbarSagas'
import { friendsSagaWatcher } from './friendsSagas'
import { profileSagaWatcher } from './profileSagas/index'

function* rootSaga() {
   yield all([fork(usersSagaWatcher), fork(navbarWatcher), fork(friendsSagaWatcher), fork(profileSagaWatcher)])
}

export { rootSaga }
