import React from 'react'
import { Image } from 'semantic-ui-react'
import { Video } from '../../../../../store/types'
import { formatShortString } from '../../../../../utils/number'
import { formatTimeString } from '../../../../../utils/timeformat'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import './VideoPreview.css'

TimeAgo.addLocale(en)

const timeAgo: TimeAgo = new TimeAgo()

interface IVideoPreview {
  video: Video
}

export const VideoPreview = ({ video }: IVideoPreview) => {
  return (
    <div className="video_preview">
      <div className="video_image">
        <Image src={video.snippet?.thumbnails?.medium?.url} />
        <div className="video_timestamp">
          <span>{formatTimeString(video.contentDetails?.duration!)}</span>
        </div>
      </div>
      <div className="video_info">
        <div className="video_info_title">{video.snippet?.title}</div>
        <div className="video_basic_info">
          <div className="video_channel">{video.snippet?.channelTitle}</div>
          <div className="video_view_time">
            {formatShortString(video.statistics?.viewCount!)} views •{' '}
            {timeAgo.format(new Date(video.snippet?.publishedAt!))}
          </div>
        </div>
      </div>
    </div>
  )
}
