import {
    // IN_PROGRESS_TOGGLE_FOLLOW_UNFOLLOW_USER,
    IS_LOADING_USERS_LIST,
    SET_ACTIVE_PAGE_FROM_LC,
    SET_ACTIVE_PAGE_FROM_QUERY_PARAMS,
    SET_CURRENT_PAGE,
    SET_SEARCH_REQUEST,
    SET_SEARCH_REQUEST_FROM_LC,
    SET_SEARCH_REQUEST_FROM_QUERY_PARAMS,
    SET_TOTAL_USERS_COUNT,
    SET_USERS,
    // TOGGLE_FOLLOW_UNFOLLOW_USER,
    CHANGE_FOLLOW_STAT,
    SET_NEW_FOLLOW_STAT,
    SET_IS_IN_PROGRESS_CHANGE_FOLLOW_STAT,
} from './constants'
import type { GetActionWInferType, UserFriendItemType } from '../storeTypes'

const initialState = {
    usersData: [] as Array<UserFriendItemType>,
    pageSize: 12 as number,
    totalUsersCount: 0 as number,
    isLoadingUsersList: false as boolean,

    activePageFromLC: null as number | null,
    activePageFromQueryParams: null as number | null,
    currentPage: null as number | null,

    searchRequestFromLC: null as string | null,
    searchRequestFromQueryParams: null as string | null,
    searchRequest: null as string | null,
}

type InitialUsersStateType = typeof initialState

export const usersReducer = function (state: InitialUsersStateType = initialState, action: AllACUsersTypes): InitialUsersStateType {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                usersData: [
                    ...action.users.map(user => {
                        user.fetchingFollowingProgress = false
                        return user
                    }),
                ],
            }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }

        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount }

        case IS_LOADING_USERS_LIST:
            return { ...state, isLoadingUsersList: action.isLoadingUsersList }

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
                usersData: [
                    ...state.usersData.map(user => {
                        if (action.userId == user.id) user.followed = !user.followed
                        return user
                    }),
                ],
            }

        case SET_IS_IN_PROGRESS_CHANGE_FOLLOW_STAT:
            return {
                ...state,
                usersData: [
                    ...state.usersData.map(user => {
                        if (action.userId == user.id) user.fetchingFollowingProgress = action.isInProgress
                        return user
                    }),
                ],
            }

        default:
            return state
    }
}

export type UsersReducerType = typeof usersReducer

export const UsersAC = {
    setActivePageFromLC_AC: (activePageFromLC: number) => ({ type: SET_ACTIVE_PAGE_FROM_LC, activePageFromLC } as const),
    setActivePageFromQueryParamsAC: (activePageFromQueryParams: number) =>
        ({ type: SET_ACTIVE_PAGE_FROM_QUERY_PARAMS, activePageFromQueryParams } as const),

    setSearchRequestFromLC_AC: (searchRequest: string) => ({ type: SET_SEARCH_REQUEST_FROM_LC, searchRequest } as const),
    setSearchRequestFromQueryParamsAC: (searchRequest: string) => ({ type: SET_SEARCH_REQUEST_FROM_QUERY_PARAMS, searchRequest } as const),

    setUsersAC: (usersArr: Array<UserFriendItemType>) => ({ type: SET_USERS, users: usersArr } as const),
    setCurrentPageAC: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
    setTotalUsersCountAC: (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount } as const),
    changeIsLoadingUsersAC: (isLoadingUsersList: boolean) => ({ type: IS_LOADING_USERS_LIST, isLoadingUsersList } as const),
    setSearchRequestAC: (searchRequest: string) => ({ type: SET_SEARCH_REQUEST, searchRequest } as const),

    changeFollowStatusAC: (userId: number, currentFollowStat: boolean) =>
        ({ type: CHANGE_FOLLOW_STAT, userId, currentFollowStat } as const),
    setNewFollowStatAC: (userId: number) => ({ type: SET_NEW_FOLLOW_STAT, userId } as const),
    setIsInProgressChangeFollowStatAC: (userId: number, isInProgress: boolean) =>
        ({ type: SET_IS_IN_PROGRESS_CHANGE_FOLLOW_STAT, userId, isInProgress } as const),
}

export type AllACUsersTypes = ReturnType<GetActionWInferType<typeof UsersAC>>
