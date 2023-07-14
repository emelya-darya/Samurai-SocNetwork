import { Button, Icon, Input, InputGroup, InputRightElement, Textarea } from '@chakra-ui/react'
import c from './statusBlock.module.scss'
import { TfiThought } from 'react-icons/tfi'
import { AiOutlineEdit, AiOutlineSend } from 'react-icons/ai'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../store/redux/storeTypes'
import { ProfileAC } from '../../../../../store/redux/profile/profileReducer'

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

   if (!errOnGetStatus)
      return (
         <div className={c.status}>
            <Icon as={TfiThought} className={c.iconCloud} />
            <div className={c.iconContent}>
               {editMode ? (
                  <InputGroup size='md'>
                     <Input placeholder='Status...' variant='flushed' className={c.statusInput} autoFocus={true} onBlur={onUpdateStatusHandler} value={localStatusValue} onInput={onInputHandler} />
                     <InputRightElement width='28px'>
                        <Button size='sm' className={c.inputStatusSendBtn} onClick={onUpdateStatusHandler} isLoading={isUpdateStatusInProgress}>
                           <Icon as={AiOutlineSend} />
                        </Button>
                     </InputRightElement>
                  </InputGroup>
               ) : (
                  <span className={c.statusText}>{status?.trim() || '...'}</span>
               )}
               <p className={`${c.err} ${c.updateStatusErr}`}>{errOnUpdateProfileStatus}</p>
               {isMyProfile && !editMode && (
                  <Button className={c.statusUpdateBtn} title='Update status' type='button' onClick={installEditMode} isLoading={isUpdateStatusInProgress}>
                     <Icon as={AiOutlineEdit} />
                  </Button>
               )}
            </div>
         </div>
      )
   else
      return (
         <div className={c.status}>
            <Icon as={TfiThought} />
            <span className={c.err}>{errOnGetStatus}</span>
         </div>
      )
}

export { StatusBlock }
