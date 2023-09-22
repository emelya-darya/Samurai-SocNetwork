// import { SiReduxsaga, SiReact, SiTypescript, SiChakraui } from 'react-icons/si'
import shortid from 'shortid'
import { IconType } from 'react-icons'
import { SiCodewars } from 'react-icons/si'
import { AiFillFacebook, AiFillGithub, AiFillYoutube, AiFillLinkedin } from 'react-icons/ai'
import { FaWhatsapp } from 'react-icons/fa'
import { SlSocialVkontakte } from 'react-icons/sl'
import { BiLogoTelegram } from 'react-icons/bi'
// import itIncLogo from '../../../assets/images/infoPage/itincubator.svg'
import hhLogo from '../../../assets/images/infoPage/hh.svg'
import { ContactItem } from '../../reusableElements/contactItem/ContactItem'
import reactLogo from '../../../assets/images/infoPage/createdWith/react.svg'
import reduxSagaLogo from '../../../assets/images/infoPage/createdWith/reduxSaga.svg'
import tsLogo from '../../../assets/images/infoPage/createdWith/typescript.svg'
// import chakraLogo from '../../../assets/images/infoPage/createdWith/chakra.svg'
import c from './infoPage.module.scss'

const itIncLogo = (
    <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M13.9849 26.5504V10.6312H15.6771L24.6355 22.988V10.6312H26.5667V26.5504H24.8378L15.9158 14.1817V26.5504H13.9849Z'
        />
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.7809 4.75836C11.9393 4.75836 12.8786 5.69766 12.8786 6.8561C12.8786 8.01454 11.9393 8.95384 10.7809 8.95384C9.62243 8.95384 8.68311 8.01454 8.68311 6.8561C8.68311 5.69766 9.62243 4.75836 10.7809 4.75836Z'
            // fill='#FF0808'
            className={c.dot}
        />
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M17.9999 0.498319C8.33399 0.498319 0.498319 8.33423 0.498319 18.0001C0.498319 27.6658 8.33399 35.5017 17.9999 35.5017C27.6658 35.5017 35.5017 27.6658 35.5017 18.0001C35.5017 8.33423 27.6658 0.498319 17.9999 0.498319ZM0 18.0001C0 8.05902 8.05877 0 17.9999 0C27.941 0 36 8.05902 36 18.0001C36 27.941 27.941 36 17.9999 36C8.05877 36 0 27.941 0 18.0001Z'
        />
        <path fillRule='evenodd' clipRule='evenodd' d='M9.81934 10.6335H11.7421V26.5402H9.81934V10.6335Z' />
    </svg>
)

type AuthorContactType = {
    name: string
    linkHref: string
    Icon: IconType | string | JSX.Element
}

const backendAuthorLinks: Array<AuthorContactType> = [
    {
        name: 'It-incubator',
        linkHref: 'https://it-incubator.io/',
        Icon: itIncLogo,
    },
    {
        name: 'Youtube',
        linkHref: 'https://www.youtube.com/@ITKAMASUTRA',
        Icon: AiFillYoutube,
    },
    {
        name: 'Linkedin',
        linkHref: 'https://by.linkedin.com/in/kuzyuberdin',
        Icon: AiFillLinkedin,
    },
    {
        name: 'Vkontakte',
        linkHref: 'https://vk.com/d.kuzyuberdin',
        Icon: SlSocialVkontakte,
    },
    {
        name: 'Facebook',
        linkHref: 'https://www.facebook.com/mega.kuzyuberdin/',
        Icon: AiFillFacebook,
    },
]

const frontendAuthorLinks: Array<AuthorContactType> = [
    {
        name: 'Telegram',
        linkHref: 'https://t.me/emelyadarya',
        Icon: BiLogoTelegram,
    },
    {
        name: 'Github',
        linkHref: 'https://github.com/emelya-darya',
        Icon: AiFillGithub,
    },
    {
        name: 'Whatsapp',
        linkHref: 'https://api.whatsapp.com/send/?phone=79874719487&text&type=phone_number&app_absent=0',
        Icon: FaWhatsapp,
    },

    {
        name: 'Headhunter',
        linkHref: 'https://ufa.hh.ru/resume/576d96d9ff09d8bf970039ed1f453262704570',
        Icon: hhLogo,
    },
    {
        name: 'Codewars',
        linkHref: 'https://www.codewars.com/users/emelya-darya',
        Icon: SiCodewars,
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
    // {
    //    name: 'ChakraUI',
    //    logo: chakraLogo,
    // },
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
                    <ContactItem key={shortid.generate()} {...el} extraClassName={el.Icon === itIncLogo ? c.itIncubator : ''} />
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
