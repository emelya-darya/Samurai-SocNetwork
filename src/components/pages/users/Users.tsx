import c from './users.module.scss'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import shortid from 'shortid'
import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import { Paginator } from '../../reusableElements/paginator/Paginator'
import { UserCardPreview } from './userCardPreview/UserCardPreview'
import { Preloader } from '../../reusableElements/preloaders/main/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType, UserFriendItemType } from '../../../store/redux/storeTypes'
import { UsersAC } from '../../../store/redux/users/usersReducer'
import { ModalWindowWriteMessage } from '../../reusableElements/modalWindowWriteMessage/ModalWindowWriteMessage'

export type DataForModalType = {
   photoSrc: null | string
   userName: null | string
   userId: null | number
}
const UsersPage = () => {
   // получение из стора всего, что надо
   const {
      usersData,
      pageSize,
      totalUsersCount,
      isLoadingUsersList: isLoading,
      currentPage,
      activePageFromLC,
      activePageFromQueryParams,
      searchRequest,
      searchRequestFromLC,
      searchRequestFromQueryParams,
   } = useSelector((state: GlobalStateType) => state.forUsersData)

   const errOnLoadUsers = useSelector((state: GlobalStateType) => state.forErrorsData.usersFetchingError)

   const dispatch = useDispatch()

   const setSearchRequest = (searchRequest: string) => dispatch(UsersAC.setSearchRequestAC(searchRequest))
   const setSearchReqFromQueryParams = (searchRequest: string) => dispatch(UsersAC.setSearchRequestFromQueryParamsAC(searchRequest))

   const setCurrentPage = (currentPage: number) => dispatch(UsersAC.setCurrentPageAC(currentPage))
   const setCurrPageFromQueryParams = (pageNum: number) => dispatch(UsersAC.setActivePageFromQueryParamsAC(pageNum))

   const [searchParams, setSearchParams] = useSearchParams()

   // если в урле при первом запросе к компоненте есть параметры (страница и поисковый запрос)& то сетаем их в стор как параметры из урла
   React.useEffect(() => {
      const activePageFromURL = searchParams.get('page')
      const searchParamFromURL = searchParams.get('search')

      setCurrPageFromQueryParams(activePageFromURL ? +activePageFromURL : 1)
      setSearchReqFromQueryParams(searchParamFromURL || '')
   }, [])

   // если уже прочеканы параметры из localstarage и урла, то определяем и назначем уже основные currentPage и searchRequest
   React.useEffect(() => {
      if (activePageFromLC !== null && activePageFromQueryParams !== null) {
         const val = activePageFromQueryParams ? activePageFromQueryParams : activePageFromLC ? activePageFromLC : 1
         setCurrentPage(val)
      }
      if (searchRequestFromLC !== null && searchRequestFromQueryParams !== null) {
         const val = searchRequestFromQueryParams ? searchRequestFromQueryParams : searchRequestFromLC
         setSearchRequest(val)
      }
   }, [activePageFromLC, activePageFromQueryParams, searchRequestFromLC, searchRequestFromQueryParams])

   const BASE_URL_FOR_PAGINATOR = `/users?search=${searchRequest}`

   // при изменении номера страницы срабатывает эта функция (сетаем в стор актуальный номер страницы)
   const onChangePageFunc = (page: number) => setCurrentPage(page)

   React.useEffect(() => {
      if (searchRequest !== null && currentPage !== null) {
         setSearchParams({ search: searchRequest, page: String(currentPage) })
      }
   }, [currentPage, searchRequest])

   //при печатании в поле поиска срабатывает это
   const onTypeSearchRequestHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchRequest(e.target.value)
      setCurrentPage(1)
   }

   const totalPagesCount = Math.ceil(totalUsersCount / pageSize)

   React.useEffect(() => {
      if (currentPage && totalPagesCount < currentPage) setCurrentPage(totalPagesCount)
   }, [totalUsersCount])

   const isAuth = useSelector((state: GlobalStateType) => state.forAuthData.isAuth)

   return (
      <div>
         <div className={c.topPartPage}>
            <h1>Users</h1>
            {!errOnLoadUsers && <p>({totalUsersCount})</p>}
         </div>

         <InputGroup className={c.searchInputGroup}>
            <InputLeftElement pointerEvents='none' className={c.searchInputLeftEl}>
               <Icon as={BsSearch} />
            </InputLeftElement>
            <Input value={searchRequest || ''} placeholder='Search...' variant='flushed' className={c.searchInput} onInput={onTypeSearchRequestHandler} />
         </InputGroup>

         {errOnLoadUsers ? (
            <p className={c.serverErrMessage}>{errOnLoadUsers}</p>
         ) : (
            <>
               <div className={c.paginationBlock}>
                  <Paginator totalRecordsCount={totalUsersCount} pageLimit={pageSize} onPageChangeHandler={onChangePageFunc} baseURI={BASE_URL_FOR_PAGINATOR} activePage={currentPage || 1} />
               </div>
               {isLoading ? (
                  <Preloader color='#A0450B' size={100} minHeight='75vh' />
               ) : (
                  <div className={c.usersContainer}>
                     {currentPage && totalPagesCount >= currentPage ? (
                        usersData.map(userData => <UserCardPreview userData={userData} key={shortid.generate()} isAuth={isAuth} />)
                     ) : (
                        <div className={c.errorBlock}>
                           <p>No results found for your query</p>
                        </div>
                     )}
                  </div>
               )}

               <div className={c.paginationBlock}>
                  <Paginator totalRecordsCount={totalUsersCount} pageLimit={pageSize} onPageChangeHandler={onChangePageFunc} baseURI={BASE_URL_FOR_PAGINATOR} activePage={currentPage || 1} />
               </div>
            </>
         )}
      </div>
   )
}

export { UsersPage }
