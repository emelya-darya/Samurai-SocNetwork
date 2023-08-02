import React from 'react'
import { withAuthRedirectHOC } from '../../reusableElements/HOC_withAuthRedirect/withAuthRedirectHOC'
import c from './commonChat.module.scss'
import shortid from 'shortid'
import { ChatMessageItem } from './elements/chatMessageItem/ChatMessageItem'
import { AddMessageForm } from './elements/addMessageForm/AddMessageForm'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../store/redux/reduxStore'
import { CommonWSchatAC } from '../../../store/redux/commonWSchat/commonWSchatReducer'
import { WSChannel } from '../../../store/DAL/websocketCommonChatAPI'
import { Preloader } from '../../reusableElements/preloaders/main/Preloader'
import { MessagesBlock } from './elements/messagesBlock/MessagesBlock'

//! dispatch(CommonWSchatAC.onCloseEvent()) - чистит массив сообщений, isOpenWSChannel переключает в false, isInProgeressOpenWSChannel ставит на true

const CommonChatPage = withAuthRedirectHOC(() => {
   // console.log('рeрендер CommonChatPage')
   const { messages, isOpenWSChannel, isInProgeressOpenWSChannel, colorsAvatars } = useSelector((state: GlobalStateType) => state.forCommonWSchatData)
   const errorOnTryingToConnectWS = useSelector((state: GlobalStateType) => state.forErrorsData.errorOnTryingToConnectWS)

   const dispatch = useDispatch()

   const openChannelHandler = () => dispatch(CommonWSchatAC.onOpenEvent())
   const messageChannelHandler = (e: MessageEvent<string>) => dispatch(CommonWSchatAC.onMessageEvent(JSON.parse(e.data)))
   const errorChannelHandler = (e: Event) => dispatch(CommonWSchatAC.onErrorEvent())

   // если канал закрывается не потому что мы уходим с компоненты,
   // то снимаем все обработчики со старого WSChannel, обнуляем state, создаем новый WSChannel и вешаем на него обработчики
   let timerid: NodeJS.Timeout | null
   const closeChannelToRebirthHandler = () => {
      timerid = setTimeout(() => {
         removeAllListeners(WSChannel)
         dispatch(CommonWSchatAC.onCloseEvent())
         dispatch(CommonWSchatAC.createWSChannel())
         addAllListeners(WSChannel)
      }, 5000)
   }

   //! убираем все обработчики
   function removeAllListeners(WSChannel: WebSocket | null) {
      if (WSChannel) {
         WSChannel.onopen = null
         WSChannel.onmessage = null
         WSChannel.onclose = null
         WSChannel.onerror = null
      }
   }

   //! добавляем все обработчики
   function addAllListeners(WSChannel: WebSocket | null) {
      if (WSChannel) {
         WSChannel.onopen = openChannelHandler
         WSChannel.onmessage = messageChannelHandler
         WSChannel.onclose = closeChannelToRebirthHandler
         WSChannel.onerror = errorChannelHandler
      }
   }

   React.useEffect(() => {
      dispatch(CommonWSchatAC.createWSChannel())
      addAllListeners(WSChannel)

      // сработает только при уходе с компоненты
      return () => {
         if (timerid) clearTimeout(timerid)
         if (WSChannel) {
            WSChannel.close(1000, 'Close channel')
            removeAllListeners(WSChannel)
            dispatch(CommonWSchatAC.onCloseEvent())
         }
      }
   }, [])

   const anchorRefForAutoscroll = React.useRef<HTMLDivElement>(null)
   const blockWithMessages = React.useRef<HTMLDivElement>(null)

   React.useLayoutEffect(() => {
      anchorRefForAutoscroll.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
   }, [anchorRefForAutoscroll.current])

   React.useEffect(() => {
      const scrollTop = blockWithMessages.current?.scrollTop
      const heightWithScrollPart = blockWithMessages.current?.scrollHeight
      const blockHeight = blockWithMessages.current?.clientHeight
      if (scrollTop !== undefined && blockHeight !== undefined && heightWithScrollPart !== undefined) {
         if (scrollTop + blockHeight + 200 > heightWithScrollPart) {
            anchorRefForAutoscroll.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
         }
      }
   }, [messages])

   return (
      <div className={c.dialogsPage}>
         <h1 className={c.title}>Common websocket users chat</h1>
         <p className={c.desc}>*api gives access to messages only for the last few hours</p>

         {errorOnTryingToConnectWS && <p className={c.err}>{errorOnTryingToConnectWS}</p>}
         {isInProgeressOpenWSChannel ? (
            <Preloader color='#A0450B' size={100} minHeight='50vh' text='Trying to connect...' />
         ) : (
            <>
               <div className={c.messagesContainer}>
                  {/* <div className={c.messagesContainerInner} ref={blockWithMessages}>
                     {messages?.length ? (
                        messages.map((m, idx, arr) => {
                           return <ChatMessageItem key={shortid.generate()} {...m} bgColor={colorsAvatars[m.userId] || '#F0772B'} />
                        })
                     ) : (
                        <p className={c.noMessagesLett}>There have been no messages in the chat lately. Fix it, write first.</p>
                     )}
                     <div ref={anchorRefForAutoscroll}></div>
                  </div> */}
                  <MessagesBlock messages={messages} anchorRefForAutoscroll={anchorRefForAutoscroll} blockWithMessages={blockWithMessages} />
                  <AddMessageForm WSChannel={WSChannel} isOpenWSChannel={isOpenWSChannel} />
               </div>
            </>
         )}
      </div>
   )
})

export { CommonChatPage }
