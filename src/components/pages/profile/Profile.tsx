import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../store/redux/storeTypes'
import { ProfileAC } from '../../../store/redux/profile/profileReducer'
import c from './profile.module.scss'
import { Navigate, useParams } from 'react-router-dom'
import { Preloader } from '../../reusableElements/preloader/Preloader'
import { StatusBlock } from './elements/statusBlock/StatusBlock'
import { FollowUnfollowBtn } from './elements/FollowUnfollowBtn'
import { AboutJobBlock } from './elements/aboutJobBlock/AboutJobBlock'
import { ContactsBlock } from './elements/contactsBlock/ContactsBlock'
import { AvatarBlock } from './elements/avatarBlock/AvatarBlock'

import { LiaUserEditSolid } from 'react-icons/lia'
import { Button, Icon } from '@chakra-ui/react'
import { ModalWindowForm } from './elements/modalWindowForm/ModalWindowForm'
// import { AiOutlineLogout } from 'react-icons/ai'
import { LuLogOut } from 'react-icons/lu'
import { AuthAC } from '../../../store/redux/auth/authReducer'


const withAuthRedirectHOC = (Component: React.FC<any>)=>{
   // <Navigate to='/profile' replace={true} />
   
   // const Wrapper = ()=>{
      // const isAuth = useSelector((state:GlobalStateType)=>state.forAuthData.isAuth)

      return function(props:any){
         // if(!isAuth )return <Navigate to='/login' replace={true} />
         return <Component {...props}/>
      }

      // if (!isAuth) return <Navigate to='/login' replace={true} />
      // else return <Component/>
   // }

   // return <Wrapper/>
}

let ProfilePage = () => {
   const MY_ID = useSelector((state: GlobalStateType) => state.forAuthData.id)
   const userIdFromUrl = useParams().userId || MY_ID

   const dispatch = useDispatch()

   React.useEffect(() => {
      if (userIdFromUrl) dispatch(ProfileAC.getProfileData(+userIdFromUrl))
   }, [userIdFromUrl])

   const isMyProfile = userIdFromUrl ? +userIdFromUrl === MY_ID : false

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

   const logOutHandler = () => dispatch(AuthAC.logOut())

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
                     <Button rightIcon={<LuLogOut fontSize='1.5rem' />} variant='solid' className={c.logoutBtn} onClick={logOutHandler}>
                        Sign out
                     </Button>
                  </div>
               )}
            </>
         )}
      </div>
   )
}

//@ts-ignore
ProfilePage = withAuthRedirectHOC(ProfilePage)



export { ProfilePage }
