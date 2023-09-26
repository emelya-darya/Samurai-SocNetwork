import { all, fork } from 'redux-saga/effects'
import { switchColorsSagaWatcher } from './switchColorTheme'

export const appearanceSagaWatcher = function* () {
    yield all([fork(switchColorsSagaWatcher)])
}
