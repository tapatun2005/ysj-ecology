import {
    $selector,
    $selectors
} from 'Helpers'

class SplitWords {
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
                    console.log(entry)
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
            const arr = this.els[i].innerHTML.split(' ')
            let markup = `${arr.map(item => `<div>${item.split('').map(x => `<span>${x}</span>`).join('')}</div> `).join('')}`
            this.els[i].innerHTML = markup
            
            if (('IntersectionObserver' in window)) {
                this.observer.observe(this.els[i])
            } else {
                this.show(this.els[i])
            }

        }
    }

    show(el) {
        const words = $selectors(el, 'span')
        for (let i = 0; i < words.length; i++) {
            setTimeout(() => {
                words[i].className = 'is-active'
            }, (i + 1) * (750/words.length))
        }
    }
}

export default SplitWords