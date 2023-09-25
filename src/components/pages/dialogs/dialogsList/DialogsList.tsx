import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import shortid from 'shortid'
import { DialogsAC } from '../../../../store/redux/dialogs/dialogsReducer'
import { GlobalStateType } from '../../../../store/redux/reduxStore'
import { PreloaderSmall } from '../../../reusableElements/preloaders/small/PreloaderSmall' 
import { colorsAvatars, shuffleArray } from '../../../reusableElements/userAvatarWithLink/colorsAvatars'
import { accentMainClr } from '../../../reusableElements/getCssVariableColor'
import { DialogItem } from './dialogItem/DialogItem'
import c from './dialogsList.module.scss'

const colors = [...colorsAvatars]
shuffleArray(colors)

const DialogsList = () => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(DialogsAC.getDialogsList())
    }, [])

    const { showingItems, isInProgressLoadingDialogsList } = useSelector((state: GlobalStateType) => state.forDialogsData.dialogsListData)
    const errOnLoadingsDialogsList = useSelector((state: GlobalStateType) => state.forErrorsData.dialogsErrors.errOnLoadingsDialogsList)

    const scrollHandler = function () {
        //Высота страницы с учетом скролла
        const a = document.documentElement.scrollHeight

        // Сколько прокручено сверху
        const b = document.documentElement.scrollTop

        //Высота видимой области страницы
        const c = window.innerHeight

        if (b + c + 50 > a) {
            dispatch(DialogsAC.increaseShowingPortion())
        }
    }

    React.useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    })

    return (
        <>
            <h1 className={c.title}>Dialogue list</h1>
            <p className={c.warn}>*working with REST API, not real time (only the last 200 dialogues are available)</p>

            {errOnLoadingsDialogsList ? (
                <p className={c.serverErrMessage}>{errOnLoadingsDialogsList}</p>
            ) : isInProgressLoadingDialogsList ? (
                <PreloaderSmall  color={accentMainClr} size={100} minHeight='75vh' />
            ) : (
                <div className={c.dialogsItems}>
                    {showingItems.length ? (
                        <>
                            {showingItems.map((d, idx) => {
                                if (d.photos.small) return <DialogItem key={shortid.generate()} {...d} />
                                else return <DialogItem key={shortid.generate()} {...d} colorAvatar={colors[idx % colors.length]} />
                            })}
                        </>
                    ) : (
                        <p className={c.emptyLett}>Dialog list is empty</p>
                    )}
                </div>
            )}
        </>
    )
}

export { DialogsList }
