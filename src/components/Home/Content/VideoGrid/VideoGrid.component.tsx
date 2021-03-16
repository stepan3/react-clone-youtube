import React from 'react'
import VideoPreview from './VideoPreview/VideoPreview.component'
import { VideoGridHeader } from './VideoGridHeader/VideoGridHeader.component'
import { Divider } from 'semantic-ui-react'
import { Video } from '../../../../store/types'

import './VideoGrid.css'

interface IVideos {
  videos: Video[]
  title: string
  showDivider: boolean
}

export const VideoGrid = (props: IVideos) => {
  let previews = props.videos.map(video => (
    <VideoPreview video={video} key={video.id} />
  ))

  return (
    <>
      <VideoGridHeader title={props.title} />
      <div className="video_grid">{previews}</div>
      {props.showDivider ? <Divider /> : null}
    </>
  )
}
