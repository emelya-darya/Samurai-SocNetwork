import { Navigate, useLocation } from 'react-router-dom'
import c from './login.module.scss'
import { logoIcon } from '../../reusableElements/logoIcon'
import { LoginForm } from './elements/LoginForm'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../store/redux/reduxStore'

type LocationState = {
   from?: string
}

const LoginPage = () => {
   const locationObj = useLocation().state as LocationState
   let from: string = locationObj?.from || '/'

   const isAuth = useSelector((state: GlobalStateType) => state.forAuthData.isAuth)

   if (isAuth) return <Navigate to={from} />
   return (
      <div className={c.loginPage}>
         <div className={c.logoWr}>
            {logoIcon}
         </div>

         <h1 className={c.title}>Sign in to Samurai social network</h1>
         <LoginForm />
      </div>
   )
}

export { LoginPage }
