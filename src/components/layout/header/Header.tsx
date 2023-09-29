import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LuLogOut, LuLogIn } from 'react-icons/lu'
import { BiMenuAltLeft } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'
import { useMatchMedia } from '../../../customHooks/useMatchMedia'
import { GlobalStateType } from '../../../store/redux/storeTypes'
import { AuthAC } from '../../../store/redux/auth/authReducer'
import { logoIcon } from '../../reusableElements/logoIcon'
import { Button } from '../../reusableElements/button/Button'
import { UserAvatarWithLink } from '../../reusableElements/userAvatarWithLink/UserAvatarWithLink'
import { accentMainClr } from '../../reusableElements/getCssVariableColor'
import c from './header.module.scss'

type PropsType = {
    sidebarHandler: () => void
}
const Header: React.FC<PropsType> = ({ sidebarHandler }) => {
    const isLess992 = useMatchMedia().less992

    const { login, avatar, isAuth, isInProgressLogOut } = useSelector((state: GlobalStateType) => state.forAuthData)
    const { errOnCheckAuth, errOnLogOut } = useSelector((state: GlobalStateType) => state.forErrorsData.authErrors)

    const dispatch = useDispatch()

    const logOutHandler = () => dispatch(AuthAC.signOut())

    // React.useEffect(() => {
    //    if (errOnLogOut) alert(errOnLogOut)
    // }, [errOnLogOut])

    const location = useLocation()

    const isLess576 = useMatchMedia().less576

    // перевод
    const { t } = useTranslation()

    return (
        <header className={`${c.header} header`}>
            {/* <div className={`header__container`}> */}
            <div className={c.headerInner}>
                {isLess992 && (
                    <div className={c.burgerIcon} onClick={sidebarHandler}>
                        <BiMenuAltLeft />
                    </div>
                )}

                <Link to='/' className={c.logoWr}>
                    {logoIcon}
                </Link>

                <div className={c.rightPartHeader}>
                    {isAuth ? (
                        <>
                            <Link to='/profile' className={c.avatarWr}>
                                <UserAvatarWithLink
                                    id=''
                                    photo={avatar}
                                    name={login || ''}
                                    bgColor={accentMainClr}
                                    type='div'
                                    extraClassName={c.avatarHeader}
                                />

                                <span className={c.nickName}>{login}</span>
                                <p className={c.errOnSignOut}>{errOnLogOut}</p>
                            </Link>

                            <Button
                                type='button'
                                Icon={LuLogOut}
                                name={t('header.logout')}
                                isDisabled={false}
                                isLoading={isInProgressLogOut}
                                extraClassName={c.logoutBtn}
                                onClickHandler={logOutHandler}
                            />
                        </>
                    ) : (
                        <div className={c.loginBtnWr}>
                            {/* <Link to='/login' className={c.loginBtn}>
                        <span>Login</span>
                        <LuLogIn />
                     </Link> */}
                            <Button
                                tag='link'
                                linkPath='/login'
                                name={isLess576 ? null : t('header.login')}
                                Icon={LuLogIn}
                                extraClassName={`${c.loginBtn} ${location.pathname === '/login' ? c.disabled : ''}`}
                                isLoading={false}
                                isDisabled={location.pathname === '/login'}
                                type='button'
                            />
                            {errOnCheckAuth && <p className={c.errOnCheckAuth}>{errOnCheckAuth}</p>}
                        </div>
                    )}
                </div>
            </div>
            {/* </div> */}
        </header>
    )
}

export { Header }
