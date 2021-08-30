import Default from './Default'

import {
    Parallax,
    SimpleParallax,
    Subheader
} from 'Components'

Default()

new Subheader('.subheader a', {
    toggle: '.subheader__nav-toggle',
    parent: '.subheader',
    current: '.subheader__current'
})

new Parallax()
new SimpleParallax('[data-simple-parallax]')
