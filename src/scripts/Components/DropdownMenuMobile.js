import {
    $selectors
} from 'Helpers'

const DropdownMenuMobile = (els) => {
    const items = $selectors(els)
    
    for (let i = 0; i < items.length; i++) {
        let isOpen = false
        items[i].addEventListener('click', () => {
            items[i].classList[isOpen ? 'remove' : 'add']('is-open')
            isOpen = !isOpen
        })
    }
}

export default DropdownMenuMobile