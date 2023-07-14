import c from './sidebar.module.scss'
import { Link } from 'react-router-dom'
import { UserFriendItemType } from '../../../store/redux/storeTypes'

const getInitialsForAvatar = (name: string | null) => {
   if (!name) return 'U'
   name = name
      .replace(/,|\[|\]|\\|\^|\.|\||\?|\*|\+|\(|\)|-|_/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/(^\s)|(\s$)/g, '')
      .toUpperCase()
   let nameArr = name.split(' ')
   nameArr.length = 2
   nameArr = nameArr.map(str => str[0])
   return nameArr.join('')
}

type FriendAvatarNavbarPropsType = UserFriendItemType & {
   closeSidebarHandler: () => void
   bgColor: string
}

const FriendAvatarNavbar: React.FC<FriendAvatarNavbarPropsType> = ({ name, id, photos, closeSidebarHandler, bgColor }) => {
   if (photos.small) {
      return (
         <Link to={'/profile/' + id} className={c.subAvatarWPhoto} onClick={closeSidebarHandler} title={name || ''} style={{ backgroundColor: bgColor }}>
            <img src={photos.small} alt={name || ''} />
         </Link>
      )
   } else {
      return (
         <Link to={'/profile/' + id} className={c.subAvatarWLett} onClick={closeSidebarHandler} title={name || ''} style={{ backgroundColor: bgColor }}>
            <span>{getInitialsForAvatar(name)}</span>
         </Link>
      )
   }
}

export { FriendAvatarNavbar }
