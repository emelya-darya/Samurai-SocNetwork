import { combineReducers, legacy_createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../sagas'
import { ErrorsReducerType, errorsReducer } from './errors/errorsReducer'
import { UsersReducerType, usersReducer } from './users/usersReducer'
import { FriendsNavbarReducerType, friendsNavbarReducer } from './friendsNavbar/friendsNavbarReducer'
import { FriendReducerType, friendsReducer } from './friends/friendsReducer'
import { ProfileReducerType, profileReducer } from './profile/profileReducer'
import { AuthReducerType, authReducer } from './auth/authReducer'
import { CommonWSChatReducerType, commonWSchatReducer } from './commonWSchat/commonWSchatReducer'
import { DialogsReducerType, dialogsReducer } from './dialogs/dialogsReducer'

const rootReducer = combineReducers({
    forUsersData: usersReducer as UsersReducerType,
    forErrorsData: errorsReducer as ErrorsReducerType,
    forFriendsNavbarData: friendsNavbarReducer as FriendsNavbarReducerType,
    forFriendsPageData: friendsReducer as FriendReducerType,
    forProfileData: profileReducer as ProfileReducerType,
    forAuthData: authReducer as AuthReducerType,
    forCommonWSchatData: commonWSchatReducer as CommonWSChatReducerType,
    forDialogsData: dialogsReducer as DialogsReducerType,
})

// type RootReducerType = typeof rootReducer
export type GlobalStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

const sagaMiddleware = createSagaMiddleware()

// const store = legacy_createStore(rootReducer, applyMiddleware(sagaMiddleware))
const store = legacy_createStore(rootReducer, applyMiddleware(sagaMiddleware))

//* run sagaMiddleware может быть вызван только после вызова applyMiddleware
sagaMiddleware.run(rootSaga)

//@ts-ignore
window.store = store

export { store }
