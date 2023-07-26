import { Button, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { GlobalStateType, UserFriendItemType } from '../../../../store/redux/storeTypes'
import { TfiThought } from 'react-icons/tfi'
import { BiPlus, BiMinus } from 'react-icons/bi'
import c from './friendCardPreview.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { FriendsAC } from '../../../../store/redux/friends/friendsReducer'
import React from 'react'
import { onCloseModal, onOpenModal } from '../../../reusableElements/forOpenModalOverflowHandler/forOpenModalOverflowHandler'
import { ModalWindowWriteMessage } from '../../../reusableElements/modalWindowWriteMessage/ModalWindowWriteMessage'
import { nophoto } from '../../../reusableElements/nophoto'

type FriendCardPreviewPropsType = {
   friendData: UserFriendItemType
}

const FriendCardPreview: React.FC<FriendCardPreviewPropsType> = ({ friendData }) => {
   const errOnFollowUnfollow = useSelector((state: GlobalStateType) => state.forErrorsData.errorOnFollowUnfollowFriend)

   const dispatch = useDispatch()
   const handleFollowUnfollowFriend = () => dispatch(FriendsAC.changeFollowStatus(friendData.id, friendData.followed))

   const photo = friendData.photos.small || friendData.photos.large || nophoto

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
            <Link to={'/profile/' + friendData.id} className={c.avatarNameStatus}>
               <div className={c.avatarWr}>
                  <img src={photo} alt={friendData.name || ''} />
               </div>
               <div className={c.textPart}>
                  <p className={c.name}>{friendData.name?.trim()}</p>
                  {friendData.status?.trim() && (
                     <p className={c.status}>
                        <Icon as={TfiThought} />
                        <span>{friendData.status}</span>
                     </p>
                  )}
               </div>
            </Link>

            <div className={c.followUnfollowBtnBlock} style={{ opacity: friendData.followed ? 1 : 0 }}>
               <Button
                  size='md'
                  isLoading={friendData.fetchingFollowingProgress}
                  // isDisabled={true}
                  className={`${c.buttFollUnfoll} ${friendData.followed ? c.unfollowBtn : c.followBtn}`}
                  rightIcon={friendData.followed ? <BiMinus /> : <BiPlus />}
                  onClick={handleFollowUnfollowFriend}>
                  {friendData.followed ? 'Unfollow' : 'Follow'}
               </Button>

               <p className={`${c.error} ${friendData.id === errOnFollowUnfollow.userId ? c.visible : ''}`}>{errOnFollowUnfollow.message || ''}</p>
            </div>
         </div>

         <div className={c.writeAMessageBlock}>
            <Button onClick={openModalHandler} variant='link'>
               Write a message
            </Button>
         </div>
         {!friendData.followed && (
            <div className={c.maskWr}>
               <div className={c.mask}></div>
               <Button size='md' isLoading={friendData.fetchingFollowingProgress} onClick={handleFollowUnfollowFriend} className={c.cancelBtn}>
                  Cancel delete
               </Button>
            </div>
         )}

         <ModalWindowWriteMessage photoSrc={photo} userName={friendData.name || 'User'} userId={friendData.id} isOpen={isOpenModal} closeModalHandler={closeModalHandler} />
      </div>
   )
}

export { FriendCardPreview }
