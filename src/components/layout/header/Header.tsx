import { Avatar, Button, HStack, Icon } from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import { GiMeshBall, GiMeshNetwork, GiMeltingIceCube, GiRadialBalance, GiCompass, GiMoebiusTriangle, GiPoolTriangle, GiMoebiusTrefoil, GiMoebiusStar,GiTriangleTarget } from 'react-icons/gi'
import {FaConnectdevelop} from 'react-icons/fa'
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'
import { BiMenuAltLeft } from 'react-icons/bi'

import c from './header.module.scss'
import { useMatchMedia } from '../../../customHooks/useMatchMedia'
// SiGnusocial

type PropsType = {
   sidebarHandler: () => void
}
const Header: React.FC<PropsType> = ({sidebarHandler}) => {
   // console.log(useMatchMedia())
   const isLess992 = useMatchMedia().less992
   return (
      <header className={`${c.header} header`}>
         {/* <div className={`header__container`}> */}
         <HStack align='center' justify='space-between' style={{height: '100%'}}>
            {isLess992 && (
               <div className={c.burgerIcon} onClick={sidebarHandler}>
                  <Icon as={BiMenuAltLeft} fontSize='4.0rem' />
               </div>
            )}

            <Link to='/' className={c.logoWr}>
               <Icon as={FaConnectdevelop} />
            </Link>
            <div className={c.rightPartHeader}>
               <Link to='/profile' className={c.avatarWr}>
                  <Avatar className={c.avatarHeader} size='md' name='Имя' src='https://bit.ly/broken-link' icon={<AiOutlineUser fontSize='2.5rem' />} />
                  <span className={c.nickName}>lyadaryaeme</span>
               </Link>
               <Button rightIcon={<AiOutlineLogout fontSize='1.5rem' />} variant='solid' className={c.logoutBtn}>
                  Log out
               </Button>
            </div>
         </HStack>
         {/* </div> */}
      </header>
   )
}

export { Header }
