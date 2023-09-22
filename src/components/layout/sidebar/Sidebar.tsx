import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import shortid from 'shortid'
import { BsArrowRight } from 'react-icons/bs'
// import { FiSettings } from 'react-icons/fi'
import { GlobalStateType } from '../../../store/redux/reduxStore'
import { UserAvatarWithLink } from '../../reusableElements/userAvatarWithLink/UserAvatarWithLink'
import { colorsAvatars, shuffleArray } from '../../reusableElements/userAvatarWithLink/colorsAvatars'
import { NewMessagesNotify } from './elements/NewMessagesNotify'
import c from './sidebar.module.scss'

type PropsForViewType = {
    isSidebarHidden: boolean
    sidebarHandler: () => void
}

const colors = [...colorsAvatars]

const Sidebar: React.FC<PropsForViewType> = ({ isSidebarHidden, sidebarHandler }) => {
    const { searchRequestFromLC, activePageFromLC, searchRequest, currentPage } = useSelector(
        (state: GlobalStateType) => state.forUsersData,
    )
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

    const isAuth = useSelector((state: GlobalStateType) => state.forAuthData.isAuth)

    if (totalFriendsCount > 5) {
        // const totalFriendsCount = 878686666
        const str = String(totalFriendsCount - 4)
        const lett = str.length <= 3 ? str : str.slice(0, 2) + '...'
        subsBlockItems[4] = (
            <div className={c.restSubsCountBlock} key={shortid.generate()}>
                <span>+{lett}</span>
            </div>
        )
    }

    //*-----------------------------------------------------------------------------

    const cssVarsNames = [
        'sidebar-header-clr',
        'main-bg-clr',
        'body-bg',
        'text-clr',
        'accent-clr_main',
        'accent-clr_sec',
        'err-clr',
        'small-scrollbar-clr',
        'boxsh-val',
        'boxsh-val-small',
        'boxsh-for-message',
        'my-msg-clr',
        'my_msg-date-viewed-clr',
        'companion-msg-clr',
        'delete-msg-icon-clr',
        'mask-for-restore-msg-bg',
        'sign-out-btn-bg',
        'restore-fr-mask-clr',
    ]

    const [theme, setTheme] = React.useState<'light-th' | 'dark-th'>('light-th')

    const toggleThemeHandler = () => {
        setTheme(theme === 'light-th' ? 'dark-th' : 'light-th')
    }

    React.useEffect(() => {
        for (let i = 0; i < cssVarsNames.length; i++) {
            document.body.style.setProperty(`--${cssVarsNames[i]}`, `var(--${cssVarsNames[i]}-${theme})`)
        }
    }, [theme])

    //*-----------------------------------------------------------------------------

    return (
        <aside className={`${c.sidebar} ${isSidebarHidden ? c.hide : ''}`}>
            <div className={c.linksContainer}>
                <NavLink
                    to='/profile'
                    onClick={sidebarHandler}
                    className={currPathName === '/' || currPathName.match(/\/profile\/?/) ? c.act : c.navbar__link}>
                    <span>Profile</span>
                </NavLink>
                <NavLink
                    to='/dialogs'
                    onClick={sidebarHandler}
                    className={`${currPathName.startsWith('/dialogs') ? c.act : c.navbar__link} ${c.linkToDialogs}`}>
                    <span>Dialogs</span>
                    <NewMessagesNotify />
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
            </div>
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

            <div className={c.linkToSettingsWr}>
                {/* <Link to='/settings'>
                    <FiSettings />
                    
                </Link> */}
                <button type='button' onClick={toggleThemeHandler}>
                    Theme({theme})
                </button>
            </div>
        </aside>
    )
}

export { Sidebar }
