import React from 'react'
import { TfiThought } from 'react-icons/tfi'
import { AiOutlineEdit, AiOutlineSend } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../store/redux/storeTypes'
import { ProfileAC } from '../../../../../store/redux/profile/profileReducer'
import { Button } from '../../../../reusableElements/button/Button'
import { accentMainClr } from '../../../../reusableElements/getCssVariableColor'
import c from './statusBlock.module.scss'

type StatusBlockPropsType = {
    isMyProfile: boolean
}

const StatusBlock: React.FC<StatusBlockPropsType> = ({ isMyProfile }) => {
    const { status, isUpdateStatusInProgress } = useSelector((state: GlobalStateType) => state.forProfileData)
    const { errOnGetStatus, errOnUpdateProfileStatus } = useSelector((state: GlobalStateType) => state.forErrorsData.profileErrors)

    const [editMode, setEditMode] = React.useState(false)

    const installEditMode = () => setEditMode(true)

    const [localStatusValue, setLocalStatusValue] = React.useState(status || '')
    const onInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setLocalStatusValue(e.currentTarget.value)
    }
    React.useEffect(() => setLocalStatusValue(status || ''), [])

    const dispatch = useDispatch()
    const onUpdateStatusHandler = () => {
        if (localStatusValue.trim() === status?.trim()) setEditMode(false)
        else dispatch(ProfileAC.updateStatus(localStatusValue))
    }

    React.useEffect(() => {
        if (!isUpdateStatusInProgress) setEditMode(false)
    }, [isUpdateStatusInProgress])

    // перевод
    const { t } = useTranslation()

    if (!errOnGetStatus)
        return (
            <div className={c.status}>
                <TfiThought className={c.iconCloud} />
                <div className={c.iconContent}>
                    {editMode ? (
                        <div className={c.statusInputWr}>
                            <input
                                placeholder={t('profile.statusPlacehold')}
                                className={c.statusInput}
                                autoFocus={true}
                                onBlur={onUpdateStatusHandler}
                                value={localStatusValue}
                                onInput={onInputHandler}
                            />
                            <Button
                                name={null}
                                extraClassName={c.inputStatusSendBtn}
                                onClickHandler={onUpdateStatusHandler}
                                isLoading={isUpdateStatusInProgress}
                                isDisabled={false}
                                Icon={AiOutlineSend}
                                type='button'
                                preloaderClr={accentMainClr}
                            />
                        </div>
                    ) : (
                        <span className={c.statusText}>{status?.trim() || '...'}</span>
                    )}
                    <p className={`${c.err} ${c.updateStatusErr}`}>{errOnUpdateProfileStatus}</p>
                    {isMyProfile && !editMode && (
                        <Button
                            name={null}
                            Icon={AiOutlineEdit}
                            extraClassName={c.statusUpdateBtn}
                            title={t('profile.statusBtnTitle')}
                            type='button'
                            onClickHandler={installEditMode}
                            isLoading={isUpdateStatusInProgress}
                            isDisabled={false}
                            preloaderClr={accentMainClr}
                        />
                    )}
                </div>
            </div>
        )
    else
        return (
            <div className={c.status}>
                <TfiThought />
                <span className={c.err}>{errOnGetStatus}</span>
            </div>
        )
}

export { StatusBlock }
