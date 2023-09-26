import { ColorThemeBlock } from './elements/colorThemeBlock/ColorThemeBlock'
import c from './settings.module.scss'

const Settings = () => {
    return (
        <>
            <h1 className={c.title}>Settings</h1>
            <ColorThemeBlock />
        </>
    )
}

export { Settings }
