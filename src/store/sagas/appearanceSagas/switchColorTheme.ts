import { select, takeLeading } from 'redux-saga/effects'

import { SET_CURRENT_THEME } from '../../redux/appAppearance/constants'
import { GlobalStateType } from '../../redux/reduxStore'
import { AppearanceAC } from '../../redux/appAppearance/appearanceReducer'
import { cssVarsNamesToChange } from './assets/cssVarrNames'

const switchColorsSagaWorker = function* (action: ReturnType<typeof AppearanceAC.setCurrentTheme>) {
    const systemTheme: 'dark' | 'light' | null = yield select((state: GlobalStateType) => state.forAppearanceData.systemTheme)
    // const currentTheme: 'dark' | 'light' | 'system' | null = yield select((state: GlobalStateType) => state.forAppearanceData.currentTheme)

    if (systemTheme) {
        let themeToSet: 'light' | 'dark'

        if (action.theme === 'light' || action.theme === 'dark') themeToSet = action.theme
        else themeToSet = systemTheme

        for (let i = 0; i < cssVarsNamesToChange.length; i++) {
            document.body.style.setProperty(`--${cssVarsNamesToChange[i]}`, `var(--${cssVarsNamesToChange[i]}-${themeToSet}-th)`)
        }
    }
}

export const switchColorsSagaWatcher = function* () {
    yield takeLeading(SET_CURRENT_THEME, switchColorsSagaWorker)
}
