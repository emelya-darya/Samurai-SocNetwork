import { CLOSE_EVENT, CREATE_WS_CHANNEL, MESSAGE_EVENT, OPEN_EVENT } from '../../redux/commonWSchat/constants'
import { URL_WS_CHAT, WSChannel, commonChatWSApi } from '../../DAL/websocketCommonChatAPI'

import { put, takeEvery, call, takeLeading, select, all, fork } from 'redux-saga/effects'
import { CommonWSchatAC } from '../../redux/commonWSchat/commonWSchatReducer'
import { GlobalStateType } from '../../redux/reduxStore'

//? наблюдение за событием close
const onCloseWSChannelSagaWorker = function* () {
   // debugger
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
   // console.log('openWSChannelSagaWorker')
   yield put(CommonWSchatAC.setIsOpenWSChat(true))
   yield put(CommonWSchatAC.setIsInProgeressOpenWSChannel(false))
}
const openWSChannelSagaWatcher = function* () {
   yield takeLeading(OPEN_EVENT, openWSChannelSagaWorker)
}

// ? создание канала
const createChannelWSSagaWorker = function* () {
   yield call(commonChatWSApi.createWSChannel)
}
const createChannelWSSagaWatcher = function* () {
   yield takeLeading(CREATE_WS_CHANNEL, createChannelWSSagaWorker)
}

export const commonWSChatSagaWatcher = function* () {
   yield all([fork(createChannelWSSagaWatcher), fork(openWSChannelSagaWatcher), fork(onMessageWSChannelSagaWatcher), fork(onCloseWSChannelSagaWatcher)])
}
