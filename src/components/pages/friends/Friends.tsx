import c from './friends.module.scss'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import shortid from 'shortid'
import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import { Paginator } from '../../reusableElements/paginator/Paginator'
import { FriendCardPreview } from './friendCardPreview/FriendCardPreview'
import { Preloader } from '../../reusableElements/preloaders/main/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../store/redux/storeTypes'
import { FriendsAC } from '../../../store/redux/friends/friendsReducer'
import { withAuthRedirectHOC } from '../../reusableElements/HOC_withAuthRedirect/withAuthRedirectHOC'

const FriendsPage = withAuthRedirectHOC(() => {
   // получение из стора всего, что надо
   const {
      friendsData,
      pageSize,
      totalFriendsCount,
      isLoadingFriendsList: isLoading,
      currentPage,
      activePageFromLC,
      activePageFromQueryParams,
      searchRequest,
      searchRequestFromLC,
      searchRequestFromQueryParams,
   } = useSelector((state: GlobalStateType) => state.forFriendsPageData)

   const errOnLoadFriends = useSelector((state: GlobalStateType) => state.forErrorsData.friendsFetchingError)

   const dispatch = useDispatch()

   const setSearchRequest = (searchRequest: string) => dispatch(FriendsAC.setSearchRequest(searchRequest))
   const setSearchReqFromQueryParams = (searchRequest: string) => dispatch(FriendsAC.setSearchRequestFromQueryParams(searchRequest))

   const setCurrentPage = (currentPage: number) => dispatch(FriendsAC.setCurrentPage(currentPage))
   const setCurrPageFromQueryParams = (pageNum: number) => dispatch(FriendsAC.setActivePageFromQueryParams(pageNum))

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

   const BASE_URL_FOR_PAGINATOR = `/subs?search=${searchRequest}`

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

   const totalPagesCount = Math.ceil(totalFriendsCount / pageSize)

   React.useEffect(() => {
      if (currentPage && totalPagesCount < currentPage) setCurrentPage(totalPagesCount)
   }, [totalFriendsCount])

   return (
      <div>
         <div className={c.topPartPage}>
            <h1>Subs</h1>
            {!errOnLoadFriends && <p>({totalFriendsCount})</p>}
         </div>

         <InputGroup className={c.searchInputGroup}>
            <InputLeftElement pointerEvents='none' className={c.searchInputLeftEl}>
               <Icon as={BsSearch} />
            </InputLeftElement>
            <Input value={searchRequest || ''} placeholder='Search...' variant='flushed' className={c.searchInput} onInput={onTypeSearchRequestHandler} />
         </InputGroup>

         {errOnLoadFriends ? (
            <p className={c.serverErrMessage}>{errOnLoadFriends}</p>
         ) : (
            <>
               <div className={c.paginationBlock}>
                  <Paginator totalRecordsCount={totalFriendsCount} pageLimit={pageSize} onPageChangeHandler={onChangePageFunc} baseURI={BASE_URL_FOR_PAGINATOR} activePage={currentPage || 1} />
               </div>
               {isLoading ? (
                  <Preloader color='#A0450B' size={100} minHeight='75vh' />
               ) : (
                  <div className={c.usersContainer}>
                     {currentPage && totalPagesCount >= currentPage ? (
                        friendsData.map(friendData => <FriendCardPreview friendData={friendData} key={shortid.generate()} />)
                     ) : (
                        <div className={c.errorBlock}>
                           <p>No results found for your query</p>
                        </div>
                     )}
                  </div>
               )}

               <div className={c.paginationBlock}>
                  <Paginator totalRecordsCount={totalFriendsCount} pageLimit={pageSize} onPageChangeHandler={onChangePageFunc} baseURI={BASE_URL_FOR_PAGINATOR} activePage={currentPage || 1} />
               </div>
            </>
         )}
      </div>
   )
})

export { FriendsPage }
