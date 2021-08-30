import {
    $selectors
} from 'Helpers'

const Popup = (config) => {
    
    const items = $selectors(config.click)
    const popups = $selectors(config.popup)
    const closes = $selectors(config.close)

    const _toggle = (index, action = 'add') => {
        popups[index].classList[action]('is-active')
    }

    // Show
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', (e) => {
            e.preventDefault()
            _toggle(i)
        })
    }

    // Hide
    for (let i = 0; i < closes.length; i++) {
        closes[i].addEventListener('click', (e) => {
            e.preventDefault()
            for (let x = 0; x < popups.length; x++) {
                _toggle(x, 'remove')
            }
        })

        // Listen for ESC key press and close
        document.addEventListener('keydown', (e) => {
            if (e.keyCode == 27) {
                for (let x = 0; x < popups.length; x++) {
                    _toggle(x, 'remove')
                }
            }
        })
    }
}

export default Popup