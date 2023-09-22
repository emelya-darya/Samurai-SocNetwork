import { call, put, select, takeLeading } from 'redux-saga/effects'
import { GET_INITIAL_DATA_FOR_MESSAGES_PAGE } from '../../redux/dialogs/constants'
import { GlobalStateType } from '../../redux/reduxStore'
import { DialogsListItemType } from '../../redux/storeTypes'
import { DialogsAC } from '../../redux/dialogs/dialogsReducer'
import { dialogsFetchingAPI } from '../../DAL/fetchingAPI'
import { ErrorsAC } from '../../redux/errors/errorsReducer'
import { cutText } from '../assets/cutText'

const sagaWorkerGetInitalDataForMessagesPage = function* (action: ReturnType<typeof DialogsAC.getInitialDataForMessagesPage>) {
    // зануляем все ошибки, которые показываются на странице с соббщениями из диалога
    yield put(ErrorsAC.setErrOnLoadingFirstMessagesPortion(null))
    yield put(ErrorsAC.setErrOnSendsMessageInDialogs(null))
    yield put(ErrorsAC.setErrOnLoadingExtraMessagesPortion(null))
    yield put(ErrorsAC.nullingSetErrOnDeleteSpamRestoreMessage())
    yield put(ErrorsAC.setErrOnGetNewerThanMessages(null))

    yield put(DialogsAC.setIsLoadingMessagesListPrimaryData(true))
    try {
        // данные о собеседнике
        let dialogsFromState: Array<DialogsListItemType> = yield select(
            (state: GlobalStateType) => state.forDialogsData.dialogsListData.items,
        )
        let companionData = dialogsFromState.find(dialog => dialog.id == action.userId) || null

        if (!companionData) {
            const data: Array<DialogsListItemType> = yield call(dialogsFetchingAPI.getDialogsList)
            yield put(DialogsAC.setDialogsList(data))
            dialogsFromState = data
            companionData = dialogsFromState.find(dialog => dialog.id == action.userId) || null
        }

        // if (!companionData) throw new Error('У вас нет диалога с этим пользователем')

        // первая порция сообщений
        yield put(DialogsAC.setCompanionData(companionData))
        if (companionData) {
            const portionSize: number = yield select((state: GlobalStateType) => state.forDialogsData.messagesListData.portionSize)
            const { items, totalCount, error } = yield call(dialogsFetchingAPI.getMessagesPortion, action.userId, 1, portionSize)

            if (!error) {
                yield put(DialogsAC.setInitialMessagesPortion(items))
                yield put(DialogsAC.setTotalMessagesCount(totalCount))
            } else throw new Error(error)
        }
    } catch (err: any) {
        yield put(
            ErrorsAC.setErrOnLoadingFirstMessagesPortion(
                cutText(err.response?.data?.message || err.message, 200, 'Error on load messages list'),
            ),
        )
    }
    yield put(DialogsAC.setIsLoadingMessagesListPrimaryData(false))
}

export const sagaWatcherGetInitalDataForMessagesPage = function* () {
    yield takeLeading(GET_INITIAL_DATA_FOR_MESSAGES_PAGE, sagaWorkerGetInitalDataForMessagesPage)
}
