import {
    $selector
} from 'Helpers'

import {
    Loader,
    LazyLoad,
    SectionLoad,
    SplitWords,
    Images,
    ScrollButton,
    Links,
    Header,
    VideoPlayer
  } from 'Components'

const Default = () => {
    window.addEventListener('load', () => {

        const promise = Loader().then(() => {

          VideoPlayer()

          new SectionLoad('section')
          new SplitWords('.js-split-word')
          new Images('.image')
          new LazyLoad()
          new ScrollButton('.hero__scroll')
          new Links('a')
          new Header()

        })

    })
  }

  export default Default