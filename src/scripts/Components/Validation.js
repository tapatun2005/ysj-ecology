import {
    $selectors
} from 'Helpers'

const Validation = (selector, notice) => {

    const inputs = $selectors(selector)

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', (e) => {
            let input = e.target.dataset.validateInput
            if (input[0] === '#') {
                const inputId = e.target.dataset.validateInput.substring(1)
                if (inputId === e.target.id) {
                    input = document.getElementById(e.target.id)
                } else {
                    input = document.getElementById(inputId)
                }
            }

            const targetNotice = e.target.parentNode.querySelector(notice)
            const inputNotice = input.parentNode.querySelector(notice)

            targetNotice.innerText = ''
            targetNotice.classList.remove('is-active')
            inputNotice.innerText = ''
            inputNotice.classList.remove('is-active')

            if (e.target.dataset.validateAction) {
                if (e.target.dataset.validateAction && e.target.value === e.target.dataset.validateValue) {
                    input.removeAttribute(e.target.dataset.validateAction)
                } else {
                    input.setAttribute(e.target.dataset.validateAction, true)
                    input.value = ''
                }
            } else {
                if (input.value !== e.target.value && e.target.value && input.value) {
                    targetNotice.classList.add('is-active')
                    targetNotice.innerText = e.target.dataset.validateMessage
                    inputNotice.classList.remove('is-active')
                    inputNotice.innerText = ''
                }
            }
        })
    }

}

export default Validation
