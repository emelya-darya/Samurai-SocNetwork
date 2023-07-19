import { Button, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { GlobalStateType, UserFriendItemType } from '../../../../store/redux/storeTypes'
import { TfiThought } from 'react-icons/tfi'
import { BiPlus, BiMinus } from 'react-icons/bi'
import nophoto from '../../../../assets/images/catAstro.webp'
import c from './userCardPreview.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { UsersAC } from '../../../../store/redux/users/usersReducer'

type UserCardPreviewPropsType = {
   userData: UserFriendItemType
   isAuth: boolean
}

const UserCardPreview: React.FC<UserCardPreviewPropsType> = ({ userData, isAuth }) => {
   const errOnFollowUnfollow = useSelector((state: GlobalStateType) => state.forErrorsData.errorOnFollowUnfollowUser)

   const dispatch = useDispatch()
   const handleFollowUnfollowUser = () => dispatch(UsersAC.changeFollowStatusAC(userData.id, userData.followed))

   return (
      <div className={c.userItem}>
         <Link to={'/profile/' + userData.id} className={c.avatarNameStatus}>
            <div className={c.avatarWr}>
               <img src={userData.photos.small || userData.photos.large || nophoto} alt={userData.name || ''} />
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
            <div className={c.blockWBtn}>
               <Button
                  size='md'
                  isLoading={userData.fetchingFollowingProgress}
                  // isDisabled={true}
                  className={`${c.buttFollUnfoll} ${userData.followed ? c.unfollowBtn : c.followBtn}`}
                  rightIcon={userData.followed ? <BiMinus /> : <BiPlus />}
                  onClick={handleFollowUnfollowUser}>
                  {userData.followed ? 'Unfollow' : 'Follow'}
               </Button>

               <p className={`${c.error} ${userData.id === errOnFollowUnfollow.userId ? c.visible : ''}`}>{errOnFollowUnfollow.message || ''}</p>
            </div>
         )}
      </div>
   )
}

export { UserCardPreview }
