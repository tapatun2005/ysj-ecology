import {
    $selector
} from 'Helpers'

const Header = (toggle, parent) => {
    
    const elToggle = $selector(toggle)
    const elParent = $selector(parent || 'header')
    let isOpen = false

    elToggle.addEventListener('click', () => {
        elParent.classList[isOpen ? 'remove' : 'add']('is-active')
        isOpen = !isOpen
    })

}

export default Header