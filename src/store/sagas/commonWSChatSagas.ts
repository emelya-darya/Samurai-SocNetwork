import { CLOSE_EVENT, CREATE_WS_CHANNEL, ERROR_EVENT, MESSAGE_EVENT, OPEN_EVENT } from '../redux/commonWSchat/constants'
import { createWSChannel } from '../DAL/websocketCommonChatAPI'
import { put, call, takeLeading, all, fork } from 'redux-saga/effects'
import { CommonWSchatAC } from '../redux/commonWSchat/commonWSchatReducer'
import { ErrorsAC } from '../redux/errors/errorsReducer'

//? наблюдение за событием error
const onErrorWSChannelSagaWorker = function* () {
   yield put(ErrorsAC.setErrOnTryingToConnectWS('Error when trying to connect to the server'))
}

const onErrorWSChannelSagaWatcher = function* () {
   yield takeLeading(ERROR_EVENT, onErrorWSChannelSagaWorker)
}

//? наблюдение за событием close
const onCloseWSChannelSagaWorker = function* () {
   yield put(CommonWSchatAC.clearMessages())
   yield put(CommonWSchatAC.setIsOpenWSChat(false))
   yield put(CommonWSchatAC.setIsInProgeressOpenWSChannel(true))
}
const onCloseWSChannelSagaWatcher = function* () {
   yield takeLeading(CLOSE_EVENT, onCloseWSChannelSagaWorker)
}

//? наблюдение за событием message
const onMessageWSChannelSagaWorker = function* (action: ReturnType<typeof CommonWSchatAC.onMessageEvent>) {
   yield put(CommonWSchatAC.addMessages(action.newMessages))
}
const onMessageWSChannelSagaWatcher = function* () {
   yield takeLeading(MESSAGE_EVENT, onMessageWSChannelSagaWorker)
}

//? наблюдение за открытием канала
const openWSChannelSagaWorker = function* () {
   yield put(ErrorsAC.setErrOnTryingToConnectWS(null))
   yield put(CommonWSchatAC.setIsOpenWSChat(true))
   yield put(CommonWSchatAC.setIsInProgeressOpenWSChannel(false))
}
const openWSChannelSagaWatcher = function* () {
   yield takeLeading(OPEN_EVENT, openWSChannelSagaWorker)
}

// ? создание канала
const createChannelWSSagaWorker = function* () {
   yield call(createWSChannel)
}
const createChannelWSSagaWatcher = function* () {
   yield takeLeading(CREATE_WS_CHANNEL, createChannelWSSagaWorker)
}

export const commonWSChatSagaWatcher = function* () {
   yield all([fork(createChannelWSSagaWatcher), fork(openWSChannelSagaWatcher), fork(onMessageWSChannelSagaWatcher), fork(onCloseWSChannelSagaWatcher), fork(onErrorWSChannelSagaWatcher)])
}
