import { call, put, select, throttle } from 'redux-saga/effects'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { FriendsAC } from '../../redux/friends/friendsReducer'
import { friendsFetchingAPI } from '../../DAL/fetchingAPI'
import { cutText } from '../assets/cutText'
import { GlobalStateType } from '../../redux/reduxStore'
import { SET_CURRENT_PAGE, SET_SEARCH_REQUEST } from '../../redux/friends/constants'

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
      yield put(ErrorsAC.setFriendsLoadErrorAC(cutText(err.response?.data?.message || err.message, 200, 'Error on load subs list')))
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

export const sagaWatcherGetFriends = function* () {
   yield throttle(1500, SET_SEARCH_REQUEST, sagaWorkerGetFriends)
   yield throttle(1500, SET_CURRENT_PAGE, sagaWorkerGetFriends)
}
