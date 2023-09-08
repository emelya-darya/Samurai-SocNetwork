import { all, fork } from "redux-saga/effects"
import { sagaWatcherFollowUnfollowUser } from "./followUnfollow"
import { sagaWatcherGetUsers } from "./getUsers"

export const usersSagaWatcher = function* () {
    yield all([fork(sagaWatcherFollowUnfollowUser), fork(sagaWatcherGetUsers)])
 }