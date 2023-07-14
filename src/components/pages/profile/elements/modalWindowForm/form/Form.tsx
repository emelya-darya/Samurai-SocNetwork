import React from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Icon, Input, Switch, Textarea } from '@chakra-ui/react'
import c from './form.module.scss'
import { AiOutlineCheck, AiOutlineSend } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../../store/redux/storeTypes'
import { ProfileAC } from '../../../../../../store/redux/profile/profileReducer'
import { BiError } from 'react-icons/bi'

type FormValues = {
   fullName: string
   lookingForAJob: boolean
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
const errUrlMessage = 'Enter a valid url'

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
         lookingForAJob: lookingForAJob || false,
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


   const submitHandler = (data: FormValues) => {
      const newObjData = {
         userId: userId || 1,
         fullName: data.fullName,
         lookingForAJob: data.lookingForAJob,
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
         }
      }

      setShouldShowErrLettOnSubmit(true)
      dispatch(ProfileAC.updateProfileData(newObjData))
      reset(data) // типа обновление defaultValues и сброс isDirty
   }


   return (
      <form className={c.form} onSubmit={handleSubmit(submitHandler)}>
         <div className={c.row1}>
            <Input
               isInvalid={!!errors.fullName}
               errorBorderColor='red.600'
               variant='outline'
               placeholder='Full name*'
               className={c.styledInput}
               size='md'
               {...register('fullName', { required: 'This field is required' })}
            />
            <p className={c.err}>{errors.fullName && errors?.fullName.message}</p>
         </div>
         <div className={c.row2}>
            <FormControl className={c.switchWr} style={{ width: 'auto' }}>
               <Switch {...register('lookingForAJob')} id='looking-for-a-job' className={c.switch} />
               <FormLabel htmlFor='looking-for-a-job'>Looking for a job</FormLabel>
            </FormControl>
            <Input {...register('lookingForAJobDescription')} variant='outline' placeholder='What job are you looking for?' className={c.styledInput} size='md' />
         </div>

         <div className={c.row3}>
            <FormControl>
               <FormLabel className={c.aboutMeTitle}>About me:</FormLabel>
               <Textarea {...register('aboutMe')} defaultValue={aboutMe || ''} placeholder='Tell about yourself' size='lg' resize='none' className={c.styledTextarea} />
            </FormControl>
         </div>

         <p className={c.contactsTitle}>How to contact me:</p>
         <div className={c.contactsFields}>
            <div className={c.contactFieldsRow}>
               <div className={c.contactInpWr}>
                  <Input
                     {...register('mainLink', { required: false, validate: checkURL })}
                     isInvalid={!!errors.mainLink}
                     variant='outline'
                     placeholder='Main link'
                     className={c.styledInput}
                     size='md'
                  />
                  <p className={c.err}>{errors.mainLink && errUrlMessage}</p>
               </div>
               <div className={c.contactInpWr}>
                  <Input {...register('github', { required: false, validate: checkURL })} isInvalid={!!errors.github} variant='outline' placeholder='Github' className={c.styledInput} size='md' />
                  <p className={c.err}>{errors.github && errUrlMessage}</p>
               </div>
            </div>

            <div className={c.contactFieldsRow}>
               <div className={c.contactInpWr}>
                  <Input {...register('website', { required: false, validate: checkURL })} isInvalid={!!errors.website} variant='outline' placeholder='Website' className={c.styledInput} size='md' />
                  <p className={c.err}>{errors.website && errUrlMessage}</p>
               </div>
               <div className={c.contactInpWr}>
                  <Input {...register('vk', { required: false, validate: checkURL })} isInvalid={!!errors.vk} variant='outline' placeholder='Vkontakte' className={c.styledInput} size='md' />
                  <p className={c.err}>{errors.vk && errUrlMessage}</p>
               </div>
            </div>

            <div className={c.contactFieldsRow}>
               <div className={c.contactInpWr}>
                  <Input {...register('twitter', { required: false, validate: checkURL })} isInvalid={!!errors.twitter} variant='outline' placeholder='Twitter' className={c.styledInput} size='md' />
                  <p className={c.err}>{errors.twitter && errUrlMessage}</p>
               </div>
               <div className={c.contactInpWr}>
                  <Input
                     {...register('facebook', { required: false, validate: checkURL })}
                     isInvalid={!!errors.facebook}
                     variant='outline'
                     placeholder='Facebook'
                     className={c.styledInput}
                     size='md'
                  />
                  <p className={c.err}>{errors.facebook && errUrlMessage}</p>
               </div>
            </div>

            <div className={c.contactFieldsRow}>
               <div className={c.contactInpWr}>
                  <Input {...register('youtube', { required: false, validate: checkURL })} isInvalid={!!errors.youtube} variant='outline' placeholder='Youtube' className={c.styledInput} size='md' />
                  <p className={c.err}>{errors.youtube && errUrlMessage}</p>
               </div>
               <div className={c.contactInpWr}>
                  <Input
                     {...register('instagram', { required: false, validate: checkURL })}
                     isInvalid={!!errors.instagram}
                     placeholder='Instagram'
                     className={c.styledInput}
                     variant='outline'
                     size='md'
                  />
                  <p className={c.err}>{errors.instagram && errUrlMessage}</p>
               </div>
            </div>
         </div>
         <Button rightIcon={<Icon as={AiOutlineSend} />} className={c.updateBtn} type='submit' isDisabled={!isValid || !isDirty} isLoading={isUpdateNewMainInfoInProgress}>
            Update
         </Button>

         <div className={`${submitCount && shouldShowSuccErrLettOnSubmit ? c.visible : ''} ${c.onSubmitErrOrSuccWr}`}>
            {errOnUpdateMainData ? (
               <div className={`${c.err} ${c.onSubmitErrOrSucc} `}>
                  <Icon as={BiError} />
                  <span>{errOnUpdateMainData}</span>
               </div>
            ) : (
               <div className={`${c.succ} ${c.onSubmitErrOrSucc}`}>
                  <Icon as={AiOutlineCheck} />
                  <span>Successfully updated</span>
               </div>
            )}
         </div>
      </form>
   )
}

export { Form }
