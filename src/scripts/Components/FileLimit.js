import {
    $selectors
} from 'Helpers'

const FileLimit = (file, notice) => {

    const inputs = $selectors(file)

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', (e) => {
            const maxSize = parseInt(inputs[i].dataset.maxSize)
            const maxFiles = parseInt(inputs[i].dataset.maxFiles)
            const files = inputs[i].files
            const fileLength = parseInt(files.length)
            const noticeBlock = e.target.parentNode.querySelector(notice)
            let fileSize = 0

            noticeBlock.innerText = ''
            noticeBlock.classList.remove('is-active')

            for (let i = 0; i < files.length; i++) {     
                fileSize += files[i].size / 1024 / 1024
            }

            if (fileSize > maxSize) {
                noticeBlock.classList.add('is-active')
                noticeBlock.innerText = 'Attachment size exceeds ' + maxSize + 'MB'
                e.target.value = null
            }

            if (fileLength > maxFiles) {
                noticeBlock.classList.add('is-active')
                noticeBlock.innerText = 'Maximum of ' + maxFiles + ' attachments allowed.'
                e.target.value = null
            }
        })
    }

}

export default FileLimit
