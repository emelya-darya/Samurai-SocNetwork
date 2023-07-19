import type { AuthDataToSetType, GetActionWInferType, LogInDataToSend } from '../storeTypes'
import {
   CHECK_AUTH,
   GET_CAPTCHA_URL,
   IS_IN_PROGRESS_CHECK_AUTH,
   IS_IN_PROGRESS_LOG_OUT,
   LOG_IN,
   LOG_OUT,
   SET_AUTH_DATA,
   SET_AVATAR,
   SET_CAPTCHA_URL,
   SET_IS_AUTH,
   SET_IS_AUTH_CHECKED,
   SET_IS_IN_PROGRESS_GET_CAPTCHA,
   SET_IS_IN_PROGRESS_LOG_IN,
} from './constants'

const initialState = {
   isAuthChecking: false,
   isAuth: false as boolean,
   id: null as number | null,
   login: null as string | null,
   email: null as string | null,
   avatar: null as string | null,
   isInProgressCheckAuth: false as boolean,
   isInProgressLogOut: false as boolean,

   isInProgressLogIn: false as boolean,

   captchaUrl: null as string | null,
   isInProgressGetCaptcha: false as boolean,
}

type InitialAuthStateType = typeof initialState

export const authReducer = function (state: InitialAuthStateType = initialState, action: AllACAuthTypes): InitialAuthStateType {
   switch (action.type) {
      case SET_IS_AUTH_CHECKED:
         return { ...state, isAuthChecking: action.isChecked }

      case SET_IS_AUTH:
         return { ...state, isAuth: action.isAuth }

      case SET_AUTH_DATA:
         return { ...state, ...action.authData }

      case SET_AVATAR:
         return { ...state, avatar: action.avatarUrl }

      case IS_IN_PROGRESS_CHECK_AUTH:
         return { ...state, isInProgressCheckAuth: action.isInProgress }

      case IS_IN_PROGRESS_LOG_OUT:
         return { ...state, isInProgressLogOut: action.isInProgress }

      case SET_IS_IN_PROGRESS_LOG_IN:
         return { ...state, isInProgressLogIn: action.isInProgress }

      case SET_CAPTCHA_URL:
         return { ...state, captchaUrl: action.captchaUrl }

      case SET_IS_IN_PROGRESS_GET_CAPTCHA:
         return { ...state, isInProgressGetCaptcha: action.isInProgress }

      default:
         return state
   }
}

export type AuthReducerType = typeof authReducer

export const AuthAC = {
   chechAuth: () => ({ type: CHECK_AUTH } as const),
   setIsAuthChecked: (isChecked: boolean) => ({ type: SET_IS_AUTH_CHECKED, isChecked } as const),
   setIsAuth: (isAuth: boolean) => ({ type: SET_IS_AUTH, isAuth } as const),
   setAuthData: (authData: AuthDataToSetType) => ({ type: SET_AUTH_DATA, authData } as const),
   setAvatar: (avatarUrl: string | null) => ({ type: SET_AVATAR, avatarUrl } as const),
   setIsInProgressCheckAuth: (isInProgress: boolean) => ({ type: IS_IN_PROGRESS_CHECK_AUTH, isInProgress } as const),
   signOut: () => ({ type: LOG_OUT } as const),
   setIsInProgressSignOut: (isInProgress: boolean) => ({ type: IS_IN_PROGRESS_LOG_OUT, isInProgress } as const),

   logIn: (authData: LogInDataToSend) => ({ type: LOG_IN, authData } as const),
   setIsInProgressSignIn: (isInProgress: boolean) => ({ type: SET_IS_IN_PROGRESS_LOG_IN, isInProgress } as const),

   getCaptchaUrl: () => ({ type: GET_CAPTCHA_URL } as const),
   setCaptchaUrl: (captchaUrl: string | null) => ({ type: SET_CAPTCHA_URL, captchaUrl } as const),
   setIsInProgressGetCaptcha: (isInProgress: boolean) => ({ type: SET_IS_IN_PROGRESS_GET_CAPTCHA, isInProgress } as const),
}

export type AllACAuthTypes = ReturnType<GetActionWInferType<typeof AuthAC>>
