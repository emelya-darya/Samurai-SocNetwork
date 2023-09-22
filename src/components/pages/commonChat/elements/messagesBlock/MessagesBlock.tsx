import shortid from 'shortid'
import { useSelector } from 'react-redux'
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
    return (
        <div className={c.messagesContainerInner} ref={blockWithMessages}>
            {messages?.length ? (
                messages.map(m => <ChatMessageItem key={shortid.generate()} {...m} bgColor={colorsAvatars[m.userId] || accentSecClr} />)
            ) : (
                <p className={c.noMessagesLett}>There have been no messages in the chat lately. Fix it, write first.</p>
            )}
            <div ref={anchorRefForAutoscroll}></div>
        </div>
    )
}

export { MessagesBlock }
