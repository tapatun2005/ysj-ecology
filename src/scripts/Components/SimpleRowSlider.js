import {
    $selector,
    $selectors
} from 'Helpers'

class SimpleRowSlider {
    constructor(selector, config = {}) {

        this.className = config.className || selector.replace('.', '')
        this.selector = $selector(selector)
        this.parent = this.selector.parentNode
        this.rows  = $selectors(this.parent, `${selector} > *`)
        this.items = this._rowItems()
        this.virtualBullets = null

        this.config = {
            breakpoint: config.breakpoint || 10000,
            navigation: config.navigation || true,
            bullets: config.bullets || true,
            navText: config.navText || ['', ''],
            infinite: config.infinite || false
        }
        
        this.current = 0

        // Mouse configs
        this.isDown = false

        this._init()
    }

    _rowItems(){
        const arr = []
        for (let i = 0; i < this.rows.length; i++) {
            const items = [...this.rows[i].children]
            console.log(items)
            arr.push(items)
        }

        console.log(arr)

        return arr
    }

    _init() {
        this._create()
        window.addEventListener('resize', () => this._resize())
        
        this.selector.addEventListener('mousedown', (e) => this._mousedown(e, 'mouse'))
        this.selector.addEventListener('mousemove', (e) => this._mousemove(e, 'mouse'))
        this.selector.addEventListener('mouseup', () => this._mouseup())

        this.selector.addEventListener('touchstart', (e) => this._mousedown(e))
        this.selector.addEventListener('touchmove', (e) => this._mousemove(e))
        this.selector.addEventListener('touchend', () => this._mouseup())
    }

    _resize() {
        const w = window.innerWidth
        const b = this.config.breakpoint

        console.log(this._checkVirtualBullets())
        
        if (w <= b) {
            if (this._checkVirtualBullets()) {
                this._create()
            } else if (this.bullets) {
                this.bullets[this.current].classList.add('is-active')
                this.show(this.current)
            }
        } else {
            this.selector.style.transform = 'none'
        }
    }

    _checkVirtualBullets() {
        const offsetW = this.parent.offsetWidth
        const scrollW = this.parent.scrollWidth
        let isDifferent = false
        if (this.virtualBullets.length !== Math.ceil(scrollW/offsetW)) {

            this.bullets = []
            this.current = 0

            const bullets = $selector(this.parent, `.${this.className}__bullets`)
            if (bullets) {
               this.parent.removeChild(bullets)
            }
            
            isDifferent = true
        }

        return isDifferent
    }

    _create() {
        const w = window.innerWidth
        const offsetW = this.parent.offsetWidth
        const scrollW = this.parent.scrollWidth
        console.log(scrollW/offsetW)
        this.virtualBullets = [...Array(Math.ceil(scrollW/offsetW)).keys()]
        const c = this.config
        let markup

        // Navs

        if (!this.navs) {
            if (w <= c.breakpoint && c.navigation) {

                const arrow = `<svg xmlns="http://www.w3.org/2000/svg" width="29" height="10.9"><path d="M24.6 10.9l-1.1-.9 3-3.8H0V4.7h26.5l-3-3.8 1.1-.9L29 5.5z"></path></svg>`

                markup = `<div class="${this.className}__navs"><div>${arrow}</div><div>${arrow}</div></div>`
                this.parent.insertAdjacentHTML('beforeend', markup)
                this.navs = [...$selectors(this.parent, `.${this.className}__navs > *`)]
                for (let i = 0; i < this.navs.length; i++) {
                    this.navs[i].addEventListener('click', () => this.next(i))
                }
            }
        }


        // Bullets
        if (w <= c.breakpoint && c.bullets) {

            markup = `<div class="${this.className}__bullets">${this.virtualBullets.map(() => `<div></div>`).join('')}</div>`
            this.parent.insertAdjacentHTML('beforeend', markup)
            this.bullets = [...$selectors(this.parent, `.${this.className}__bullets > *`)]

            this.bullets[this.current].classList.add('is-active')
            this.show(this.current)
            
            for (let i = 0; i < this.bullets.length; i++) {
                this.bullets[i].addEventListener('click', () => this.show(i))
            }
        }

        // Infinite

        // if (c.infinite) {
        //     for (let i = 0; i < this.items.length; i++) {
        //         this.items[i].style.transform = `translate(-${i}00%)`
        //     }
        // }
    }

    next(inx) {
        let next = this.current + (inx === 0 ? -1 : 1)

        // if (!this.config.infinite) {
        //     if (next < 0 || next === this.virtualBullets.length) {
        //         next = this.current
        //     }
        // } else {
        //     if (next < 0) {
        //         next = this.virtualBullets.length - 1
        //     } else if (next >= this.virtualBullets.length) {
        //         next = 0
        //     }
        // }

        if (next < 0) {
            next = this.virtualBullets.length - 1
        } else if (next >= this.virtualBullets.length) {
            next = 0
        }

        this.show(next)
    }

    show(inx) {
        const w = window.innerWidth
        const b = this.config.breakpoint
        const inf = this.config.infinite
        
        if (w > b) return

        this.current = inx
        if (!inf) {
           this.selector.style.transform = `translate(-${inx}00%)`
        }

        const parentW = this.parent.offsetWidth
        const itemW = this.items[0][0].offsetWidth
        const diff = Math.round(parentW/itemW)

        for (let i = 0; i < this.items.length; i++) {
            for (let x = 0; x < this.items[i].length; x++) {
               this.items[i][x].classList.remove('is-active')    
            }
        }

        let n = 0

        console.log('diff', diff)
        for (let i = 0; i < this.items.length; i++) {
            for (let x = (this.current * diff); x < (this.current * diff) + diff; x++) {
                if (this.items[i][x]) {
                    setTimeout(() => {
                        this.items[i][x].classList.add('is-active')
                    }, n * 50)
                    n = n + 1
                }
            }
        }


        // for (let i = 0; i < this.items.length; i++) {
        //     this.items[i].classList.remove('is-active')    
        // }
        // this.items[inx].classList.add('is-active') 

        
        if (this.bullets) {
            for (let i = 0; i < this.bullets.length; i++) {
                this.bullets[i].classList.remove('is-active')    
            }
            this.bullets[inx].classList.add('is-active')
        }
    }

    _mousedown(e, action) {
        if (action) {
           e.preventDefault()
        }
        this.isDown = true
        this.startPoint = e.clientX || e.touches[0].clientX
		this.currentPoint = this.startPoint
    }

    _mousemove(e, action) {
        if (action) {
            e.preventDefault()
        }
        if (this.isDown) {
            this.currentPoint = e.clientX || e.touches[0].clientX
        }
    }

    _mouseup() {
        this.isDown = false
        const dist = this.currentPoint - this.startPoint
		const positiveDist = Math.abs(dist)

		if (positiveDist > 25) {
			this.next(dist > 0 ? 0 : 1)
		}
    }
}

export default SimpleRowSlider