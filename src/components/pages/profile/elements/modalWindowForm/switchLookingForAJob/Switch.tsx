import c from './switch.module.scss'
import React from 'react'

const Switch: React.FC<{ isSelected: boolean }> = ({ isSelected }) => {
   return (
      <span className={`${c.switchComponent} ${isSelected ? c.selected : ''}`}>
         <span className={c.switchThumb}></span>
      </span>
   )
}
export { Switch }
