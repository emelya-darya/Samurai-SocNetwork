import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'
import ru from 'date-fns/locale/ru'
import en from 'date-fns/locale/en-US'
import { GlobalStateType } from '../../../../../store/redux/reduxStore'
import { PreloaderSmall } from '../../../../reusableElements/preloaders/small/PreloaderSmall'
import { DialogsAC } from '../../../../../store/redux/dialogs/dialogsReducer'
import { mainBgClr } from '../../../../reusableElements/getCssVariableColor'
import c from './calendar.module.scss'

type CalendarPropsType = {
    anchorRefForAutoscroll?: React.RefObject<HTMLDivElement> | null
}

const Calendar: React.FC<CalendarPropsType> = ({ anchorRefForAutoscroll }) => {
    const { isInProgressGetNewerThanMessages: isInProgress, dateToGetMessagesNewerThan } = useSelector(
        (state: GlobalStateType) => state.forDialogsData.messagesListData,
    )

    const error = useSelector((state: GlobalStateType) => state.forErrorsData.dialogsErrors.errOnGetNewerThanMessages)

    const [calendarDate, setCalendarDate] = React.useState<Date | null>(null)

    const calendarValueToEqual = calendarDate?.toISOString() || null

    const isDisabledBtn = dateToGetMessagesNewerThan === calendarValueToEqual || isInProgress

    const dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(DialogsAC.getMessagesNewerThan(calendarDate?.toISOString() || null))
    }

    React.useEffect(() => {
        anchorRefForAutoscroll?.current?.scrollIntoView({ block: 'nearest', inline: 'start' })
    }, [dateToGetMessagesNewerThan])

    // перевод
    const { t, i18n } = useTranslation()

    return (
        <div className={c.calendarWr}>
            <p className={c.subtitle}>{t('messagesList.receiveAfter')}:</p>
            <div className={c.selectBtn}>
                <DatePicker
                    selected={calendarDate}
                    onChange={date => {
                        setCalendarDate(date)
                    }}
                    showIcon
                    isClearable={true}
                    // showTimeSelect
                    excludeDateIntervals={[{ start: new Date(Date.now()), end: new Date(Date.now() * 10) }]}
                    dateFormat={i18n.language === 'ru' ? 'dd.MM.yyyy' : 'yyyy/MM/dd'}
                    locale={i18n.language === 'ru' ? ru : en}
                    // closeOnScroll={true}
                    className='custom-calendar-input'
                    calendarClassName='custom-calendar-dropdown'
                    placeholderText={t('messagesList.noFilter')}
                />
                <button className={c.getBtn} disabled={isDisabledBtn || isInProgress} onClick={onClickHandler}>
                    {isInProgress ? (
                        <PreloaderSmall color={mainBgClr} size={17} minHeight='17px' />
                    ) : (
                        <span>{t('messagesList.getBtn')}</span>
                    )}
                </button>
                <p className={c.err}>{error}</p>
            </div>
        </div>
    )
}
export { Calendar }

//    на сервере время по UTC без смещения

// с сервера приходит  '2023-07-18T17:41:19.697'
// календарь выдает    '2023-09-08T04:06:54.839Z'

// на сервере сейчас           2023-09-08T04:12:47.09
// календарь выдает что сейчас 2023-09-08T04:00:00.000Z

// const timezoneOffset = new Date(Date.now()).getTimezoneOffset()
// console.log(timezoneOffset * 60 * 1000)
