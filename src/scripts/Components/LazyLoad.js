// Helpers
import {
    $selector,
    $selectors
} from 'Helpers'
// Class
class LazyLoad {
    constructor(els, opts = {}) {
        this.className = els || '.image-lazy'
        
        this.els = $selectors(this.className)
        console.log(this.els)
        this.opts = opts || null

        this.config =   opts.config || 
                        {
                            rootMargin: '0px 0px 0px 0px',
                            threshold: 0
                        }
        
        if (('IntersectionObserver' in window)) {
            this.observer = new IntersectionObserver((entries, self) => {
                entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this._show(entry.target)
                    self.unobserve(entry.target)
                }
                })
            }, this.config)
        }

        if (this.els.length !== 0) {
            this._init()
        }
    }

    _init() {
        this.els.forEach(picture => {
            if (('IntersectionObserver' in window)) {
                this.observer.observe(picture)
            } else {
                this._showFull(picture)
            }
        })
    }

    _show(el) {
        const img = $selector(el, 'img')
        const srcsets = $selectors(el, 'source')

        for (let i = 0; i < srcsets.length; i += 1) {
            srcsets[i].setAttribute('srcset', srcsets[i].dataset.srcset)
            srcsets[i].removeAttribute('data-srcset')
        }

        img.addEventListener('load', () => {
            setTimeout(() => {
                el.classList.remove(this.className.replace('.',''))
            }, 60)
        })
    }

    _showFull(el) {

        const img = $selector(el, 'img')
        const srcsets = $selector(el, 'source')
        const path = srcsets.getAttribute('data-srcset')
        const src = path.split(' ')[0]

        const newImage = new Image()
        newImage.src = src

        newImage.onload = () => {
            el.removeChild(img)
            el.appendChild(newImage)
            el.classList.remove(this.className.replace('.',''))
        }
        
    }
}

export default LazyLoad