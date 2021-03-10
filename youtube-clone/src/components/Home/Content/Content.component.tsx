import React, { useState } from 'react'
import { InfiniteScroll } from '../../InfiniteScroll/InfiniteScroll.component'
import { VideoGrid } from '../Content/VideoGrid/VideoGrid.component'
import './Content.css'

export const Content = () => {
  const [numOfGrids, setNumOfGrids] = useState(2)

  const grids = Array.apply(null, new Array(numOfGrids)).map((val, index) => (
    <VideoGrid key={index} />
  ))

  const onCallBack = () => {
    setNumOfGrids(currentState => currentState + 1)
  }

  return (
    <InfiniteScroll callBack={onCallBack}>
      <div className="video_content">
        <div className="video_content_container">{grids}</div>
      </div>
    </InfiniteScroll>
  )
}
