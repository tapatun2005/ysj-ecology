import {
    $selector,
    $selectors,
    $bounds
} from 'Helpers'

class InfiniteCarousel {
    constructor(selector, config = {}) {
        this.selector = $selector(selector)
        this.list = $selector(this.selector, config.list)
        this.items = $selectors(this.selector, config.item)
        this.navigationClass = config.navigationClass
        this.navigationText = config.navigationText || ['', '']
        const itemsNumber = {0: 1}

        this.itemsNumber =  Object.assign(itemsNumber, config.itemsNumber) || itemsNumber
        this.breakpoints = [...Object.keys(this.itemsNumber).map(key => parseInt(key))].reverse()

        this.number = 1 

        this.isPressed = false
        this.isDown = false
        this.clicked = null
        this._init()
    }

    _init() {
        this._reset()
        this.next(1)

        this._create()

        for (let i = 0; i < this.links.length; i++) {
            this.links[i].addEventListener('click', (e) => this._click(e))
            this.links[i].addEventListener('mousedown', (e) => this._click(e, this.links[i]))
            this.links[i].addEventListener('touchstart', (e) => this._click(e, this.links[i]))
        }

        this.list.addEventListener('mousedown', (e) => this._mousedown(e, 'mouse'))
        this.list.addEventListener('mousemove', (e) => this._mousemove(e, 'mouse'))
        this.list.addEventListener('mouseup', (e) => this._mouseup(e))

        this.list.addEventListener('touchstart', (e) => this._mousedown(e))
        this.list.addEventListener('touchmove', (e) => this._mousemove(e))
        this.list.addEventListener('touchend', (e) => this._mouseup(e))

        window.addEventListener('resize',() => {
            this._reset()
            this.next(1)
        })
    }

    _create() {
        const markup = `<div class="${this.navigationClass}"><div></div><div></div></div>`
        this.selector.insertAdjacentHTML('beforeend', markup)
        this.navs = $selectors(this.selector, `.${this.navigationClass} div`)
        for (let i = 0; i < this.navs.length; i++) {
            this.navs[i].addEventListener('click', () => this.next(i))
         }
    }

    _reset() {
        this.current = 0
        this.positions = []
        this.currentItems = []

        this.number = this._getNumberOfItems()
        this.length = this.items.length - 1
        this.width = $bounds(this.selector).width

        const itemsWidth = this.width*this.length / (this.number)
        const windowWidth = window.innerWidth*2

        // Clone items
        if (itemsWidth < windowWidth) {

            const dublicates = Math.floor(windowWidth/itemsWidth)
            let cloned = this.list.cloneNode(true).innerHTML
            
            for (let i = 0; i < dublicates; i++) {
               this.list.insertAdjacentHTML('beforeend', cloned)
            }
        }

        this.items = $selectors(this.selector, 'li')
        this.links = $selectors(this.selector, 'a')
        this.length = this.items.length - 1
        // end

        for (let i = 0; i < this.items.length; i++) {
            this.setInitPositions(i)
        }

        const arr = this.positions
        this.min = arr.indexOf(Math.min(...arr))
        this.max = arr.indexOf(Math.max(...arr))
    }

    _getNumberOfItems() {
        const w = window.innerWidth
        for (let i = 0; i < this.breakpoints.length; i++) {
            if (w > this.breakpoints[i]) {
                console.log(this.breakpoints[i])
                return this.itemsNumber[this.breakpoints[i]]
            }
        }
    }

    _click(e, item = null) {
        
        if (item !== null) {
           this.clicked = item
        } else {
            return false
        }
    }

    setInitPositions(index) {
        this.items[index].classList.remove('is-active')
        let move = (index - this.current) * this.width

        if (move > (window.innerWidth + this.width)* (this.number)) {
            move = (this.current - ((this.items.length - 1) - index + 1)) * this.width
        }

        this.currentItems.push(index)
        this.positions.push(move)
    }

    next(index) {
        
        if (this.isPressed) return false

        let next
        if (index === null) {
            next = 0
        } else {
            next = this.current + (index === 1 ? 1 : -1)
        }

        if (next < 0) {
            next = this.length
        } else if (next > this.length) {
            next = 0
        }

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].classList.remove('is-active')
        }

        this.move(index)

        this.current = this.currentItems[0]
        this.items[this.current].classList.add('is-active')

        this.isPressed = true 
        setTimeout(() => {
            this.isPressed = false
        }, 500)
    }

    move(index) {

        if (index === 0) {
            this.currentItems.push(this.currentItems.shift())
        } else {
            this.currentItems.unshift(this.currentItems.pop())
        }

        for (let i = 0; i < this.currentItems.length; i++) {
            if (i === this.min || i === this.max) {
                this.items[this.currentItems[i]].classList.add('is-not-animate')
                setTimeout(() => {
                    this.items[this.currentItems[i]].classList.remove('is-not-animate')
                }, 500)
            }
            this.items[this.currentItems[i]].style.transform = `matrix(1, 0, 0, 1, ${this.positions[i]/this.number}, 0)`
        }
    }

    _mousedown(e, action) {
        if (action) {
            e.preventDefault()
        }
        this.isDown = true
        this.startPoint = e.clientX || e.touches[0].clientX
        // this.startPointY = e.clientY || e.touches[0].clientY
		this.currentPoint = this.startPoint
        // this.currentPointY = this.startPointY
    }

    _mousemove(e, action) {
        if (action) {
           e.preventDefault()
        }
        if (this.isDown) {
            this.currentPoint = e.clientX || e.touches[0].clientX
            // this.currentPointY = e.clientY || e.touches[0].clientY
        }
    }

    _mouseup() {
        
        this.isDown = false
        const dist = this.currentPoint - this.startPoint
        // const distY = this.currentPointY - this.startPointY
		const positiveDist = Math.abs(dist)

        // const positiveDistY = Math.abs(distY)
        // if (positiveDistY > 25) {
        //     window.scrollTo({
        //         top: window.scrollY - distY
        //     })
        //     return false
        // }

		if (positiveDist > 25) {
            this.clicked = null
			this.next(dist > 0 ? 1 : 0)
		} else if (this.clicked !== null) {
            // window.location = this.clicked.href
        }
    }
}

export default InfiniteCarousel