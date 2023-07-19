import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import c from './sidebar.module.scss'
import { VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../store/redux/reduxStore'
import { BsArrowRight } from 'react-icons/bs'
import { FriendAvatarNavbar } from './FriendNavbarAvatar'
import shortid from 'shortid'

type PropsForViewType = {
   isSidebarHidden: boolean
   sidebarHandler: () => void
}

const colors = ['#38A169', '#F0772B', '#38B2AC', '#3182CE', '#00A3C4', '#805AD5']

const shuffle = function (array: Array<any>) {
   array.sort(() => Math.random() - 0.5)
}

const Sidebar: React.FC<PropsForViewType> = ({ isSidebarHidden, sidebarHandler }) => {
   const { searchRequestFromLC, activePageFromLC, searchRequest, currentPage } = useSelector((state: GlobalStateType) => state.forUsersData)
   const pathToUsersWithQueryParams = `/users?search=${searchRequest || searchRequestFromLC}&page=${currentPage || activePageFromLC}`

   const {
      searchRequestFromLC: friendsSearchRequestFromLC,
      activePageFromLC: friendsActivePageFromLC,
      searchRequest: friendsSearchRequest,
      currentPage: friendsCurrentPage,
   } = useSelector((state: GlobalStateType) => state.forFriendsPageData)
   const pathToFriendsWithQueryParams = `/subs?search=${friendsSearchRequest || friendsSearchRequestFromLC}&page=${friendsCurrentPage || friendsActivePageFromLC}`

   const currPathName = useLocation().pathname

   const { totalFriendsCount, friendsNavbar } = useSelector((state: GlobalStateType) => state.forFriendsNavbarData)
   const navbarFriendsErr = useSelector((state: GlobalStateType) => state.forErrorsData.navbarFriendsErr)

   React.useEffect(() => shuffle(colors), [])

   const subsBlockItems = friendsNavbar.map((fr, i) => <FriendAvatarNavbar key={shortid.generate()} {...fr} closeSidebarHandler={sidebarHandler} bgColor={colors[i]} />)

   const { isAuth } = useSelector((state: GlobalStateType) => state.forAuthData)

   if (totalFriendsCount > 5) {
      subsBlockItems[4] = (
         <div className={c.subAvatarWLett} key={shortid.generate()}>
            <span>+{totalFriendsCount - 4}</span>
         </div>
      )
   }

   return (
      <aside className={`${c.sidebar} ${isSidebarHidden ? c.hide : ''}`}>
         <VStack className={c.linksContainer}>
            <NavLink to='/profile' onClick={sidebarHandler} className={currPathName === '/' || currPathName.match(/\/profile\/?/) ? c.act : c.navbar__link}>
               <span>Profile</span>
            </NavLink>
            <NavLink to='/dialogs' onClick={sidebarHandler} className={currPathName === '/dialogs' ? c.act : c.navbar__link}>
               <span>Dialogs</span>
            </NavLink>
            <NavLink to='/info' onClick={sidebarHandler} className={currPathName === '/info' ? c.act : c.navbar__link}>
               <span>Info</span>
            </NavLink>
            <NavLink to={pathToUsersWithQueryParams} onClick={sidebarHandler} className={currPathName === '/users' ? c.act : c.navbar__link}>
               <span>Users</span>
            </NavLink>
         </VStack>
         <div className={c.subsBlock}>
            {isAuth ? (
               <>
                  <p className={c.lett}>Your subs ({totalFriendsCount})</p>
                  <div className={c.subsAvatars}>{navbarFriendsErr ? <p className={c.serverErrMessage}>{navbarFriendsErr}</p> : subsBlockItems}</div>
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
