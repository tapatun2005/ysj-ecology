import {
    Header,
    Loader,
    LazyLoad,
    DropdownMenu,
    DropdownMenuMobile
  } from 'Components'

  const Default = () => {
    window.addEventListener('load', () => {
      
      Loader()
      Header('.header__nav-toggle', '.header')
      DropdownMenu('.dropdown__desktop', {
        info: '.dropdown__info',
        link: '.dropdown__menu__link'
      })
      DropdownMenuMobile('.header__nav__dropdown-mobile')
      new LazyLoad()

    })
  }
  
  export default Default