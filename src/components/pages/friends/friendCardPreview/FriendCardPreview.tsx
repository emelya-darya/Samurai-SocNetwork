import { Button, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { GlobalStateType, UserFriendItemType } from '../../../../store/redux/storeTypes'
import { TfiThought } from 'react-icons/tfi'
import { BiPlus, BiMinus } from 'react-icons/bi'
import nophoto from '../../../../assets/images/catAstro.webp'
import c from './friendCardPreview.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { FriendsAC } from '../../../../store/redux/friends/friendsReducer'

type FriendCardPreviewPropsType = {
   friendData: UserFriendItemType
}

const FriendCardPreview: React.FC<FriendCardPreviewPropsType> = ({ friendData }) => {
   const errOnFollowUnfollow = useSelector((state: GlobalStateType) => state.forErrorsData.errorOnFollowUnfollowFriend)

   const dispatch = useDispatch()
   const handleFollowUnfollowFriend = () => dispatch(FriendsAC.changeFollowStatus(friendData.id, friendData.followed))

   return (
      <div className={c.userItem}>
         <Link to={'/profile/' + friendData.id} className={c.avatarNameStatus}>
            <div className={c.avatarWr}>
               <img src={friendData.photos.small || friendData.photos.large || nophoto} alt={friendData.name || ''} />
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

         <div className={c.blockWBtn}>
            {friendData.followed && (
               <Button
                  size='md'
                  isLoading={friendData.fetchingFollowingProgress}
                  // isDisabled={true}
                  className={`${c.buttFollUnfoll} ${friendData.followed ? c.unfollowBtn : c.followBtn}`}
                  rightIcon={friendData.followed ? <BiMinus /> : <BiPlus />}
                  onClick={handleFollowUnfollowFriend}>
                  {friendData.followed ? 'Unfollow' : 'Follow'}
               </Button>
            )}
            <p className={`${c.error} ${friendData.id === errOnFollowUnfollow.userId ? c.visible : ''}`}>{errOnFollowUnfollow.message || ''}</p>
         </div>
         {!friendData.followed && (
            <div className={c.maskWr}>
               <div className={c.mask}></div>
               <Button size='md' isLoading={friendData.fetchingFollowingProgress} onClick={handleFollowUnfollowFriend} className={c.cancelBtn}>
                  Cancel delete
               </Button>
            </div>
         )}
      </div>
   )
}

export { FriendCardPreview }
