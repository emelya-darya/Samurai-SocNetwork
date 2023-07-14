import {  takeLeading, select, put, all, call, throttle, fork } from 'redux-saga/effects'
import { SET_CURRENT_PAGE, SET_SEARCH_REQUEST, CHANGE_FOLLOW_STAT } from '../redux/users/constants'
import { UsersAC } from '../redux/users/usersReducer'
import { followUnfollowAPI, usersFetchingAPI } from '../DAL/fetchingAPI'
import { ErrorsAC } from '../redux/errors/errorsReducer'
import { GlobalStateType, UserFriendItemType } from '../redux/storeTypes'
import { FriendsNavbarAC } from '../redux/friendsNavbar/friendsNavbarReducer'
import { cutText } from './assets/cutText'

const handleGetUsers = function* (currentPage: number, pageSize: number, searchRequest: string) {
   yield put(ErrorsAC.setUsersLoadErrorAC(null))
   yield put(UsersAC.changeIsLoadingUsersAC(true))

   try {
      const { items, totalCount, error } = yield call(usersFetchingAPI.getUsers, currentPage, pageSize, searchRequest)
      if (!error) {
         yield put(UsersAC.setUsersAC(items))
         yield put(UsersAC.setTotalUsersCountAC(totalCount))
      } else throw new Error(error)
   } catch (err: any) {
      yield put(ErrorsAC.setUsersLoadErrorAC(cutText(err.message, 200, 'Error on load users list')))
   }
   yield put(UsersAC.changeIsLoadingUsersAC(false))
}

const sagaWorkerGetUsers = function* () {
   const currentPage: number = yield select(({ forUsersData }) => forUsersData.currentPage)
   const pageSize: number = yield select(({ forUsersData }) => forUsersData.pageSize)
   const searchRequest: string = yield select(({ forUsersData }) => forUsersData.searchRequest)
   if (searchRequest !== null && currentPage !== null) {
      yield handleGetUsers(currentPage, pageSize, searchRequest)
   }
}

const sagaWatcherGetUsers = function* () {
   yield throttle(1500, SET_SEARCH_REQUEST, sagaWorkerGetUsers)
   yield throttle(1500, SET_CURRENT_PAGE, sagaWorkerGetUsers)
}

const handleFollowUnfollow = function* (userId: number, isFollowedNow: boolean) {
   yield put(UsersAC.setIsInProgressChangeFollowStatAC(userId, true))
   yield put(ErrorsAC.setUsersFollowUnfollowErr(null, null))
   try {
      const { resultCode, messages } = yield call(isFollowedNow ? followUnfollowAPI.onUnfollowAPI : followUnfollowAPI.onFollowAPI, userId)
      const { totalFriendsCount, friendsNavbar } = yield select((state: GlobalStateType) => state.forFriendsNavbarData)

      if (resultCode != 0) throw new Error(messages[0])

      if (isFollowedNow) {
         // если сейчаc происходит отписка
         yield put(FriendsNavbarAC.setTotalFriendsCount(totalFriendsCount - 1))

         // усли в навбаре есть удаляемый friend, то делаем новый запрос за друзьями для навбара
         const comparison = friendsNavbar.find((friendItem: UserFriendItemType) => userId == friendItem.id)
         if (comparison) yield put(FriendsNavbarAC.getNavbarFriends())
      } else {
         // если сейчаc происходит подписка
         yield put(FriendsNavbarAC.setTotalFriendsCount(totalFriendsCount + 1))

         if (friendsNavbar.length < 5) yield put(FriendsNavbarAC.getNavbarFriends())
      }

      yield put(UsersAC.setNewFollowStatAC(userId))
   } catch (err: any) {
      yield put(ErrorsAC.setUsersFollowUnfollowErr(userId, cutText(err.message, 30, 'Some server error')))
   }
   yield put(UsersAC.setIsInProgressChangeFollowStatAC(userId, false))
}

const sagaWorkerFollowUnfollow = function* (action: ReturnType<typeof UsersAC.changeFollowStatusAC>) {
   yield handleFollowUnfollow(action.userId, action.currentFollowStat)
}

const sagaWatcherFollowUnfollowUser = function* () {
   yield takeLeading(CHANGE_FOLLOW_STAT, sagaWorkerFollowUnfollow)
}

export const usersSagaWatcher = function* () {
   yield all([fork(sagaWatcherFollowUnfollowUser), fork(sagaWatcherGetUsers)])
}
