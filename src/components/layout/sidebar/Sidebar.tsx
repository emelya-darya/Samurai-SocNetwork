import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import shortid from 'shortid'
import { BsArrowRight } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { FiSettings } from 'react-icons/fi'
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
        const str = String(totalFriendsCount - 4)
        const lett = str.length <= 3 ? str : str.slice(0, 2) + '...'
        subsBlockItems[4] = (
            <div className={c.restSubsCountBlock} key={shortid.generate()}>
                <span>+{lett}</span>
            </div>
        )
    }

    // перевод
    const { t } = useTranslation()

    return (
        <aside className={`${c.sidebar} ${isSidebarHidden ? c.hide : ''}`}>
            <div className={c.linksContainer}>
                <NavLink
                    to='/profile'
                    onClick={sidebarHandler}
                    className={currPathName === '/' || currPathName.match(/\/profile\/?/) ? c.act : c.navbar__link}>
                    <span>{t('sidebar.profileLink')}</span>
                </NavLink>
                <NavLink
                    to='/dialogs'
                    onClick={sidebarHandler}
                    className={`${currPathName.startsWith('/dialogs') ? c.act : c.navbar__link} ${c.linkToDialogs}`}>
                    <span>{t('sidebar.dialogsLink')}</span>
                    <NewMessagesNotify />
                </NavLink>
                <NavLink to='/common-chat' onClick={sidebarHandler} className={currPathName === '/common-chat' ? c.act : c.navbar__link}>
                    <span>{t('sidebar.chatLink')}</span>
                </NavLink>

                <NavLink
                    to={pathToUsersWithQueryParams}
                    onClick={sidebarHandler}
                    className={currPathName === '/users' ? c.act : c.navbar__link}>
                    <span>{t('sidebar.usersLink')}</span>
                </NavLink>
                <NavLink to='/info' onClick={sidebarHandler} className={currPathName === '/info' ? c.act : c.navbar__link}>
                    <span>{t('sidebar.infoLink')}</span>
                </NavLink>
            </div>
            <div className={c.subsBlock}>
                {isAuth ? (
                    <>
                        <p className={c.lett}>
                            {t('sidebar.subsLett')} ({totalFriendsCount})
                        </p>
                        <div className={c.subsAvatars}>
                            {navbarFriendsErr ? <p className={c.serverErrMessage}>{navbarFriendsErr}</p> : subsBlockItems}
                        </div>
                        {totalFriendsCount ? (
                            <Link to={pathToFriendsWithQueryParams} className={c.watchAll} onClick={sidebarHandler}>
                                <span>{t('sidebar.watchAll')}</span> <BsArrowRight />
                            </Link>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <p className={c.lett}>{t('sidebar.loginToSee')}</p>
                )}
            </div>

            <div className={c.linkToSettingsWr}>
                <NavLink
                    to='/settings'
                    onClick={sidebarHandler}
                    className={`${currPathName.startsWith('/settings') ? c.act : ''} ${c.settingsLink}`}>
                    <FiSettings />
                </NavLink>
            </div>
        </aside>
    )
}

export { Sidebar }
