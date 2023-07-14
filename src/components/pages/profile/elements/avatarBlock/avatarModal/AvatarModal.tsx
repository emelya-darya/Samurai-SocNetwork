import c from './avatarModal.module.scss'

type AvatarModalPropsType = {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const AvatarModal: React.FC<AvatarModalPropsType> = ({isOpen, setIsOpen}) => {
   return <></>
}

export { AvatarModal }
