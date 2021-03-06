import React from 'react'
import { Waypoint } from 'react-waypoint'
import { Video } from '../../../store/types'
import VideoPreview from '../../Home/Content/VideoGrid/VideoPreview/VideoPreview.component'
import { InfiniteScroll } from '../../InfiniteScroll/InfiniteScroll.component'
import './ResultList.css'

interface IResultList {
  videos: Video[]
  callBack(args: Waypoint.CallbackArgs): void
  isLoading: boolean
}

export const ResultList = (props: IResultList) => {
  const previews = props.videos.map(item => (
    <VideoPreview isVertical video={item} key={item.id} />
  ))

  return (
    <div className="result_list">
      <InfiniteScroll callBack={props.callBack} isLoading={props.isLoading}>
        <div>{previews}</div>
      </InfiniteScroll>
    </div>
  )
}
