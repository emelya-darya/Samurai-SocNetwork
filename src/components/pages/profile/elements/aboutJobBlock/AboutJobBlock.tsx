import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../store/redux/storeTypes'
import c from './aboutJob.module.scss'
import { TbTarget, TbTargetOff } from 'react-icons/tb'

const AboutJobBlock = () => {

   const { lookingForAJob, lookingForAJobDescription: lookForJobDesc } = useSelector((state: GlobalStateType) => state.forProfileData)
   
   return (
      <div className={c.jobBlock}>
         {lookingForAJob ? (
            <div className={c.looking}>
               <TbTarget/>
               <div>
                  <p className={c.clr}>Looking for a job</p>
                  <p>{lookForJobDesc?.trim() && 'Details: ' + lookForJobDesc?.trim() + ''}</p>
               </div>
            </div>
         ) : (
            <div className={c.notLooking}>
               <TbTargetOff/>
               <div>
                  <p className={c.clr}>Already have a job</p>
                  <p>{lookForJobDesc?.trim() && 'Details: ' + lookForJobDesc?.trim() + ''}</p>
               </div>
            </div>
         )}
      </div>
   )
}

export { AboutJobBlock }
