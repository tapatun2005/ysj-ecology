import {
    $selector,
    $selectors
} from 'Helpers'

class Slider {
    constructor(selector, config = {navigation: true, bullets: true, navText: ['', '']}) {
        this.className = selector.replace('.', '')
        this.list = $selector(selector)
        this.parent = this.list.parentNode
        this.items = [...$selectors(`${selector} > *`)]

        this.config = config
        this.current = 0

        // Mouse configs
        this.isDown = false
        this._init()
    }

    _init() {
        
    }
}