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
import { WSChannel, commonChatWSApi } from '../../../store/DAL/websocketCommonChatAPI'
import { CommonWSChatMessageType } from '../../../store/redux/storeTypes'
import { Preloader } from '../../reusableElements/preloader/Preloader'

// const colors = [...colorsAvatars]

//* dispatch(CommonWSchatAC.onCloseEvent()) - чистит массив сообщений, isOpenWSChannel переключает в false, isInProgeressOpenWSChannel ставит на true

const DialogsPage = withAuthRedirectHOC(() => {
   const { messages, isOpenWSChannel, isInProgeressOpenWSChannel } = useSelector((state: GlobalStateType) => state.forCommonWSchatData)

   const dispatch = useDispatch()

   const openChannelHandler = () => dispatch(CommonWSchatAC.onOpenEvent())
   const messageChannelHandler = (e: MessageEvent<string>) => {
      dispatch(CommonWSchatAC.onMessageEvent(JSON.parse(e.data)))
   }

   // если канал закрывается, то снимаем все обработчики со старого WSChannel, обнуляем state, создаем новый WSChannel и вешаем на него обработчики
   const closeChannelToRebirthHandler = () => {
      removeAllListeners(WSChannel)
      dispatch(CommonWSchatAC.onCloseEvent())
      dispatch(CommonWSchatAC.createWSChannel())
      addAllListeners(WSChannel)
   }

   //! убираем все обработчики
   function removeAllListeners(WSChannel: WebSocket | null) {
      if (WSChannel) {
         WSChannel.onopen = null
         WSChannel.onmessage = null
         WSChannel.onclose = null
      }
   }

   //! добавляем все обработчики
   function addAllListeners(WSChannel: WebSocket | null) {
      if (WSChannel) {
         WSChannel.onopen = openChannelHandler
         WSChannel.onmessage = messageChannelHandler
         WSChannel.onclose = closeChannelToRebirthHandler
      }
   }

   // const errorChannelHandler = () => dispatch(CommonWSchatAC.onErrorEvent())

   React.useEffect(() => {
      dispatch(CommonWSchatAC.createWSChannel())
      addAllListeners(WSChannel)

      // сработает только при уходе с компоненты
      return () => {
         if (WSChannel) {
            WSChannel.close(1000, 'Close channel')
            removeAllListeners(WSChannel)
            dispatch(CommonWSchatAC.onCloseEvent())
         }
      }
   }, [])

   return (
      <>
         <h1 className={c.title}>Common users chat</h1>
         {isInProgeressOpenWSChannel ? (
            <Preloader color='#A0450B' size={100} minHeight='75vh' />
         ) : (
            <>
               <button
                  style={{ background: 'red' }}
                  onClick={() => {
                     WSChannel?.close(1000, 'Close channel')
                  }}>
                  Клик
               </button>
               <div className={c.messagesContainer}>
                  <div className={c.messagesContainerInner}>
                     {messages.map(m => (
                        <ChatMessageItem key={shortid.generate()} {...m} bgColor='red' />
                     ))}
                  </div>
               </div>

               <AddMessageForm WSChannel={WSChannel} isOpenWSChannel={isOpenWSChannel} />
            </>
         )}
      </>
   )
})

export { DialogsPage }
