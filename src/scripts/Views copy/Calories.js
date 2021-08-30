import Default from './Default'

import {
    Parallax,
    SimpleParallax,
    Video,
    InfiniteCarousel
} from 'Components'

Default()

new Parallax()
new SimpleParallax('[data-simple-parallax]')
new Video('.video')

new InfiniteCarousel('.products', {
    list: 'ul',
    item: 'li',
    navigationClass: 'products__navs',
    itemsNumber: {
        992: 4,
        768: 3,
        620: 2
    }
})
