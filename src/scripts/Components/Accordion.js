import {
    Expand
} from 'Components'

import {
    $selectors
} from 'Helpers'

const Accordion = (selector, config = {}) => {
    
    const hideBreakpoint = config.hideBreakpoint || null

    const itemsToggle = $selectors(`${selector} .js-recipes__accordion`)
    const itemsExpandable = $selectors(`${selector} .js-recipes__content`)

    let isAllHidden = false

    const _resize = () => {
        const w = window.innerWidth 
        if (w <= hideBreakpoint && !isAllHidden) {
         
            for (let i = 0; i < itemsToggle.length; i++) {
                itemsToggle[i].classList.remove('is-active')
                itemsExpandable[i].classList.remove('is-active')
            }

            isAllHidden = true

        } else if (w > hideBreakpoint && isAllHidden) {
            for (let i = 0; i < itemsToggle.length; i++) {
                itemsToggle[i].classList.add('is-active')
                itemsExpandable[i].classList.add('is-active')
            }
            isAllHidden = false
        }

    }
    
    const _init = () => {
        Expand(`${selector} .js-recipes__accordion`, `${selector} .js-recipes__content`, false)
        _resize()
        if (hideBreakpoint) {
            window.addEventListener('resize', () => _resize())
        }
    }

    _init()
}

export default Accordion