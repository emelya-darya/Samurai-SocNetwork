import { Icon } from '@chakra-ui/react'
import c from './modalWindowForm.module.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { Form } from './form/Form'
import React from 'react'

type ModalWindowFormPropsType = {
   isOpen: boolean
   handleCloseModal: () => void
}

const ModalWindowForm: React.FC<ModalWindowFormPropsType> = ({ isOpen, handleCloseModal }) => {
   const [shouldShowSuccErrLettOnSubmit, setShouldShowErrLettOnSubmit] = React.useState(false)

   const handleCloseWrapper = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      //@ts-ignore
      const classListArr = Array.from(e?.target?.classList || [])
      if (classListArr.includes('close') && e.button === 0) {
         handleCloseModal()
         setShouldShowErrLettOnSubmit(false)
      }
   }

   return (
      <div className={`${c.modal} ${isOpen ? c.visible : ''} close`} onMouseDown={handleCloseWrapper}>
         <div className={c.modalContent}>
            <div className={`${c.closeBtn} close`}>
               <Icon as={AiOutlineClose} className='close' />
               <div className={`${c.closeBtnMask} close`}></div>
            </div>
            <p className={c.title}>Edit profile</p>

            <Form shouldShowSuccErrLettOnSubmit={shouldShowSuccErrLettOnSubmit} setShouldShowErrLettOnSubmit={setShouldShowErrLettOnSubmit} />
         </div>
      </div>
   )
}

export { ModalWindowForm }
