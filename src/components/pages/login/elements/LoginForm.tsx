import c from './loginForm.module.scss'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import React from 'react'
import { useForm } from 'react-hook-form'
import { LuLogIn, LuLogOut } from 'react-icons/lu'
import { GlobalStateType, LogInDataToSend } from '../../../../store/redux/storeTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AuthAC } from '../../../../store/redux/auth/authReducer'
import { Navigate, useLocation } from 'react-router-dom'
import { RxUpdate } from 'react-icons/rx'
import { BsCheckLg } from 'react-icons/bs'
import { Button } from '../../../reusableElements/button/Button'

type LocationState = {
   from?: string
}

const regEmail: RegExp =
   /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const LoginForm = () => {
   const locationObj = useLocation().state as LocationState
   let from: string = locationObj?.from || '/'

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
      formState: { errors, isDirty, isValid, submitCount },
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

   return (
      <form className={c.form} onSubmit={handleSubmit(submitHandler)}>
         <div className={`${c.inputGroup} ${errors.email ? c.withError : ''}`}>
            <label htmlFor='email'>Email address</label>

            <input
               type='text'
               id='email'
               placeholder='Email*'
               className={c.styledInput}
               {...register('email', {
                  required: 'Required field',
                  validate: v => regEmail.test(String(v).toLowerCase()),
               })}
            />
            <span className={c.spanErr}>{errors.email && (errors?.email.message || 'Invalid email address')}</span>
         </div>
         <div className={`${c.inputGroup} ${errors.password ? c.withError : ''} ${c.passwordInputGroup}`}>
            <label htmlFor='password'>Password</label>

            <input
               type={showPassword ? 'text' : 'password'}
               id='password'
               placeholder='Enter password'
               className={c.styledInput}
               {...register('password', {
                  required: 'Required field',
                  minLength: 4,
               })}
            />
            <span className={c.spanErr}>{errors.password && (errors?.password.message || 'Minimum length 4')}</span>

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
               <span className={c.checkBoxLett}>Remember me</span>
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
                     preloaderClr='#A0450B'
                  />
                  <div className={c.captchaImgWr}>
                     <img src={captchaUrl} alt='captcha' />
                  </div>
               </div>

               <div className={`${c.inputGroup} ${errors.captcha ? c.withError : ''}`}>
                  <label htmlFor='captcha'>Enter text from image</label>

                  <input
                     type='text'
                     id='captcha'
                     placeholder='Captcha*'
                     className={c.styledInput}
                     {...register('captcha', {
                        required: 'Required field',
                     })}
                  />
                  <span className={c.spanErr}>{errors.captcha && (errors?.captcha.message || 'Required field')}</span>
               </div>
            </div>
         )}

         <p className={c.errOnLogin}>{errOnLogIn}</p>

         <Button
            name='Sign in'
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
