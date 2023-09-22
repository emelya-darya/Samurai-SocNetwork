import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import shortid from 'shortid'
import { GlobalStateType } from '../../../../../store/redux/reduxStore'
import { DialogsAC } from '../../../../../store/redux/dialogs/dialogsReducer'
import { MessageItem } from '../messageItem/MessageItem'
import { PreloaderSmall } from '../../../../reusableElements/preloaders/small/PreloaderSmall'
import { DialogsListItemType } from '../../../../../store/redux/storeTypes'
import { accentMainClr, accentSecClr } from '../../../../reusableElements/getCssVariableColor'
import c from './messagesItemsBlock.module.scss'

type MessagesItemsBlockPropsType = {
    companionAvatarColor: string | undefined
    companionData: DialogsListItemType
    throwUpAnchor: React.Dispatch<React.SetStateAction<React.RefObject<HTMLDivElement> | undefined>>
}

const MessagesItemsBlock: React.FC<MessagesItemsBlockPropsType> = ({ companionAvatarColor, companionData, throwUpAnchor }) => {
    const { errOnLoadingExtraMessagesPortion } = useSelector((state: GlobalStateType) => state.forErrorsData.dialogsErrors)

    const { visibleMessages, isLoadingMessagesPortion, totalMessagesCount, isLoadingPrimaryData, dateToGetMessagesNewerThan } = useSelector(
        (state: GlobalStateType) => state.forDialogsData.messagesListData,
    )

    const dispatch = useDispatch()

    const isAllMessagesLoaded = visibleMessages.length >= totalMessagesCount

    const messagesItemsBlock = React.useRef<HTMLDivElement>(null)

    const [scrollBottomValue, setScrollBottomValue] = React.useState(0)

    const isLoadingMessagesPortion_REF = React.useRef<boolean>(isLoadingMessagesPortion)
    isLoadingMessagesPortion_REF.current = isLoadingMessagesPortion

    const dateToGetMessagesNewerThan_REF = React.useRef<null | string>(dateToGetMessagesNewerThan)
    dateToGetMessagesNewerThan_REF.current = dateToGetMessagesNewerThan

    const scrollHandler = React.useCallback(function (e: Event) {
        const block = messagesItemsBlock?.current
        const shouldLoadExtraPortion = block && !isLoadingMessagesPortion_REF.current && !dateToGetMessagesNewerThan_REF.current

        if (shouldLoadExtraPortion) {
            if (block.scrollTop <= 5) {
                setScrollBottomValue(block.scrollHeight)
                dispatch(DialogsAC.increaseScrolledMessagesPage())
            }
        }
    }, [])

    React.useEffect(() => {
        const block = messagesItemsBlock?.current
        if (block && !isLoadingMessagesPortion) block.scrollTop = block.scrollHeight - scrollBottomValue
    }, [isLoadingMessagesPortion])

    React.useEffect(() => {
        if (!isLoadingPrimaryData && messagesItemsBlock?.current) {
            messagesItemsBlock.current.addEventListener('scroll', scrollHandler)

            if (isAllMessagesLoaded) messagesItemsBlock.current.removeEventListener('scroll', scrollHandler)
        }

        return () => {
            if (messagesItemsBlock?.current) messagesItemsBlock.current.removeEventListener('scroll', scrollHandler)
        }
    }, [messagesItemsBlock, isLoadingPrimaryData, isAllMessagesLoaded])

    const anchorRefForAutoscroll = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        if (anchorRefForAutoscroll?.current) {
            throwUpAnchor(anchorRefForAutoscroll)
            anchorRefForAutoscroll.current?.scrollIntoView({ block: 'nearest', inline: 'start' })
        }
    }, [anchorRefForAutoscroll?.current, isLoadingPrimaryData])

    return (
        <>
            <div className={c.smallPreloaderWr}>
                {/* {visibleMessages.length}/{totalMessagesCount} */}
                {isAllMessagesLoaded ? (
                    <span>All messages loaded</span>
                ) : errOnLoadingExtraMessagesPortion ? (
                    <span className={c.scrollErr}>{errOnLoadingExtraMessagesPortion}</span>
                ) : isLoadingMessagesPortion ? (
                    <PreloaderSmall color={accentMainClr} size={20} minHeight='20px' />
                ) : (
                    <></>
                )}
            </div>
            <div className={c.messagesItems} ref={messagesItemsBlock}>
                {visibleMessages.map(m => {
                    return (
                        <MessageItem
                            key={shortid.generate()}
                            messageId={m.id}
                            companionAvatarColor={companionAvatarColor || accentSecClr}
                            messageText={m.body}
                            senderName={m.senderName}
                            companionPhoto={companionData.photos.small}
                            companionId={companionData.id}
                            senderId={m.senderId}
                            createDate={m.addedAt}
                            isViewed={m.viewed}
                        />
                    )
                })}

                <div ref={anchorRefForAutoscroll}></div>
            </div>
        </>
    )
}

export { MessagesItemsBlock }
