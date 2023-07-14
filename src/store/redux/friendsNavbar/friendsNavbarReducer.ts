import type { GetActionWInferType, UserFriendItemType } from '../storeTypes'
import { GET_FRIENDS_FOR_NAVBAR, SET_FRIENDS_FOR_NAVBAR, SET_TOTAL_FRIENDS_COUNT } from './constants'

const initialState = {
   totalFriendsCount: 0 as number,
   countFriendsNavbar: 5 as number,
   friendsNavbar: [] as Array<UserFriendItemType>,
}

type InitialFriendsNavbarStateType = typeof initialState

export const friendsNavbarReducer = function (state: InitialFriendsNavbarStateType = initialState, action: AllACFriendsNavbarTypes): InitialFriendsNavbarStateType {
   switch (action.type) {
      case SET_TOTAL_FRIENDS_COUNT:
         return { ...state, totalFriendsCount: action.count }
      case SET_FRIENDS_FOR_NAVBAR:
         return { ...state, friendsNavbar: [...action.friendsArr] }

      default:
         return state
   }
}

export type FriendsNavbarReducerType = typeof friendsNavbarReducer

export const FriendsNavbarAC = {
   getNavbarFriends: () => ({ type: GET_FRIENDS_FOR_NAVBAR } as const),
   setTotalFriendsCount: (count: number) => ({ type: SET_TOTAL_FRIENDS_COUNT, count } as const),
   setFriendsForNavbar: (friendsArr: Array<UserFriendItemType>) => ({ type: SET_FRIENDS_FOR_NAVBAR, friendsArr } as const),
}

export type AllACFriendsNavbarTypes = ReturnType<GetActionWInferType<typeof FriendsNavbarAC>>
