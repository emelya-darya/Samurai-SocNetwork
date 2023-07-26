// let scrollValue = window.scrollY || window.pageYOffset

export const onOpenModal = () => {
   // scrollValue = window.scrollY || window.pageYOffset
   document.body.classList.add('lock')
   //    window.scrollTo(0, scrollValue)
}

export const onCloseModal = () => {
   document.body.classList.remove('lock')
   // window.scrollTo(0, scrollValue)
}
