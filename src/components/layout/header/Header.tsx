import { Avatar, Button, HStack, Icon } from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import { AiOutlineUser, AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai'
import { BiMenuAltLeft } from 'react-icons/bi'

import c from './header.module.scss'
import { useMatchMedia } from '../../../customHooks/useMatchMedia'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../store/redux/storeTypes'
import { AuthAC } from '../../../store/redux/auth/authReducer'
import { LuLogOut, LuLogIn } from 'react-icons/lu'
import React from 'react'
import { logoIcon } from '../../reusableElements/logoIcon'

type PropsType = {
   sidebarHandler: () => void
}
const Header: React.FC<PropsType> = ({ sidebarHandler }) => {
   const isLess992 = useMatchMedia().less992

   const { login, avatar, isAuth, isInProgressLogOut } = useSelector((state: GlobalStateType) => state.forAuthData)
   const { errOnCheckAuth, errOnLogOut } = useSelector((state: GlobalStateType) => state.forErrorsData.authErrors)

   const dispatch = useDispatch()

   const logOutHandler = () => dispatch(AuthAC.signOut())

   React.useEffect(() => {
      if (errOnLogOut) alert(errOnLogOut)
   }, [errOnLogOut])

   return (
      <header className={`${c.header} header`}>
         {/* <div className={`header__container`}> */}
         <HStack align='center' justify='space-between' style={{ height: '100%' }}>
            {isLess992 && (
               <div className={c.burgerIcon} onClick={sidebarHandler}>
                  <Icon as={BiMenuAltLeft} fontSize='4.0rem' />
               </div>
            )}

            <Link to='/' className={c.logoWr}>
               <Icon as={logoIcon} />
            </Link>

            <div className={c.rightPartHeader}>
               {isAuth ? (
                  <>
                     <Link to='/profile' className={c.avatarWr}>
                        <Avatar className={c.avatarHeader} size='md' name={login || ''} src={avatar || ''} icon={<AiOutlineUser fontSize='2.5rem' />} />
                        <span className={c.nickName}>{login}</span>
                     </Link>
                     <Button rightIcon={<LuLogOut fontSize='1.5rem' />} variant='solid' className={c.logoutBtn} onClick={logOutHandler} isLoading={isInProgressLogOut}>
                        Sign out
                     </Button>
                  </>
               ) : (
                  <div className={c.loginBtnWr}>
                     <Link to='/login' className={c.loginBtn}>
                        <span>Login</span>
                        <Icon as={LuLogIn} />
                     </Link>
                     {errOnCheckAuth && <p className={c.errOnCheckAuth}>{errOnCheckAuth}</p>}
                  </div>
               )}
            </div>
         </HStack>
         {/* </div> */}
      </header>
   )
}

export { Header }
