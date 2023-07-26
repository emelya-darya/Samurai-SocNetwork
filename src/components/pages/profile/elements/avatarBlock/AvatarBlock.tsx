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

type AvatarBlockPropsType = {
   isMyProfile: boolean
}

const AvatarBlock: React.FC<AvatarBlockPropsType> = ({ isMyProfile }) => {
   const { photos, isUploadNewPhotoInProgress } = useSelector((state: GlobalStateType) => state.forProfileData)
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

   return (
      <>
         <div className={c.avatarWr}>
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
      </>
   )
}

export { AvatarBlock }
