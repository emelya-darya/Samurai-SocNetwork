import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'

import { UserAvatarWithLink } from '../userAvatarWithLink/UserAvatarWithLink'
import { DialogsAC } from '../../../store/redux/dialogs/dialogsReducer'
import { GlobalStateType } from '../../../store/redux/reduxStore'
import { getRandomClr } from '../userAvatarWithLink/colorsAvatars'
import { Button } from '../button/Button'
import { accentSecClr } from '../getCssVariableColor'

import c from './modalWindowWriteMessage.module.scss'

type ModalWindowWriteMessagePropsType = {
    photoSrc: string
    userName: string
    userId: number
    isOpen: boolean
    closeModalHandler: () => void
}

const MAX_LENGTH = 990

const ModalWindowWriteMessage: React.FC<ModalWindowWriteMessagePropsType> = ({ photoSrc, userName, userId, isOpen, closeModalHandler }) => {
    const isInProgressSendMessage = useSelector((state: GlobalStateType) => state.forDialogsData.isInProgressSendMessage)
    const errOnSend = useSelector((state: GlobalStateType) => state.forErrorsData.dialogsErrors.errOnSendMessage)

    const [textareaValue, setTextareaValue] = React.useState('')
    const [countCharacters, setCountCharacters] = React.useState(textareaValue.length)

    const onChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setTextareaValue(e.currentTarget.value)
        setCountCharacters(e.currentTarget.value.length)
    }

    const handleCloseWrapper = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        //@ts-ignore
        const classListArr = Array.from(e?.target?.classList || [])
        if (classListArr.includes('close') && e.button === 0) closeModalHandler()
    }
    const dispatch = useDispatch()

    const [shouldShowNtf, setShouldShowNtf] = React.useState(false)

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsVisibleNtf(false)
        dispatch(DialogsAC.sendMessage(textareaValue.trim(), userId))
        setShouldShowNtf(true)
    }

    const [isVisibleNtf, setIsVisibleNtf] = React.useState(false)

    React.useEffect(() => {
        if (shouldShowNtf && !isInProgressSendMessage) {
            if (!errOnSend) {
                closeModalHandler()
                setIsVisibleNtf(true)
                setTimeout(() => setIsVisibleNtf(false), 3000)
                setTextareaValue('')
                setCountCharacters(0)
            } else {
                setIsVisibleNtf(true)
                setTimeout(() => setIsVisibleNtf(false), 3000)
            }
            setShouldShowNtf(false)
        }
    }, [isInProgressSendMessage])

    return (
        <>
            <div className={`${c.modalWind} ${isOpen ? c.visible : ''} close`} onMouseDown={handleCloseWrapper}>
                <div className={c.modalContent}>
                    <div className={`${c.closeBtn} close`}>
                        <AiOutlineClose className='close' />
                        <div className={`${c.closeBtnMask} close`}></div>
                    </div>
                    <p className={c.title}>New message</p>
                    <Link
                        className={c.jumpToDialogLink}
                        to={'/dialogs/' + userId}
                        state={{ colorAvatar: getRandomClr() }}
                        onClick={closeModalHandler}>
                        <span>Jump to dialog with {userName}</span> <BsArrowRight />
                    </Link>
                    <div className={c.userDataBlock}>
                        <div className={c.avatarWr}>
                            <UserAvatarWithLink id={userId} photo={photoSrc} name={userName} bgColor={accentSecClr} />
                        </div>
                        <Link to={'/profile/' + userId} className={c.name} onClick={closeModalHandler}>
                            {userName}
                        </Link>
                    </div>

                    <form className={c.form} onSubmit={onSubmitHandler}>
                        <textarea
                            className={c.styledTextarea}
                            onInput={onChangeHandler}
                            value={textareaValue}
                            placeholder='Message'
                            maxLength={MAX_LENGTH}
                        />

                        <p className={c.charactersLeft}>{MAX_LENGTH - countCharacters} characters left</p>
                        <Button
                            Icon={AiOutlineSend}
                            extraClassName={c.sendBtn}
                            type='submit'
                            isDisabled={!textareaValue}
                            isLoading={isInProgressSendMessage}
                            name='Send'
                        />
                    </form>
                </div>
            </div>

            <div className={`${c.notificationModal} ${errOnSend ? c.err : c.succ} ${isVisibleNtf ? c.visible : ''}`}>
                <div
                    onClick={() => {
                        setIsVisibleNtf(false)
                    }}
                    className={c.closeSmallBtn}>
                    <AiOutlineClose />
                </div>

                {errOnSend ? (
                    <>
                        <p className={c.subtitle}>Some error</p>
                        <p className={c.text}>{errOnSend}</p>
                    </>
                ) : (
                    <>
                        <p className={c.subtitle}>Message sent</p>
                        <p className={c.text}>
                            Your message has been sent to{' '}
                            <Link to={`/profile/${userId}`} onClick={closeModalHandler}>
                                {userName}
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </>
    )
}

export { ModalWindowWriteMessage }
