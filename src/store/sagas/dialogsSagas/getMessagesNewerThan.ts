import { call, put, select, takeLeading } from 'redux-saga/effects'
import { GET_MESSAGES_NEWER_THAN } from '../../redux/dialogs/constants'
import { DialogsAC } from '../../redux/dialogs/dialogsReducer'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { cutText } from '../assets/cutText'
import { dialogsFetchingAPI } from '../../DAL/fetchingAPI'
import { GlobalStateType } from '../../redux/reduxStore'
import { GetMessagesNewerThanResponseType } from '../../redux/storeTypes'

const getMessagesNewerThanSagaWorker = function* (action: ReturnType<typeof DialogsAC.getMessagesNewerThan>) {
    yield put(DialogsAC.setIsInProgressGetMessagesNewerThan(true))
    yield put(ErrorsAC.setErrOnGetNewerThanMessages(null))

    try {
        const companionId: number | undefined = yield select(
            (state: GlobalStateType) => state.forDialogsData.messagesListData.companionData?.id,
        )
        if (!companionId) throw new Error()

        // если выбрали дату
        if (action.dateNewerThan) {
            const resp: GetMessagesNewerThanResponseType = yield call(
                dialogsFetchingAPI.getMessagesNewerThan,
                companionId,
                action.dateNewerThan,
            )

            if (Array.isArray(resp)) {
                yield put(DialogsAC.setInitialMessagesPortion(resp))
                yield put(DialogsAC.setTotalMessagesCount(resp.length))
                yield put(DialogsAC.setDateNewerThan(action.dateNewerThan))
            } else throw new Error(resp.message)

            // если дату занулили
        } else {
            //?
            const portionSize: number = yield select((state: GlobalStateType) => state.forDialogsData.messagesListData.portionSize)
            const { items, totalCount, error } = yield call(dialogsFetchingAPI.getMessagesPortion, companionId, 1, portionSize)

            if (!error) {
                yield put(DialogsAC.setInitialMessagesPortion(items))
                yield put(DialogsAC.setTotalMessagesCount(totalCount))
                yield put(DialogsAC.setDateNewerThan(null))
            } else throw new Error(error)
            //*?
        }
    } catch (err: any) {
        yield put(ErrorsAC.setErrOnGetNewerThanMessages(cutText(err.response?.data?.message || err.message, 30, 'Some server error')))
    }

    yield put(DialogsAC.setIsInProgressGetMessagesNewerThan(false))
}

export const getMessagesNewerThanSagaWatcher = function* () {
    yield takeLeading(GET_MESSAGES_NEWER_THAN, getMessagesNewerThanSagaWorker)
}
