import c from './preloader.module.scss'
import { SvgPreloaderImg } from './SvgPreloaderImg'

type PreloaderSmallPropsType = {
   color: string
   size: number
   minHeight: string
   text?: string
}
const PreloaderSmall: React.FC<PreloaderSmallPropsType> = ({ color, size, minHeight, text }) => {
   return (
      <div className={c.preloaderBlock} style={{ minHeight: minHeight }}>
         <div
            className={c.svgWr}
            style={{
               width: `${size}px`,
               height: `${size}px`,
            }}>
            <SvgPreloaderImg color={color} />
         </div>
         {text ? <span style={{color: color}}>{text}</span> : <></>}
      </div>
   )
}

export { PreloaderSmall }
