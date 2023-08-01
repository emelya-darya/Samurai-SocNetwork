import { Link, Navigate, useParams } from 'react-router-dom'
import { withAuthRedirectHOC } from '../../reusableElements/HOC_withAuthRedirect/withAuthRedirectHOC'
import { DialogsList } from './dialogsList/DialogsList'
import { MessagesList } from './messagesList/MessagesList'

const DialogsPage = withAuthRedirectHOC(() => {
   const userIdFromUrl = useParams().userId

   // Если есть параметр userId в url, но он не конвертируется в число, по перенаправляем на список диалогов
   if (userIdFromUrl !== undefined && isNaN(parseInt(userIdFromUrl))) return <Navigate to='/dialogs' />

   if (userIdFromUrl === undefined) return <DialogsList />

   return <MessagesList userId={+userIdFromUrl} />
})

export { DialogsPage }
