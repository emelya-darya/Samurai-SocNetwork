import type { GetActionWInferType } from '../storeTypes'
import {
   SET_ERR_ON_CHECK_AUTH,
   SET_ERR_ON_FETCHING_FOLLOW_UNFOLLOW_PROFILE_STAT,
   SET_ERR_ON_GET_PROFILE,
   SET_ERR_ON_GET_PROFILE_FOLLOW_STAT,
   SET_ERR_ON_GET_PROFILE_STATUS,
   SET_ERR_ON_UPDATE_PROFILE_MAIN_DATA,
   SET_ERR_ON_UPDATE_PROFILE_PHOTO,
   SET_ERR_ON_UPDATE_PROFILE_STATUS,
   SET_FRIENDS_FOLLOW_UNFOLLOW_ERR,
   SET_FRIENDS_LOAD_ERROR,
   SET_FRIENDS_NAVBAR_ERR,
   SET_USERS_FOLLOW_UNFOLLOW_ERR,
   SET_USERS_LOAD_ERROR,
} from './constants'

const initialState = {
   usersFetchingError: null as string | null,
   errorOnFollowUnfollowUser: {
      userId: null as number | null,
      message: null as string | null,
   },
   friendsFetchingError: null as string | null,
   errorOnFollowUnfollowFriend: {
      userId: null as number | null,
      message: null as string | null,
   },

   navbarFriendsErr: null as string | null,
   profileErrors: {
      errOnGetProfile: null as string | null,
      errOnGetStatus: null as string | null,
      errOnGetFollowStat: null as string | null,

      errOnFetchingFollowUnfollow: null as string | null,

      errOnUpdateProfileStatus: null as string | null,
      errOnUpdatePhoto: null as string | null,
      errOnUpdateMainData: null as string | null,
   },

   authErrors: {
      errOnCheckAuth: null as string | null,
   },
}

type InitialErrorsStateType = typeof initialState

export const errorsReducer = function (state: InitialErrorsStateType = initialState, action: AllACErrorsTypes): InitialErrorsStateType {
   switch (action.type) {
      case SET_USERS_LOAD_ERROR:
         return { ...state, usersFetchingError: action.err }

      case SET_USERS_FOLLOW_UNFOLLOW_ERR:
         return {
            ...state,
            errorOnFollowUnfollowUser: {
               userId: action.userId,
               message: action.message,
            },
         }

      case SET_FRIENDS_LOAD_ERROR:
         return { ...state, friendsFetchingError: action.err }

      case SET_FRIENDS_FOLLOW_UNFOLLOW_ERR:
         return {
            ...state,
            errorOnFollowUnfollowFriend: {
               userId: action.userId,
               message: action.message,
            },
         }

      case SET_FRIENDS_NAVBAR_ERR:
         return {
            ...state,
            navbarFriendsErr: action.message,
         }

      case SET_ERR_ON_GET_PROFILE:
         return { ...state, profileErrors: { ...state.profileErrors, errOnGetProfile: action.message } }

      case SET_ERR_ON_GET_PROFILE_STATUS:
         return { ...state, profileErrors: { ...state.profileErrors, errOnGetStatus: action.message } }

      case SET_ERR_ON_GET_PROFILE_FOLLOW_STAT:
         return { ...state, profileErrors: { ...state.profileErrors, errOnGetFollowStat: action.message } }

      case SET_ERR_ON_FETCHING_FOLLOW_UNFOLLOW_PROFILE_STAT:
         return { ...state, profileErrors: { ...state.profileErrors, errOnFetchingFollowUnfollow: action.message } }

      case SET_ERR_ON_UPDATE_PROFILE_STATUS:
         return { ...state, profileErrors: { ...state.profileErrors, errOnUpdateProfileStatus: action.message } }

      case SET_ERR_ON_UPDATE_PROFILE_PHOTO:
         return { ...state, profileErrors: { ...state.profileErrors, errOnUpdatePhoto: action.message } }

      case SET_ERR_ON_UPDATE_PROFILE_MAIN_DATA:
         return { ...state, profileErrors: { ...state.profileErrors, errOnUpdateMainData: action.message } }

      case SET_ERR_ON_CHECK_AUTH:
         return { ...state, authErrors: { ...state.authErrors, errOnCheckAuth: action.message } }

      default:
         return state
   }
}

export type ErrorsReducerType = typeof errorsReducer

export const ErrorsAC = {
   setUsersLoadErrorAC: (err: null | string) => ({ type: SET_USERS_LOAD_ERROR, err } as const),
   setUsersFollowUnfollowErr: (userId: number | null, message: string | null) => ({ type: SET_USERS_FOLLOW_UNFOLLOW_ERR, userId, message } as const),

   setFriendsLoadErrorAC: (err: null | string) => ({ type: SET_FRIENDS_LOAD_ERROR, err } as const),
   setFriendsFollowUnfollowErr: (userId: number | null, message: string | null) => ({ type: SET_FRIENDS_FOLLOW_UNFOLLOW_ERR, userId, message } as const),

   setErrorOnGetFriendsNavbar: (message: string | null) => ({ type: SET_FRIENDS_NAVBAR_ERR, message } as const),

   setErrorOnGetProfile: (message: string | null) => ({ type: SET_ERR_ON_GET_PROFILE, message } as const),
   setErrorOnGetProfileStatus: (message: string | null) => ({ type: SET_ERR_ON_GET_PROFILE_STATUS, message } as const),
   setErrorOnGetProfileFollowStat: (message: string | null) => ({ type: SET_ERR_ON_GET_PROFILE_FOLLOW_STAT, message } as const),

   setErrOnProfileFetchingFollowUnfollow: (message: string | null) => ({ type: SET_ERR_ON_FETCHING_FOLLOW_UNFOLLOW_PROFILE_STAT, message } as const),

   setErrOnUpdateProfileStatus: (message: string | null) => ({ type: SET_ERR_ON_UPDATE_PROFILE_STATUS, message } as const),
   setErrOnUpdateProfilePhoto: (message: string | null) => ({ type: SET_ERR_ON_UPDATE_PROFILE_PHOTO, message } as const),
   setErrOnUpdateProfileMainData: (message: string | null) => ({ type: SET_ERR_ON_UPDATE_PROFILE_MAIN_DATA, message } as const),

   setErrOnCheckAuth: (message: string | null) => ({ type: SET_ERR_ON_CHECK_AUTH, message } as const),
}

export type AllACErrorsTypes = ReturnType<GetActionWInferType<typeof ErrorsAC>>
