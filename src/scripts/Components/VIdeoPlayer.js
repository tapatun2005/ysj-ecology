import {
  $selector,
  $selectors
} from 'Helpers'


const VideoPlayer = (el) => {
  const videoSelector = $selectors('.video')
  for (let i = 0; i < videoSelector.length; i++) {
    const video = $selector(videoSelector[i], 'video')
    const videoToggle = $selector(videoSelector[i], '.video__background')

    videoToggle.addEventListener('click', () => {
      videoSelector[i].classList.add('is-playing')
      video.play()
    })

  }
}

export default VideoPlayer