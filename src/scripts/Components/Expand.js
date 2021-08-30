import {
    $selector,
    $selectors
} from 'Helpers'

const Expand = (toggle, target, text = []) => {
    
    const items = $selectors(toggle)

    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', () => {
            const isActive = items[i].classList.contains('is-active')
            items[i].classList[isActive ? 'remove' : 'add']('is-active')
            if (text.length === 2) {
                items[i].innerHTML = isActive ? text[0] : text[1]
            }

            const el = $selector(items[i].parentNode, target)
            if (el) {
                el.classList[isActive ? 'remove' : 'add']('is-active')
            }
        })
    }

}

export default Expand