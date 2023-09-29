import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { GlobalStateType } from '../../../../store/redux/storeTypes'
import { ProfileAC } from '../../../../store/redux/profile/profileReducer'
import { Button } from '../../../reusableElements/button/Button'
import c from '../profile.module.scss'
import { accentSecClr, mainBgClr } from '../../../reusableElements/getCssVariableColor'

const FollowUnfollowBtn = () => {
    const { userId, isFollowed, isFetchingFollowUnfollowInProgress } = useSelector((state: GlobalStateType) => state.forProfileData)
    const { errOnGetFollowStat, errOnFetchingFollowUnfollow } = useSelector((state: GlobalStateType) => state.forErrorsData.profileErrors)

    const dispatch = useDispatch()
    const handleFollowUnfollow = () => {
        dispatch(ProfileAC.changeFollowStatus(userId || 1, isFollowed || false))
    }

    // перевод
    const { t } = useTranslation()

    return (
        <div className={c.topBtnWr}>
            {!errOnGetFollowStat ? (
                <>
                    <Button
                        isLoading={isFetchingFollowUnfollowInProgress}
                        extraClassName={`${c.buttFollUnfoll} ${isFollowed ? c.unfollowBtn : c.followBtn}`}
                        Icon={isFollowed ? BiMinus : BiPlus}
                        onClickHandler={handleFollowUnfollow}
                        name={isFollowed ? t('profile.followBtn') : t('profile.unfollowBtn')}
                        isDisabled={false}
                        type='button'
                        preloaderClr={isFollowed ? mainBgClr : accentSecClr}
                    />
                    <p className={`${c.err} ${c.btnErr}`}>{errOnFetchingFollowUnfollow}</p>
                </>
            ) : (
                <p className={c.err}>{errOnGetFollowStat}</p>
            )}
        </div>
    )
}

export { FollowUnfollowBtn }
