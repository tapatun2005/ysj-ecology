import Default from './Default'

import {
    Parallax,
    // Expand,
    Filter,
    Card,
    Video,
    SimpleParallax,
    Accordion
} from 'Components'

Default()

new SimpleParallax('[data-simple-parallax]')
new Parallax()

Accordion('.recipes__filter', {
    hideBreakpoint: 768
})

Filter('.js-filter__selector', '.js-filter__target', {
    grid: '#recipes__grid',
    count: '#recipes__count',
    more: '#recipes__more'
})
Card('.js-card-link')
new Video('.video')