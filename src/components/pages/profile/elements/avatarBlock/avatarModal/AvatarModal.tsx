import React, { SetStateAction } from 'react'
import c from './avatarModal.module.scss'
// import ReactCrop, { type Crop } from 'react-image-crop'
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/src/ReactCrop.scss'

import { useDispatch, useSelector } from 'react-redux'
import { ProfileAC } from '../../../../../../store/redux/profile/profileReducer'
import { useDebounceEffect } from './assets/useDebounceEffect'
import { canvasPreview } from './assets/canvasPreview'
import { centerAspectCrop } from './assets/centerAspectCrop'
import { Button, Icon } from '@chakra-ui/react'
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai'
import { GlobalStateType } from '../../../../../../store/redux/storeTypes'
// import 'react-image-crop/dist/ReactCrop.css'

type AvatarModalPropsType = {
   isOpen: boolean
   handleCloseModal: () => void
   imgSrc: string
   setImgSrc: React.Dispatch<SetStateAction<string>>
   crop: Crop | undefined
   setCrop: React.Dispatch<SetStateAction<Crop | undefined>>
}

const aspectRatio = 1 / 1

const AvatarModal: React.FC<AvatarModalPropsType> = ({ isOpen, handleCloseModal, imgSrc, setImgSrc, crop, setCrop }) => {
   const previewCanvasRefBig = React.useRef<HTMLCanvasElement>(null)
   const previewCanvasRefSmall = React.useRef<HTMLCanvasElement>(null)
   const imgRef = React.useRef<HTMLImageElement>(null)
   const [completedCrop, setCompletedCrop] = React.useState<PixelCrop>()

   function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspectRatio))
   }

   const dispatch = useDispatch()

   const onSendPhoto = function () {
      // if (!previewCanvasRefBig.current) throw new Error('Crop canvas does not exist')

      if (previewCanvasRefBig.current) {
         previewCanvasRefBig.current.toBlob(blob => {
            // if (!blob) throw new Error('Failed to create blob')
            if (blob) dispatch(ProfileAC.updatePhoto(blob))
         })
      }
   }

   useDebounceEffect(
      async () => {
         if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRefBig.current && previewCanvasRefSmall.current) {
            canvasPreview(imgRef.current, previewCanvasRefBig.current, completedCrop, 1, 0)
            canvasPreview(imgRef.current, previewCanvasRefSmall.current, completedCrop, 1, 0)
         }
      },
      100,
      [completedCrop]
   )

   const { isUploadNewPhotoInProgress } = useSelector((state: GlobalStateType) => state.forProfileData)

   const handleCloseWrapper = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      //@ts-ignore
      const classListArr = Array.from(e?.target?.classList || [])
      if (classListArr.includes('close') && e.button === 0) handleCloseModal()
   }

   React.useEffect(() => {
      if (!isUploadNewPhotoInProgress) handleCloseModal()
   }, [isUploadNewPhotoInProgress])
   return (
      <div className={`${c.avatarModal} ${isOpen ? c.visible : ''} close`} onMouseDown={handleCloseWrapper}>
         <div className={c.content}>
            <div className={`${c.closeBtn} close`}>
               <Icon as={AiOutlineClose} className='close' />
               <div className={`${c.closeBtnMask} close`}></div>
            </div>

            <p className={c.title}>Thumbnail selection</p>

            {!!imgSrc && (
               <div className={c.cropWr}>
                  <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={c => setCompletedCrop(c)} aspect={aspectRatio} circularCrop={true} className={c.cropBlock}>
                     <img ref={imgRef} alt='Crop me' src={imgSrc} onLoad={onImageLoad} />
                  </ReactCrop>
               </div>
            )}

            {!!completedCrop && (
               <>
                  <p className={c.lett}>Previews:</p>
                  <div className={c.thumbs}>
                     <canvas className={c.canvasBig} ref={previewCanvasRefBig} />
                     <canvas className={c.canvasSmall} ref={previewCanvasRefSmall} />
                  </div>
                  <div className={c.btnWr}>
                     <Button rightIcon={<Icon as={AiOutlineSend} />} className={c.updateBtn} type='submit' onClick={onSendPhoto} isLoading={isUploadNewPhotoInProgress}>
                        Apply
                     </Button>
                  </div>
               </>
            )}
         </div>
      </div>
   )
}

export { AvatarModal }
