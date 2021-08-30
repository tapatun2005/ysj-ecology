import Default from './Default'

import {
    $selectors
} from 'Helpers'

import {
    Parallax,
    SimpleParallax,
    SimpleSlider
} from 'Components'

Default()

new Parallax()
new SimpleParallax('[data-simple-parallax]')

const rangeSliders = $selectors('.range__slides')

for (let i = 0; i < rangeSliders.length; i++) {
    new SimpleSlider(`#range__slides${i}`, {
        className: 'range__slides',
        breakpoint: 5000,
        infinite: true
    })
}