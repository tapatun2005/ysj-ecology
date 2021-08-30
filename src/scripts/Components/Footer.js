import {
    $selector
} from 'Helpers'

class Footer {
    constructor(el) {
        this.el = $selector(el || 'footer')
        console.log(this.el)
    }
}

export default Footer