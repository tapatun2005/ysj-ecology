import {
    $selector,
    $selectors
} from 'Helpers'

class Video {
    constructor(selector, config = {}) {
        this.items = $selectors(selector)
        this.config = config
        this._init()
    }

    _init() {
        for (let i = 0; i < this.items.length; i++) {
            const play = $selector(this.items[i], '.video__icon')
            const close = $selectors(this.items[i], '.video__popup__close')
            play.addEventListener('click', () => this._play(this.items[i]))
            
            for (let n = 0; n < close.length; n++) {
               close[n].addEventListener('click', () => this._close(this.items[i]))
            }
        }
    }

    _play(item) {
        console.log(item)
        item.classList.add('is-active')
        const video = $selector(item, 'video')
        if (video.src === '') {
           video.src = video.dataset.src
        }
        video.play()
    }

    _close(item) {
        item.classList.remove('is-active')
        const video = $selector(item, 'video')
        video.pause()
        video.currentTime = 0
    }
}

export default Video