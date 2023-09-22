import { call, put, takeLeading } from 'redux-saga/effects'
import { SPAM_MESSAGE } from '../../redux/dialogs/constants'
import { DialogsAC } from '../../redux/dialogs/dialogsReducer'
import { dialogsFetchingAPI } from '../../DAL/fetchingAPI'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { cutText } from '../assets/cutText'

const markSpamMessageSagaWorker = function* (action: ReturnType<typeof DialogsAC.markSpamMessage>) {
    const messageId = action.messageId

    yield put(ErrorsAC.setErrOnDeleteSpamRestoreMessage(messageId, null))
    yield put(DialogsAC.setIsInProgressMarkSpam(messageId, true))

    try {
        const { resultCode, message } = yield call(dialogsFetchingAPI.markSpamMessage, messageId)
        if (resultCode == 0) yield put(DialogsAC.addMessageToSpam(messageId))
        else throw new Error(message)
    } catch (err: any) {
        yield put(
            ErrorsAC.setErrOnDeleteSpamRestoreMessage(
                messageId,
                cutText(err.response?.data?.message || err.message, 30, 'Some server error'),
            ),
        )
    }
    yield put(DialogsAC.setIsInProgressMarkSpam(messageId, false))
}

export const markSpamMessageSagaWatcher = function* () {
    yield takeLeading(SPAM_MESSAGE, markSpamMessageSagaWorker)
}
