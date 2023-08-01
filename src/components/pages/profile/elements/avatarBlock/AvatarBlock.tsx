import { useSelector } from 'react-redux'
import c from './avatarBlock.module.scss'
import { GlobalStateType } from '../../../../../store/redux/storeTypes'
import { TbCameraUp } from 'react-icons/tb'
import { Button, Icon } from '@chakra-ui/react'
import React from 'react'
import { AvatarModal } from './avatarModal/AvatarModal'
import { Crop } from 'react-image-crop'
import { onCloseModal, onOpenModal } from '../../../../reusableElements/forOpenModalOverflowHandler/forOpenModalOverflowHandler'
import { nophoto } from '../../../../reusableElements/nophoto'
import { TbMessageCirclePlus, TbMessages } from 'react-icons/tb'
import { ModalWindowWriteMessage } from '../../../../reusableElements/modalWindowWriteMessage/ModalWindowWriteMessage'

type AvatarBlockPropsType = {
   isMyProfile: boolean
}

const AvatarBlock: React.FC<AvatarBlockPropsType> = ({ isMyProfile }) => {
   const { photos, isUploadNewPhotoInProgress, fullName, userId, isFollowed } = useSelector((state: GlobalStateType) => state.forProfileData)
   const { errOnUpdatePhoto } = useSelector((state: GlobalStateType) => state.forErrorsData.profileErrors)

   const [isOpenModalCrop, setIsOpenModalCrop] = React.useState(false)

   const [imgSrc, setImgSrc] = React.useState('')
   const [crop, setCrop] = React.useState<Crop>()

   const handleOpenModal = function () {
      setIsOpenModalCrop(true)
      onOpenModal()
   }

   const handleCloseModal = function () {
      setIsOpenModalCrop(false)
      onCloseModal()
   }

   function onUploadPhotoFile(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files && e.target.files.length > 0) {
         setCrop(undefined) // Makes crop preview update between images.
         const reader = new FileReader()
         reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
         reader.readAsDataURL(e.target.files[0])
         handleOpenModal()
      }
   }

   //! Работа модального окна для отправки сообщений

   const isInProgressSendMessage = useSelector((state: GlobalStateType) => state.forDialogsData.isInProgressSendMessage)

   const [isOpenModalMessage, setIsOpenModalMessage] = React.useState(false)

   const openModalMessageHandler = () => {
      onOpenModal()
      setIsOpenModalMessage(true)
   }

   const closeModalMessageHandler = () => {
      onCloseModal()
      setIsOpenModalMessage(false)
   }

   const canSendMessage = !isMyProfile && isFollowed

   return (
      <div className={c.avatarBlock}>
         <div className={c.avatarWr} style={{ marginBottom: !isMyProfile ? '15px' : '0px' }}>
            <img src={photos.large || nophoto} alt='user' />
            {isMyProfile && (
               <>
                  <Button className={c.uploadPhotoBtn} isLoading={isUploadNewPhotoInProgress}>
                     <label className={c.uploadPhotoBtn}>
                        <Icon as={TbCameraUp} />
                        <input hidden accept='image/*' type='file' onChange={onUploadPhotoFile} />
                     </label>
                  </Button>
                  <p className={`${c.err} ${c.errUploadPhoto}`}>{errOnUpdatePhoto}</p>

                  <AvatarModal isOpen={isOpenModalCrop} handleCloseModal={handleCloseModal} imgSrc={imgSrc} setImgSrc={setImgSrc} crop={crop} setCrop={setCrop} />
               </>
            )}
         </div>
         {canSendMessage && (
            <>
               <div className={c.writeAMessageBlock}>
                  <Button rightIcon={<Icon as={TbMessageCirclePlus} />} className={c.sendMessageBtn} onClick={openModalMessageHandler} isLoading={isInProgressSendMessage}>
                     Send message
                  </Button>
               </div>
               <ModalWindowWriteMessage
                  photoSrc={photos.small || photos.large || nophoto}
                  userName={fullName || 'User'}
                  userId={userId || 1}
                  isOpen={isOpenModalMessage}
                  closeModalHandler={closeModalMessageHandler}
               />
            </>
         )}
      </div>
   )
}

export { AvatarBlock }
