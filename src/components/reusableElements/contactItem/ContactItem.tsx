import { IconType } from 'react-icons'
import { useMatchMedia } from '../../../customHooks/useMatchMedia'
import c from './contactItem.module.scss'

type ContactItemPropsType = {
    linkHref: string | null
    name: string
    Icon: IconType | string | JSX.Element
    extraClassName?: string
}

const cutText = function (text: string, maxLength: number) {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + '...'
}
const ContactItem: React.FC<ContactItemPropsType> = ({ linkHref, name, Icon, extraClassName }) => {
    const matchesObj = useMatchMedia()
    linkHref = linkHref?.trim() || null

    if (!linkHref) return <></>

    let correctedLink = linkHref
    if (!linkHref.match(/^https?:\/\//)) correctedLink = 'https://' + linkHref

    let parsedIcon: IconType | JSX.Element

    if (typeof Icon === 'string') parsedIcon = <img src={Icon} alt='' />
    else if (typeof Icon === 'function') parsedIcon = <Icon />
    else parsedIcon = Icon

    return (
        <a
            href={correctedLink}
            rel='norefferer noreferrer'
            className={`${c.contactItem} ${extraClassName || ''}`}
            target='_blank'
            title={name}>
            <div className={c.iconWr}>{parsedIcon}</div>
            <div className={c.textLink}>
                <span className={c.nameLink}>{name}: </span>
                <span>{cutText(linkHref, matchesObj.less576 ? 35 : 50)}</span>
            </div>
        </a>
    )
}

export { ContactItem }
