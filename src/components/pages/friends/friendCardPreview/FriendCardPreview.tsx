import React from 'react'
import { Link } from 'react-router-dom'
import { TfiThought } from 'react-icons/tfi'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType, UserFriendItemType } from '../../../../store/redux/storeTypes'
import { FriendsAC } from '../../../../store/redux/friends/friendsReducer'
import { onCloseModal, onOpenModal } from '../../../reusableElements/forOpenModalOverflowHandler/forOpenModalOverflowHandler'
import { ModalWindowWriteMessage } from '../../../reusableElements/modalWindowWriteMessage/ModalWindowWriteMessage'
import { nophoto } from '../../../reusableElements/nophoto'
import { Button } from '../../../reusableElements/button/Button'
import { accentSecClr, mainBgClr } from '../../../reusableElements/getCssVariableColor'
import c from './friendCardPreview.module.scss'

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
                                <TfiThought />
                                <span>{friendData.status}</span>
                            </p>
                        )}
                    </div>
                </Link>

                <div className={c.followUnfollowBtnBlock} style={{ opacity: friendData.followed ? 1 : 0 }}>
                    <Button
                        isLoading={!!friendData.fetchingFollowingProgress}
                        extraClassName={`${c.buttFollUnfoll} ${friendData.followed ? c.unfollowBtn : c.followBtn}`}
                        Icon={friendData.followed ? BiMinus : BiPlus}
                        name={friendData.followed ? 'Unfollow' : 'Follow'}
                        onClickHandler={handleFollowUnfollowFriend}
                        type='button'
                        isDisabled={false}
                        preloaderClr={friendData.followed ? mainBgClr : accentSecClr}
                    />

                    <p className={`${c.error} ${friendData.id === errOnFollowUnfollow.userId ? c.visible : ''}`}>
                        {errOnFollowUnfollow.message || ''}
                    </p>
                </div>
            </div>

            <div className={c.writeAMessageBlock}>
                <div className={c.writeAMessage} onClick={openModalHandler}>
                    Write a message
                </div>
            </div>
            {!friendData.followed && (
                <div className={c.maskWr}>
                    <div className={c.mask}></div>

                    <Button
                        isLoading={!!friendData.fetchingFollowingProgress}
                        onClickHandler={handleFollowUnfollowFriend}
                        extraClassName={c.cancelBtn}
                        name='Cancel delete'
                        Icon={null}
                        type='button'
                        isDisabled={false}
                        preloaderClr='var(--text-clr)'
                    />
                </div>
            )}

            <ModalWindowWriteMessage
                photoSrc={photo}
                userName={friendData.name || 'User'}
                userId={friendData.id}
                isOpen={isOpenModal}
                closeModalHandler={closeModalHandler}
            />
        </div>
    )
}

export { FriendCardPreview }
