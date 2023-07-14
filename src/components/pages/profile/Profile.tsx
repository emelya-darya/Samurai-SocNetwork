import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../store/redux/storeTypes'
import { ProfileAC } from '../../../store/redux/profile/profileReducer'
import c from './profile.module.scss'
import { useParams } from 'react-router-dom'
import { Preloader } from '../../reusableElements/preloader/Preloader'
import { StatusBlock } from './elements/statusBlock/StatusBlock'
import { FollowUnfollowBtn } from './elements/FollowUnfollowBtn'
import { AboutJobBlock } from './elements/aboutJobBlock/AboutJobBlock'
import { ContactsBlock } from './elements/contactsBlock/ContactsBlock'
import { AvatarBlock } from './elements/avatarBlock/AvatarBlock'

import { LiaUserEditSolid } from 'react-icons/lia'
import { Button, Icon } from '@chakra-ui/react'
import { ModalWindowForm } from './elements/modalWindowForm/ModalWindowForm'

const MY_ID = 24420

const ProfilePage = () => {
   const userIdFromUrl = useParams().userId || MY_ID

   const dispatch = useDispatch()

   React.useEffect(() => {
      dispatch(ProfileAC.getProfileData(+userIdFromUrl))
   }, [userIdFromUrl])

   const isMyProfile = +userIdFromUrl === MY_ID

   const { userId, fullName, aboutMe, isLoadingProfile } = useSelector((state: GlobalStateType) => state.forProfileData)
   const { errOnGetProfile, errOnUpdateMainData } = useSelector((state: GlobalStateType) => state.forErrorsData.profileErrors)

   const [isOpenModal, setIsOpenModal] = React.useState(false)
   const handleOpenModal = () => {
      setIsOpenModal(true)
      document.body.classList.add('lock')
   }
   const handleCloseModal = () => {
      setIsOpenModal(false)
      document.body.classList.remove('lock')
   }

   return (
      <div className={c.profilePage}>
         {isLoadingProfile ? (
            <Preloader color='#A0450B' size={100} minHeight='75vh' />
         ) : errOnGetProfile ? (
            <p className={c.serverErrMessage}>{errOnGetProfile}</p>
         ) : (
            <>
               <div className={c.titleBtn}>
                  <h1 className={c.title}>{fullName}</h1>

                  {!isMyProfile ? (
                     <FollowUnfollowBtn />
                  ) : (
                     <Button leftIcon={<Icon as={LiaUserEditSolid} />} className={c.editProfileBtn} onClick={handleOpenModal}>
                        Edit profile
                     </Button>
                  )}
               </div>
               <div className={c.topPart}>
                  <AvatarBlock isMyProfile={isMyProfile} />

                  <div className={c.textPart}>
                     <StatusBlock isMyProfile={isMyProfile} />
                     <AboutJobBlock />
                  </div>
               </div>

               <div className={c.aboutMeBlock}>
                  <h2>About me</h2>
                  <p>{aboutMe?.trim() ? aboutMe?.trim() : 'User did not provide information'}</p>
               </div>

               <ContactsBlock />
               {isMyProfile && <ModalWindowForm isOpen={isOpenModal} handleCloseModal={handleCloseModal} />}
            </>
         )}
         
      </div>
   )
}

export { ProfilePage }
