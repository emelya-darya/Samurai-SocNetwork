import shortid from 'shortid'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CommonWSChatMessageType, GlobalStateType } from '../../../../../store/redux/storeTypes'
import { ChatMessageItem } from '../chatMessageItem/ChatMessageItem'
import c from '../../commonChat.module.scss'
import { accentSecClr } from '../../../../reusableElements/getCssVariableColor'

type MessagesBlockPropsType = {
    messages: Array<CommonWSChatMessageType>
    anchorRefForAutoscroll: React.RefObject<HTMLDivElement>
    blockWithMessages: React.RefObject<HTMLDivElement>
}

const MessagesBlock: React.FC<MessagesBlockPropsType> = ({ messages, anchorRefForAutoscroll, blockWithMessages }) => {
    // console.log('ререндер MessagesBlock')
    const { colorsAvatars } = useSelector((state: GlobalStateType) => state.forCommonWSchatData)

    // перевод
    const { t } = useTranslation()
    return (
        <div className={c.messagesContainerInner} ref={blockWithMessages}>
            {messages?.length ? (
                messages.map(m => <ChatMessageItem key={shortid.generate()} {...m} bgColor={colorsAvatars[m.userId] || accentSecClr} />)
            ) : (
                <p className={c.noMessagesLett}>{t('chat.noMessages')}</p>
            )}
            <div ref={anchorRefForAutoscroll}></div>
        </div>
    )
}

export { MessagesBlock }
