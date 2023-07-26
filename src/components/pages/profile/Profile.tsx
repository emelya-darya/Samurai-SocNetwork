import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../store/redux/storeTypes'
import { ProfileAC } from '../../../store/redux/profile/profileReducer'
import c from './profile.module.scss'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { Preloader } from '../../reusableElements/preloader/Preloader'
import { StatusBlock } from './elements/statusBlock/StatusBlock'
import { FollowUnfollowBtn } from './elements/FollowUnfollowBtn'
import { AboutJobBlock } from './elements/aboutJobBlock/AboutJobBlock'
import { ContactsBlock } from './elements/contactsBlock/ContactsBlock'
import { AvatarBlock } from './elements/avatarBlock/AvatarBlock'

import { LiaUserEditSolid } from 'react-icons/lia'
import { Button, Icon } from '@chakra-ui/react'
import { ModalWindowForm } from './elements/modalWindowForm/ModalWindowForm'
import { LuLogOut } from 'react-icons/lu'
import { AuthAC } from '../../../store/redux/auth/authReducer'
import { withAuthRedirectHOC } from '../../reusableElements/HOC_withAuthRedirect/withAuthRedirectHOC'
import { onCloseModal, onOpenModal } from '../../reusableElements/forOpenModalOverflowHandler/forOpenModalOverflowHandler'

const ProfilePage = withAuthRedirectHOC<{}>(() => {
   const MY_ID = useSelector((state: GlobalStateType) => state.forAuthData.id)
   const userIdFromUrl = useParams().userId || MY_ID

   const dispatch = useDispatch()

   React.useEffect(() => {
      if (userIdFromUrl) dispatch(ProfileAC.getProfileData(+userIdFromUrl))
   }, [userIdFromUrl])

   const isMyProfile = userIdFromUrl ? +userIdFromUrl === MY_ID : false

   const { userId, fullName, aboutMe, isLoadingProfile } = useSelector((state: GlobalStateType) => state.forProfileData)
   const {
      profileErrors: { errOnGetProfile },
      authErrors: { errOnLogOut },
   } = useSelector((state: GlobalStateType) => state.forErrorsData)
   const { isInProgressLogOut } = useSelector((state: GlobalStateType) => state.forAuthData)

   const [isOpenModal, setIsOpenModal] = React.useState(false)
   const handleOpenModal = () => {
      setIsOpenModal(true)
      onOpenModal()
   }
   const handleCloseModal = () => {
      setIsOpenModal(false)
      onCloseModal()
   }

   const logOutHandler = () => dispatch(AuthAC.signOut())

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

               {isMyProfile && (
                  <div className={c.logOutBtnWr}>
                     <Button rightIcon={<LuLogOut fontSize='1.5rem' />} variant='solid' className={c.logoutBtn} onClick={logOutHandler} isLoading={isInProgressLogOut}>
                        Sign out
                     </Button>
                     <p className={c.err}>{errOnLogOut}</p>
                  </div>
               )}
            </>
         )}
      </div>
   )
})

export { ProfilePage }
