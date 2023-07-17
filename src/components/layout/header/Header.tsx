import { Avatar, Button, HStack, Icon } from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import { GiMeshBall, GiMeshNetwork, GiMeltingIceCube, GiRadialBalance, GiCompass, GiMoebiusTriangle, GiPoolTriangle, GiMoebiusTrefoil, GiMoebiusStar, GiTriangleTarget } from 'react-icons/gi'
import { FaConnectdevelop } from 'react-icons/fa'
import { AiOutlineUser, AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai'
import { BiMenuAltLeft } from 'react-icons/bi'

import c from './header.module.scss'
import { useMatchMedia } from '../../../customHooks/useMatchMedia'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../store/redux/storeTypes'
import { AuthAC } from '../../../store/redux/auth/authReducer'
import { LuLogOut,LuLogIn } from 'react-icons/lu'
// SiGnusocial

type PropsType = {
   sidebarHandler: () => void
}
const Header: React.FC<PropsType> = ({ sidebarHandler }) => {
   const isLess992 = useMatchMedia().less992

   const { login, avatar, isAuth } = useSelector((state: GlobalStateType) => state.forAuthData)
   const { errOnCheckAuth } = useSelector((state: GlobalStateType) => state.forErrorsData.authErrors)

   const dispatch = useDispatch()

   const logOutHandler = () => dispatch(AuthAC.logOut())

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
               <Icon as={FaConnectdevelop} />
            </Link>
            <div className={c.rightPartHeader}>
               {isAuth ? (
                  <>
                     <Link to='/profile' className={c.avatarWr}>
                        <Avatar className={c.avatarHeader} size='md' name={login || ''} src={avatar || ''} icon={<AiOutlineUser fontSize='2.5rem' />} />
                        <span className={c.nickName}>{login}</span>
                     </Link>
                     <Button rightIcon={<LuLogOut fontSize='1.5rem' />} variant='solid' className={c.logoutBtn} onClick={logOutHandler}>
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
