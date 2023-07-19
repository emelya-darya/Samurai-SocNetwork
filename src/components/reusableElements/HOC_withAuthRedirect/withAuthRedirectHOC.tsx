import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { GlobalStateType } from '../../../store/redux/reduxStore'

export const withAuthRedirectHOC = function <PT>(ComponentToWrap: React.FC<PT>) {
   const Wrapper = (props: PT & {}) => {
      const isAuth = useSelector((state: GlobalStateType) => state.forAuthData.isAuth)
      const prevHref = useLocation().pathname

      if (!isAuth) return <Navigate to='/login' state={{ from: prevHref }} />
      return <ComponentToWrap {...props} />
   }

   return Wrapper
}
