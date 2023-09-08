import { call, put, select, throttle } from 'redux-saga/effects'
import { UsersAC } from '../../redux/users/usersReducer'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { usersFetchingAPI } from '../../DAL/fetchingAPI'
import { cutText } from '../assets/cutText'
import { SET_CURRENT_PAGE, SET_SEARCH_REQUEST } from '../../redux/users/constants'

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
      yield put(ErrorsAC.setUsersLoadErrorAC(cutText(err.response?.data?.message || err.message, 200, 'Error on load users list')))
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

export const sagaWatcherGetUsers = function* () {
   yield throttle(1500, SET_SEARCH_REQUEST, sagaWorkerGetUsers)
   yield throttle(1500, SET_CURRENT_PAGE, sagaWorkerGetUsers)
}
