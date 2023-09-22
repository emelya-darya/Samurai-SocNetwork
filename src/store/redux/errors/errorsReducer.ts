import {
    NULLING_SET_ERR_ON_DELETE_SPAM_RESTORE_MESSAGE,
    SET_ERR_ON_CHECK_AUTH,
    SET_ERR_ON_DELETE_SPAM_RESTORE_MESSAGE,
    SET_ERR_ON_FETCHING_FOLLOW_UNFOLLOW_PROFILE_STAT,
    SET_ERR_ON_GET_CAPTCHA,
    SET_ERR_ON_GET_NEWER_THAN_MESSAGES,
    SET_ERR_ON_GET_PROFILE,
    SET_ERR_ON_GET_PROFILE_FOLLOW_STAT,
    SET_ERR_ON_GET_PROFILE_STATUS,
    SET_ERR_ON_LOADING_DIALOGS_LIST,
    SET_ERR_ON_LOADING_EXTRA_MESSAGES_PORTION,
    SET_ERR_ON_LOADING_FIRST_MESSAGES_PORTION,
    SET_ERR_ON_LOG_IN,
    SET_ERR_ON_SEND_DIALOGS_MESSAGE,
    SET_ERR_ON_SIGN_OUT,
    SET_ERR_ON_TRYING_TO_CONNECT_WS,
    SET_ERR_ON_UPDATE_PROFILE_MAIN_DATA,
    SET_ERR_ON_UPDATE_PROFILE_PHOTO,
    SET_ERR_ON_UPDATE_PROFILE_STATUS,
    SET_FRIENDS_FOLLOW_UNFOLLOW_ERR,
    SET_FRIENDS_LOAD_ERROR,
    SET_FRIENDS_NAVBAR_ERR,
    SET_USERS_FOLLOW_UNFOLLOW_ERR,
    SET_USERS_LOAD_ERROR,
} from './constants'
import type { GetActionWInferType } from '../storeTypes'

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
        errOnLogOut: null as string | null,
        errOnLogIn: null as string | null,
        errOnGetCaptcha: null as string | null,
    },

    errorOnTryingToConnectWS: null as string | null,

    dialogsErrors: {
        errOnSendMessage: null as string | null,
        errOnLoadingsDialogsList: null as string | null,

        errOnLoadingFirstMessagesPortion: null as string | null,
        errOnLoadingExtraMessagesPortion: null as string | null,

        errOnDeleteSpamRestoreMessage: {} as { [key: string]: string | null },

        errOnGetNewerThanMessages: null as string | null,
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

        case SET_ERR_ON_SIGN_OUT:
            return { ...state, authErrors: { ...state.authErrors, errOnLogOut: action.message } }

        case SET_ERR_ON_LOG_IN:
            return { ...state, authErrors: { ...state.authErrors, errOnLogIn: action.message } }

        case SET_ERR_ON_GET_CAPTCHA:
            return { ...state, authErrors: { ...state.authErrors, errOnGetCaptcha: action.message } }

        case SET_ERR_ON_TRYING_TO_CONNECT_WS:
            return { ...state, errorOnTryingToConnectWS: action.message }

        case SET_ERR_ON_SEND_DIALOGS_MESSAGE:
            return { ...state, dialogsErrors: { ...state.dialogsErrors, errOnSendMessage: action.message } }

        case SET_ERR_ON_LOADING_DIALOGS_LIST:
            return { ...state, dialogsErrors: { ...state.dialogsErrors, errOnLoadingsDialogsList: action.message } }

        case SET_ERR_ON_LOADING_FIRST_MESSAGES_PORTION:
            return { ...state, dialogsErrors: { ...state.dialogsErrors, errOnLoadingFirstMessagesPortion: action.message } }

        case SET_ERR_ON_LOADING_EXTRA_MESSAGES_PORTION:
            return { ...state, dialogsErrors: { ...state.dialogsErrors, errOnLoadingExtraMessagesPortion: action.message } }

        case SET_ERR_ON_DELETE_SPAM_RESTORE_MESSAGE:
            return {
                ...state,
                dialogsErrors: {
                    ...state.dialogsErrors,
                    errOnDeleteSpamRestoreMessage: {
                        ...state.dialogsErrors.errOnDeleteSpamRestoreMessage,
                        [action.messageId]: action.message,
                    },
                },
            }
        case NULLING_SET_ERR_ON_DELETE_SPAM_RESTORE_MESSAGE:
            return {
                ...state,
                dialogsErrors: {
                    ...state.dialogsErrors,
                    errOnDeleteSpamRestoreMessage: {},
                },
            }

        case SET_ERR_ON_GET_NEWER_THAN_MESSAGES:
            return {
                ...state,
                dialogsErrors: {
                    ...state.dialogsErrors,
                    errOnGetNewerThanMessages: action.message,
                },
            }

        default:
            return state
    }
}

export type ErrorsReducerType = typeof errorsReducer

export const ErrorsAC = {
    setUsersLoadErrorAC: (err: null | string) => ({ type: SET_USERS_LOAD_ERROR, err } as const),
    setUsersFollowUnfollowErr: (userId: number | null, message: string | null) =>
        ({ type: SET_USERS_FOLLOW_UNFOLLOW_ERR, userId, message } as const),

    setFriendsLoadErrorAC: (err: null | string) => ({ type: SET_FRIENDS_LOAD_ERROR, err } as const),
    setFriendsFollowUnfollowErr: (userId: number | null, message: string | null) =>
        ({ type: SET_FRIENDS_FOLLOW_UNFOLLOW_ERR, userId, message } as const),

    setErrorOnGetFriendsNavbar: (message: string | null) => ({ type: SET_FRIENDS_NAVBAR_ERR, message } as const),

    setErrorOnGetProfile: (message: string | null) => ({ type: SET_ERR_ON_GET_PROFILE, message } as const),
    setErrorOnGetProfileStatus: (message: string | null) => ({ type: SET_ERR_ON_GET_PROFILE_STATUS, message } as const),
    setErrorOnGetProfileFollowStat: (message: string | null) => ({ type: SET_ERR_ON_GET_PROFILE_FOLLOW_STAT, message } as const),

    setErrOnProfileFetchingFollowUnfollow: (message: string | null) =>
        ({ type: SET_ERR_ON_FETCHING_FOLLOW_UNFOLLOW_PROFILE_STAT, message } as const),

    setErrOnUpdateProfileStatus: (message: string | null) => ({ type: SET_ERR_ON_UPDATE_PROFILE_STATUS, message } as const),
    setErrOnUpdateProfilePhoto: (message: string | null) => ({ type: SET_ERR_ON_UPDATE_PROFILE_PHOTO, message } as const),
    setErrOnUpdateProfileMainData: (message: string | null) => ({ type: SET_ERR_ON_UPDATE_PROFILE_MAIN_DATA, message } as const),

    setErrOnCheckAuth: (message: string | null) => ({ type: SET_ERR_ON_CHECK_AUTH, message } as const),
    setErrOnSignOut: (message: string | null) => ({ type: SET_ERR_ON_SIGN_OUT, message } as const),

    setErrOnLogIn: (message: string | null) => ({ type: SET_ERR_ON_LOG_IN, message } as const),
    setErrOnGetCaptcha: (message: string | null) => ({ type: SET_ERR_ON_GET_CAPTCHA, message } as const),

    setErrOnTryingToConnectWS: (message: string | null) => ({ type: SET_ERR_ON_TRYING_TO_CONNECT_WS, message } as const),

    setErrOnSendsMessageInDialogs: (message: string | null) => ({ type: SET_ERR_ON_SEND_DIALOGS_MESSAGE, message } as const),
    setErrOnLoadingsDialogsList: (message: string | null) => ({ type: SET_ERR_ON_LOADING_DIALOGS_LIST, message } as const),

    setErrOnLoadingFirstMessagesPortion: (message: string | null) =>
        ({ type: SET_ERR_ON_LOADING_FIRST_MESSAGES_PORTION, message } as const),
    setErrOnLoadingExtraMessagesPortion: (message: string | null) =>
        ({ type: SET_ERR_ON_LOADING_EXTRA_MESSAGES_PORTION, message } as const),

    setErrOnDeleteSpamRestoreMessage: (messageId: string, message: string | null) =>
        ({ type: SET_ERR_ON_DELETE_SPAM_RESTORE_MESSAGE, messageId, message } as const),

    nullingSetErrOnDeleteSpamRestoreMessage: () => ({ type: NULLING_SET_ERR_ON_DELETE_SPAM_RESTORE_MESSAGE } as const),

    setErrOnGetNewerThanMessages: (message: string | null) => ({ type: SET_ERR_ON_GET_NEWER_THAN_MESSAGES, message } as const),
}

export type AllACErrorsTypes = ReturnType<GetActionWInferType<typeof ErrorsAC>>
