import { call, put, select, takeLeading } from 'redux-saga/effects'
import { CHANGE_FOLLOW_STAT } from '../../redux/profile/constants'
import { ProfileAC } from '../../redux/profile/profileReducer'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { followUnfollowAPI } from '../../DAL/fetchingAPI'
import { GlobalStateType, UserFriendItemType } from '../../redux/storeTypes'
import { FriendsNavbarAC } from '../../redux/friendsNavbar/friendsNavbarReducer'
import { cutText } from '../assets/cutText'

const handleFollowUnfollow = function* (userId: number, isFollowedNow: boolean) {
   yield put(ProfileAC.setIsInProgressChangeFollowStat(true))
   yield put(ErrorsAC.setErrOnProfileFetchingFollowUnfollow(null))
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
      yield put(ProfileAC.setNewFollowStat())
   } catch (err: any) {
      yield put(ErrorsAC.setErrOnProfileFetchingFollowUnfollow(cutText(err.message, 25, 'Some server error')))
   }

   yield put(ProfileAC.setIsInProgressChangeFollowStat(false))
}

const followUnfollowProfileSagaWorker = function* (action: ReturnType<typeof ProfileAC.changeFollowStatus>) {
   yield handleFollowUnfollow(action.userId, action.currentFollowStat)
}

export const followUnfollowProfileSagaWatcher = function* () {
   yield takeLeading(CHANGE_FOLLOW_STAT, followUnfollowProfileSagaWorker)
}
