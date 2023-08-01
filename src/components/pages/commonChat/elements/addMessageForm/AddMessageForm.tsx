import { Button, Icon, Textarea } from '@chakra-ui/react'
import { AiOutlineSend } from 'react-icons/ai'
import c from './addMessageForm.module.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../store/redux/reduxStore'

type AddMessagePropsType = {
   WSChannel: null | WebSocket
   isOpenWSChannel: boolean
}

const MAX_LENGTH = 98

const AddMessageForm: React.FC<AddMessagePropsType> = ({ WSChannel, isOpenWSChannel }) => {
   // console.log('ререндер AddMessageForm')
   const [textareaValue, setTextareaValue] = React.useState('')
   const [countCharacters, setCountCharacters] = React.useState(textareaValue.length)

   const onChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
      setTextareaValue(e.currentTarget.value)
      setCountCharacters(e.currentTarget.value.length)
   }

   const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      WSChannel?.send(textareaValue)
      setTextareaValue('')
      setCountCharacters(0)
   }

   const onKeyupHandler = (e: React.KeyboardEvent) => {
      if (document.activeElement === e.currentTarget && e.code === 'Enter') {
         WSChannel?.send(textareaValue)
         setTextareaValue('')
         setCountCharacters(0)
      }
   }

   return (
      <form className={c.form} onSubmit={onSubmitHandler}>
         <Textarea onInput={onChangeHandler} value={textareaValue} placeholder='Message' size='lg' resize='none' className={c.styledTextarea} maxLength={MAX_LENGTH} onKeyUp={onKeyupHandler} />
         <p className={c.charactersLeft}>{MAX_LENGTH - countCharacters} characters left</p>

         <Button type='submit' className={c.sendBtn} isDisabled={!textareaValue || !isOpenWSChannel}>
            <Icon as={AiOutlineSend} />
         </Button>
      </form>
   )
}

export { AddMessageForm }
