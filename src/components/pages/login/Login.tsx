import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logoIcon } from '../../reusableElements/logoIcon'
import { GlobalStateType } from '../../../store/redux/reduxStore'
import { LoginForm } from './elements/LoginForm'
import c from './login.module.scss'

type LocationState = {
    from?: string
}

const LoginPage = () => {
    const locationObj = useLocation().state as LocationState
    const from: string = locationObj?.from || '/'

    const isAuth = useSelector((state: GlobalStateType) => state.forAuthData.isAuth)

    if (isAuth) return <Navigate to={from} />
    return (
        <div className={c.loginPage}>
            <div className={c.logoWr}>{logoIcon}</div>

            <h1 className={c.title}>Sign in to Samurai social network</h1>
            <LoginForm />
        </div>
    )
}

export { LoginPage }
