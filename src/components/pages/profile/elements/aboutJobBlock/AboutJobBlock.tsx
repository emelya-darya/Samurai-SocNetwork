import { TbTarget, TbTargetOff } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { GlobalStateType } from '../../../../../store/redux/storeTypes'
import c from './aboutJob.module.scss'

const AboutJobBlock = () => {
    const { lookingForAJob, lookingForAJobDescription: lookForJobDesc } = useSelector((state: GlobalStateType) => state.forProfileData)

    // перевод
    const { t } = useTranslation()

    return (
        <div className={c.jobBlock}>
            {lookingForAJob ? (
                <div className={c.looking}>
                    <TbTarget />
                    <div>
                        <p className={c.clr}>{t('profile.lookingForAJob')}</p>
                        <p>{lookForJobDesc?.trim() && t('profile.jobDesc') + ': ' + lookForJobDesc?.trim() + ''}</p>
                    </div>
                </div>
            ) : (
                <div className={c.notLooking}>
                    <TbTargetOff />
                    <div>
                        <p className={c.clr}>{t('profile.alreadyHaveJob')}</p>
                        <p>{lookForJobDesc?.trim() && t('profile.jobDesc') + ': ' + lookForJobDesc?.trim() + ''}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export { AboutJobBlock }
