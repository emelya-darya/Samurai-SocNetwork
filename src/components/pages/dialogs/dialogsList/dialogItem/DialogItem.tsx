import { Link } from 'react-router-dom'
import { DialogsListItemType } from '../../../../../store/redux/storeTypes'
import { parseDateStr } from '../../../../reusableElements/parseDate/parseDate'
import c from './dialogItem.module.scss'
import { UserAvatarWithLink } from '../../../../reusableElements/userAvatarWithLink/UserAvatarWithLink'
import { todayDateObj } from '../DialogsList'
import { colorsAvatars, shuffleArray } from '../../../../reusableElements/userAvatarWithLink/colorsAvatars'

type DialogItemPropsType = DialogsListItemType & {
   todayDateObj: typeof todayDateObj
   colorAvatar?: string
}

const DialogItem: React.FC<DialogItemPropsType> = ({ id, userName, hasNewMessages, lastDialogActivityDate, lastUserActivityDate, newMessagesCount, photos, todayDateObj, colorAvatar }) => {
   const parsedDateDialogActivity = parseDateStr(lastDialogActivityDate, todayDateObj.currentYear, todayDateObj.currentMonth, todayDateObj.currentDay)
   const parsedDateUserActivity = parseDateStr(lastUserActivityDate, todayDateObj.currentYear, todayDateObj.currentMonth, todayDateObj.currentDay)

   const newMessagesCountStr = String(newMessagesCount).length > 2 ? String(newMessagesCount)[0] + '..' : String(newMessagesCount)

   return (
      <Link className={`${c.dialogItem} ${hasNewMessages ? c.withNewMessages : ''}`} to={`/dialogs/${id}`}>
         <div className={c.avatarNick}>
            <div className={c.avatarWr}>
               <UserAvatarWithLink id={id} photo={photos.small} name={userName} type='div' bgColor={colorAvatar || '#F0772B'} />
            </div>
            <div className={c.textPart}>
               <div className={c.name}>{userName}</div>
               <div className={c.lastSeen}>Last seen: {parsedDateUserActivity}</div>
            </div>
         </div>

         <div className={c.date}>{parsedDateDialogActivity}</div>

         {hasNewMessages && (
            <div className={c.newMessagesCount}>
               <span>{newMessagesCountStr}</span>
            </div>
         )}
      </Link>
   )
}

export { DialogItem }
