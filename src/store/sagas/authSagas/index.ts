import { all } from 'axios'
import { checkAuthSagaWatcher } from './authMe'
import { fork } from 'redux-saga/effects'

export const authSagaWatcher = function* () {
   yield fork(checkAuthSagaWatcher)
   //    yield all([
   //     //   fork(checkAuthSagaWatcher),
   //       //    fork(getProfileDataSagaWatcher),
   //       //    fork(followUnfollowProfileSagaWatcher),
   //       //    fork(updateProfileStatusSagaWatcher),
   //       //    fork(updateProfilePhotoSagaWatcher),
   //       //    fork(updateProfileMainDataSagaWatcher),
   //    ])
}
