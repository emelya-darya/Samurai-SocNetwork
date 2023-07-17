import axios from 'axios'
import {
   MostFrequentResponseType,
   GetUsersFriendsServerResponseDataType,
   ProfileDataTypeOnGet,
   ProfileDataTypeOnSend,
   UploadPhotoResponceDataType,
   UserFriendItemType,
   AuthMeResponseDataType,
} from '../redux/storeTypes'

// axios можно настроить с помощью create, чтобы не дублировать каждый раз объект с параметрами и базовый URL
const instance = axios.create({
   withCredentials: true,
   headers: { 'API-KEY': '2e81e931-b17a-4d38-9854-aa3c9b14f76f' },
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

const usersFetchingAPI = {
   //получение пользователей при загрузке компоненты users, при пагинации, поиске
   async getUsers(currentPage: number, pageSize: number, searchRequest: string | null = null) {
      let queryStr = `users?page=${currentPage}&count=${pageSize}`
      if (searchRequest) queryStr += `&term=${searchRequest}`

      return instance.get<GetUsersFriendsServerResponseDataType>(queryStr).then(response => response.data)
   },
}

const friendsFetchingAPI = {
   //получение пользователей на которых подписан при загрузке компоненты friends, при пагинации, поиске
   async getFriends(currentPage: number, pageSize: number, searchRequest: string | null = null) {
      let queryStr = `users?page=${currentPage}&count=${pageSize}&friend=true`
      if (searchRequest) queryStr += `&term=${searchRequest}`

      return instance.get<GetUsersFriendsServerResponseDataType>(queryStr).then(response => response.data)
   },

   async getFriendsForNavbar(page: number, pageSizeForNavbar: number) {
      return instance.get<GetUsersFriendsServerResponseDataType>(`users?page=${page}&count=${pageSizeForNavbar}&friend=true`).then(response => response.data)
   },
}

// подписка-отписка
const followUnfollowAPI = {
   async onUnfollowAPI(id: number) {
      return instance.delete<MostFrequentResponseType>(`follow/${id}`).then(response => response.data)
   },

   async onFollowAPI(id: number) {
      return instance.post<MostFrequentResponseType>(`follow/${id}`).then(response => response.data)
   },
}

const authFetchingAPI = {
   async onCheckAuth() {
      return instance.get<AuthMeResponseDataType>('auth/me').then(responce => responce.data)
   },

   async getAvatar(id: number) {
      return instance.get<ProfileDataTypeOnGet>(`profile/${id}`).then(responce => responce.data)
   },

   // onAuth(authData) {
   // 	return instance.post(`/auth/login/`, authData)
   // },

   // getCaptcha() {
   // 	return instance.get(`/security/get-captcha-url`)
   // 		.then(responce => responce.data.url)
   // },

   // offAuth() {
   // 	return instance.delete(`/auth/login/`)
   // }
}

const profileFetchingAPI = {
   // запрос за основными данными для profile
   async onShowProfile(userId: number) {
      return instance.get<ProfileDataTypeOnGet>(`profile/${userId}`).then(response => response.data)
   },
   //здесь мы делаем запрос по id и получаем ответ
   async onGetStatus(userId: number) {
      return instance.get<string | null>(`/profile/status/${userId}`).then(response => response.data)
   },

   async onCheckFollowForProfile(userId: number) {
      return instance.get<boolean>(`/follow/${userId}`).then(responce => responce.data)
   },

   async onUpdateStatus(status: string) {
      return instance.put<MostFrequentResponseType>(`/profile/status/`, { status: status }).then(response => response.data)
   },

   async onUploadPhotoFile(blobPhotoFile: Blob) {
      const formData = new FormData()
      formData.append('image', blobPhotoFile, 'image.png')

      return instance
         .put<UploadPhotoResponceDataType>(`/profile/photo`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         })
         .then(response => response.data)
   },

   async onUpdateProfile(userInfo: ProfileDataTypeOnSend) {
      return instance.put<MostFrequentResponseType>(`/profile`, userInfo).then(response => response.data)
   },
}

export { usersFetchingAPI, friendsFetchingAPI, profileFetchingAPI, followUnfollowAPI, authFetchingAPI }
// export { authFetchingAPI }
// export { profileFetchingAPI }
// export { friendsFetchingAPI }
