import React from 'react'
import { withAuthRedirectHOC } from '../../reusableElements/HOC_withAuthRedirect/withAuthRedirectHOC'
import c from './dialogs.module.scss'
import shortid from 'shortid'
import { ChatMessageItem, ChatMessageItemType } from './elements/chatMessageItem/ChatMessageItem'
import { AddMessageForm } from './elements/addMessageForm/AddMessageForm'
import { colorsAvatars, shuffleArray } from '../../reusableElements/userAvatarWithLink/colorsAvatars'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../store/redux/reduxStore'
import { CommonWSchatAC } from '../../../store/redux/commonWSchat/commonWSchatReducer'

let WSChannel: WebSocket | null = null
const createWSChannel = function () {
   WSChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
}

const colors = [...colorsAvatars]

const DialogsPage = withAuthRedirectHOC(() => {
   // const [messages, setMessages] = React.useState<Array<ChatMessageItemType>>([])

   const [isOpenWSChannel, setIsOpenWSChannel] = React.useState<boolean>(false)

   const messages = useSelector((state: GlobalStateType) => state.forCommonWSchatData.messages)

   const dispatch = useDispatch()

   React.useEffect(() => {
      createWSChannel()

      WSChannel?.addEventListener('open', e => setIsOpenWSChannel(true))

      WSChannel?.addEventListener('message', e => {
         dispatch(CommonWSchatAC.addMessages(JSON.parse(e.data)))
      })
   }, [])

   // React.useEffect(() => {
   //    shuffleArray(colors)
   // }, [])

   return (
      <>
         <h1 className={c.title}>Common users chat</h1>
         <div className={c.messagesContainer}>
            <div className={c.messagesContainerInner}>
               {messages.map(m => (
                  <ChatMessageItem key={shortid.generate()} {...m} bgColor='red' />
               ))}
            </div>
         </div>
         <AddMessageForm WSChannel={WSChannel} isOpenWSChannel={isOpenWSChannel} />
      </>
   )
})

export { DialogsPage }
