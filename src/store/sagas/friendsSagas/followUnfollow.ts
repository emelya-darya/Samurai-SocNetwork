import { call, put, select, takeLeading } from 'redux-saga/effects'
import { FriendsAC } from '../../redux/friends/friendsReducer'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { FriendsNavbarAC } from '../../redux/friendsNavbar/friendsNavbarReducer'
import { followUnfollowAPI } from '../../DAL/fetchingAPI'
import { GlobalStateType } from '../../redux/reduxStore'
import { UserFriendItemType } from '../../redux/storeTypes'
import { cutText } from '../assets/cutText'
import { CHANGE_FOLLOW_STAT } from '../../redux/friends/constants'

const sagaWorkerFollowUnfollow = function* (action: ReturnType<typeof FriendsAC.changeFollowStatus>) {
   const friendId = action.friendId
   const isFollowedNow = action.currentFollowStat

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
      yield put(
         ErrorsAC.setFriendsFollowUnfollowErr(friendId, cutText(err.response?.data?.message || err.message, 30, 'Some server error'))
      )
   }
   yield put(FriendsAC.setIsInProgressChangeFollowStat(friendId, false))
}

export const sagaWatcherFollowUnfollowFriend = function* () {
   yield takeLeading(CHANGE_FOLLOW_STAT, sagaWorkerFollowUnfollow)
}
