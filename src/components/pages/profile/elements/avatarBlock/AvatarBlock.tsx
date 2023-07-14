import { useDispatch, useSelector } from 'react-redux'
import c from './avatarBlock.module.scss'
import { GlobalStateType } from '../../../../../store/redux/storeTypes'
import nophoto from '../../../../../assets/images/catAstro.webp'
import { TbCameraUp } from 'react-icons/tb'
import { Button, Icon } from '@chakra-ui/react'
import React from 'react'
import { ProfileAC } from '../../../../../store/redux/profile/profileReducer'

type AvatarBlockPropsType = {
   isMyProfile: boolean
}

const AvatarBlock: React.FC<AvatarBlockPropsType> = ({ isMyProfile }) => {
   const { photos, isUploadNewPhotoInProgress } = useSelector((state: GlobalStateType) => state.forProfileData)
   const { errOnUpdatePhoto } = useSelector((state: GlobalStateType) => state.forErrorsData.profileErrors)

   const dispatch = useDispatch()
   const onUploadPhotoFile = function (e: React.FormEvent<HTMLInputElement>) {
      e.currentTarget.files && dispatch(ProfileAC.updatePhoto(e.currentTarget.files[0]))
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
                        {/* <input hidden accept='image/*' type='file' onChange={onUploadPhotoFile} /> */}
                        <input hidden accept='image/png, image/jpg, image/jpeg' type='file' onChange={onUploadPhotoFile} />
                     </label>
                  </Button>
                  <p className={`${c.err} ${c.errUploadPhoto}`}>{errOnUpdatePhoto}</p>
               </>
            )}
         </div>
      </>
   )
}

export { AvatarBlock }
