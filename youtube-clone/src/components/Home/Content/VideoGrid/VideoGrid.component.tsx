import React from 'react'
import { VideoPreview } from './VideoPreview/VideoPreview.component'
import { VideoGridHeader } from './VideoGridHeader/VideoGridHeader.component'
import { Divider } from 'semantic-ui-react'

import './VideoGrid.css'

export const VideoGrid = () => {
  let previews = Array.apply(null, new Array(15)).map((val, index) => (
    <VideoPreview key={index} />
  ))
  return (
    <>
      <VideoGridHeader title="Test Title" />
      <div className="video_grid">{previews}</div>
      <Divider />
    </>
  )
}
