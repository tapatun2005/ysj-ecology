import Default from './Default'

import {
    InfiniteCarousel,
    Parallax,
    SimpleParallax,
    Video,
    SimpleSlider
} from 'Components'

Default()

// new InfiniteCarousel('.range', {
//     list: 'ul',
//     item: 'li',
//     navigationClass: 'range__navs'
// })

new Parallax()
new SimpleParallax('[data-simple-parallax]')

new Video('.video')

new SimpleSlider('.hero__slides', {
    breakpoint: 5000,
    infinite: true
})

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

