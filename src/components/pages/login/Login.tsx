import { useLocation } from 'react-router-dom'
import c from './login.module.scss'
import { Icon } from '@chakra-ui/react'
import { logoIcon } from '../../reusableElements/logoIcon'

import { LoginForm } from './elements/LoginForm'

type LocationState = {
   from?: string
}

const LoginPage = () => {
   const locationObj = useLocation().state as LocationState
   let from: string = locationObj?.from || '/'

   return (
      <div className={c.loginPage}>
         <div className={c.logoWr}>
            <Icon as={logoIcon} />
         </div>

         <h1 className={c.title}>Sign in to Samurai social network</h1>
         <LoginForm />
      </div>
   )
}

export { LoginPage }
