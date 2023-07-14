import { useDispatch, useSelector } from 'react-redux'
import c from '../profile.module.scss'
import { GlobalStateType } from '../../../../store/redux/storeTypes'
import { Button } from '@chakra-ui/react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { ProfileAC } from '../../../../store/redux/profile/profileReducer'



const FollowUnfollowBtn = () => {

    const {
        userId,isFollowed,
        
        isFetchingFollowUnfollowInProgress,
     } = useSelector((state: GlobalStateType) => state.forProfileData)
   const { errOnGetProfile, errOnGetFollowStat, errOnFetchingFollowUnfollow, errOnUpdatePhoto, errOnUpdateMainData } = useSelector((state: GlobalStateType) => state.forErrorsData.profileErrors)

   const dispatch = useDispatch()
   const handleFollowUnfollow = () => {
    dispatch(ProfileAC.changeFollowStatus(userId || 1, isFollowed || false))
 }

   return (
      <div className={c.topBtnWr}>
         {!errOnGetFollowStat ? (
            <>
               <Button
                  size='md'
                  isLoading={isFetchingFollowUnfollowInProgress}
                  className={`${c.buttFollUnfoll} ${isFollowed ? c.unfollowBtn : c.followBtn}`}
                  rightIcon={isFollowed ? <BiMinus /> : <BiPlus />}
                  onClick={handleFollowUnfollow}>
                  {isFollowed ? 'Unfollow' : 'Follow'}
               </Button>
               <p className={`${c.err} ${c.btnErr}`}>{errOnFetchingFollowUnfollow}</p>
            </>
         ) : (
            <p className={c.err}>{errOnGetFollowStat}</p>
         )}
      </div>
   )
}

export {FollowUnfollowBtn}
