import {
    $selector,
    $selectors
} from 'Helpers'

const Filter = (toggle, target, elms) => {

    const grid = $selector(elms.grid)
    const count = $selector(elms.count)
    const more = $selector(elms.more)
    const filters = $selectors(toggle)
    const targets = $selectors(target)
    
    let filterArr = sessionStorage.WalkersRecipeFilters ? sessionStorage.WalkersRecipeFilters.split(',') : []
    let filteredItems = []

    const _count = () => {
        const total = filteredItems.length
        const hidden = filteredItems.filter(el => el.classList.contains('filter-hidden')).length
        if (total > 0) {
           count.innerHTML = `${total - hidden} of ${total}`
        } else {
            count.innerHTML = 'No results found'
        }

        if (hidden > 0) {
            more.classList.add('is-active')
        } else {
            more.classList.remove('is-active')
        }
    }

    const render = () => {
        filteredItems = []
        
        for (let i = 0; i < targets.length; i++) {
            // convert string to array
            let targetArr = targets[i].dataset.tag.split(',')
            // remove any empty items
            targetArr = targetArr.filter(el => el != '')

            if (!filterArr.every(el => targetArr.includes(el)) && filterArr.length > 0) {
                console.log()
            } else {
                filteredItems.push(targets[i])
            }
        }

        // UPDATING THE LIST
        grid.innerHTML = ''
        
        for (let i = 0; i < filteredItems.length; i++) {
            filteredItems[i].classList.remove('filter-hidden')
            grid.appendChild(filteredItems[i])
            if (i >= 6) {
                filteredItems[i].classList.add('filter-hidden')
            }
        }

        _count()
    }

    const init = () => {

        for (let i = 0; i < filters.length; i++) {

            if (filterArr.indexOf(filters[i].value) !== -1) {
                filters[i].checked = true
            }
            
            filters[i].addEventListener('click', () => {
                if (filters[i].checked) {
                    filterArr.push(filters[i].value)
                } else {
                    filterArr = filterArr.filter(item => item !== filters[i].value)
                }

                window.sessionStorage.setItem('WalkersRecipeFilters', filterArr)
                render()
            })
        }

        render()

        more.addEventListener('click', () => {
            for (let i = 0; i < filteredItems.length; i++) {
                filteredItems[i].classList.remove('filter-hidden')
            }
            _count()
        })
    }

    init()

}

export default Filter
