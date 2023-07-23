import { Button, Icon, Textarea } from '@chakra-ui/react'
import { AiOutlineSend } from 'react-icons/ai'
import c from './addMessageForm.module.scss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../store/redux/reduxStore'
import { CommonWSchatAC } from '../../../../../store/redux/commonWSchat/commonWSchatReducer'

type AddMessagePropsType = {
   WSChannel: null | WebSocket
   isOpenWSChannel: boolean
}

const MAX_LENGTH = 98

const AddMessageForm: React.FC<AddMessagePropsType> = ({ WSChannel, isOpenWSChannel }) => {
   const textareaValue = useSelector((state: GlobalStateType) => state.forCommonWSchatData.currentMessageFieldValue)
   const [countCharacters, setCountCharacters] = React.useState(textareaValue.length)

   const dispatch = useDispatch()

   const onChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
      dispatch(CommonWSchatAC.setCurrentMesageFieldValue(e.currentTarget.value))
      setCountCharacters(e.currentTarget.value.length)
   }

   const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      WSChannel?.send(textareaValue)
      dispatch(CommonWSchatAC.setCurrentMesageFieldValue(''))
   }
   return (
      <form onSubmit={onSubmitHandler}>
         <Textarea onInput={onChangeHandler} value={textareaValue} placeholder='Message' size='lg' resize='none' className={c.styledTextarea} maxLength={MAX_LENGTH} />
         <p className={c.charactersLeft}>{MAX_LENGTH - countCharacters} characters left</p>
         <div className={c.sendBtnWr}>
            <Button type='submit' rightIcon={<Icon as={AiOutlineSend} />} className={c.sendBtn} isDisabled={!textareaValue || !isOpenWSChannel}>
               Send
            </Button>
         </div>
      </form>
   )
}

export { AddMessageForm }
