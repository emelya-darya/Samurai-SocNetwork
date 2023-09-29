import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DialogsListItemType } from '../../../../../store/redux/storeTypes'
import { parseDateStr } from '../../../../reusableElements/parseDate'
import { UserAvatarWithLink } from '../../../../reusableElements/userAvatarWithLink/UserAvatarWithLink'
import c from './dialogItem.module.scss'

type DialogItemPropsType = DialogsListItemType & {
    colorAvatar?: string
}

const DialogItem: React.FC<DialogItemPropsType> = ({
    id,
    userName,
    hasNewMessages,
    lastDialogActivityDate,
    lastUserActivityDate,
    newMessagesCount,
    photos,
    colorAvatar,
}) => {
    const newMessagesCountStr = String(newMessagesCount).length > 2 ? String(newMessagesCount)[0] + '..' : String(newMessagesCount)

    const colorAva = colorAvatar || '#F0772B'

    // перевод
    const { t, i18n } = useTranslation()

    const parsedDateDialogActivity = parseDateStr(lastDialogActivityDate, i18n.language)
    const parsedDateUserActivity = parseDateStr(lastUserActivityDate, i18n.language)

    return (
        <Link
            className={`${c.dialogItem} ${hasNewMessages ? c.withNewMessages : ''}`}
            to={`/dialogs/${id}`}
            state={{ colorAvatar: colorAva }}>
            <div className={c.avatarNick}>
                <div className={c.avatarWr}>
                    <UserAvatarWithLink id={id} photo={photos.small} name={userName} type='div' bgColor={colorAva} />
                </div>
                <div className={c.textPart}>
                    <div className={c.name}>{userName}</div>
                    <div className={c.lastSeen}>
                        {t('dialogsList.ls')}: {parsedDateUserActivity}
                    </div>
                </div>
            </div>

            <div className={c.date}>{parsedDateDialogActivity}</div>

            {hasNewMessages && (
                <div className={c.newMessagesCount}>
                    <span>{newMessagesCountStr}</span>
                </div>
            )}
        </Link>
    )
}

export { DialogItem }
