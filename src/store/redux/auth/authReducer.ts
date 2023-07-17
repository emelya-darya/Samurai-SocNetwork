import type { AuthDataToSetType, GetActionWInferType } from '../storeTypes'
import { CHECK_AUTH, IS_IN_PROGRESS_CHECK_AUTH, LOG_OUT, SET_AUTH_DATA, SET_AVATAR, SET_IS_AUTH } from './constants'

const initialState = {
   isAuth: false as boolean,
   id: null as number | null,
   login: null as string | null,
   email: null as string | null,
   avatar: null as string | null,
   isInProgressCheckAuth: false as boolean,
}

type InitialAuthStateType = typeof initialState

export const authReducer = function (state: InitialAuthStateType = initialState, action: AllACAuthTypes): InitialAuthStateType {
   switch (action.type) {
      case SET_IS_AUTH:
         return { ...state, isAuth: action.isAuth }

      case SET_AUTH_DATA:
         return { ...state, ...action.authData }

      case SET_AVATAR:
         return { ...state, avatar: action.avatarUrl }

      case IS_IN_PROGRESS_CHECK_AUTH:
         return { ...state, isInProgressCheckAuth: action.isInProgress }

      default:
         return state
   }
}

export type AuthReducerType = typeof authReducer

export const AuthAC = {
   chechAuth: () => ({ type: CHECK_AUTH } as const),
   setIsAuth: (isAuth: boolean) => ({ type: SET_IS_AUTH, isAuth } as const),
   setAuthData: (authData: AuthDataToSetType) => ({ type: SET_AUTH_DATA, authData } as const),
   setAvatar: (avatarUrl: string) => ({ type: SET_AVATAR, avatarUrl } as const),
   setIsInProgressCheckAuth: (isInProgress: boolean) => ({ type: IS_IN_PROGRESS_CHECK_AUTH, isInProgress } as const),
   logOut: () => ({ type: LOG_OUT } as const),
}

export type AllACAuthTypes = ReturnType<GetActionWInferType<typeof AuthAC>>
