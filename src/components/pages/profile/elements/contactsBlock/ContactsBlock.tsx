import { useSelector } from 'react-redux'
import {
    AiFillFacebook,
    AiFillGithub,
    AiFillInstagram,
    AiOutlineLink,
    AiOutlineTwitter,
    AiOutlineGlobal,
    AiFillYoutube,
} from 'react-icons/ai'
import { SlSocialVkontakte } from 'react-icons/sl'
import { useTranslation } from 'react-i18next'
import { GlobalStateType } from '../../../../../store/redux/storeTypes'
import { ContactItem } from '../../../../reusableElements/contactItem/ContactItem'
import c from './contactsBlock.module.scss'

const ContactsBlock = () => {
    const { contacts } = useSelector((state: GlobalStateType) => state.forProfileData)

    const isContactFieldsExist =
        contacts.facebook?.trim() ||
        contacts.github?.trim() ||
        contacts.instagram?.trim() ||
        contacts.mainLink?.trim() ||
        contacts.twitter?.trim() ||
        contacts.vk?.trim() ||
        contacts.website?.trim() ||
        contacts.youtube?.trim()

    // перевод
    const { t } = useTranslation()

    return (
        <div className={c.contactsBlock}>
            <h2>{t('profile.contactsTitle')}</h2>
            <div className={c.contactsItems}>
                {isContactFieldsExist ? (
                    <>
                        <ContactItem linkHref={contacts.mainLink} Icon={AiOutlineLink} name='Main link' />
                        <ContactItem linkHref={contacts.github} Icon={AiFillGithub} name='Github' />
                        <ContactItem linkHref={contacts.website} Icon={AiOutlineGlobal} name='Website' />
                        <ContactItem linkHref={contacts.vk} Icon={SlSocialVkontakte} name='Vkontakte' />
                        <ContactItem linkHref={contacts.twitter} Icon={AiOutlineTwitter} name='Twitter' />
                        <ContactItem linkHref={contacts.facebook} Icon={AiFillFacebook} name='Facebook' />
                        <ContactItem linkHref={contacts.youtube} Icon={AiFillYoutube} name='Youtube' />
                        <ContactItem linkHref={contacts.instagram} Icon={AiFillInstagram} name='Instagram' />
                    </>
                ) : (
                    <p>{t('profile.emptyContacts')}</p>
                )}
            </div>
        </div>
    )
}

export { ContactsBlock }
