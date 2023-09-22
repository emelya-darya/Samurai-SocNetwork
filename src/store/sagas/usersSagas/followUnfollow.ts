import { call, put, select, takeLeading } from 'redux-saga/effects'

import { UsersAC } from '../../redux/users/usersReducer'
import { CHANGE_FOLLOW_STAT } from '../../redux/users/constants'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { cutText } from '../assets/cutText'
import { FriendsNavbarAC } from '../../redux/friendsNavbar/friendsNavbarReducer'
import { GlobalStateType, UserFriendItemType } from '../../redux/storeTypes'
import { followUnfollowAPI } from '../../DAL/fetchingAPI'

const sagaWorkerFollowUnfollow = function* (action: ReturnType<typeof UsersAC.changeFollowStatusAC>) {
    const userId = action.userId
    const isFollowedNow = action.currentFollowStat
    // yield handleFollowUnfollow(action.userId, action.currentFollowStat)

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
        yield put(ErrorsAC.setUsersFollowUnfollowErr(userId, cutText(err.response?.data?.message || err.message, 30, 'Some server error')))
    }
    yield put(UsersAC.setIsInProgressChangeFollowStatAC(userId, false))
}

export const sagaWatcherFollowUnfollowUser = function* () {
    yield takeLeading(CHANGE_FOLLOW_STAT, sagaWorkerFollowUnfollow)
}
