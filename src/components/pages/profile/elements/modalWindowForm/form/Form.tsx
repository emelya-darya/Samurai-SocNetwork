import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineCheck, AiOutlineSend } from 'react-icons/ai'
import { BiError } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GlobalStateType } from '../../../../../../store/redux/storeTypes'
import { ProfileAC } from '../../../../../../store/redux/profile/profileReducer'
import { Button } from '../../../../../reusableElements/button/Button'
import { Switch } from '../switchLookingForAJob/Switch'
import c from './form.module.scss'

type FormValues = {
    fullName: string
    // lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    mainLink: string
    github: string
    website: string
    vk: string
    twitter: string
    facebook: string
    youtube: string
    instagram: string
}

const checkURL = (inpVal: string) => {
    if (inpVal == '') return true
    const regexQuery = '^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w\\/]*)?$'
    const url = new RegExp(regexQuery, 'i')
    return url.test(inpVal)
}

type FormPropsType = {
    shouldShowSuccErrLettOnSubmit: boolean
    setShouldShowErrLettOnSubmit: React.Dispatch<React.SetStateAction<boolean>>
}

const Form: React.FC<FormPropsType> = ({ shouldShowSuccErrLettOnSubmit, setShouldShowErrLettOnSubmit }) => {
    const {
        userId,
        fullName,
        lookingForAJob,
        lookingForAJobDescription,
        aboutMe,
        contacts: { mainLink, github, website, vk, twitter, facebook, youtube, instagram },
        isUpdateNewMainInfoInProgress,
    } = useSelector((state: GlobalStateType) => state.forProfileData)

    const {
        profileErrors: { errOnUpdateMainData },
    } = useSelector((state: GlobalStateType) => state.forErrorsData)

    const dispatch = useDispatch()

    const {
        reset,
        handleSubmit,
        register,
        formState: { errors, isDirty, isValid, submitCount },
    } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: {
            fullName: fullName || '',
            // lookingForAJob: lookingForAJob || false,
            lookingForAJobDescription: lookingForAJobDescription || '',
            aboutMe: aboutMe || '',
            mainLink: mainLink || '',
            github: github || '',
            website: website || '',
            vk: vk || '',
            twitter: twitter || '',
            facebook: facebook || '',
            youtube: youtube || '',
            instagram: instagram || '',
        },
    })

    // * --------------- работа с переключателем lookingForAJob ---------------------//
    const [isLookingForAJobLocal, setIsLookingForAJobLocal] = React.useState(!!lookingForAJob)

    React.useEffect(() => {
        setIsLookingForAJobLocal(!!lookingForAJob)
    }, [lookingForAJob])

    const isChangedLookingForAJob = Boolean(lookingForAJob) !== Boolean(isLookingForAJobLocal)

    // выключена, если форма не валидна  ИЛИ (!isDirty(поляформы, кроме lookingForAJob не тронуты) && !isChangedLookingForAJob)
    const isDisabledBtnUpdate = !isValid || (!isDirty && !isChangedLookingForAJob)

    // * --------------- работа с переключателем lookingForAJob ---------------------//

    const submitHandler = (data: FormValues) => {
        const newObjData = {
            userId: userId || 1,
            fullName: data.fullName,
            lookingForAJob: isLookingForAJobLocal,
            lookingForAJobDescription: data.lookingForAJobDescription,
            aboutMe: data.aboutMe,
            contacts: {
                github: data.github,
                vk: data.vk,
                facebook: data.facebook,
                instagram: data.instagram,
                twitter: data.twitter,
                website: data.website,
                youtube: data.youtube,
                mainLink: data.mainLink,
            },
        }

        setShouldShowErrLettOnSubmit(true)
        dispatch(ProfileAC.updateProfileData(newObjData))
        reset(data) // обновление defaultValues и сброс isDirty
    }

    // перевод
    const { t } = useTranslation()

    const errUrlMessage = t('profile.errUrlMessage')

    return (
        <form className={c.form} onSubmit={handleSubmit(submitHandler)}>
            <div className={c.row1}>
                <div className={`${c.inputGroup} ${errors.fullName ? c.withError : ''}`}>
                    <input
                        type='text'
                        placeholder={t('profile.fullNamePlaceholder') + '*'}
                        className={c.styledInput}
                        {...register('fullName', { required: t('profile.reqFieldErr') })}
                    />
                    <span className={c.spanErr}>{errors.fullName && errors?.fullName.message}</span>
                </div>
            </div>
            <div className={c.row2}>
                <div className={c.switchWr}>
                    <input
                        type='checkbox'
                        checked={isLookingForAJobLocal}
                        hidden
                        id='lookingForAJob'
                        onChange={e => {
                            setIsLookingForAJobLocal(e.target.checked)
                        }}
                    />
                    <label htmlFor='lookingForAJob' className={c.lookingForAJobLabel}>
                        <Switch isSelected={isLookingForAJobLocal} />

                        <span className={c.lett}>{t('profile.lookingFJobLett')}</span>
                    </label>
                </div>

                <div className={`${c.inputGroup} ${errors.lookingForAJobDescription ? c.withError : ''}`}>
                    <input
                        type='text'
                        placeholder={t('profile.lookingForAJobDescPlacehold')}
                        className={c.styledInput}
                        {...register('lookingForAJobDescription', { required: t('profile.reqFieldErr') })}
                    />
                    <span className={c.spanErr}>{errors.lookingForAJobDescription && errors?.lookingForAJobDescription.message}</span>
                </div>
            </div>

            <div className={c.row3}>
                <div className={`${c.inputGroup} ${errors.aboutMe ? c.withError : ''}`}>
                    <label htmlFor='aboutMe' className={c.aboutMeTitle}>
                        {t('profile.aboutMeModalSubt')}:
                    </label>

                    <textarea
                        id='aboutMe'
                        placeholder={t('profile.aboutMePlacehold')}
                        className={c.styledTextarea}
                        // defaultValue={aboutMe || ''}

                        {...register('aboutMe', { required: t('profile.reqFieldErr') })}
                    />

                    <span className={c.spanErr}>{errors.aboutMe && errors?.aboutMe.message}</span>
                </div>
            </div>

            <p className={c.contactsTitle}>{t('profile.contactModalSubt')}:</p>
            <div className={c.contactsFields}>
                <div className={c.contactFieldsRow}>
                    <div className={`${c.inputGroup} ${errors.mainLink ? c.withError : ''}`}>
                        <input
                            type='text'
                            placeholder={t('profile.mainLinkPlacehold')}
                            className={c.styledInput}
                            {...register('mainLink', { required: false, validate: checkURL })}
                        />
                        <span className={c.spanErr}>{errors.mainLink && errUrlMessage}</span>
                    </div>

                    <div className={`${c.inputGroup} ${errors.github ? c.withError : ''}`}>
                        <input
                            type='text'
                            placeholder='Github'
                            className={c.styledInput}
                            {...register('github', { required: false, validate: checkURL })}
                        />
                        <span className={c.spanErr}>{errors.github && errUrlMessage}</span>
                    </div>
                </div>

                <div className={c.contactFieldsRow}>
                    <div className={`${c.inputGroup} ${errors.website ? c.withError : ''}`}>
                        <input
                            type='text'
                            placeholder={t('profile.websitePlacehold')}
                            className={c.styledInput}
                            {...register('website', { required: false, validate: checkURL })}
                        />
                        <span className={c.spanErr}>{errors.website && errUrlMessage}</span>
                    </div>

                    <div className={`${c.inputGroup} ${errors.vk ? c.withError : ''}`}>
                        <input
                            type='text'
                            placeholder='Vkontakte'
                            className={c.styledInput}
                            {...register('vk', { required: false, validate: checkURL })}
                        />
                        <span className={c.spanErr}>{errors.vk && errUrlMessage}</span>
                    </div>
                </div>

                <div className={c.contactFieldsRow}>
                    <div className={`${c.inputGroup} ${errors.twitter ? c.withError : ''}`}>
                        <input
                            type='text'
                            placeholder='Twitter'
                            className={c.styledInput}
                            {...register('twitter', { required: false, validate: checkURL })}
                        />
                        <span className={c.spanErr}>{errors.twitter && errUrlMessage}</span>
                    </div>

                    <div className={`${c.inputGroup} ${errors.facebook ? c.withError : ''}`}>
                        <input
                            type='text'
                            placeholder='Facebook'
                            className={c.styledInput}
                            {...register('facebook', { required: false, validate: checkURL })}
                        />
                        <span className={c.spanErr}>{errors.facebook && errUrlMessage}</span>
                    </div>
                </div>

                <div className={c.contactFieldsRow}>
                    <div className={`${c.inputGroup} ${errors.youtube ? c.withError : ''}`}>
                        <input
                            type='text'
                            placeholder='Youtube'
                            className={c.styledInput}
                            {...register('youtube', { required: false, validate: checkURL })}
                        />
                        <span className={c.spanErr}>{errors.youtube && errUrlMessage}</span>
                    </div>

                    <div className={`${c.inputGroup} ${errors.instagram ? c.withError : ''}`}>
                        <input
                            type='text'
                            placeholder='Instagram'
                            className={c.styledInput}
                            {...register('instagram', { required: false, validate: checkURL })}
                        />
                        <span className={c.spanErr}>{errors.instagram && errUrlMessage}</span>
                    </div>
                </div>
            </div>

            <Button
                Icon={AiOutlineSend}
                extraClassName={c.updateBtn}
                type='submit'
                isDisabled={isDisabledBtnUpdate}
                isLoading={isUpdateNewMainInfoInProgress}
                name={t('profile.updateBtn')}
            />

            <div className={`${submitCount && shouldShowSuccErrLettOnSubmit ? c.visible : ''} ${c.onSubmitErrOrSuccWr}`}>
                {errOnUpdateMainData ? (
                    <div className={`${c.err} ${c.onSubmitErrOrSucc} `}>
                        <BiError />
                        <span>{errOnUpdateMainData}</span>
                    </div>
                ) : (
                    <div className={`${c.succ} ${c.onSubmitErrOrSucc}`}>
                        <AiOutlineCheck />
                        <span>{t('profile.succUpd')}</span>
                    </div>
                )}
            </div>
        </form>
    )
}

export { Form }
