import {
    $selectors
} from 'Helpers'

const InputCount = (input, val) => {
    
    const inputs = $selectors(input)

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keyup', (e) => {
            const item = e.target.nextElementSibling
            const count = e.target.value.length
            const display = item.querySelector(val)

            display.innerText = (parseInt(display.dataset.limitValue) - parseInt(count))
        })
    }

}

export default InputCount
