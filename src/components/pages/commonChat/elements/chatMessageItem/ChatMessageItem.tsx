import { Link } from 'react-router-dom'
import { UserAvatarWithLink } from '../../../../reusableElements/userAvatarWithLink/UserAvatarWithLink'
import c from './chatMessageItem.module.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../store/redux/reduxStore'
import { MessagePseudoElem } from '../../../../reusableElements/MessagePseudoElem'

type ChatMessageItemType = {
   message: string
   photo: string | null
   userId: number
   userName: string
   bgColor: string
   // isLast?: true
}

const ChatMessageItem: React.FC<ChatMessageItemType> = ({ userId, userName, photo, message, bgColor }) => {
   // console.log('ререндер ChatMessageItem')

   const myID = useSelector((state: GlobalStateType) => state.forAuthData.id)

   const isMyMessage = myID === userId

   return (
      <div className={`${c.messageItem} ${isMyMessage ? c.myMessageItem : ''}`}>
         <div className={c.avatarWr}>
            <UserAvatarWithLink id={userId} photo={photo} name={userName} bgColor={isMyMessage ? '#A0450B' : bgColor} />
         </div>
         <div className={c.messageContent}>
            <div className={c.pseudoElemWr}>
               <MessagePseudoElem />
            </div>

            <div className={c.userNameMessageBlock}>
               <Link to={'/profile/' + userId} className={c.userName}>
                  {userName}
               </Link>

               <div className={c.messageText}>{message}</div>
            </div>
         </div>
      </div>
   )
}

export { ChatMessageItem }
export type { ChatMessageItemType }
