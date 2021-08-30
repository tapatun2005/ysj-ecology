import {
    $selectors
} from 'Helpers'

const DropdownMenu = (els, config = {}) => {
    
    const items = $selectors(els)
    
    const removeClass = (items) => {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('is-active')
        }
    }

    const init = (links, infos) => {
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener('mouseenter', () => {
                removeClass(infos)
                infos[i].classList.add('is-active')
            })
        }
    }

    for (let i = 0; i < items.length; i++) {
        const infos = $selectors(items[i], config.info)
        const links = $selectors(items[i], config.link)
        infos[0].classList.add('is-active')
        init(links, infos)
    }
}

export default DropdownMenu