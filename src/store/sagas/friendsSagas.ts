import { takeEvery, takeLeading, takeLatest, select, put, all, call, throttle, fork } from 'redux-saga/effects'
import { SET_CURRENT_PAGE, SET_SEARCH_REQUEST, CHANGE_FOLLOW_STAT, SET_NEW_FOLLOW_STAT, SET_IS_IN_PROGRESS_CHANGE_FOLLOW_STAT } from '../redux/friends/constants'

import { followUnfollowAPI, friendsFetchingAPI } from '../DAL/fetchingAPI'
import { ErrorsAC } from '../redux/errors/errorsReducer'
import { GlobalStateType, UserFriendItemType } from '../redux/storeTypes'
import { FriendsNavbarAC } from '../redux/friendsNavbar/friendsNavbarReducer'
import { FriendsAC } from '../redux/friends/friendsReducer'
import { cutText } from './assets/cutText'

const handleGetFriends = function* (currentPage: number, pageSize: number, searchRequest: string) {
   yield put(ErrorsAC.setFriendsLoadErrorAC(null))
   try {
      yield put(FriendsAC.changeIsLoadingFriends(true))

      const { items, totalCount, error } = yield call(friendsFetchingAPI.getFriends, currentPage, pageSize, searchRequest)
      if (!error) {
         yield put(FriendsAC.setFriends(items))
         yield put(FriendsAC.setTotalFriendsCount(totalCount))
      } else throw new Error(error)
   } catch (err: any) {
      yield put(ErrorsAC.setFriendsLoadErrorAC(cutText(err.message, 200, 'Error on load subs list')))
   }
   yield put(FriendsAC.changeIsLoadingFriends(false))
}

const sagaWorkerGetFriends = function* () {
   const currentPage: number = yield select((state: GlobalStateType) => state.forFriendsPageData.currentPage)
   const pageSize: number = yield select((state: GlobalStateType) => state.forFriendsPageData.pageSize)
   const searchRequest: string = yield select((state: GlobalStateType) => state.forFriendsPageData.searchRequest)
   if (searchRequest !== null && currentPage !== null) {
      yield handleGetFriends(currentPage, pageSize, searchRequest)
   }
}

const sagaWatcherGetFriends = function* () {
   yield throttle(1500, SET_SEARCH_REQUEST, sagaWorkerGetFriends)
   yield throttle(1500, SET_CURRENT_PAGE, sagaWorkerGetFriends)
}

const handleFollowUnfollow = function* (friendId: number, isFollowedNow: boolean) {
   yield put(FriendsAC.setIsInProgressChangeFollowStat(friendId, true))
   yield put(ErrorsAC.setFriendsFollowUnfollowErr(null, null))
   try {
      const { resultCode, messages } = yield call(isFollowedNow ? followUnfollowAPI.onUnfollowAPI : followUnfollowAPI.onFollowAPI, friendId)
      const { totalFriendsCount, friendsNavbar } = yield select((state: GlobalStateType) => state.forFriendsNavbarData)

      if (resultCode != 0) throw new Error(messages[0])

      if (isFollowedNow) {
         // если сейчаc происходит отписка
         yield put(FriendsNavbarAC.setTotalFriendsCount(totalFriendsCount - 1))

         // усли в навбаре есть удаляемый friend, то делаем новый запрос за друзьями для навбара
         const comparison = friendsNavbar.find((friendItem: UserFriendItemType) => friendId == friendItem.id)
         if (comparison) yield put(FriendsNavbarAC.getNavbarFriends())
      } else {
         // если сейчаc происходит подписка
         yield put(FriendsNavbarAC.setTotalFriendsCount(totalFriendsCount + 1))

         if (friendsNavbar.length < 5) yield put(FriendsNavbarAC.getNavbarFriends())
      }

      yield put(FriendsAC.setNewFollowStat(friendId))
   } catch (err: any) {
      yield put(ErrorsAC.setFriendsFollowUnfollowErr(friendId, cutText(err.message, 30, 'Some server error')))
   }
   yield put(FriendsAC.setIsInProgressChangeFollowStat(friendId, false))
}

const sagaWorkerFollowUnfollow = function* (action: ReturnType<typeof FriendsAC.changeFollowStatus>) {
   yield handleFollowUnfollow(action.friendId, action.currentFollowStat)
}

const sagaWatcherFollowUnfollowFriend = function* () {
   yield takeLeading(CHANGE_FOLLOW_STAT, sagaWorkerFollowUnfollow)
}

export const friendsSagaWatcher = function* () {
   yield all([fork(sagaWatcherFollowUnfollowFriend), fork(sagaWatcherGetFriends)])
}
