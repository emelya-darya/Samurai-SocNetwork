import { Button, Checkbox, FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import c from './loginForm.module.scss'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineSend } from 'react-icons/ai'
import React from 'react'
import { useForm } from 'react-hook-form'
import { LuLogIn, LuLogOut } from 'react-icons/lu'
import { GlobalStateType, LogInDataToSend } from '../../../../store/redux/storeTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AuthAC } from '../../../../store/redux/auth/authReducer'
import { Navigate, useLocation } from 'react-router-dom'
import { RxUpdate } from 'react-icons/rx'

type LocationState = {
   from?: string
}

const regEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const LoginForm = () => {
   const locationObj = useLocation().state as LocationState
   let from: string = locationObj?.from || '/'

   const [showPassword, setShowPassword] = React.useState(false)
   const handleShowHidePassword = () => setShowPassword(!showPassword)

   const { isInProgressLogIn, captchaUrl, isInProgressGetCaptcha, isAuth } = useSelector((state: GlobalStateType) => state.forAuthData)

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
   }

   const refreshCaptchaHandler = () => dispatch(AuthAC.getCaptchaUrl())

   if (isAuth) return <Navigate to={from} />
   return (
      <form className={c.form} onSubmit={handleSubmit(submitHandler)}>
         <FormControl className={c.formControll} isInvalid={!!errors.email}>
            <FormLabel htmlFor='email' className={c.label}>
               Email address
            </FormLabel>
            <Input
               errorBorderColor='red.600'
               variant='outline'
               placeholder='Email*'
               className={c.styledInput}
               size='md'
               {...register('email', {
                  required: 'Required field',
                  validate: v => regEmail.test(String(v).toLowerCase()),
               })}
            />
            <p className={c.err}>{errors.email && (errors?.email.message || 'Invalid email address')}</p>
         </FormControl>

         <FormControl className={c.formControll} isInvalid={!!errors.password}>
            <FormLabel htmlFor='password' className={c.label}>
               Password
            </FormLabel>
            <InputGroup size='md'>
               <Input
                  {...register('password', {
                     required: 'Required field',
                     minLength: 4,
                  })}
                  pr='2.7rem'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  className={c.styledInput}
               />
               <InputRightElement style={{ width: 'auto' }}>
                  <Button onClick={handleShowHidePassword} className={c.eyeBtn}>
                     <Icon as={showPassword ? AiOutlineEye : AiOutlineEyeInvisible} />
                  </Button>
               </InputRightElement>
            </InputGroup>
            <p className={c.err}>{errors.password && (errors?.password.message || 'Minimum length 4')}</p>
         </FormControl>
         <div className={c.checkboxWr}>
            <Checkbox {...register('rememberMe')} colorScheme='orange' className={c.checkboxRememberMe} size='lg'>
               Remember me
            </Checkbox>
         </div>

         <p className={`${c.err} ${c.captchaErr}`}>{errOnGetCaptcha}</p>

         {captchaUrl && (
            <div className={c.captchaBlock}>
               <div className={c.captchaImgAndRefresh}>
                  <Button className={c.refreshBtn} variant='link' onClick={refreshCaptchaHandler} isLoading={isInProgressGetCaptcha}>
                     <Icon as={RxUpdate} />
                  </Button>
                  <div className={c.captchaImgWr}>
                     <img src={captchaUrl} alt='captcha' />
                  </div>
               </div>

               <FormControl className={c.formControll} isInvalid={!!errors.captcha}>
                  <FormLabel htmlFor='captcha' className={c.label}>
                     Enter text from image
                  </FormLabel>
                  <Input
                     errorBorderColor='red.600'
                     variant='outline'
                     placeholder='Captcha*'
                     className={c.styledInput}
                     size='md'
                     {...register('captcha', {
                        required: 'Required field',
                     })}
                  />
                  <p className={c.err}>{errors.captcha && errors?.captcha.message}</p>
               </FormControl>
            </div>
         )}

         <p className={c.errOnLogin}>{errOnLogIn}</p>

         <Button rightIcon={<Icon as={LuLogIn} />} className={c.updateBtn} type='submit' isDisabled={!isValid || !isDirty} isLoading={isInProgressLogIn}>
            Sign in
         </Button>
      </form>
   )
}

export { LoginForm }
