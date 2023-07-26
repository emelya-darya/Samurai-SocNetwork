import { Link } from 'react-router-dom'
import { withAuthRedirectHOC } from '../../reusableElements/HOC_withAuthRedirect/withAuthRedirectHOC'

const DialogsPage = withAuthRedirectHOC(() => {
   return (
      <>
         <h1>DialogsPage</h1>
      </>
   )
})

export { DialogsPage }
