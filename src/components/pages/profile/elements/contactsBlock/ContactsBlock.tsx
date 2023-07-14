import { Icon } from '@chakra-ui/react'
import c from './contactsBlock.module.scss'
import { IconType } from 'react-icons'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../store/redux/storeTypes'
import { AiFillFacebook, AiFillGithub, AiFillInstagram, AiOutlineLink, AiOutlineTwitter, AiOutlineGlobal, AiFillYoutube } from 'react-icons/ai'
import { SlSocialVkontakte } from 'react-icons/sl'

type ContactItemPropsType = {
   linkHref: string | null
   name: string
   icon: IconType
}
const ContactItem: React.FC<ContactItemPropsType> = ({ linkHref, name, icon }) => {
   linkHref = linkHref?.trim() || null

   if (!linkHref) return <></>

   let correctedLink = linkHref
   if (!linkHref.match(/^https?:\/\//)) correctedLink = 'https://' + linkHref
   return (
      <a href={correctedLink} className={c.contactItem} target='_blank' title={name}>
         <div className={c.iconWr}>
            <Icon as={icon} />
         </div>
         <div className={c.textLink}>
            <span className={c.nameLink}>{name}: </span>
            <span>{linkHref}</span>
         </div>
      </a>
   )
}

const ContactsBlock = () => {
   const { contacts } = useSelector((state: GlobalStateType) => state.forProfileData)

   let isContactFieldsExist =
      contacts.facebook?.trim() ||
      contacts.github?.trim() ||
      contacts.instagram?.trim() ||
      contacts.mainLink?.trim() ||
      contacts.twitter?.trim() ||
      contacts.vk?.trim() ||
      contacts.website?.trim() ||
      contacts.youtube?.trim()

   return (
      <div className={c.contactsBlock}>
         <h2>Contacts</h2>
         <div className={c.contactsItems}>
            {isContactFieldsExist ? (
               <>
                  <ContactItem linkHref={contacts.mainLink} icon={AiOutlineLink} name='Main link' />
                  <ContactItem linkHref={contacts.github} icon={AiFillGithub} name='Github' />
                  <ContactItem linkHref={contacts.website} icon={AiOutlineGlobal} name='Website' />
                  <ContactItem linkHref={contacts.vk} icon={SlSocialVkontakte} name='Vkontakte' />
                  <ContactItem linkHref={contacts.twitter} icon={AiOutlineTwitter} name='Twitter' />
                  <ContactItem linkHref={contacts.facebook} icon={AiFillFacebook} name='Facebook' />
                  <ContactItem linkHref={contacts.youtube} icon={AiFillYoutube} name='Youtube' />
                  <ContactItem linkHref={contacts.instagram} icon={AiFillInstagram} name='Instagram' />
               </>
            ) : (
               <p>The user did not enter contact information</p>
            )}
         </div>
      </div>
   )
}

export { ContactsBlock }
