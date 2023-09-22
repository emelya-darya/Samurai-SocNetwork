// import { FiSun } from 'react-icons/fi'
import React from 'react'
// import { GrSystem } from 'react-icons/gr'
import { MdOutlineDarkMode, MdOutlineSettingsBrightness, MdOutlineWbSunny } from 'react-icons/md'
import c from './settings.module.scss'

// const themesPostfix = {
//     light: 'light-th',
//     dark: 'dark-th',
// }

// const cssVarsNames = ['sidebar-header-clr', 'boxsh-val', 'boxsh-val-small', 'boxsh-for-message', 'text-clr', 'main-bg-clr']
const Settings = () => {
    // const [theme, setTheme] = React.useState<'light-th' | 'dark-th'>('light-th')

    // const toggleThemeHandler = () => {
    //    setTheme(theme === 'light-th' ? 'dark-th' : 'light-th')
    // }

    // React.useEffect(() => {
    //    for (let i = 0; i < cssVarsNames.length; i++) {
    //       document.body.style.setProperty(`--${cssVarsNames[i]}`, `var(--${cssVarsNames[i]}-${theme})`)
    //    }
    // }, [theme])

    const [theme, setTheme] = React.useState<'dark' | 'light' | 'system'>('light')
    return (
        <>
            <h1 className={c.title}>Settinnggggs</h1>
            <div className={c.themeToggleBlock}>
                <p className={c.subt}>Theme:</p>
                <div className={c.themesVariantsBtnGroup}>
                    <button
                        type='button'
                        className={`${c.buttonTh} ${c.light} ${theme === 'light' ? c.active : ''}`}
                        onClick={() => {
                            setTheme('light')
                        }}>
                        <MdOutlineWbSunny />
                        <span>Light</span>
                    </button>
                    <button
                        type='button'
                        className={`${c.buttonTh} ${c.system} ${theme === 'system' ? c.active : ''}`}
                        onClick={() => {
                            setTheme('system')
                        }}>
                        <MdOutlineSettingsBrightness />
                        <span>System</span>
                    </button>
                    <button
                        type='button'
                        className={`${c.buttonTh} ${c.dark} ${theme === 'dark' ? c.active : ''}`}
                        onClick={() => {
                            setTheme('dark')
                        }}>
                        <MdOutlineDarkMode />
                        <span>Dark</span>
                    </button>
                </div>
            </div>
            {/* <button type='button' onClick={toggleThemeHandler}>
            Toggle theme({theme})
         </button> */}
        </>
    )
}

export { Settings }
