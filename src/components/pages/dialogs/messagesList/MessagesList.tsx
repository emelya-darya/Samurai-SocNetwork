import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { PreloaderSmall } from '../../../reusableElements/preloaders/small/PreloaderSmall'
import { GlobalStateType } from '../../../../store/redux/reduxStore'
import { DialogsAC } from '../../../../store/redux/dialogs/dialogsReducer'
import { accentMainClr } from '../../../reusableElements/getCssVariableColor'
import { AddMessageForm } from './addMessageForm/AddMessageForm'
import { CompanionInfoBlock } from './companionInfoBlock/CompanionInfoBlock'
import { MessagesItemsBlock } from './messagesItemsBlock/MessagesItemsBlock'
import { Calendar } from './calendar/Calendar'
import c from './messagesList.module.scss'

type LocationState = {
    colorAvatar?: string
}

type MessagesListPropsType = {
    userId: number
}
const MessagesList: React.FC<MessagesListPropsType> = ({ userId }) => {
    //ошибки
    const { errOnLoadingFirstMessagesPortion } = useSelector((state: GlobalStateType) => state.forErrorsData.dialogsErrors)

    const { companionData, isLoadingPrimaryData } = useSelector((state: GlobalStateType) => state.forDialogsData.messagesListData)

    const myID = useSelector((state: GlobalStateType) => state.forAuthData.id)

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(DialogsAC.getInitialDataForMessagesPage(userId))
    }, [])

    const locationObjState = useLocation().state as LocationState | null

    const [anchorRefForAutoscroll, setAnchorRefForAutoscroll] = React.useState<React.RefObject<HTMLDivElement> | undefined>(undefined)

    if (myID == userId) return <Navigate to='/dialogs' />
    return (
        <>
            {/* <h1 className={c.title}>Dialog</h1> */}
            <p className={c.warn}>*working with REST API, not real time</p>

            {errOnLoadingFirstMessagesPortion ? (
                <p className={c.serverErrMessage}>{errOnLoadingFirstMessagesPortion}</p>
            ) : isLoadingPrimaryData ? (
                <PreloaderSmall  color={accentMainClr} size={150} minHeight='75vh' />
            ) : !companionData ? (
                <div className={c.noDialogBlock}>
                    <p className={c.emptyLett}>You do not have a dialogue with this user. Try starting from the</p>
                    <p>
                        <Link to='/dialogs'>Dialogue list page</Link>.
                    </p>
                </div>
            ) : (
                <>
                    <Calendar anchorRefForAutoscroll={anchorRefForAutoscroll} />
                    <div className={c.messagesCompanionBlock}>
                        <CompanionInfoBlock
                            userName={companionData.userName}
                            userId={companionData.id}
                            lastUserActivityDate={companionData.lastUserActivityDate}
                            photo={companionData.photos.small}
                            colorAvatar={locationObjState?.colorAvatar}
                        />

                        <MessagesItemsBlock
                            companionAvatarColor={locationObjState?.colorAvatar}
                            companionData={companionData}
                            throwUpAnchor={setAnchorRefForAutoscroll}
                        />

                        <AddMessageForm userId={companionData.id} anchorRefForAutoscroll={anchorRefForAutoscroll} />
                    </div>
                </>
            )}
        </>
    )
}

export { MessagesList }
