import { SET_CURRENT_THEME, SET_SYSTEM_THEME } from './constants'

import type { GetActionWInferType } from '../storeTypes'

const initialState = {
    systemTheme: null as 'dark' | 'light' | null,
    currentTheme: null as 'dark' | 'light' | 'system' | null,
}

type InitialAppearanceStateType = typeof initialState

export const appearanceReducer = function (
    state: InitialAppearanceStateType = initialState,
    action: AllACAppearanceTypes,
): InitialAppearanceStateType {
    switch (action.type) {
        case SET_SYSTEM_THEME:
            return { ...state, systemTheme: action.theme }

        case SET_CURRENT_THEME:
            return { ...state, currentTheme: action.theme }

        default:
            return state
    }
}

export type AppearanceReducerType = typeof appearanceReducer

export const AppearanceAC = {
    setSystemTheme: (theme: 'dark' | 'light') => ({ type: SET_SYSTEM_THEME, theme } as const),
    setCurrentTheme: (theme: 'dark' | 'light' | 'system') => ({ type: SET_CURRENT_THEME, theme } as const),
}

export type AllACAppearanceTypes = ReturnType<GetActionWInferType<typeof AppearanceAC>>
