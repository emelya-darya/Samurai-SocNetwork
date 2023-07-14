import { GetActionWInferType, PhotosType, ProfileDataTypeOnGet, ProfileDataTypeOnSend } from '../storeTypes'
import {
   CHANGE_FOLLOW_STAT,
   GET_PROFILE_DATA,
   SET_IS_FOLLOWED,
   SET_IS_IN_PROGRESS_CHANGE_FOLLOW_STAT,
   SET_IS_IN_PROGRESS_UPDATE_MAIN_INFO,
   SET_IS_IN_PROGRESS_UPDATE_STATUS,
   SET_IS_IN_PROGRESS_UPLOAD_NEW_PHOTO,
   SET_IS_LOADING_PROFILE,
   SET_MAIN_PORTION_PROFILE_DATA,
   SET_NEW_FOLLOW_STAT,
   SET_NEW_PHOTOS,
   SET_NEW_PROFILE_DATA,
   SET_STATUS,
   UPDATE_PHOTO,
   UPDATE_PROFILE_DATA,
   UPDATE_STATUS,
} from './constants'

const initialState = {
   userId: null as number | null,
   lookingForAJob: null as null | boolean,
   lookingForAJobDescription: null as string | null,
   fullName: null as string | null,
   aboutMe: null as string | null,
   contacts: {
      github: null as string | null,
      vk: null as string | null,
      facebook: null as string | null,
      instagram: null as string | null,
      twitter: null as string | null,
      website: null as string | null,
      youtube: null as string | null,
      mainLink: null as string | null,
   },
   photos: {
      small: null as string | null,
      large: null as string | null,
   },

   status: null as string | null,
   isFollowed: null as boolean | null,

   isLoadingProfile: false as boolean,
   isFetchingFollowUnfollowInProgress: false as boolean,

   isUpdateStatusInProgress: false as boolean,
   isUploadNewPhotoInProgress: false as boolean,
   isUpdateNewMainInfoInProgress: false as boolean,
}

type InitialProfileStateType = typeof initialState

export const profileReducer = function (state: InitialProfileStateType = initialState, action: AllACProfileTypes): InitialProfileStateType {
   switch (action.type) {
      case SET_MAIN_PORTION_PROFILE_DATA:
         return {
            ...state,
            ...action.data,
         }

      case SET_STATUS:
         return { ...state, status: action.status }

      case SET_IS_FOLLOWED:
         return { ...state, isFollowed: action.isFollowed }

      case SET_IS_LOADING_PROFILE:
         return { ...state, isLoadingProfile: action.isLoading }

      case SET_NEW_FOLLOW_STAT:
         return { ...state, isFollowed: !state.isFollowed }

      case SET_IS_IN_PROGRESS_CHANGE_FOLLOW_STAT:
         return { ...state, isFetchingFollowUnfollowInProgress: action.isInProgress }

      case SET_IS_IN_PROGRESS_UPDATE_STATUS:
         return { ...state, isUpdateStatusInProgress: action.isInProgress }

      case SET_NEW_PHOTOS:
         return { ...state, photos: action.photos }

      case SET_IS_IN_PROGRESS_UPLOAD_NEW_PHOTO:
         return { ...state, isUploadNewPhotoInProgress: action.isInProgress }

      case SET_NEW_PROFILE_DATA:
         return { ...state, ...action.profileData }

      case SET_IS_IN_PROGRESS_UPDATE_MAIN_INFO:
         return { ...state, isUpdateNewMainInfoInProgress: action.isInProgress }

      default:
         return state
   }
}

export type ProfileReducerType = typeof profileReducer

export const ProfileAC = {
   getProfileData: (userId: number) => ({ type: GET_PROFILE_DATA, userId } as const),
   setLargePortionData: (data: ProfileDataTypeOnGet) => ({ type: SET_MAIN_PORTION_PROFILE_DATA, data } as const),
   setStatus: (status: string | null) => ({ type: SET_STATUS, status } as const),
   setIsFollowed: (isFollowed: boolean) => ({ type: SET_IS_FOLLOWED, isFollowed } as const),
   setIsLoadingProfile: (isLoading: boolean) => ({ type: SET_IS_LOADING_PROFILE, isLoading } as const),

   changeFollowStatus: (userId: number, currentFollowStat: boolean) => ({ type: CHANGE_FOLLOW_STAT, userId, currentFollowStat } as const),
   setNewFollowStat: () => ({ type: SET_NEW_FOLLOW_STAT } as const),
   setIsInProgressChangeFollowStat: (isInProgress: boolean) => ({ type: SET_IS_IN_PROGRESS_CHANGE_FOLLOW_STAT, isInProgress } as const),

   updateStatus: (status: string) => ({ type: UPDATE_STATUS, status } as const),
   setIsInProgressUpdateStatus: (isInProgress: boolean) => ({ type: SET_IS_IN_PROGRESS_UPDATE_STATUS, isInProgress } as const),

   updatePhoto: (photoFile: string | Blob) => ({ type: UPDATE_PHOTO, photoFile } as const),
   setNewPhotos: (photos: PhotosType) => ({ type: SET_NEW_PHOTOS, photos } as const),
   setIsInProgressUpdatePhotos: (isInProgress: boolean) => ({ type: SET_IS_IN_PROGRESS_UPLOAD_NEW_PHOTO, isInProgress } as const),

   updateProfileData: (profileData: ProfileDataTypeOnSend) => ({ type: UPDATE_PROFILE_DATA, profileData } as const),
   setNewProfileData: (profileData: ProfileDataTypeOnSend) => ({ type: SET_NEW_PROFILE_DATA, profileData } as const),
   setIsInProgressUpdateProfileData: (isInProgress: boolean) => ({ type: SET_IS_IN_PROGRESS_UPDATE_MAIN_INFO, isInProgress } as const),
}

export type AllACProfileTypes = ReturnType<GetActionWInferType<typeof ProfileAC>>
