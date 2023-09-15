import { useDispatch, useSelector } from 'react-redux'
import { UserAvatarWithLink } from '../../../../reusableElements/userAvatarWithLink/UserAvatarWithLink'
import c from './messageItem.module.scss'
import { Link } from 'react-router-dom'
import { GlobalStateType } from '../../../../../store/redux/reduxStore'
import { parseDateStr } from '../../../../reusableElements/parseDate/parseDate'
import { BsCheck2, BsCheck2All } from 'react-icons/bs'

import { RiDeleteBin6Line, RiSpam2Fill, RiSpam2Line } from 'react-icons/ri'
import { DialogsAC } from '../../../../../store/redux/dialogs/dialogsReducer'
import { MessagePseudoElem } from '../../../../reusableElements/MessagePseudoElem'
import { FaTrashRestore } from 'react-icons/fa'
import { PreloaderSmall } from '../../../../reusableElements/preloaders/small/PreloaderSmall'

type MessageItemPropsType = {
   messageId: string
   messageText: string
   senderName: string
   companionPhoto: string | null
   companionAvatarColor: string
   companionId: number

   senderId: number
   createDate: string
   isViewed: boolean
}

const pseudoElem = (
   <div className={c.pseudoElemWr}>
      {/* <img src={isMyMessage ? peGreen : peWhite} alt='' /> */}
      <MessagePseudoElem />
   </div>
)

const MessageItem: React.FC<MessageItemPropsType> = ({
   messageId,
   messageText,
   senderName,
   companionPhoto,
   companionAvatarColor,
   companionId,
   senderId,
   createDate,
   isViewed,
}) => {
   // console.log(createDate)
   const { id: myID, avatar, login } = useSelector((state: GlobalStateType) => state.forAuthData)
   const isMyMessage = myID == senderId

   const { deletedMessages, markedAsSpamMessages, inProgressDeletingMessages, inProgressMarkSpamMessages, inProgressRestore } = useSelector(
      (state: GlobalStateType) => state.forDialogsData.messagesListData
   )

   const actionsErrors = useSelector((state: GlobalStateType) => state.forErrorsData.dialogsErrors.errOnDeleteSpamRestoreMessage)
   const currentMsgError = actionsErrors[messageId]

   const dataForMessage = {
      avatar: isMyMessage ? avatar : companionPhoto,
      avatarClr: isMyMessage ? '#A0450B' : companionAvatarColor,
      idForLinkForAvatar: isMyMessage ? myID : companionId,
      author: isMyMessage ? login || senderName : senderName,
   }

   const isMessageDeleted = deletedMessages.includes(messageId)
   const isInProgressDeleting = inProgressDeletingMessages.includes(messageId)

   const isMessageMarkedSpam = markedAsSpamMessages.includes(messageId)
   const isInProgressMarkSpam = inProgressMarkSpamMessages.includes(messageId)

   const isInProgressRestore = inProgressRestore.includes(messageId)

   const dispatch = useDispatch()

   const deleteHandler = () => dispatch(DialogsAC.deleteMessage(messageId))
   const markAsSpamHandler = () => dispatch(DialogsAC.markSpamMessage(messageId))
   const restoreHandler = () => dispatch(DialogsAC.restoreMessage(messageId))

   return (
      <div className={`${c.messageItem} ${isMyMessage ? c.myMessageItem : ''}`}>
         <div className={c.avatarWr}>
            <UserAvatarWithLink
               id={dataForMessage.idForLinkForAvatar}
               photo={dataForMessage.avatar}
               name={dataForMessage.author}
               bgColor={dataForMessage.avatarClr}
            />
         </div>
         <div className={`${c.messageContent} ${isMessageDeleted || isMessageMarkedSpam ? c.markedAsTrash : ''}`}>
            <div className={c.maskForRestore}>
               <span className={c.maskNotify}>{isMessageDeleted ? 'Deleted (only for you)' : 'Marked as spam'}</span>

               {pseudoElem}

               <button type='button' className={c.restoreBtn} disabled={isInProgressRestore} onClick={restoreHandler}>
                  {isInProgressRestore ? (
                     <PreloaderSmall color='#38A169' size={14} minHeight='14px' />
                  ) : (
                     <>
                        <span>Restore</span>
                        <FaTrashRestore className={c.restoreIcon} />
                     </>
                  )}
               </button>
            </div>

            {pseudoElem}

            <div className={c.userNameMessageBlock}>
               {/* <div className={c.float}>f</div> */}
               <Link to={`/profile/${dataForMessage.idForLinkForAvatar}`} className={c.userName}>
                  {dataForMessage.author}
               </Link>

               <div className={c.messageText}>{messageText}</div>
            </div>
            <div className={c.actionsDateViewed}>
               <div className={c.actions}>
                  {!isMyMessage && (
                     <div className={c.spam} title='mark as spam' onClick={markAsSpamHandler}>
                        {isInProgressMarkSpam ? <PreloaderSmall color='#CDB507' size={14} minHeight='14px' /> : <RiSpam2Fill />}
                     </div>
                  )}

                  <div className={c.delete} title='delete (only for you)' onClick={deleteHandler}>
                     {isInProgressDeleting ? <PreloaderSmall color='#C53030' size={14} minHeight='14px' /> : <RiDeleteBin6Line />}
                  </div>
               </div>
               <div className={c.dateAndIsVieved}>
                  <span className={c.date}>{parseDateStr(createDate)}</span>
                  {/* <div className={c.isViewed}> */}
                  {isViewed ? <BsCheck2All className={c.isViewed} /> : <BsCheck2 className={c.isViewed} />}

                  {/* </div> */}
               </div>
            </div>
            <div className={c.actionErr}>{currentMsgError}</div>
         </div>
      </div>
   )
}

export { MessageItem }
