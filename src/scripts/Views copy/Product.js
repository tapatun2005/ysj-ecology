import Default from './Default'

import {
    Parallax,
    SimpleParallax,
    Expand
} from 'Components'

Default()

new Parallax()
new SimpleParallax('[data-simple-parallax]')

Expand('.js-faq__accordion', '.js-faq__content', false)