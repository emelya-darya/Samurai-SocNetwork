import { Icon } from '@chakra-ui/react'
import c from './infoPage.module.scss'

// import { SiReduxsaga, SiReact, SiTypescript, SiChakraui } from 'react-icons/si'
import { IconType } from 'react-icons'
import { AiFillFacebook, AiFillGithub, AiFillYoutube, AiFillLinkedin } from 'react-icons/ai'
import { SlSocialVkontakte } from 'react-icons/sl'
import { BiLogoTelegram } from 'react-icons/bi'
import itIncLogo from '../../../assets/images/infoPage/itincubator.svg'
import hhLogo from '../../../assets/images/infoPage/hh.svg'
import { SiCodewars } from 'react-icons/si'
import { FaWhatsapp } from 'react-icons/fa'
import { ContactItem } from '../../reusableElements/contactItem/ContactItem'
import shortid from 'shortid'

import reactLogo from '../../../assets/images/infoPage/createdWith/react.svg'
import reduxSagaLogo from '../../../assets/images/infoPage/createdWith/reduxSaga.svg'
import tsLogo from '../../../assets/images/infoPage/createdWith/typescript.svg'
import chakraLogo from '../../../assets/images/infoPage/createdWith/chakra.svg'

type AuthorContactType = {
   name: string
   linkHref: string
   icon: IconType | string
}

const backendAuthorLinks: Array<AuthorContactType> = [
   {
      name: 'It-incubator',
      linkHref: 'https://it-incubator.io/',
      icon: itIncLogo,
   },
   {
      name: 'Youtube',
      linkHref: 'https://www.youtube.com/@ITKAMASUTRA',
      icon: AiFillYoutube,
   },
   {
      name: 'Linkedin',
      linkHref: 'https://by.linkedin.com/in/kuzyuberdin',
      icon: AiFillLinkedin,
   },
   {
      name: 'Vkontakte',
      linkHref: 'https://vk.com/d.kuzyuberdin',
      icon: SlSocialVkontakte,
   },
   {
      name: 'Facebook',
      linkHref: 'https://www.facebook.com/mega.kuzyuberdin/',
      icon: AiFillFacebook,
   },
]

const frontendAuthorLinks: Array<AuthorContactType> = [
   {
      name: 'Telegram',
      linkHref: 'https://t.me/emelyadarya',
      icon: BiLogoTelegram,
   },
   {
      name: 'Github',
      linkHref: 'https://github.com/emelya-darya',
      icon: AiFillGithub,
   },
   {
      name: 'Whatsapp',
      linkHref: 'https://api.whatsapp.com/send/?phone=79874719487&text&type=phone_number&app_absent=0',
      icon: FaWhatsapp,
   },

   {
      name: 'Headhunter',
      linkHref: 'https://ufa.hh.ru/resume/576d96d9ff09d8bf970039ed1f453262704570',
      icon: hhLogo,
   },
   {
      name: 'Codewars',
      linkHref: 'https://www.codewars.com/users/emelya-darya',
      icon: SiCodewars,
   },
]

type CreatedWithItemType = { name: string; logo: string }

const createdWith: Array<CreatedWithItemType> = [
   {
      name: 'React',
      logo: reactLogo,
   },
   {
      name: 'Redux-saga',
      logo: reduxSagaLogo,
   },
   {
      name: 'Typescript',
      logo: tsLogo,
   },
   {
      name: 'ChakraUI',
      logo: chakraLogo,
   },
]

const InfoPage = () => {
   return (
      <>
         <h1 className={c.title}>App info</h1>

         <h2 className={c.subtitle}>Frontend developer contacts:</h2>
         <div className={c.authorLinks}>
            {frontendAuthorLinks.map(el => (
               <ContactItem key={shortid.generate()} {...el} />
            ))}
         </div>

         <h2 className={c.subtitle}>Backend developer contacts:</h2>
         <div className={c.authorLinks}>
            {backendAuthorLinks.map(el => (
               <ContactItem key={shortid.generate()} {...el} />
            ))}
         </div>

         <h2 className={c.subtitle}>Created with:</h2>
         <div className={c.creactedWithItems}>
            {createdWith.map(el => (
               <div key={shortid.generate()} className={c.createdWithItem}>
                  <img src={el.logo} alt={el.name} title={el.name} />
               </div>
            ))}
         </div>
      </>
   )
}

export { InfoPage }
