import { Link } from 'react-router-dom'
import c from './userAvatarWithLink.module.scss'

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

type UserAvatarWithLinkPropsType = {
    id: number | ''
    photo: string | null
    name: string
    bgColor: string
    type?: 'div'
    onClickHandler?: () => void
    extraClassName?: string
}

const UserAvatarWithLink: React.FC<UserAvatarWithLinkPropsType> = ({ id, photo, name, bgColor, onClickHandler, type, extraClassName }) => {
    if (type === 'div' && photo) {
        return (
            <div className={`${c.subAvatarWPhoto} ${extraClassName || ''}`} title={name || ''} style={{ backgroundColor: bgColor }}>
                <img src={photo} alt={name || ''} />
            </div>
        )
    } else if (type === 'div' && !photo) {
        return (
            <div className={`${c.subAvatarWLett} ${extraClassName || ''}`} title={name || ''} style={{ backgroundColor: bgColor }}>
                <span>{getInitialsForAvatar(name)}</span>
            </div>
        )
    } else if (photo) {
        return (
            <Link
                to={'/profile/' + id}
                className={`${c.subAvatarWPhoto} ${extraClassName || ''}`}
                onClick={onClickHandler ? onClickHandler : () => null}
                title={name || ''}
                style={{ backgroundColor: bgColor }}>
                <img src={photo} alt={name || ''} />
            </Link>
        )
    } else {
        return (
            <Link
                to={'/profile/' + id}
                className={`${c.subAvatarWLett} ${extraClassName || ''}`}
                onClick={onClickHandler ? onClickHandler : () => null}
                title={name || ''}
                style={{ backgroundColor: bgColor }}>
                <span>{getInitialsForAvatar(name)}</span>
            </Link>
        )
    }
}

export { UserAvatarWithLink }
