import { Button, Icon, Textarea } from '@chakra-ui/react'
import c from './modalWindowWriteMessage.module.scss'
import { AiOutlineCheck, AiOutlineClose, AiOutlineSend } from 'react-icons/ai'
import { UserAvatarWithLink } from '../userAvatarWithLink/UserAvatarWithLink'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { DialogsAC } from '../../../store/redux/dialogs/dialogsReducer'
import { GlobalStateType } from '../../../store/redux/reduxStore'
import React from 'react'
import { BiError } from 'react-icons/bi'

type ModalWindowWriteMessagePropsType = {
   photoSrc: string
   userName: string
   userId: number
   isOpen: boolean
   closeModalHandler: () => void
}

type FormValues = { message: string }

const ModalWindowWriteMessage: React.FC<ModalWindowWriteMessagePropsType> = ({ photoSrc, userName, userId, isOpen, closeModalHandler }) => {
   const isInProgressSendMessage = useSelector((state: GlobalStateType) => state.forDialogsData.isInProgressSendMessage)
   const errOnSend = useSelector((state: GlobalStateType) => state.forErrorsData.dialogsErrors.errOnSendMessage)

   const {
      reset,
      handleSubmit,
      register,
      formState: { isValid },
   } = useForm<FormValues>()

   const handleCloseWrapper = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      //@ts-ignore
      const classListArr = Array.from(e?.target?.classList || [])
      if (classListArr.includes('close') && e.button === 0) closeModalHandler()
   }
   const dispatch = useDispatch()

   const [shouldShowNtf, setShouldShowNtf] = React.useState(false)

   const submitHandler = (data: FormValues) => {
      dispatch(DialogsAC.sendMessage(data.message, userId))
      setShouldShowNtf(true)
   }

   const [isVisibleNtf, setIsVisibleNtf] = React.useState(false)

   React.useEffect(() => {
      if (shouldShowNtf && !isInProgressSendMessage) {
         if (!errOnSend) {
            closeModalHandler()
            setIsVisibleNtf(true)
            setTimeout(() => setIsVisibleNtf(false), 3000)
            reset()
         } else {
            setIsVisibleNtf(true)
            setTimeout(() => setIsVisibleNtf(false), 3000)
         }
         setShouldShowNtf(false)
      }
   }, [isInProgressSendMessage])

   return (
      <>
         <div className={`${c.modalWind} ${isOpen ? c.visible : ''} close`} onClick={handleCloseWrapper}>
            <div className={c.modalContent}>
               <div className={`${c.closeBtn} close`}>
                  <Icon as={AiOutlineClose} className='close' />
                  <div className={`${c.closeBtnMask} close`}></div>
               </div>
               <p className={c.title}>New message</p>
               <Link className={c.jumpToDialogLink} to={'/dialogs/' + userId}>
                  <span>Jump to dialog with {userName}</span> <Icon as={BsArrowRight} />
               </Link>
               <div className={c.userDataBlock}>
                  <div className={c.avatarWr}>
                     <UserAvatarWithLink id={userId} photo={photoSrc} name={userName} bgColor='#F0772B' />
                  </div>
                  <Link to={'/profile/' + userId} className={c.name}>
                     {userName}
                  </Link>
               </div>

               <form className={c.form} onSubmit={handleSubmit(submitHandler)}>
                  <Textarea {...register('message', { required: 'This field is required' })} placeholder='Message' size='lg' resize='none' className={c.styledTextarea} />
                  <Button rightIcon={<Icon as={AiOutlineSend} />} className={c.sendBtn} type='submit' isDisabled={!isValid} isLoading={isInProgressSendMessage}>
                     Send
                  </Button>
               </form>

               {/* <div className={`${shouldShowSuccErrLett && !isInProgressSendMessage ? c.visible : ''} ${c.onSubmitErrOrSuccWr}`}>
               {errOnSend ? (
                  <div className={`${c.err} ${c.onSubmitErrOrSucc} `}>
                     <Icon as={BiError} />
                     <span>{errOnSend}</span>
                  </div>
               ) : (
                  <div className={`${c.succ} ${c.onSubmitErrOrSucc}`}>
                     <Icon as={AiOutlineCheck} />
                     <span>Message sent</span>
                  </div>
               )}
            </div> */}
            </div>
         </div>

         <div className={`${c.notificationModal} ${errOnSend ? c.err : c.succ} ${isVisibleNtf ? c.visible : ''}`}>
            <div
               onClick={() => {
                  setIsVisibleNtf(false)
               }}
               className={c.closeSmallBtn}>
               <Icon as={AiOutlineClose} />
            </div>

            {errOnSend ? (
               <>
                  <p className={c.subtitle}>Some error</p>
                  <p className={c.text}>{errOnSend}</p>
               </>
            ) : (
               <>
                  <p className={c.subtitle}>Message sent</p>
                  <p className={c.text}>
                     Your message has been sent to <Link to={`/profile/${userId}`}>{userName}</Link>
                  </p>
               </>
            )}
         </div>
      </>
   )
}

export { ModalWindowWriteMessage }
