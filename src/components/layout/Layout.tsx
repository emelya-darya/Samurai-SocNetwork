import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './header/Header'
import c from './layout.module.scss'
import { Sidebar } from './sidebar/Sidebar'
import { useMatchMedia } from '../../customHooks/useMatchMedia'
import { MessagePseudoElem } from '../reusableElements/MessagePseudoElem'

const Layout = () => {
   const isLess992 = useMatchMedia().less992
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
   // сайдбар скрыт если меньше 992 = true   И   isSidebarOpen = false
   const isSidebarHidden = isLess992 && !isSidebarOpen

   const handleOpenCloseSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen)
   }

   return (
      <>
         <Header sidebarHandler={handleOpenCloseSidebar} />
         <main className={`${c.main} main`}>
            <Sidebar
               isSidebarHidden={isSidebarHidden}
               sidebarHandler={() => {
                  setIsSidebarOpen(false)
               }}
            />

            <div className={c.content}>
               <Outlet />
            </div>
         </main>
      </>
   )
}

export { Layout }
