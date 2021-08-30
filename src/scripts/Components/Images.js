import {
    $selectors
} from 'Helpers'

class Images {
    constructor(els, opts = {}) {
        this.els = $selectors(els)
        this.config =   opts.config || 
                        {
                            rootMargin: '0px 0px 0px 0px',
                            threshold: 0
                        }
        
        if (('IntersectionObserver' in window)) {
            this.observer = new IntersectionObserver((entries, self) => {
                entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.show(entry.target)
                    self.unobserve(entry.target)
                }
                })
            }, this.config)
        }

        this._init()
    }

    _init() {
        for (let i = 0; i < this.els.length; i++) {
            if (('IntersectionObserver' in window)) {
                this.observer.observe(this.els[i])
            } else {
                this.show(this.els[i])
            }
        }
    }

    show(el) {
        el.classList.add('is-active')
    }
}

export default Images