import {
    $selector,
    $selectors
} from 'Helpers'

class Links {
    constructor(el) {
        this.els = $selectors(el ? el : 'a[href]')
        this._init()
    }

    _init() {
        for (let i = 0; i < this.els.length; i++) {
            this.els[i].addEventListener('click', (e) => { 
                e.preventDefault()
                this._redirect(this.els[i])
            })
        }
    }

    _redirect(el) {
        if (el.href) {
            $selector('html').classList.remove('is-page-loaded')
            setTimeout(() => {
                window.location = el.href
            }, 500)
        }

        return
    }
}

export default Links