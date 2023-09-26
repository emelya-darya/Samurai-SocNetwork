import { all, fork } from 'redux-saga/effects'
import { usersSagaWatcher } from './usersSagas'
import { navbarWatcher } from './friendsNavbarSagas'
import { friendsSagaWatcher } from './friendsSagas'
import { profileSagaWatcher } from './profileSagas/index'
import { authSagaWatcher } from './authSagas'
import { commonWSChatSagaWatcher } from './commonWSChatSagas'
import { dialogsSagaWatcher } from './dialogsSagas'
import { appearanceSagaWatcher } from './appearanceSagas'

function* rootSaga() {
    yield all([
        fork(usersSagaWatcher),
        fork(navbarWatcher),
        fork(friendsSagaWatcher),
        fork(profileSagaWatcher),
        fork(authSagaWatcher),
        fork(commonWSChatSagaWatcher),
        fork(dialogsSagaWatcher),
        fork(appearanceSagaWatcher),
    ])
}

export { rootSaga }
