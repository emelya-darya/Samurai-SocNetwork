import { withAuthRedirectHOC } from '../../reusableElements/HOC_withAuthRedirect/withAuthRedirectHOC'
import c from './dialogs.module.scss'

const DialogsPage = withAuthRedirectHOC(() => {
   return <h1>DialogsPage</h1>
})

export { DialogsPage }
