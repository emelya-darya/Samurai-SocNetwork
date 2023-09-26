import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Layout } from './components/layout/Layout'
import { ProfilePage } from './components/pages/profile/Profile'
import { CommonChatPage } from './components/pages/commonChat/CommonChat'
import { InfoPage } from './components/pages/info/InfoPage'
import { UsersPage } from './components/pages/users/Users'
import { GlobalStateType } from './store/redux/storeTypes'
import { UsersAC } from './store/redux/users/usersReducer'
import { FriendsPage } from './components/pages/friends/Friends'
import { FriendsNavbarAC } from './store/redux/friendsNavbar/friendsNavbarReducer'
import { FriendsAC } from './store/redux/friends/friendsReducer'
import { AuthAC } from './store/redux/auth/authReducer'
import { PreloaderSmall } from './components/reusableElements/preloaders/small/PreloaderSmall'
import { LoginPage } from './components/pages/login/Login'
import { DialogsPage } from './components/pages/dialogs/Dialogs'
import { Settings } from './components/pages/settings/Settings'
import { sidebarHeaderDarkClr } from './components/reusableElements/getCssVariableColor'
import { AppearanceAC } from './store/redux/appAppearance/appearanceReducer'
// import { accentMainClr } from './components/reusableElements/getCssVariableColor'

//! определение темы при первой загрузке
// const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// if (prefersDarkScheme.matches) {
//   console.log('dark-theme');
// } else {
//   console.log('light-theme');
// }

//! определение темы при первой загрузке

const App = function () {
    const { searchRequest: searchReqUsers, currentPage: usersActPage } = useSelector((state: GlobalStateType) => state.forUsersData)
    const { searchRequest: searchReqFriends, currentPage: friendsActPage } = useSelector(
        (state: GlobalStateType) => state.forFriendsPageData,
    )

    const dispatch = useDispatch()

    //* Работа сo страницами юзеров и друзей ------------------------------------------------------

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

    //* Работа сo страницами юзеров и друзей ------------------------------------------------------

    //* Работа с авторизационными данными ------------------------------------------------------
    React.useEffect(() => {
        dispatch(AuthAC.chechAuth())
    }, [])

    const { isAuth } = useSelector((state: GlobalStateType) => state.forAuthData)
    React.useEffect(() => {
        if (isAuth) {
            dispatch(FriendsNavbarAC.getNavbarFriends())
        }
    }, [isAuth])

    const { isInProgressCheckAuth, isAuthChecking } = useSelector((state: GlobalStateType) => state.forAuthData)

    //* Работа с авторизационными данными ------------------------------------------------------

    //* Работа с темой ------------------------------------------------------

    const { systemTheme, currentTheme } = useSelector((state: GlobalStateType) => state.forAppearanceData)

    React.useEffect(() => {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
        if (prefersDarkScheme.matches) dispatch(AppearanceAC.setSystemTheme('dark'))
        else dispatch(AppearanceAC.setSystemTheme('light'))

        const themeFromLC = localStorage.getItem('theme')?.trim()

        if (themeFromLC === 'light' || themeFromLC === 'dark') dispatch(AppearanceAC.setCurrentTheme(themeFromLC))
        else dispatch(AppearanceAC.setCurrentTheme('system'))
    }, [])

    //* Работа с темой ------------------------------------------------------

    //! Перез закрытием приложения сохраняем в localStorage нужную инфу -----

    window.onbeforeunload = function () {
        localStorage.setItem('usersPage', String(usersActPage || 1))
        localStorage.setItem('usersSearchRequest', searchReqUsers || '')

        localStorage.setItem('friendsPage', String(friendsActPage || 1))
        localStorage.setItem('friendsSearchRequest', searchReqFriends || '')

        localStorage.setItem('theme', currentTheme || 'system')
    }

    if (isInProgressCheckAuth || !isAuthChecking || !systemTheme || !currentTheme)
        return <PreloaderSmall color='#EFEFEF' size={150} minHeight='100vh' bgClr={sidebarHeaderDarkClr} />
    else
        return (
            <>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<ProfilePage />} />
                        <Route path='/profile/:userId?' element={<ProfilePage />} />
                        <Route path='/users' element={<UsersPage />} />
                        <Route path='/subs' element={<FriendsPage />} />
                        <Route path='/common-chat' element={<CommonChatPage />} />
                        <Route path='/dialogs/:userId?' element={<DialogsPage />} />
                        {/* <Route path='/dialogs/*' element={<Outlet />}>
                     <Route index element={<DialogsPage />} />
                     <Route path='common-chat' element={<CommonChatPage />} />
                  </Route> */}
                        <Route path='/info' element={<InfoPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/settings' element={<Settings />} />
                        <Route path='*' element={<Navigate to='/profile' replace={true} />} />
                    </Route>
                </Routes>
            </>
        )
}

export default App
