import { Link } from 'react-router-dom'
import { BsChevronLeft } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { parseDateStr } from '../../../../reusableElements/parseDate'
import { UserAvatarWithLink } from '../../../../reusableElements/userAvatarWithLink/UserAvatarWithLink'
import { accentSecClr } from '../../../../reusableElements/getCssVariableColor'
import c from './companionInfoBlock.module.scss'

type CompanionInfoBlockPropsType = {
    userName: string
    userId: number
    lastUserActivityDate: string
    photo: string | null
    colorAvatar: string | undefined
}

const CompanionInfoBlock: React.FC<CompanionInfoBlockPropsType> = ({ userName, userId, lastUserActivityDate, photo, colorAvatar }) => {
    // перевод
    const { t, i18n } = useTranslation()

    return (
        <div className={c.companionInfo}>
            <div className={c.backBtnWr}>
                <Link to='/dialogs' className={c.backBtn}>
                    <BsChevronLeft />
                    <span>{t('messagesList.backBtn')}</span>
                </Link>
            </div>

            <div className={c.nameLastSeen}>
                <Link to={`/profile/${userId}`} className={c.name}>
                    {userName}
                </Link>
                <p className={c.lastSeen}>
                    {t('messagesList.ls')}: {parseDateStr(lastUserActivityDate, i18n.language)}
                </p>
            </div>
            <div className={c.companionAvatarWr}>
                <UserAvatarWithLink id={userId} photo={photo} name={userName} bgColor={colorAvatar || accentSecClr} />
            </div>
        </div>
    )
}

export { CompanionInfoBlock }
