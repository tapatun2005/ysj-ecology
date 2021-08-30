import {
    $selector,
    $selectors,
    $bounds
} from 'Helpers'

class Subheader {
    constructor(items, config = {}) {
        this.items = $selectors(items)
        this.config = config
        this.isOpen = false
        this.current = null
        this._init()
    }

    _init() {
        const c = this.config
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].addEventListener('click', (e) => {
                e.preventDefault()
                this._scroll(this.items[i])
            })
        }

        if (c.toggle) {
            $selector(c.toggle).addEventListener('click', () => this._toggle())
        }

        window.addEventListener('scroll', () => this._setActive())
    }

    _scroll(item) {
        const el = this._getElement(item)
        if (el) {
            const pageY = window.pageYOffset
            const elTop = $bounds(el).top
            
            window.scroll({
                top: elTop + pageY - this._getParentBottom() + -100,
                behavior: 'smooth'
            })

            this._toggle(true)

        }
    }

    _toggle(boolean = null) {
        if (boolean === null) boolean = this.isOpen
        $selector(this.config.parent).classList[boolean ? 'remove' : 'add']('is-active')
        this.isOpen = !this.isOpen
    }

    _setActive() {
        let current = this.current

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].classList.remove('is-active')
            const el = this._getElement(this.items[i])
            const top = $bounds(el).top

            if (top <= window.innerHeight/2) {
                current = i
            }
        }

        this.current = current
        if (current !== null) {
            this.items[current].classList.add('is-active')
            $selector(this.config.current).innerHTML = this.items[current].innerHTML 
        }
    }

    _getParentBottom() {
        return $bounds($selector(this.config.parent)).bottom
    }

    _getElement(item) {
        const id = item.href.split('#').pop()
        return  $selector(`#${id}`)
    }
}

export default Subheader