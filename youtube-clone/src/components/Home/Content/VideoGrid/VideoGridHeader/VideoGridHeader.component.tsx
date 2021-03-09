import React from 'react'
import './VideoGridHeader.css'

interface IVideoGridHeader {
  title: string
}

export const VideoGridHeader = (props: IVideoGridHeader) => {
  return (
    <div className="video_grid_header">
      <span className="video_title">{props.title}</span>
    </div>
  )
}
