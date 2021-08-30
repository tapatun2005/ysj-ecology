import Default from './Default'

import {
    Parallax,
    SimpleParallax,
    Expand,
    ShowForm,
    InputCount,
    FileLimit,
    Validation,
    Chatbot
} from 'Components'

Default()

new Parallax()
new SimpleParallax('[data-simple-parallax]')
Expand('.js-faq__expand', '.js-faq__content', false)
ShowForm('.js-contactus__option', '.js-contactus__form')
InputCount('.js-limit__input', '.js-limit__value')
FileLimit('.js-file__input', '.js-notice__message')
Validation('.js-validate', '.js-notice__message')

Chatbot(
    '.chatbox__open', 
    '#chatbox__close', 
    '#chatbox__window' 
)
