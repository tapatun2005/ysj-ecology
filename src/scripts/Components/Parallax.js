// Helpers
import {
    $selectors,
	$bounds
} from 'Helpers'

class Parallax {

	constructor(items) {
		this.items = $selectors(items || '[data-parallax]')
		this.init()
	}

	init() {
		this.positions()
		window.addEventListener('scroll', () => this.positions())
	}

	positions() {
		for (let i = 0; i < this.items.length; i++) {

			const depth = this.items[i].dataset.parallaxDepth
			const direction = this.items[i].dataset.parallaxDirection

			const b = $bounds(this.items[i])
			const centerY = b.top + (b.height/2)
			const x = window.innerHeight/2 - centerY

			let dir = direction ? 1 : -1
			let n = (dir*x)/(depth ? depth : 2)

			this.items[i].style.transform = `matrix(1, 0, 0, 1, 0, ${n})`
		}
	}

}

export default Parallax