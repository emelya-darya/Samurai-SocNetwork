import { all, fork } from 'redux-saga/effects'
import { sagaWatcherFollowUnfollowFriend } from './followUnfollow'
import { sagaWatcherGetFriends } from './getFriends'

export const friendsSagaWatcher = function* () {
   yield all([fork(sagaWatcherFollowUnfollowFriend), fork(sagaWatcherGetFriends)])
}
