import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ProfilePage } from './components/pages/profile/Profile'
import { DialogsPage } from './components/pages/dialogs/Dialogs'
import { ContactsPage } from './components/pages/contacts/Contacts'
import { UsersPage } from './components/pages/users/Users'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from './store/redux/storeTypes'
import { UsersAC } from './store/redux/users/usersReducer'
import { FriendsPage } from './components/pages/friends/Friends'
import { FriendsNavbarAC } from './store/redux/friendsNavbar/friendsNavbarReducer'
import { FriendsAC } from './store/redux/friends/friendsReducer'

const App = function () {
   const { searchRequest: searchReqUsers, currentPage: usersActPage } = useSelector((state: GlobalStateType) => state.forUsersData)
   const { searchRequest: searchReqFriends, currentPage: friendsActPage } = useSelector((state: GlobalStateType) => state.forFriendsPageData)

   const dispatch = useDispatch()

   const setActiveUsersPageFromLC = (pageNum: number) => dispatch(UsersAC.setActivePageFromLC_AC(pageNum))
   const setUsersSearchRequestFromLC = (searchRequest: string) => dispatch(UsersAC.setSearchRequestFromLC_AC(searchRequest))

   const setActiveFriendsPageFromLC = (pageNum: number) => dispatch(FriendsAC.setActivePageFromLC(pageNum))
   const setFriendsSearchRequestFromLC = (searchRequest: string) => dispatch(FriendsAC.setSearchRequestFromLC(searchRequest))

   React.useEffect(() => {
      const usersPageFromLC = localStorage.getItem('usersPage')
      const usersSearchRequestFromLC = localStorage.getItem('usersSearchRequest')

      const friendsPageFromLC = localStorage.getItem('friendsPage')
      const friendsSearchRequestFromLC = localStorage.getItem('friendsSearchRequest')

      setActiveUsersPageFromLC(+(usersPageFromLC || 1))
      setUsersSearchRequestFromLC(usersSearchRequestFromLC || '')

      setActiveFriendsPageFromLC(+(friendsPageFromLC || 1))
      setFriendsSearchRequestFromLC(friendsSearchRequestFromLC || '')
   }, [])

   window.onbeforeunload = function () {
      localStorage.setItem('usersPage', String(usersActPage || 1))
      localStorage.setItem('usersSearchRequest', searchReqUsers || '')

      localStorage.setItem('friendsPage', String(friendsActPage || 1))
      localStorage.setItem('friendsSearchRequest', searchReqFriends || '')
   }

   React.useEffect(() => {
      dispatch(FriendsNavbarAC.getNavbarFriends())
   }, [])

   return (
      <>
         <Routes>
            <Route path='/' element={<Layout />}>
               <Route index element={<ProfilePage />} />
               <Route path='/profile/:userId?' element={<ProfilePage />} />
               <Route path='/users' element={<UsersPage />} />
               <Route path='/subs' element={<FriendsPage />} />
               <Route path='/dialogs' element={<DialogsPage />} />
               <Route path='/contacts' element={<ContactsPage />} />
               <Route path='*' element={<Navigate to='/profile' replace={true} />} />
            </Route>
         </Routes>
      </>
   )
}

export default App