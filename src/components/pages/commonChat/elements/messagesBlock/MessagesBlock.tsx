import shortid from 'shortid'
import { CommonWSChatMessageType, GlobalStateType } from '../../../../../store/redux/storeTypes'
import c from '../../commonChat.module.scss'
import { ChatMessageItem } from '../chatMessageItem/ChatMessageItem'
import { useSelector } from 'react-redux'

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
            messages.map(m => <ChatMessageItem key={shortid.generate()} {...m} bgColor={colorsAvatars[m.userId] || '#F0772B'} />)
         ) : (
            <p className={c.noMessagesLett}>There have been no messages in the chat lately. Fix it, write first.</p>
         )}
         <div ref={anchorRefForAutoscroll}></div>
      </div>
   )
}

export { MessagesBlock }
