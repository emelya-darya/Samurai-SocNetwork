import { MdOutlineDarkMode, MdOutlineSettingsBrightness, MdOutlineWbSunny } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AppearanceAC } from '../../../../../store/redux/appAppearance/appearanceReducer'
import { GlobalStateType } from '../../../../../store/redux/reduxStore'
import c from './colorThemeBlock.module.scss'

const ColorThemeBlock = () => {
    // const [theme, setTheme] = React.useState<'dark' | 'light' | 'system'>('light')

    const currentTheme = useSelector((state: GlobalStateType) => state.forAppearanceData.currentTheme)

    const dispatch = useDispatch()

    const handleThemeSwitching = (theme: 'dark' | 'light' | 'system') => {
        dispatch(AppearanceAC.setCurrentTheme(theme))
    }

    // перевод
    const { t } = useTranslation()

    return (
        <div className={c.themeToggleBlock}>
            <p className={c.subt}>{t('settings.clrTh')}:</p>
            <div
                className={`${c.themesVariantsBtnGroup} ${
                    currentTheme === 'light' ? c.activeLight : currentTheme === 'dark' ? c.activeDark : c.activeSystem
                }`}>
                <button
                    type='button'
                    className={`${c.buttonTh} ${c.light} ${currentTheme === 'light' ? c.active : ''}`}
                    onClick={() => {
                        handleThemeSwitching('light')
                    }}>
                    <MdOutlineWbSunny />
                    <span>{t('settings.l')}</span>
                </button>
                <button
                    type='button'
                    className={`${c.buttonTh} ${c.system} ${currentTheme === 'system' ? c.active : ''}`}
                    onClick={() => {
                        handleThemeSwitching('system')
                    }}>
                    <MdOutlineSettingsBrightness />
                    <span>{t('settings.s')}</span>
                </button>
                <button
                    type='button'
                    className={`${c.buttonTh} ${c.dark} ${currentTheme === 'dark' ? c.active : ''}`}
                    onClick={() => {
                        handleThemeSwitching('dark')
                    }}>
                    <MdOutlineDarkMode />
                    <span>{t('settings.d')}</span>
                </button>
            </div>
        </div>
    )
}

export { ColorThemeBlock }
