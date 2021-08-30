import {
    $selectors
} from 'Helpers'

const ShowForm = (selector, target) => {
    
    const options = $selectors(selector)
    const forms = $selectors(target)

    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener('click', (e) => {
            for (let i = 0; i < forms.length; i++) {
                forms[i].reset()
                if (forms[i].dataset.form === e.target.id) {
                    forms[i].classList.remove('form-hidden')
                } else {
                    forms[i].classList.add('form-hidden')
                }
            }
        })
    }

}

export default ShowForm
