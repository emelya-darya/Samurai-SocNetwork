import { all, fork } from 'redux-saga/effects'
import { sendMessageSagaWatcher } from './sendMessage'
import { sagaWatcherGetDialogsList } from './getDialogsList'
import { sagaWatcherGetInitalDataForMessagesPage } from './getInitialDataForMessages'
import { sagaWatcherIncreaseMessagesPortion } from './increaseMessagesPortion'
import { deleteMessageSagaWatcher } from './deleteMessage'
import { markSpamMessageSagaWatcher } from './markSpamMessage'
import { restoreMessageSagaWatcher } from './restoreMessage'
import { getMessagesNewerThanSagaWatcher } from './getMessagesNewerThan'
import { getNewMessagesCountWatcher } from './getNewMessagesCount'

export const dialogsSagaWatcher = function* () {
    yield all([
        fork(sendMessageSagaWatcher),
        fork(sagaWatcherGetDialogsList),
        fork(sagaWatcherGetInitalDataForMessagesPage),
        fork(sagaWatcherIncreaseMessagesPortion),
        fork(deleteMessageSagaWatcher),
        fork(markSpamMessageSagaWatcher),
        fork(restoreMessageSagaWatcher),
        fork(getMessagesNewerThanSagaWatcher),
        fork(getNewMessagesCountWatcher),
    ])
}
