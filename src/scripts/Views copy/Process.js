import Default from './Default'

import {
    Parallax,
    SimpleParallax,
    Popup,
    Subheader,
    Expand,
    SimpleSlider
} from 'Components'

Default()

new Subheader('.subheader a', {
    toggle: '.subheader__nav-toggle',
    parent: '.subheader',
    current: '.subheader__current'
})

new Parallax()
new SimpleParallax('[data-simple-parallax]')

Popup({
    click: '.aim .btn-link',
    popup: '.aim__popup',
    close: '.aim__popup__close',
})

Expand('.aim__expand', '.aim__content')

new SimpleSlider('.aims')

