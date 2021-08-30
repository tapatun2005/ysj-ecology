import Default from './Default'

import {
    Parallax,
    SimpleParallax,
    Card,
    Video
} from 'Components'

Default()

new Parallax()
new SimpleParallax('[data-simple-parallax]')
Card('.js-card-link')
new Video('.video')