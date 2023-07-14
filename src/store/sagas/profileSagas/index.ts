import { all, fork } from 'redux-saga/effects'

import { getProfileDataSagaWatcher } from './getData'
import { followUnfollowProfileSagaWatcher } from './followUnfollow'
import { updateProfileStatusSagaWatcher } from './updateStatus'
import { updateProfilePhotoSagaWatcher } from './updatePhoto'
import { updateProfileMainDataSagaWatcher } from './updateMainPortionData'

export const profileSagaWatcher = function* () {
   yield all([
      fork(getProfileDataSagaWatcher),
      fork(followUnfollowProfileSagaWatcher),
      fork(updateProfileStatusSagaWatcher),
      fork(updateProfilePhotoSagaWatcher),
      fork(updateProfileMainDataSagaWatcher),
   ])
}
