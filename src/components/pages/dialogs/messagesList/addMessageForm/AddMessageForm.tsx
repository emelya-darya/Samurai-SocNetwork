import React from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { DialogsAC } from '../../../../../store/redux/dialogs/dialogsReducer'
import { GlobalStateType } from '../../../../../store/redux/reduxStore'
import { Button } from '../../../../reusableElements/button/Button'
import { accentMainClr } from '../../../../reusableElements/getCssVariableColor'
import c from './addMessageForm.module.scss'

type AddMessageFormPropsType = {
    userId: number
    anchorRefForAutoscroll?: React.RefObject<HTMLDivElement> | null
}

const MAX_LENGTH = 990

const AddMessageForm: React.FC<AddMessageFormPropsType> = ({ userId, anchorRefForAutoscroll }) => {
    const errOnSubmit = useSelector((state: GlobalStateType) => state.forErrorsData.dialogsErrors.errOnSendMessage)
    const isInProgressSendMessage = useSelector((state: GlobalStateType) => state.forDialogsData.isInProgressSendMessage)

    const dispatch = useDispatch()
    const [textareaValue, setTextareaValue] = React.useState('')
    const [countCharacters, setCountCharacters] = React.useState(textareaValue.length)

    const onChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setTextareaValue(e.currentTarget.value)
        setCountCharacters(e.currentTarget.value.length)
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(DialogsAC.sendMessage(textareaValue.trim(), userId))
        //! обработка ошибки и успешной отправки, поменять тексты ошибок в сагах
    }

    React.useEffect(() => {
        if (!isInProgressSendMessage && !errOnSubmit && anchorRefForAutoscroll?.current) {
            setTextareaValue('')
            setCountCharacters(0)
            anchorRefForAutoscroll.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        }
    }, [isInProgressSendMessage])

    // перевод
    const { t } = useTranslation()

    return (
        <form className={c.form} onSubmit={onSubmitHandler}>
            <textarea
                onInput={onChangeHandler}
                value={textareaValue}
                placeholder={t('messagesList.formPlaceholder')}
                className={c.styledTextarea}
                maxLength={MAX_LENGTH}
                // onKeyUp={onKeyupHandler}
            />
            <p className={c.charactersLeft}>
                {MAX_LENGTH - countCharacters} {t('messagesList.charLeft')}
            </p>

            <Button
                name={null}
                Icon={AiOutlineSend}
                type='submit'
                isDisabled={!textareaValue}
                isLoading={isInProgressSendMessage}
                extraClassName={c.sendBtn}
                preloaderClr={accentMainClr}
            />
            <p className={c.errOnSend}>{errOnSubmit}</p>
        </form>
    )
}
export { AddMessageForm }
