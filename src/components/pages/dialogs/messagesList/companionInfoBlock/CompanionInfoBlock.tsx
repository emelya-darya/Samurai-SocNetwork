import { Link } from 'react-router-dom'
import c from './companionInfoBlock.module.scss'
import { BsChevronLeft } from 'react-icons/bs'
import { parseDateStr } from '../../../../reusableElements/parseDate/parseDate'
import { UserAvatarWithLink } from '../../../../reusableElements/userAvatarWithLink/UserAvatarWithLink'

type CompanionInfoBlockPropsType = {
   userName: string
   userId: number
   lastUserActivityDate: string
   photo: string | null
   colorAvatar: string | undefined
}
const CompanionInfoBlock: React.FC<CompanionInfoBlockPropsType> = ({ userName, userId, lastUserActivityDate, photo, colorAvatar }) => {
   return (
      <div className={c.companionInfo}>
         <div className={c.backBtnWr}>
            <Link to='/dialogs' className={c.backBtn}>
               <BsChevronLeft />
               <span>Back</span>
            </Link>
         </div>

         <div className={c.nameLastSeen}>
            <Link to={`/profile/${userId}`} className={c.name}>
               {userName}
            </Link>
            <p className={c.lastSeen}>Last seen: {parseDateStr(lastUserActivityDate)}</p>
         </div>
         <div className={c.companionAvatarWr}>
            <UserAvatarWithLink id={userId} photo={photo} name={userName} bgColor={colorAvatar || '#F0772B'} />
         </div>
      </div>
   )
}

export { CompanionInfoBlock }
