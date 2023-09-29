import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useLocation } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
import { RxUpdate } from 'react-icons/rx'
import { useForm } from 'react-hook-form'
import { LuLogIn } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'
import { GlobalStateType, LogInDataToSend } from '../../../../store/redux/storeTypes'
import { AuthAC } from '../../../../store/redux/auth/authReducer'
import { Button } from '../../../reusableElements/button/Button'
import { textClr } from '../../../reusableElements/getCssVariableColor'
import c from './loginForm.module.scss'

// type LocationState = {
//     from?: string
// }

const regEmail: RegExp =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const LoginForm = () => {
    //  const locationObj = useLocation().state as LocationState
    //  let from: string = locationObj?.from || '/'

    const [showPassword, setShowPassword] = React.useState(false)
    const handleShowHidePassword = () => setShowPassword(!showPassword)

    const { isInProgressLogIn, captchaUrl, isInProgressGetCaptcha } = useSelector((state: GlobalStateType) => state.forAuthData)

    const {
        authErrors: { errOnLogIn, errOnGetCaptcha },
    } = useSelector((state: GlobalStateType) => state.forErrorsData)

    const {
        reset,
        handleSubmit,
        register,
        formState: { errors, isDirty, isValid },
    } = useForm<LogInDataToSend>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            rememberMe: true,
            captcha: '',
        },
    })

    const dispatch = useDispatch()

    const submitHandler = (data: LogInDataToSend) => {
        dispatch(AuthAC.logIn(data))
        reset(data)
        // console.log(data)
    }

    const refreshCaptchaHandler = () => dispatch(AuthAC.getCaptchaUrl())

    // перевод
    const { t } = useTranslation()

    const reqFieldErr = t('login.reqFieldErr')

    return (
        <form className={c.form} onSubmit={handleSubmit(submitHandler)}>
            <div className={`${c.inputGroup} ${errors.email ? c.withError : ''}`}>
                <label htmlFor='email'>{t('login.emailLabel')}</label>

                <input
                    type='text'
                    id='email'
                    placeholder='Email*'
                    className={c.styledInput}
                    {...register('email', {
                        required: reqFieldErr,
                        validate: v => regEmail.test(String(v).toLowerCase()),
                    })}
                />
                <span className={c.spanErr}>{errors.email && (errors?.email.message || t('login.invalidEmailErr'))}</span>
            </div>
            <div className={`${c.inputGroup} ${errors.password ? c.withError : ''} ${c.passwordInputGroup}`}>
                <label htmlFor='password'>{t('login.passwordLabel')}</label>

                <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    placeholder={t('login.passwordPlacehold')}
                    className={c.styledInput}
                    {...register('password', {
                        required: reqFieldErr,
                        minLength: 4,
                    })}
                />
                <span className={c.spanErr}>{errors.password && (errors?.password.message || t('login.passwordErr'))}</span>

                <div className={c.eyeBtn} onClick={handleShowHidePassword}>
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
            </div>

            <div className={c.checkboxWr}>
                <input type='checkbox' id='rememberMe' hidden {...register('rememberMe')} />
                <label htmlFor='rememberMe'>
                    <span className={c.checkElem}>
                        <BsCheckLg />
                    </span>
                    <span className={c.checkBoxLett}>{t('login.remembLabel')}</span>
                </label>
            </div>

            <p className={`${c.err} ${c.captchaErr}`}>{errOnGetCaptcha}</p>

            {captchaUrl && (
                <div className={c.captchaBlock}>
                    <div className={c.captchaImgAndRefresh}>
                        <Button
                            name={null}
                            Icon={RxUpdate}
                            type='button'
                            extraClassName={c.refreshBtn}
                            isDisabled={false}
                            isLoading={isInProgressGetCaptcha}
                            onClickHandler={refreshCaptchaHandler}
                            preloaderClr={textClr}
                        />
                        <div className={c.captchaImgWr}>
                            <img src={captchaUrl} alt='captcha' />
                        </div>
                    </div>

                    <div className={`${c.inputGroup} ${errors.captcha ? c.withError : ''}`}>
                        <label htmlFor='captcha'>{t('login.captchaLabel')}</label>

                        <input
                            type='text'
                            id='captcha'
                            placeholder='Captcha*'
                            className={c.styledInput}
                            {...register('captcha', {
                                required: reqFieldErr,
                            })}
                        />
                        <span className={c.spanErr}>{errors.captcha && (errors?.captcha.message || reqFieldErr)}</span>
                    </div>
                </div>
            )}

            <p className={c.errOnLogin}>{errOnLogIn}</p>

            <Button
                name={t('login.signInBtn')}
                Icon={LuLogIn}
                extraClassName={c.signInBtn}
                type='submit'
                isDisabled={!isValid || !isDirty}
                isLoading={isInProgressLogIn}
            />
        </form>
    )
}

export { LoginForm }
