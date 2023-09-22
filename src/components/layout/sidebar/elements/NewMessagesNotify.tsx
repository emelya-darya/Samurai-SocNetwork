import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DialogsAC } from '../../../../store/redux/dialogs/dialogsReducer'
import { GlobalStateType } from '../../../../store/redux/reduxStore'
import c from './notify.module.scss'

const NewMessagesNotify = () => {
    const isAuth = useSelector((state: GlobalStateType) => state.forAuthData.isAuth)
    const newMessagesCount = useSelector((state: GlobalStateType) => state.forDialogsData.newMessagesCount)
    const newMessagesCountFormatted = String(newMessagesCount).length > 2 ? String(newMessagesCount)[0] + '..' : String(newMessagesCount)

    const timerRef = React.useRef<null | NodeJS.Timer>(null)

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (isAuth) {
            dispatch(DialogsAC.getNewMessagesCount())

            timerRef.current = setInterval(() => {
                dispatch(DialogsAC.getNewMessagesCount())
            }, 10000)
        } else {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isAuth])

    if (newMessagesCount && isAuth)
        return (
            <div className={c.newMessagesNotify}>
                <span>{newMessagesCountFormatted}</span>
            </div>
        )
    else return <></>
}

export { NewMessagesNotify }
