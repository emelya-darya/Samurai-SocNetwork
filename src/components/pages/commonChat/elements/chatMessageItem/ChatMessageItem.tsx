import { Link } from 'react-router-dom'
import { UserAvatarWithLink } from '../../../../reusableElements/userAvatarWithLink/UserAvatarWithLink'
import c from './chatMessageItem.module.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../store/redux/reduxStore'

type ChatMessageItemType = {
   message: string
   photo: string | null
   userId: number
   userName: string
   bgColor: string
   // isLast?: true
}

const ChatMessageItem: React.FC<ChatMessageItemType> = ({ userId, userName, photo, message, bgColor}) => {
  

   const myID = useSelector((state: GlobalStateType) => state.forAuthData.id)

   return (
      <div className={`${c.messageItem} ${myID === userId ? c.myMessageItem : ''}`}>
         <div className={c.avatarWr}>
            <UserAvatarWithLink id={userId} photo={photo} name={userName} bgColor={bgColor} />
         </div>
         <div className={c.userNameMessageBlock}>
            <Link to={'/profile/' + userId} className={c.userName}>
               {userName}
            </Link>

            <div>{message}</div>
         </div>
      </div>
   )
}

export { ChatMessageItem }
export type { ChatMessageItemType }
