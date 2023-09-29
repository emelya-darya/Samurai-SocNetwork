import React from 'react'
import { useSelector } from 'react-redux'
import { TbCameraUp } from 'react-icons/tb'
import { TbMessageCirclePlus } from 'react-icons/tb'
import { Crop } from 'react-image-crop'
import { useTranslation } from 'react-i18next'
import { onCloseModal, onOpenModal } from '../../../../reusableElements/forOpenModalOverflowHandler'
import { GlobalStateType } from '../../../../../store/redux/storeTypes'
import { nophoto } from '../../../../reusableElements/nophoto'
import { ModalWindowWriteMessage } from '../../../../reusableElements/modalWindowWriteMessage/ModalWindowWriteMessage'
import { Button } from '../../../../reusableElements/button/Button'
import { accentMainClr } from '../../../../reusableElements/getCssVariableColor'
import { PreloaderSmall } from '../../../../reusableElements/preloaders/small/PreloaderSmall'
import { AvatarModal } from './avatarModal/AvatarModal'
import c from './avatarBlock.module.scss'

type AvatarBlockPropsType = {
    isMyProfile: boolean
}

const AvatarBlock: React.FC<AvatarBlockPropsType> = ({ isMyProfile }) => {
    const { photos, isUploadNewPhotoInProgress, fullName, userId, isFollowed } = useSelector(
        (state: GlobalStateType) => state.forProfileData,
    )
    const { errOnUpdatePhoto } = useSelector((state: GlobalStateType) => state.forErrorsData.profileErrors)

    const [isOpenModalCrop, setIsOpenModalCrop] = React.useState(false)

    const [imgSrc, setImgSrc] = React.useState('')
    const [crop, setCrop] = React.useState<Crop>()

    const handleOpenModal = function () {
        setIsOpenModalCrop(true)
        onOpenModal()
    }

    const handleCloseModal = function () {
        if (fileInputRef.current) fileInputRef.current.value = ''
        setIsOpenModalCrop(false)
        onCloseModal()
    }

    function onUploadPhotoFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
            reader.readAsDataURL(e.target.files[0])
            handleOpenModal()
        }
    }

    //! Работа модального окна для отправки сообщений

    const isInProgressSendMessage = useSelector((state: GlobalStateType) => state.forDialogsData.isInProgressSendMessage)

    const [isOpenModalMessage, setIsOpenModalMessage] = React.useState(false)

    const openModalMessageHandler = () => {
        onOpenModal()
        setIsOpenModalMessage(true)
    }

    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const closeModalMessageHandler = () => {
        onCloseModal()
        setIsOpenModalMessage(false)
    }

    const canSendMessage = !isMyProfile && isFollowed

    // перевод
    const { t } = useTranslation()

    return (
        <div className={c.avatarBlock}>
            <div className={c.avatarWr} style={{ marginBottom: !isMyProfile ? '15px' : '0px' }}>
                <img src={photos.large || nophoto} alt='user' />
                {isMyProfile && (
                    <>
                        <div className={`${c.uploadAvatarPseudoBtn} ${isUploadNewPhotoInProgress ? c.disabled : ''}`}>
                            {isUploadNewPhotoInProgress ? (
                                <PreloaderSmall color={accentMainClr} size={18} minHeight='18px' />
                            ) : (
                                <label className={c.uploadPhotoBtn}>
                                    <TbCameraUp />
                                    <input hidden accept='image/*' type='file' onChange={onUploadPhotoFile} ref={fileInputRef} />
                                </label>
                            )}
                        </div>

                        <p className={`${c.err} ${c.errUploadPhoto}`}>{errOnUpdatePhoto}</p>

                        <AvatarModal
                            isOpen={isOpenModalCrop}
                            handleCloseModal={handleCloseModal}
                            imgSrc={imgSrc}
                            setImgSrc={setImgSrc}
                            crop={crop}
                            setCrop={setCrop}
                        />
                    </>
                )}
            </div>
            {canSendMessage && (
                <>
                    <div className={c.writeAMessageBlock}>
                        <Button
                            name={t('profile.sendMsgBtn')}
                            type='button'
                            Icon={TbMessageCirclePlus}
                            extraClassName={c.sendMessageBtn}
                            onClickHandler={openModalMessageHandler}
                            isLoading={isInProgressSendMessage}
                            isDisabled={false}
                        />
                    </div>
                    <ModalWindowWriteMessage
                        photoSrc={photos.small || photos.large || nophoto}
                        userName={fullName || 'User'}
                        userId={userId || 1}
                        isOpen={isOpenModalMessage}
                        closeModalHandler={closeModalMessageHandler}
                    />
                </>
            )}
        </div>
    )
}

export { AvatarBlock }
