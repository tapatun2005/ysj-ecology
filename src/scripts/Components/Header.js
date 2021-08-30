import {
    $selector,
    $selectors
} from 'Helpers'

class Header {
    constructor(el, config = {}) {
        this.className = el ? el : '.header'
        this.el = $selector(this.className)
        this.toggle = $selector(`${this.className} ${this.className}__toggle`)
        this.dropdowns = $selectors(this.el, config.dropdownClass ? config.dropdownClass : `.--tab`)
        this.isOpen = false
        this.breakpoint = config.breakpoint || 1024
        this._init()
    }

    _init() {
        this.toggle.addEventListener('click', () => this._toggle())
        
        for (let i = 0; i < this.dropdowns.length; i++) {
            this.dropdowns[i].addEventListener('click', () => {
                this._dropdown(i)
            })
        }

    }

    _toggle() {
        this._reset()
        this.el.classList[this.isOpen ? 'remove' : 'add']('is-opened')
        this.isOpen = !this.isOpen        
    }

    _reset() {
        for (let i = 0; i < this.dropdowns.length; i++) {
            this.dropdowns[i].parentNode.classList.remove('is-active')
        }
    }

    _dropdown(x) {
        if (window.innerWidth <= this.breakpoint) {
            const el = this.dropdowns[x]

            for (let i = 0; i < this.dropdowns.length; i++) {
                if (x !== i) {
                   this.dropdowns[i].parentNode.classList.remove('is-active')
                }
            }

            const p = el.parentNode
            const isOpen =  p.className.indexOf('is-active') !== -1 ? true : false
            p.classList[isOpen ? 'remove' : 'add']('is-active')
        }
    }
}

export default Header