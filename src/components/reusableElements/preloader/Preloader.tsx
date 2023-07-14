import load4 from '../../../assets/images/load4.svg'
import c from './preloader.module.scss'

import { SvgPreloaderImg } from './SvgPreloaderImg'

type PreloaderPropsType = {
   color: string
   size: number
   minHeight: string
}
const Preloader: React.FC<PreloaderPropsType> = ({color, size, minHeight}) => {
   return (
      <div className={c.preloaderBlock} style={{minHeight: minHeight}}>
         <div className={c.svgWr} style={{
            width: `${size}px`,
            height: `${size}px`,
         }}>
            <SvgPreloaderImg color={color} />
         </div>
      </div>
   )
}

export { Preloader }
