import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { LiaUserEditSolid } from 'react-icons/lia'
import { LuLogOut } from 'react-icons/lu'
import { GlobalStateType } from '../../../store/redux/storeTypes'
import { ProfileAC } from '../../../store/redux/profile/profileReducer'
import { PreloaderSmall } from '../../reusableElements/preloaders/small/PreloaderSmall' 
import { AuthAC } from '../../../store/redux/auth/authReducer'
import { withAuthRedirectHOC } from '../../reusableElements/HOC_withAuthRedirect/withAuthRedirectHOC'
import { onCloseModal, onOpenModal } from '../../reusableElements/forOpenModalOverflowHandler/forOpenModalOverflowHandler'
import { Button } from '../../reusableElements/button/Button'
import { accentMainClr } from '../../reusableElements/getCssVariableColor'
import { StatusBlock } from './elements/statusBlock/StatusBlock'
import { FollowUnfollowBtn } from './elements/FollowUnfollowBtn'
import { AboutJobBlock } from './elements/aboutJobBlock/AboutJobBlock'
import { ContactsBlock } from './elements/contactsBlock/ContactsBlock'
import { AvatarBlock } from './elements/avatarBlock/AvatarBlock'
import { ModalWindowForm } from './elements/modalWindowForm/ModalWindowForm'
import c from './profile.module.scss'

const ProfilePage = withAuthRedirectHOC<{}>(() => {
    const MY_ID = useSelector((state: GlobalStateType) => state.forAuthData.id)
    const userIdFromUrl = useParams().userId || MY_ID

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (userIdFromUrl) dispatch(ProfileAC.getProfileData(+userIdFromUrl))
    }, [userIdFromUrl])

    const isMyProfile = userIdFromUrl ? +userIdFromUrl === MY_ID : false

    const { fullName, aboutMe, isLoadingProfile } = useSelector((state: GlobalStateType) => state.forProfileData)
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
                <PreloaderSmall color={accentMainClr} size={150} minHeight='75vh' />
            ) : errOnGetProfile ? (
                <p className={c.serverErrMessage}>{errOnGetProfile}</p>
            ) : (
                <>
                    <div className={c.titleBtn}>
                        <h1 className={c.title}>{fullName}</h1>

                        {!isMyProfile ? (
                            <FollowUnfollowBtn />
                        ) : (
                            <Button
                                name='Edit profile'
                                Icon={LiaUserEditSolid}
                                extraClassName={c.editProfileBtn}
                                onClickHandler={handleOpenModal}
                                type='button'
                                isLoading={false}
                                isDisabled={false}
                            />
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
                            <Button
                                Icon={LuLogOut}
                                name='Sign out'
                                extraClassName={c.logoutBtn}
                                onClickHandler={logOutHandler}
                                isLoading={isInProgressLogOut}
                                isDisabled={false}
                                type='button'
                            />
                            <p className={c.err}>{errOnLogOut}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
})

export { ProfilePage }
