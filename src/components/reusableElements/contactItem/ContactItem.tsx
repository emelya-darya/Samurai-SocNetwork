import { Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import c from './contactItem.module.scss'
import { useMatchMedia } from '../../../customHooks/useMatchMedia'

type ContactItemPropsType = {
   linkHref: string | null
   name: string
   icon: IconType | string
}

const cutText = function (text: string, maxLength: number) {
   if (text.length <= maxLength) return text
   return text.substring(0, maxLength - 3) + '...'
}
const ContactItem: React.FC<ContactItemPropsType> = ({ linkHref, name, icon }) => {
   const matchesObj = useMatchMedia()
   linkHref = linkHref?.trim() || null

   if (!linkHref) return <></>

   let correctedLink = linkHref
   if (!linkHref.match(/^https?:\/\//)) correctedLink = 'https://' + linkHref
   return (
      <a href={correctedLink} className={c.contactItem} target='_blank' title={name}>
         <div className={c.iconWr}>{typeof icon === 'string' ? <img src={icon} alt='' /> : <Icon as={icon} />}</div>
         <div className={c.textLink}>
            <span className={c.nameLink}>{name}: </span>
            <span>{cutText(linkHref, matchesObj.less576 ? 35 : 50)}</span>
         </div>
      </a>
   )
}

export { ContactItem }
