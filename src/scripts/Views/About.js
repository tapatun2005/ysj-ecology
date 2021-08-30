import Default from './Default'

import {
    SimpleRowSlider,
    SimpleSlider
} from 'Components'

Default()

new SimpleRowSlider('.case-studies__rows', {
    rowClass: '.case-studies__rows__list'
})

new SimpleSlider('.carousel__list')