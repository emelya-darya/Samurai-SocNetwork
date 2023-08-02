import React from 'react'
import c from './messagesList.module.scss'
import { Preloader } from '../../../reusableElements/preloaders/main/Preloader'
import { PreloaderSmall } from '../../../reusableElements/preloaders/small/PreloaderSmall'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../store/redux/reduxStore'

type MessagesListPropsType = {
   userId: number
}
const MessagesList: React.FC<MessagesListPropsType> = ({ userId }) => {
   //ошибки
   const { errOnSendMessage, errOnLoadingFirstMessagesPortion, errOnLoadingExtraMessagesPortion } = useSelector((state: GlobalStateType) => state.forErrorsData.dialogsErrors)
   return (
      <>
         <h1>Mesages list</h1>
         <p>{userId}</p>
         <Preloader color='#000' size={20} minHeight='30px' />
         <PreloaderSmall color='#000' size={20} minHeight='30px' />
      </>
   )
}

export { MessagesList }
