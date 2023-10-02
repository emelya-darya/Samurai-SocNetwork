import { useTranslation } from 'react-i18next'
import { ColorThemeBlock } from './elements/colorThemeBlock/ColorThemeBlock'
import { LanguagesBlock } from './elements/lngsBlock/LanguagesBlock'
import c from './settings.module.scss'

const Settings = () => {
    const {t } = useTranslation()
    return (
        <>
            <h1 className={c.title}>{t('settings.title')}</h1>
            <ColorThemeBlock />
            <LanguagesBlock />
        </>
    )
}

export { Settings }
