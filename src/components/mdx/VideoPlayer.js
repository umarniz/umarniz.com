import React from 'react'

const VideoPlayer = (props) => {
  const { mp4, webM, caption, autoPlay, controls, preload, poster } = props

  let autoplayParam = 'autoplay';
  
  if (autoPlay == false) {
    autoplayParam = null
  }
  
  let mp4URL = mp4
  let webmURL = webM

  return (
    <figure>
      <video className="video-player" loop={true} autoPlay={autoplayParam} controls={controls || false} preload={preload || 'auto'} poster={poster} muted>
        {mp4URL && <source type="video/mp4" src={mp4URL}></source>}
        {webmURL && <source type="video/webm" src={webmURL}></source>}
      </video>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default VideoPlayer;