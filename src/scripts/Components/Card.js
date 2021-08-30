import {
    $selector,
    $selectors
} from 'Helpers'

const Card = (selector) => {
  const cards = $selectors(selector)

  Array.prototype.forEach.call(cards, (card) => {
    let down
    let up
    let link = $selector(card, 'a')

    card.style.cursor = 'pointer'

    card.onmousedown = () => {
      down = +new Date()
    }

    card.onmouseup = (e) => {
      e.stopPropagation()
      if (e.button === 0) {
        up = +new Date()
        if (up - down < 200) {
          link.click()
        }
      }
    }
  })

}

export default Card
