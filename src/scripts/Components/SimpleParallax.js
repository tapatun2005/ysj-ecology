import {
    $selectors,
	$bounds
} from 'Helpers'

class SimpleParallax {
	
	constructor(items, opts = {}) {
		this.items = $selectors(items)
		this.height = window.innerHeight
		this.point = opts.point || 0.9 // 0.9*100 = 90%
		if (this.items.length > 0) {
			this.init()
		}
	}

	init() {
		this.positions()
		window.addEventListener('scroll', () => this.positions())
		window.addEventListener('resize', () => this.positions())
	}

	positions() {
		for (let i = 0; i < this.items.length; i++) {
			const b = $bounds(this.items[i])
			if (b.top <= this.height*this.point) {
				this.items[i].classList.add('is-visible')
			} else {
				this.items[i].classList.remove('is-visible')
			}
		}
	}
}

export default SimpleParallax