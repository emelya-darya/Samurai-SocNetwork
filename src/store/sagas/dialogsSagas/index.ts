import { all, fork } from 'redux-saga/effects'
import { sendMessageSagaWatcher } from './sendMessage'

// import { getProfileDataSagaWatcher } from './getData'
// import { followUnfollowProfileSagaWatcher } from './followUnfollow'
// import { updateProfileStatusSagaWatcher } from './updateStatus'
// import { updateProfilePhotoSagaWatcher } from './updatePhoto'
// import { updateProfileMainDataSagaWatcher } from './updateMainPortionData'

export const dialogsSagaWatcher = function* () {
   yield all([
      fork(sendMessageSagaWatcher),
      //   fork(getProfileDataSagaWatcher),
      //   fork(followUnfollowProfileSagaWatcher),
      //   fork(updateProfileStatusSagaWatcher),
      //   fork(updateProfilePhotoSagaWatcher),
      //   fork(updateProfileMainDataSagaWatcher),
   ])
}
