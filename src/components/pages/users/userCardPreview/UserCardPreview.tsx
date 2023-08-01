import { Button, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { GlobalStateType, UserFriendItemType } from '../../../../store/redux/storeTypes'
import { TfiThought } from 'react-icons/tfi'
import { BiPlus, BiMinus } from 'react-icons/bi'
import c from './userCardPreview.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { UsersAC } from '../../../../store/redux/users/usersReducer'
import { DataForModalType } from '../Users'
import { ModalWindowWriteMessage } from '../../../reusableElements/modalWindowWriteMessage/ModalWindowWriteMessage'
import React from 'react'
import { onCloseModal, onOpenModal } from '../../../reusableElements/forOpenModalOverflowHandler/forOpenModalOverflowHandler'
import { nophoto } from '../../../reusableElements/nophoto'

type UserCardPreviewPropsType = {
   userData: UserFriendItemType
   isAuth: boolean
}

const UserCardPreview: React.FC<UserCardPreviewPropsType> = ({ userData, isAuth }) => {
   const errOnFollowUnfollow = useSelector((state: GlobalStateType) => state.forErrorsData.errorOnFollowUnfollowUser)

   const dispatch = useDispatch()
   const handleFollowUnfollowUser = () => dispatch(UsersAC.changeFollowStatusAC(userData.id, userData.followed))

   const photo = userData.photos.small || userData.photos.large || nophoto

   //! Работа модального окна для отправки сообщений

   const [isOpenModal, setIsOpenModal] = React.useState(false)

   const openModalHandler = () => {
      onOpenModal()
      setIsOpenModal(true)
   }

   const closeModalHandler = () => {
      onCloseModal()
      setIsOpenModal(false)
   }

   return (
      <div className={c.userItemWr}>
         <div className={c.userItem}>
            <Link to={'/profile/' + userData.id} className={c.avatarNameStatus}>
               <div className={c.avatarWr}>
                  <img src={photo} alt={userData.name || ''} />
               </div>

               <div className={c.textPart}>
                  <p className={c.name}>{userData.name?.trim()}</p>
                  {userData.status?.trim() && (
                     <p className={c.status}>
                        <Icon as={TfiThought} />
                        <span>{userData.status}</span>
                     </p>
                  )}
               </div>
            </Link>

            {isAuth && (
               <div className={c.followUnfollowBtnBlock}>
                  <Button
                     size='md'
                     isLoading={userData.fetchingFollowingProgress}
                     className={`${c.buttFollUnfoll} ${userData.followed ? c.unfollowBtn : c.followBtn}`}
                     rightIcon={userData.followed ? <BiMinus /> : <BiPlus />}
                     onClick={handleFollowUnfollowUser}>
                     {userData.followed ? 'Unfollow' : 'Follow'}
                  </Button>
                  <p className={`${c.error} ${userData.id === errOnFollowUnfollow.userId ? c.visible : ''}`}>{errOnFollowUnfollow.message || ''}</p>
               </div>
            )}
         </div>
         {isAuth && userData.followed && (
            <>
               <div className={c.writeAMessageBlock}>
                  <Button variant='link' onClick={openModalHandler}>
                     Write a message
                  </Button>
               </div>
               <ModalWindowWriteMessage photoSrc={photo} userName={userData.name || 'User'} userId={userData.id} isOpen={isOpenModal} closeModalHandler={closeModalHandler} />
            </>
         )}
      </div>
   )
}

export { UserCardPreview }
