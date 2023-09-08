import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import c from './sidebar.module.scss'
import { VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../store/redux/reduxStore'
import { BsArrowRight } from 'react-icons/bs'
import shortid from 'shortid'
import { UserAvatarWithLink } from '../../reusableElements/userAvatarWithLink/UserAvatarWithLink'
import { colorsAvatars, shuffleArray } from '../../reusableElements/userAvatarWithLink/colorsAvatars'
import { DialogsAC } from '../../../store/redux/dialogs/dialogsReducer'

type PropsForViewType = {
   isSidebarHidden: boolean
   sidebarHandler: () => void
}

const colors = [...colorsAvatars]

const Sidebar: React.FC<PropsForViewType> = ({ isSidebarHidden, sidebarHandler }) => {
   const { searchRequestFromLC, activePageFromLC, searchRequest, currentPage } = useSelector((state: GlobalStateType) => state.forUsersData)
   const pathToUsersWithQueryParams = `/users?search=${searchRequest || searchRequestFromLC}&page=${currentPage || activePageFromLC}`

   const {
      searchRequestFromLC: friendsSearchRequestFromLC,
      activePageFromLC: friendsActivePageFromLC,
      searchRequest: friendsSearchRequest,
      currentPage: friendsCurrentPage,
   } = useSelector((state: GlobalStateType) => state.forFriendsPageData)
   const pathToFriendsWithQueryParams = `/subs?search=${friendsSearchRequest || friendsSearchRequestFromLC}&page=${
      friendsCurrentPage || friendsActivePageFromLC
   }`

   const currPathName = useLocation().pathname

   const { totalFriendsCount, friendsNavbar } = useSelector((state: GlobalStateType) => state.forFriendsNavbarData)
   const navbarFriendsErr = useSelector((state: GlobalStateType) => state.forErrorsData.navbarFriendsErr)

   React.useEffect(() => shuffleArray(colors), [])

   const subsBlockItems = friendsNavbar.map((fr, i) => {
      return (
         <div className={c.subItemWr} key={shortid.generate()}>
            <UserAvatarWithLink
               id={fr.id}
               photo={fr.photos.small}
               name={fr.name || ''}
               bgColor={colors[i]}
               onClickHandler={sidebarHandler}
            />
         </div>
      )
   })

   const { isAuth } = useSelector((state: GlobalStateType) => state.forAuthData)

   if (totalFriendsCount > 5) {
      subsBlockItems[4] = (
         <div className={c.restSubsCountBlock} key={shortid.generate()}>
            <span>+{totalFriendsCount - 4}</span>
         </div>
      )
   }

   const newMessagesCount = useSelector((state: GlobalStateType) => state.forDialogsData.newMessagesCount)
   const newMessagesCountFormatted = String(newMessagesCount).length > 2 ? String(newMessagesCount)[0] + '..' : String(newMessagesCount)

   React.useEffect(() => {
      dispatch(DialogsAC.getNewMessagesCount())
   }, [])

   const dispatch = useDispatch()
   setInterval(() => {
      dispatch(DialogsAC.getNewMessagesCount())
   }, 10000)

   return (
      <aside className={`${c.sidebar} ${isSidebarHidden ? c.hide : ''}`}>
         <VStack className={c.linksContainer}>
            <NavLink
               to='/profile'
               onClick={sidebarHandler}
               className={currPathName === '/' || currPathName.match(/\/profile\/?/) ? c.act : c.navbar__link}>
               <span>Profile</span>
            </NavLink>
            <NavLink
               to='/dialogs'
               onClick={sidebarHandler}
               className={`${currPathName === '/dialogs' ? c.act : c.navbar__link} ${c.linkToDialogs}`}>
               <span>Dialogs</span>
               {newMessagesCount ? (
                  <div className={c.newMessagesNotify}>
                     <span>{newMessagesCountFormatted}</span>
                  </div>
               ) : (
                  <></>
               )}
            </NavLink>
            <NavLink to='/common-chat' onClick={sidebarHandler} className={currPathName === '/common-chat' ? c.act : c.navbar__link}>
               <span>Common chat</span>
            </NavLink>

            <NavLink
               to={pathToUsersWithQueryParams}
               onClick={sidebarHandler}
               className={currPathName === '/users' ? c.act : c.navbar__link}>
               <span>Users</span>
            </NavLink>
            <NavLink to='/info' onClick={sidebarHandler} className={currPathName === '/info' ? c.act : c.navbar__link}>
               <span>App info</span>
            </NavLink>
         </VStack>
         <div className={c.subsBlock}>
            {isAuth ? (
               <>
                  <p className={c.lett}>Your subs ({totalFriendsCount})</p>
                  <div className={c.subsAvatars}>
                     {navbarFriendsErr ? <p className={c.serverErrMessage}>{navbarFriendsErr}</p> : subsBlockItems}
                  </div>
                  {totalFriendsCount ? (
                     <Link to={pathToFriendsWithQueryParams} className={c.watchAll} onClick={sidebarHandler}>
                        <span>Watch all</span> <BsArrowRight />
                     </Link>
                  ) : (
                     <></>
                  )}
               </>
            ) : (
               <p className={c.lett}>Login to see subs list</p>
            )}
         </div>
      </aside>
   )
}

export { Sidebar }
