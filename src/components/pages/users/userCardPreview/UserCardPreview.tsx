import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TfiThought } from 'react-icons/tfi'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { GlobalStateType, UserFriendItemType } from '../../../../store/redux/storeTypes'
import { UsersAC } from '../../../../store/redux/users/usersReducer'
import { ModalWindowWriteMessage } from '../../../reusableElements/modalWindowWriteMessage/ModalWindowWriteMessage'
import { onCloseModal, onOpenModal } from '../../../reusableElements/forOpenModalOverflowHandler/forOpenModalOverflowHandler'
import { nophoto } from '../../../reusableElements/nophoto'
import { Button } from '../../../reusableElements/button/Button'
import { accentSecClr, mainBgClr } from '../../../reusableElements/getCssVariableColor'
import c from './userCardPreview.module.scss'

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
                                <TfiThought />
                                <span>{userData.status}</span>
                            </p>
                        )}
                    </div>
                </Link>

                {isAuth && (
                    <div className={c.followUnfollowBtnBlock}>
                        <Button
                            isLoading={!!userData.fetchingFollowingProgress}
                            extraClassName={`${c.buttFollUnfoll} ${userData.followed ? c.unfollowBtn : c.followBtn}`}
                            Icon={userData.followed ? BiMinus : BiPlus}
                            name={userData.followed ? 'Unfollow' : 'Follow'}
                            onClickHandler={handleFollowUnfollowUser}
                            type='button'
                            isDisabled={false}
                            preloaderClr={userData.followed ? mainBgClr : accentSecClr}
                        />
                        <p className={`${c.error} ${userData.id === errOnFollowUnfollow.userId ? c.visible : ''}`}>
                            {errOnFollowUnfollow.message || ''}
                        </p>
                    </div>
                )}
            </div>
            {isAuth && userData.followed && (
                <>
                    <div className={c.writeAMessageBlock}>
                        <div className={c.writeAMessage} onClick={openModalHandler}>
                            Write a message
                        </div>
                    </div>
                    <ModalWindowWriteMessage
                        photoSrc={photo}
                        userName={userData.name || 'User'}
                        userId={userData.id}
                        isOpen={isOpenModal}
                        closeModalHandler={closeModalHandler}
                    />
                </>
            )}
        </div>
    )
}

export { UserCardPreview }
