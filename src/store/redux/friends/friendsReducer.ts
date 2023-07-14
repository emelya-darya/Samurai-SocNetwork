import type { GetActionWInferType, UserFriendItemType } from '../storeTypes'
import {
   IS_LOADING_FRIENDS_LIST,
   SET_ACTIVE_PAGE_FROM_LC,
   SET_ACTIVE_PAGE_FROM_QUERY_PARAMS,
   SET_CURRENT_PAGE,
   SET_SEARCH_REQUEST,
   SET_SEARCH_REQUEST_FROM_LC,
   SET_SEARCH_REQUEST_FROM_QUERY_PARAMS,
   SET_TOTAL_FRIENDS_COUNT,
   SET_FRIENDS,
   CHANGE_FOLLOW_STAT,
   SET_NEW_FOLLOW_STAT,
   SET_IS_IN_PROGRESS_CHANGE_FOLLOW_STAT,
} from './constants'

const initialState = {
   friendsData: [] as Array<UserFriendItemType>,
   pageSize: 12 as number,
   totalFriendsCount: 0 as number,
   isLoadingFriendsList: false as boolean,

   activePageFromLC: null as number | null,
   activePageFromQueryParams: null as number | null,
   currentPage: null as number | null,

   searchRequestFromLC: null as string | null,
   searchRequestFromQueryParams: null as string | null,
   searchRequest: null as string | null,
}

type InitialFriendsStateType = typeof initialState

export const friendsReducer = function (state: InitialFriendsStateType = initialState, action: AllACFriendsTypes): InitialFriendsStateType {
   switch (action.type) {
      case SET_FRIENDS:
         return {
            ...state,
            friendsData: [
               ...action.friends.map(friend => {
                  friend.fetchingFollowingProgress = false
                  return friend
               }),
            ],
         }

      case SET_CURRENT_PAGE:
         return { ...state, currentPage: action.currentPage }

      case SET_TOTAL_FRIENDS_COUNT:
         return { ...state, totalFriendsCount: action.totalFriendsCount }

      case IS_LOADING_FRIENDS_LIST:
         return { ...state, isLoadingFriendsList: action.isLoadingFriendsList }

      case SET_SEARCH_REQUEST:
         return { ...state, searchRequest: action.searchRequest }

      case SET_ACTIVE_PAGE_FROM_LC:
         return { ...state, activePageFromLC: action.activePageFromLC }

      case SET_ACTIVE_PAGE_FROM_QUERY_PARAMS:
         return { ...state, activePageFromQueryParams: action.activePageFromQueryParams }

      case SET_SEARCH_REQUEST_FROM_LC:
         return { ...state, searchRequestFromLC: action.searchRequest }

      case SET_SEARCH_REQUEST_FROM_QUERY_PARAMS:
         return { ...state, searchRequestFromQueryParams: action.searchRequest }

      case SET_NEW_FOLLOW_STAT:
         return {
            ...state,
            friendsData: [
               ...state.friendsData.map(friend => {
                  if (action.friendId == friend.id) friend.followed = !friend.followed
                  return friend
               }),
            ],
         }
        
      case SET_IS_IN_PROGRESS_CHANGE_FOLLOW_STAT:
         return {
            ...state,
            friendsData: [
               ...state.friendsData.map(friend => {
                  if (action.friendId == friend.id) friend.fetchingFollowingProgress = action.isInProgress
                  return friend
               }),
            ],
         }

      default:
         return state
   }
}

export type FriendReducerType = typeof friendsReducer

export const FriendsAC = {
   setActivePageFromLC: (activePageFromLC: number) => ({ type: SET_ACTIVE_PAGE_FROM_LC, activePageFromLC: activePageFromLC } as const),
   setActivePageFromQueryParams: (activePageFromQueryParams: number) => ({ type: SET_ACTIVE_PAGE_FROM_QUERY_PARAMS, activePageFromQueryParams: activePageFromQueryParams } as const),

   setSearchRequestFromLC: (searchRequest: string) => ({ type: SET_SEARCH_REQUEST_FROM_LC, searchRequest: searchRequest } as const),
   setSearchRequestFromQueryParams: (searchRequest: string) => ({ type: SET_SEARCH_REQUEST_FROM_QUERY_PARAMS, searchRequest: searchRequest } as const),

   setFriends: (friendsArr: Array<UserFriendItemType>) => ({ type: SET_FRIENDS, friends: friendsArr } as const),
   setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
   setTotalFriendsCount: (totalFriendsCount: number) => ({ type: SET_TOTAL_FRIENDS_COUNT, totalFriendsCount } as const),
   changeIsLoadingFriends: (isLoadingFriendsList: boolean) => ({ type: IS_LOADING_FRIENDS_LIST, isLoadingFriendsList} as const),
   setSearchRequest: (searchRequest: string) => ({ type: SET_SEARCH_REQUEST, searchRequest } as const),

   changeFollowStatus: (friendId: number, currentFollowStat: boolean) => ({ type: CHANGE_FOLLOW_STAT, friendId, currentFollowStat } as const),
   setNewFollowStat: (friendId: number) => ({ type: SET_NEW_FOLLOW_STAT, friendId } as const),
   setIsInProgressChangeFollowStat: (friendId: number, isInProgress: boolean) => ({ type: SET_IS_IN_PROGRESS_CHANGE_FOLLOW_STAT, friendId, isInProgress } as const),
}

export type AllACFriendsTypes = ReturnType<GetActionWInferType<typeof FriendsAC>>
