import {
    $selector,
    $selectors
} from 'Helpers'

class SectionLoad {
    constructor(els, opts = {}) {
        this.els = $selectors(els)
        console.log(this.els)
        this.config =   opts.config || 
                        {
                            rootMargin: '0px 0px 0px 0px',
                            threshold: 0
                        }
        
        if (('IntersectionObserver' in window)) {
            this.observer = new IntersectionObserver((entries, self) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.load(entry.target)
                        self.unobserve(entry.target)
                    } else {
                        this.unload(entry.target)
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
                this.load(this.els[i])
            }

        }
    }

    load(el) {
        el.classList.add('is-loaded')
    }

    unload(el) {
        el.classList.remove('is-loaded')
    }
}

export default SectionLoad