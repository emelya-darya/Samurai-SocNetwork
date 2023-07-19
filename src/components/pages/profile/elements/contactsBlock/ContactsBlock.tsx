import c from './contactsBlock.module.scss'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../store/redux/storeTypes'
import { AiFillFacebook, AiFillGithub, AiFillInstagram, AiOutlineLink, AiOutlineTwitter, AiOutlineGlobal, AiFillYoutube } from 'react-icons/ai'
import { SlSocialVkontakte } from 'react-icons/sl'
import { ContactItem } from '../../../../reusableElements/contactItem/ContactItem'

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
