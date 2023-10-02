import { useTranslation } from 'react-i18next'
import ru from '../../../../../assets/images/flags/ru.svg'
import en from '../../../../../assets/images/flags/en.svg'
import c from './lngsBlock.module.scss'

const LanguagesBlock = () => {
    //! перевод
    const { i18n, t } = useTranslation()

    const currL = i18n.language
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language)
    }

    return (
        <div className={c.lngToggleBlock}>
            <p className={c.subt}>{t('settings.lng')}:</p>
            <div className={c.languagesVars}>
                <button className={`${c.lngBtn} ${c.btnFirst} ${currL === 'en' ? c.active : ''}`} onClick={() => changeLanguage('en')}>
                    <img src={en} alt='en' />
                </button>
                <button className={`${c.lngBtn} ${c.btnSec} ${currL === 'ru' ? c.active : ''}`} onClick={() => changeLanguage('ru')}>
                    <img src={ru} alt='ru' />
                </button>
            </div>
        </div>
    )
}

export { LanguagesBlock }
