import {
    $selector
} from 'Helpers'

class ScrollButton {
    constructor(el) {
        this.el = $selector(el)
        console.log(this.el)
        this.isVisible = true
        this._init()
    }

    _init() {
        this._scroll()
        window.addEventListener('scroll', () => this._scroll())
    }

    _scroll() {
        if (window.pageYOffset > 40 && this.isVisible)  {
            this.el.classList.add('is-hidden')
            this.isVisible = false
        } else if (window.pageYOffset <= 40 && !this.isVisible) {
            this.el.classList.remove('is-hidden')
            this.isVisible = true
        }
    }
}

export default ScrollButton