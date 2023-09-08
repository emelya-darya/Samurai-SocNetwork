import { call, put, select, takeLeading } from 'redux-saga/effects'
import { GET_FRIENDS_FOR_NAVBAR } from '../redux/friendsNavbar/constants'
import { friendsFetchingAPI } from '../DAL/fetchingAPI'
import { FriendsNavbarAC } from '../redux/friendsNavbar/friendsNavbarReducer'
import { ErrorsAC } from '../redux/errors/errorsReducer'

const navbarWorker = function* () {
   yield put(ErrorsAC.setErrorOnGetFriendsNavbar(null))

   try {
      const { totalCount } = yield call(friendsFetchingAPI.getFriendsForNavbar, 1, 1)
      const portionSize: number = yield select(({ forFriendsNavbarData }) => forFriendsNavbarData.countFriendsNavbar)
      const countPages = Math.floor(totalCount / portionSize)
      const pageNumForRequest = Math.round(1 + Math.random() * (countPages - 1)) || 1

      const { items: friendsNavbar, error } = yield call(friendsFetchingAPI.getFriendsForNavbar, pageNumForRequest, portionSize)

      if (!error) {
         yield put(FriendsNavbarAC.setTotalFriendsCount(totalCount))
         yield put(FriendsNavbarAC.setFriendsForNavbar(friendsNavbar))
      } else throw new Error(error)
   } catch (err: any) {
      yield put(ErrorsAC.setErrorOnGetFriendsNavbar(err.response?.data?.message || err.message || 'Error on load subs list'))
   }
}

export const navbarWatcher = function* () {
   yield takeLeading(GET_FRIENDS_FOR_NAVBAR, navbarWorker)
}
