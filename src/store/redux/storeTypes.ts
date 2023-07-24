export type { GlobalStateType, AppDispatchType } from './reduxStore'
// export GlobalStateType, AppDispatch

export type GetActionWInferType<T> = T extends { [key: string]: infer U } ? U : never


enum CommonResultCodesEnum {
   Success = 0,
   Error = 1,
}

// enum LoginResultCodesEnum {
// 	Success = 0,
// 	Error = 1,
// 	ErrorCaptchaRequired = 10
// }

export type GenericResponceType<DT = {}, RC = CommonResultCodesEnum> = {
   resultCode: RC
   messages: Array<string>
   fieldErrors: Array<string>
   data: DT
}

export type MostFrequentResponseType = {
   resultCode: 0 | 1
   messages: Array<string>
   data: {}
}

//*--------------------------------------------------------------Users Reducer-------------------------------------------------------*//
export type UserFriendItemType = {
   followed: boolean
   fetchingFollowingProgress?: boolean // появляется только после того, как массив пользователей впервые попал в state
   name: string | null
   id: number
   uniqueUrlName: string | null
   photos: {
      small: string | null
      large: string | null
   }
   status: string | null
}

export type GetUsersFriendsServerResponseDataType = {
   error: null | string
   items: Array<UserFriendItemType>
   totalCount: number
}

//*--------------------------------------------------------------Profile Reducer-------------------------------------------------------*//
export type ProfileDataTypeOnSend = {
   userId: number
   lookingForAJob: boolean
   lookingForAJobDescription: string | null
   fullName: string
   aboutMe: string | null
   contacts: {
      github: string | null
      vk: string | null
      facebook: string | null
      instagram: string | null
      twitter: string | null
      website: string | null
      youtube: string | null
      mainLink: string | null
   }
}

export type ProfileDataTypeOnGet = ProfileDataTypeOnSend & { photos: PhotosType }

export type PhotosType = {
   small: string | null
   large: string | null
}

export type UploadPhotoResponceDataType = {
   resultCode: 0 | 1
   messages: Array<string>
   data: {
      photos: PhotosType
   }
}

// export type UploadPhotoResponceDataType = GenericResponceType<{ photos: PhotosType }>
export type UpdateProfileResponceDataType = GenericResponceType

// *--------------------------------------------------------------Auth Reducer-------------------------------------------------------*//

export type AuthMeResponseDataType =
   | {
        resultCode: 0
        messages: []
        fieldsErrors: []
        data: AuthDataFromRespType
     }
   | {
        resultCode: 1
        messages: Array<string>
        fieldsErrors: Array<string>
        data: {}
     }

export type AuthDataFromRespType = {
   id: number
   email: string
   login: string
}

export type AuthDataToSetType = {
   id: number | null
   email: string | null
   login: string | null
}

export type LogInDataToSend = {
   email: string
   password: string
   rememberMe: boolean
   captcha?: string
}

// *--------------------------------------------------------------Common WS Chat Reducer-------------------------------------------------------*//

export type CommonWSChatMessageType = {
   message: string
   photo: string | null
   userId: number
   userName: string
}
